<script>
import { subscribeToAuth } from "@/service/auth";
import { RouterLink } from "vue-router";
import post from "./post.vue";

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
    subscribeToAuth((newUserData) => (this.userLogged = newUserData));
  },
};
</script>

<template>
  <div class="rounded">
    <div
      v-for="(messages, index) in messages"
      :key="index"
    >
      <post :message="messages" />
    </div>
  </div>
</template>
