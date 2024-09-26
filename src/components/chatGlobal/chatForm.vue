<script>
import { subscribeToAuth } from '@/service/auth'

export default {
  name: 'chatForm',
  emits: ['newMessages'],
  data() {
    return {
      fecha: '',
      newMessage: {
        content: ''
      },
      userLogged: {
        id: '',
        email: '',
         username: '',
         usertag: ''
      }, 
    }
  },
  mounted() {
    this.dateNow();
    setInterval(() => {
      this.dateNow();
    }, 1000);



    subscribeToAuth(newUserData => {

let dataUserStorage = localStorage.getItem('user')
if(!dataUserStorage){
  localStorage.setItem('user', JSON.stringify(newUserData))
}
this.userLogged = newUserData

})

const user = localStorage.getItem('user')
this.userLogged = JSON.parse(user)
console.log(user)
  },
  methods: {
    async handleSubmit() {
      if (this.userLogged && this.userLogged.id && this.newMessage.content.trim() !== '') {
        this.$emit('newMessages', { 
          user_id: this.userLogged.id,
          username: this.userLogged.username,
          usertag: this.userLogged.usertag,
          content: this.newMessage.content 
        });
        this.newMessage.content = '';
      }
    },
    dateNow() {
      const fecha = new Date();
      this.fecha = fecha.toLocaleString();
    }
  },
}
</script>

<template>
  <form
    action="#"
    @submit.prevent="handleSubmit()"
    class="container-md bg-slate-900 p-5 rounded-md w-full"
  >
    <div class="mb-4">
      <label for="message" class="sr-only">Mensaje</label>
      <textarea
        id="message"
        name="content"
        v-model="newMessage.content"
        class="w-full h-28 resize-none border-slate-900 border rounded py-2 px-4 text-slate-900 focus:border-slate-950"
        placeholder="Que esta pasando en Valorant?"
      ></textarea>
    </div>
    <div class="grid items-center">
      <p class="col-start-1 flex items-center text-white">
        <i class="fa-solid fa-calendar mr-2"></i>
        {{ fecha }}
      </p>
      <button
        type="submit"
        class="col-end-9 py-1 px-4 rounded bg-red-600 text-white ring-red-600 ring-offset-slate-900 ring hover:ring-offset-2 ring-offset-0 transition-all"
      >
        Postear
      </button>
    </div>
  </form>
</template>
