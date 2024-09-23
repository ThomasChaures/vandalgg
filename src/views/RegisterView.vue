<script>
import { register } from '@/service/auth'

export default {
  name: 'RegisterView',
  data() {
    return {
      user: {
        email: '',
        password: ''
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
