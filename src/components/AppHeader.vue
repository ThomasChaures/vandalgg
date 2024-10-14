<script>
import { RouterLink } from "vue-router";
import { cerrarSesion, subscribeToAuth } from "@/service/auth";

export default {
  name: "AppHeader",
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
  methods: {
    logout() {
      cerrarSesion();
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <header class="fixed top-0 left-0 z-30 w-full shadow-sm pl-7 bg-white">
    <div
      class="max-w-[1360px] h-20 w-full mx-auto flex items-center justify-between"
    >
      <div>
        <p class="text-4xl text-cyan-950 font-bold tracking-wider uppercase">
          Vandal
        </p>
      </div>

      <ul class="flex gap-5 items-center text-white text-xl">
        <template v-if="!userLogged.id">
          <li>
            <RouterLink
              to="/iniciar-sesion"
              class="rounded bg-cyan-950 flex text-base justify-center items-center py-1 px-4 ring-cyan-950 ring-offset-white ring hover:ring-offset-2 ring-offset-0 transition-all"
              >Iniciar sesión</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/registro"
              class="rounded bg-cyan-950 flex text-base justify-center items-center py-1 px-4 ring-cyan-950 ring-offset-white ring hover:ring-offset-2 ring-offset-0 transition-all"
              >Registrarse</RouterLink
            >
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink :to="`/perfil/${userLogged.usertag}`">
              <div
              class="h-10 w-10 bg-white border flex items-center justify-center rounded-full"
            >
        
              <i v-if="!userLogged.photo" class="fa-solid fa-user text-black"></i>
               <img v-else class="h-full w-full" :src="userLogged.photo" alt="">
     
            </div>
            </RouterLink>
          </li>
          <li>
            <form action="#" @submit.prevent="logout()">
              <button
                type="submit"
                class="rounded bg-cyan-950 flex text-base justify-center items-center py-2 px-2 ring-cyan-950 ring-offset-white ring hover:ring-offset-2 ring-offset-0 transition-all"
              >
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </form>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>
