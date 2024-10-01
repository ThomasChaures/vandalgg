<script>
import { RouterLink, RouterView } from "vue-router";
import AppNavbar from "./components/AppNavbar.vue";
import { subscribeToAuth } from "./service/auth";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: { RouterLink, RouterView, AppNavbar, AppFooter },
  data() {
    return {
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        desciption: "",
        seguidores: null,
        seguidores_cuentas: null,
        seguidos: null,
        seguidos_cuentas: null,
        rango: null
      },
    };
  },
  mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
};
</script>

<template>
  <div class="flex mx-auto w-[1200px] relative">
    <AppNavbar />
    <main class="container w-full ml-[300px]">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
