<script>
import { RouterLink } from 'vue-router'
import { auth } from '@/service/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'AppNavbar',
  components: { RouterLink },
  data() {
    return {
      userLogged: {
        id: '',
        email: ''
      }
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userLogged = {
          id: user.uid,
          email: user.email
        }
      } else {
        this.userLogged = {
          id: null,
          email: null
        }
      }
    })
  }
}
</script>

<template>
  <header class="h-screen w-[300px] p-4 pl-7 bg-slate-900 flex flex-col justify-between">
    <div>
      <p class="text-4xl text-white font-semibold tracking-wider uppercase mb-10">Vandal</p>
    </div>

    <nav class="flex-1 w-full">
      <ul class="flex flex-col gap-10 text-white text-xl w-full">
        <li class="hover:text-red-600 block w-full">
          <RouterLink class="font-semibold tracking-wider block w-full" to="/"
            ><i class="fa-solid fa-house pr-2"></i>Inicio</RouterLink
          >
        </li>
        <li v-if="userLogged.id" class="hover:text-red-600 w-full block">
          <RouterLink
            class="font-semibold tracking-wider w-full block"
            :to="'/perfil/' + userLogged.id"
          >
            <i class="fa-solid fa-user pr-2"></i>Perfil</RouterLink
          >
        </li>
      </ul>
    </nav>

    <ul class="flex flex-col gap-5 text-white text-xl">
      <template v-if="!userLogged.id">
        <li>
          <RouterLink
            to="/iniciar-sesion"
            class="rounded bg-red-600 flex justify-center items-center py-1.5 w-[200px] ring-red-600 ring-offset-slate-900 ring hover:ring-offset-2 ring-offset-0 transition-all"
            >Iniciar sesión</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/"
            class="rounded bg-red-600 items-center justify-center py-1.5 w-[200px] flex ring-red-600 ring-offset-slate-900 ring hover:ring-offset-2 ring-offset-0 transition-all"
            >Registrarse</RouterLink
          >
        </li>
      </template>
      <template v-else>
        <li>
          <RouterLink
            to="/"
            class="rounded bg-red-600 items-center justify-center py-1.5 w-[200px] flex ring-red-600 ring-offset-slate-900 ring hover:ring-offset-2 ring-offset-0 transition-all"
            >Cerrar sesion</RouterLink
          >
        </li>
      </template>
    </ul>
  </header>
</template>
