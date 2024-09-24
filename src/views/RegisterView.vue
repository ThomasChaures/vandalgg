<script>
import { register } from '@/service/auth'
import { crearDatosDeUsuario } from '@/service/users'

export default {
  name: 'RegisterView',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      collectionUser: {
        username: '',
        usertag: ''
      },
      loading: false
    }
  },
  methods: {
    async envioDeFormulario() {
      this.loading = true
      try {
        await register({
          ...this.user
        })

        await crearDatosDeUsuario(this.user.email, this.collectionUser.username, this.collectionUser.usertag, 1)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<template>
  <section class="w-full max-w-[600px] p-8 h-screen border-l border-r border-white/40">
    <h1 class="text-white text-xl font-semibold mb-4">Registro de cuenta</h1>

    <form action="#" @submit.prevent="envioDeFormulario()">
      <div class="mb-4">
        <label for="username" class="text-white block mb-2">Nombre</label>
        <input
          type="text"
          name="username"
          v-model="collectionUser.username"
          class="w-full p-2 border border-slate-950 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="usertag" class="text-white block mb-2">User tag</label>
        <input
          type="text"
          name="usertag"
          v-model="collectionUser.usertag"
          class="w-full p-2 border border-slate-950 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="text-white block mb-2">E-mail</label>
        <input
          type="mail"
          name="email"
          v-model="user.email"
          class="w-full p-2 border border-slate-950 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="text-white block mb-2">Password</label>
        <input
          type="password"
          name="password"
          v-model="user.password"
          class="w-full p-2 border border-slate-950 rounded"
        />
      </div>
      <button
        class="py-1 mt-8 w-full rounded bg-red-600 flex items-center justify-center ring-red-600 ring-offset-slate-900 ring hover:ring-offset-2 ring-offset-0 transition-all text-white"
      >
        Enviar
      </button>
    </form>
  </section>
</template>
