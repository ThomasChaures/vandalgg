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
      chats: [],
      randoms: {},
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
  computed: {
    mostrarHeader() {
      return !!this.userLogged.id || this.$route.meta.nav !== false;
    },
  },
};
</script>

<template>
  <div class="flex mx-auto max-w-[1360px] relative">
    <AppHeader v-if="mostrarHeader" />
    <main class="container pt-[70px] mx-auto">
      <div>
        <RouterView />
      </div>
    </main>
  </div>
</template>
