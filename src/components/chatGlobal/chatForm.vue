<script>
import { subscribeToAuth } from '@/service/auth'
import { localizarLosDatosDelUsuarioLoggeado } from '@/service/users'
export default {
  name: 'chatForm',
  emits: {
    newMessages({ email, content }) {
      return typeof email === 'string' && typeof content === 'string'
    }
  },
  data() {
    return {
      fecha: '',
      newMessage: {
        username: '',
        usertag: '',
        content: ''
      },
      userLogged: {
        id: '',
        email: ''
      },
    }
  },
  mounted() {
    this.dateNow()
    setInterval(() => {
      this.dateNow()
    }, 1000)

    subscribeToAuth(newUserData => this.userLogged = newUserData)


  },
  methods: {
  async  envioSubmit() {
    await  localizarLosDatosDelUsuarioLoggeado(this.userLogged.email)
  .then(data => {
    this.newMessage.username = data.username;
    this.newMessage.usertag = data.usertag;
  })
  .catch(err => console.error(err));
      this.$emit('newMessages', { ...this.newMessage })
      this.newMessage.content = ''
    },
    dateNow() {
      const fecha = new Date()
      this.fecha = fecha.toLocaleString()
    }
  }
}
</script>

<template>
  <form
    action="#"
    @submit.prevent="envioSubmit()"
    class="container-md bg-slate-900 p-5 rounded-md w-full"
  >
  
    <div class="mb-4">
      <textarea
        name="content"
        v-model="newMessage.content"
        class="w-full h-28 resize-none border-slate-900 border rounded py-2 px-4 text-slate-900 focus:border-slate-950"
        placeholder="Que esta pasando en valorant?"
      >
      </textarea>
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
