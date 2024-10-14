<script>
import { RouterLink, RouterView } from "vue-router";
import { subscribeToAuth } from "./service/auth";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import AppNavbar from "./components/AppNavbar.vue";

export default {
  name: "App",
  components: { RouterLink, RouterView, AppNavbar, AppFooter, AppHeader },
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
  <div class="flex mx-auto max-w-[1200px] relative">
    <AppHeader />

    <main class="container max-w-[600px] mt-[130px] mx-auto">
      <AppNavbar />
      <div class="max-[1000px]:px-8">
        <RouterView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
