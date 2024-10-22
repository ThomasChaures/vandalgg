<script>
import { RouterLink } from "vue-router";
import { cerrarSesion, subscribeToAuth } from "@/service/auth";
export default {
  name: "AppNavbar",
  components: { RouterLink },
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
        rango: null,
      },
    };
  },
  async mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
};
</script>

<template>
  <nav
    v-if="userLogged.id !== null"
    class="max-w-[220px] fixed top-[130px] left-[390px] max-[1820px]:left-[300px] max-[1720px]:left-[270px] max-[1520px]:left-[150px] max-[1620px]:left-[220px] p-6 w-full max-[1370px]:left-[100px] max-[1270px]:left-[20px] max-[1101px]:max-w-[160px] max-[1000px]:top-auto max-[1000px]:bottom-0 max-[1000px]:max-w-[100%] max-[1000px]:left-1/2 max-[1000px]:translate-x-[-50%] max-[1000px]:bg-slate-950 max-[1000px]:border-t"
  >
    <ul
      class="flex flex-col justify-between h-full max-[1000px]:flex-row max-[1000px]:justify-between items-start gap-8 text-white"
    >
      <li class="max-[1000px]:flex items-center justify-center">
        <RouterLink
          class="hover:bg-white/10 px-2 py-2 rounded-full text-xl flex items-center justify-start tracking-wider"
          :to="'/'"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span class="pl-2 max-[1000px]:hidden">Inicio</span></RouterLink
        >
      </li>

      <li class="max-[1000px]:flex items-center justify-center">
        <RouterLink
          class="hover:bg-white/10 px-2 py-2 rounded-full text-xl flex items-center justify-start tracking-wider"
          :to="'/perfil/' + userLogged.usertag"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <span class="pl-2 max-[1000px]:hidden">Buscar</span></RouterLink
        >
      </li>
      <template v-if="userLogged.id">
        <li class="max-[1000px]:flex items-center justify-center">
          <RouterLink
            class="hover:bg-white/10 px-2 py-2 rounded-full text-xl flex items-center justify-start tracking-wider"
            :to="'/perfil/' + userLogged.usertag"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span class="pl-2 max-[1000px]:hidden">Perfil</span></RouterLink
          >
        </li>
        <li class="max-[1000px]:flex items-center justify-center">
          <RouterLink
            class="hover:bg-white/10 px-2 py-2 rounded-full text-xl flex items-center justify-start tracking-wider"
            :to="'/perfil/' + userLogged.usertag"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <span class="pl-2 max-[1000px]:hidden">Menasjes</span></RouterLink
          >
        </li>
        <li class="max-[1000px]:flex items-center justify-center">
          <RouterLink
            class="hover:bg-white/10 px-2 py-2 rounded-full text-xl flex items-center justify-start tracking-wider"
            :to="'/perfil/' + userLogged.usertag"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            <span class="pl-2 max-[1000px]:hidden">Eventos</span></RouterLink
          >
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-white/10;
}
</style>
