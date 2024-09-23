<script>
import chatForm from './chatForm.vue'
import chatList from './chatList.vue'
import { enviarMensajeAfirebase, cambiosEnElChat } from '@/service/chatGlobal.js'

export default {
  name: 'chatGlobalSection',
  components: { chatForm, chatList },
  data() {
    return {
      messages: [],
      postCargados: false
    }
  },
  async mounted() {
    cambiosEnElChat((mensajesDB) => {
      ;(this.messages = mensajesDB), (this.postCargados = true)
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
  <div class="flex flex-col gap-2 w-[100%]">
    <section class="border-b border-white/40">
      <chatForm @new-messages="sendMessage" />
    </section>
    <section>
      <template v-if="postCargados">
        <chatList :messages="messages" />
      </template>
      <template v-else>
        <div class="relative h-screen">
          <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="animate-spin rounded-full h-20 w-20 border-4 border-blue-500"></div>
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-slate-900"
            ></div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>
