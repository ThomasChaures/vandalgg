<script>
import { RouterLink, RouterView } from "vue-router";
import { subscribeToAuth } from "./service/auth";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import AppNavbar from "./components/AppNavbar.vue";
import AppSearch from './components/AppSearch.vue';

export default {
  name: "App",
  components: { RouterLink, RouterView, AppNavbar, AppFooter, AppHeader, AppSearch },
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
    <AppHeader />
    <AppNavbar class="z-50" />
    <AppSearch />

    <main class="container max-w-[600px] border-l  border-white/10 min-h-screen border-r pt-[80px] mx-auto">   
      <div >
        <RouterView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
