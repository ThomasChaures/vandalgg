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
  <section class="w-full max-w-[600px] rounded-xl shadow-sm">
    <div class="w-full flex item-center justify-center border-b border-white/10 mb-10">
        <h2 class="font-semibold text-2xl py-4 text-white">Ingresar Cuenta</h2>
      </div>

    <form action="#" class="px-8" @submit.prevent="envioDeFormulario()">
      <div class="mb-4">
        <label for="email" class="text-white block mb-2">E-mail</label>
        <input
          type="mail"
          name="email"
          v-model="user.email"
          class="w-full p-2 border rounded"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="text-white block mb-2">Password</label>
        <input
          type="password"
          name="password"
          v-model="user.password"
          class="w-full p-2 border  rounded"
        />
      </div>
      <button
        class="py-2 mt-8 w-full rounded bg-blue-700 text-white hover:bg-blue-600 transition-all"
      >
        Enviar
      </button>

      <template v-if="error !== ''">
        <error>Error al iniciar sesión. Credenciales incorrectas.</error>
    </template>

    <p class="py-5 text-white text-center">
       No contas con una cuenta? <router-link to="/registro"><span class="text-blue-500 underline">Registrate!</span></router-link>
    </p>
    </form>
   
  </section>
</template>
