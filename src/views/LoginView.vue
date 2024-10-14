<script>
import { login } from '@/service/auth'
import error from '@/components/slot/error.vue';

export default {
  name: 'LoginView',
  components: {error},
  data() {
    return {
      error: '',
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
        await login({
          ...this.user
        })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.error = `${err}`
      }
    }
  }
}
</script>

<template>
  <section class="w-full max-w-[600px] bg-white rounded shadow-sm">
    <div class="w-full flex item-center justify-center mb-2">
        <h2 class="font-semibold text-2xl py-4 text-cyan-950">Ingresar Cuenta</h2>
      </div>

    <form action="#" class="p-8" @submit.prevent="envioDeFormulario()">
      <div class="mb-4">
        <label for="email" class="text-cyan-950 block mb-2">E-mail</label>
        <input
          type="mail"
          name="email"
          v-model="user.email"
          class="w-full p-2 border border-slate-950 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="text-cyan-950 block mb-2">Password</label>
        <input
          type="password"
          name="password"
          v-model="user.password"
          class="w-full p-2 border border-slate-950 rounded"
        />
      </div>
      <button
        class="py-1 mt-8 w-full rounded bg-cyan-950 flex items-center justify-center ring-cyan-950 ring-offset-white ring hover:ring-offset-2 ring-offset-0 transition-all text-white"
      >
        Enviar
      </button>
    </form>
    <template v-if="error !== ''">
        <error>Error al iniciar sesión. El e-mail o la contraseña pueden no ser correctos.</error>
    </template>
  </section>
</template>
