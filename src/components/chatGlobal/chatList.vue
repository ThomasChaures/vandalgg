<script>
import { subscribeToAuth } from "@/service/auth";
import { RouterLink } from "vue-router";
import post from "./Post.vue";
let unsubscribeFromAuth = () => {};


export default {
  name: "chatList",
  components: { RouterLink, post },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
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
  mounted() {
    unsubscribeFromAuth =  subscribeToAuth((newUserData) => (this.userLogged = newUserData));
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
};
</script>

<template>
  <div>
    <div
      v-for="(messages, index) in messages"
      :key="index"
    >
      <post :message="messages" />
    </div>
  </div>
</template>
