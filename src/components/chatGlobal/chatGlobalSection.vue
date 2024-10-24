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
        description: "",
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
    <section v-if="this.userLogged.id">
      <chatForm @new-messages="sendMessage" />
    </section>
    <section>
      <template v-if="messages.length === 0">
         <p class='min-h-screen w-full flex item-center justify-center py-20 text-4xl text-cyan-950'>No hay posts publicados.</p>
      </template>
      <template v-if="postCargados">
        <chatList class="border-t border-white/10"  :messages="messages" />
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
