<script>
import { RouterLink } from "vue-router";
import { cerrarSesion, subscribeToAuth } from "@/service/auth";
import { busqueda } from "@/service/search";
import sButton from "./slot/sButton.vue";


export default {
  name: "AppHeader",
  components: { RouterLink, sButton },
  data() {
    return {
      busqueda: '',
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
  methods: {
    logout() {
      cerrarSesion();
      this.$router.push("/");
    },
    async buscar() {
      this.$router.push(`/busqueda/${this.busqueda}`);
}

  },
};
</script>

<template>
  <header class="fixed top-0 left-0 z-40 w-full shadow-sm bg-white">
    <div
      class="max-w-[1360px] px-5 h-20 w-full mx-auto flex items-center justify-between"
    >
      <div>
        <p
          class="text-4xl max-[700px]:text-xl text-cyan-950 font-bold tracking-wider uppercase"
        >
          Vandal
        </p>
      </div>

      <div class="flex ml-16 w-full max-w-[600px]" >
        <form action="#" @submit.prevent="buscar()" class="flex items-center container h-[35px]">
          <input type="text" v-model="busqueda" placeholder="Buscar..."  class="px-2 rounded-bl block w-full rounded-tl  border border-cyan-950 h-[100%]"/>
          <button class="rounded-br rounded-tr  bg-cyan-950 flex text-base justify-center items-center h-full px-2 ring-cyan-950/0  transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </div>

      <ul class="flex gap-5 items-center text-white text-xl">
        <template v-if="!userLogged.id">
          <li>
            <RouterLink
              to="/iniciar-sesion"
               class="rounded flex text-base max-[700px]:text-sm justify-center items-center py-1 px-4  bg-cyan-950 text-white hover:bg-cyan-700 transition-all"
              >Iniciar sesión</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/registro"
              class="rounded flex text-base max-[700px]:text-sm justify-center items-center py-1 px-4  bg-cyan-950 text-white hover:bg-cyan-700 transition-all"
              >Registrarse</RouterLink
            >
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink
              :to="`/perfil/${userLogged.usertag}`"
              class="flex items-center"
            >
              <p class="text-cyan-950 mr-2 font-bold">
                @{{ userLogged.usertag }}
              </p>
              <div
                class="h-10 w-10 relative bg-gray-200 border-cyan-950 border overflow-hidden flex items-center justify-center rounded-full"
              >
                <i
                  v-if="!userLogged.photo"
                  class="fa-solid fa-user absolute bottom-0 text-[30px] text-gray-500"
                ></i>
                <img
                  v-else
                  class="h-full w-full"
                  :src="userLogged.photo"
                  alt="Foto de perfil"
                />
              </div>
            </RouterLink>
          </li>
          <li>
            <form action="#" @submit.prevent="logout()">
              <sButton
                class="!py-2 !px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </sButton>
            </form>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>
