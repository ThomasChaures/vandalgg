<script>
import { RouterLink, RouterView } from "vue-router";
import { subscribeToAuth } from "./service/auth";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";


export default {
  name: "App",
  components: { RouterLink, RouterView, AppFooter, AppHeader },
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
};
</script>

<template>
  <div class="flex mx-auto max-w-[1260px] relative">
    <AppHeader v-if="userLogged.id" />
    <main class="container max-w-[600px] min-h-screen  pt-[70px] mx-auto">   
      <div >
        <RouterView />
      </div>
    </main>
  </div>
</template>
