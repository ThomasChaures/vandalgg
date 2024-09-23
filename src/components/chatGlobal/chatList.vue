<script>
import { darLike } from '@/service/chatGlobal'
import { subscribeToAuth } from '@/service/auth';

export default {
  name: 'chatList',
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      flagComment: false,
      userLogged: {
        id: '',
        email: ''
      }
    }
  },
  mounted() {
    subscribeToAuth(newUserData => this.userLogged = newUserData)
  },
  methods: {
    like(id) {
      if (this.userLogged.id !== null) {
        darLike(id, this.userLogged.id)
      }
    }
  }
}
</script>

<template>
  <div class="rounded bg-slate-900">
    <div class="p-4 border-b border-white/40" v-for="(messages, index) in messages" :key="index">
      <div class="headerMessage flex items-center text-white">
        <div class="h-9 w-9 bg-white flex items-center justify-center rounded-full">
          <i class="fa-solid fa-user text-black"></i>
        </div>
        <p class="pl-2 font-semibold text-lg">{{ messages.username }}</p>
        <p class="pl-2 opacity-60">{{ messages.usertag }}</p>
      </div>
      <div class="message pt-4 pb-4 px-2 text-white text-wrap">
        <p class="break-all">{{ messages.content }}</p>
      </div>

      <div class="interaccion flex items-center">
        <div
          @click="like(messages.id)"
          class="like flex items-center text-white/75 mr-4 text-lg cursor-pointer"
        >
          <i class="fa-regular fa-heart hover:bg-blue-700/50  rounded-full p-2"></i>
          <p>{{ messages.likes }}</p>
        </div>
        <div class="like flex items-center text-white/75 mr-4 text-lg cursor-pointer">
          <i class="fa-regular fa-comment hover:bg-blue-700/50 rounded-full p-2"></i>
          <p>{{ messages.comentarios }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
