<script>
import { RouterLink } from "vue-router";
import { cerrarSesion, subscribeToAuth } from "@/service/auth";
export default{
    name: 'AppNavbar',
    components: {RouterLink},
    data() {
    return {
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        description: "",
        seguidores: null,
        seguidores_cuentas: null,
        seguidos: null,
        seguidos_cuentas: null,
        rango: null
      },
    };
  },
  async mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
}
</script>

<template>
      <nav class="max-w-[220px] bg-white  fixed top-[127px] rounded shadow-sm left-[390px] max-[1720px]:left-[270px] max-[1520px]:left-[150px] max-[1620px]:left-[220px] p-6 w-full max-[1370px]:left-[100px] max-[1270px]:left-[20px] max-[1101px]:max-w-[160px] max-[1000px]:top-auto max-[1000px]:bottom-0 max-[1000px]:max-w-[100%] max-[1000px]:left-1/2  max-[1000px]:translate-x-[-50%] max-[1000px]:border z-30">
      <ul class="flex flex-col justify-between h-full max-[1000px]:flex-row max-[1000px]:justify-around items-start gap-10 text-cyan-950">
        <li class="hover:text-red-600 block">
          <RouterLink class="font-semibold text-sm flex items-center justify-center tracking-wider w-full" to="/"
            ><i class="fa-solid pr-2 fa-house text-[20px]"></i><span class="max-[1000px]:hidden">Inicio</span></RouterLink
          >
        </li>
        <template v-if="userLogged.id">
          <li  class="hover:text-red-600 flex items-center">
          <RouterLink
            class="font-semibold text-sm flex  items-center justify-center tracking-wider w-full"
            :to="'/perfil/' + userLogged.usertag"
          >
            <i class="fa-solid fa-user pr-2  text-[20px]"></i><span class="max-[1000px]:hidden">Perfil</span></RouterLink
          >
        </li>
        <li  class="hover:text-red-600 flex items-center">
          <RouterLink
            class="font-semibold text-sm flex items-center justify-center tracking-wider w-full"
            :to="'/perfil/' + userLogged.usertag"
          >
            <i class="fa-solid fa-message pr-2  text-[20px]"></i><span class="max-[1000px]:hidden">Menasjes</span></RouterLink
          >
        </li>
        </template>
      </ul>
    </nav>
</template>