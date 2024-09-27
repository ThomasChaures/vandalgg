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
      },
    }
  },
  mounted() {
    subscribeToAuth((newUserData) => (this.userLogged = newUserData));
  },
  
};
</script>

<template>
  <div class="rounded bg-slate-900">
    <div
      class="p-4 border-b border-white/40"
      v-for="(messages, index) in messages"
      :key="index"
    >
        <post :message="messages" />
    </div>
  </div>
</template>
