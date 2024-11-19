<script>
import { cerrarSesion, subscribeToAuth } from "@/service/auth";
import Router from "./slot/Router.vue";
let unsubscribeFromAuth = () => {};

export default {
  name: "AppNavbar",
  components: { Router },
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
    unsubscribeFromAuth = subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
};
</script>

<template>
  <nav v-if="userLogged.id !== null" class="max-w-[700px] block h-full">
    <ul
      class="flex justify-between h-full max-[1000px]:flex-row max-[1000px]:justify-between items-start text-white"
    >
      <li class="max-[1000px]:flex h-full items-center justify-center">
        <Router :link="'/'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
            />
          </svg>

          <span class="max-[1000px]:hidden">Inicio</span>
        </Router>
      </li>

    </ul>
  </nav>
</template>
