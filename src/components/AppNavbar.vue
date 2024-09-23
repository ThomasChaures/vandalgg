<script>
import { RouterLink } from 'vue-router'
export default {
  name: 'AppNavbar',
  components: { RouterLink }
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
        <li class="hover:text-red-600 w-full block">
          <RouterLink class="font-semibold tracking-wider w-full block" to="/">
            <i class="fa-solid fa-trophy pr-2"></i>Esports</RouterLink
          >
        </li>
      </ul>
    </nav>

    <ul class="flex flex-col gap-5 text-white text-xl">
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
    </ul>
  </header>
</template>
