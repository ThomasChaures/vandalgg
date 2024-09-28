<script>
import chatForm from './chatForm.vue'
import chatList from './chatList.vue'
import { enviarMensajeAfirebase, cambiosEnElChat } from '@/service/chatGlobal.js'
import { subscribeToAuth } from '@/service/auth'

export default {
  name: 'chatGlobalSection',
  components: { chatForm, chatList },
  data() {
    return {
      messages: [],
      postCargados: false,
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        desciption: "",
        seguidores: null,
        seguidores_cuentas: null,
        seguidos: null,
        seguidos_cuentas: null,
        rango: null
      },
    }
  },
  async mounted() {
    cambiosEnElChat((mensajesDB) => {
      this.messages = mensajesDB.reverse()
      this.postCargados = true
    })
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData
    })
  },
  methods: {
    sendMessage(newMessage) {
      enviarMensajeAfirebase(newMessage)
    }
  }
}
</script>

<template>
  <div class="flex flex-col  w-[100%]">
    <section v-if="this.userLogged.id" class="border-b border-white/40">
      <div class="w-full flex item-center justify-center border-t border-b border-white/40">
        <h2 class="font-semibold text-2xl py-2 text-white">Enviar post</h2>
      </div>
      <chatForm @new-messages="sendMessage" />
    </section>
    <section>
      <div class="w-full flex item-center justify-center border-t border-b border-white/40">
        <h2 class="font-semibold text-2xl py-2 text-white">Posts</h2>
      </div>
      <template v-if="messages.length === 0">
         <p class='w-full flex item-center justify-center py-20 text-4xl text-white/60'>No hay posts publicados.</p>
      </template>
      <template v-if="postCargados">
        <chatList :messages="messages" />
      </template>
      <template v-else>
        <div class="relative h-screen">
          <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="animate-spin rounded-full h-20 w-20  border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              class="animate-spin rounded-full h-20 w-20 border-slate-900"
            ></div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>
