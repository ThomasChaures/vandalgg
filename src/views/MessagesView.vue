<script>
import { subscribeToAuth } from "@/service/auth";
import {
  savePrivateChatMessage,
  subscribeToPrivateChat,
} from "@/service/chatPrivate";
import { localizarLosDatosDelUsuarioLoggeadoByUsertag } from "@/service/users";

let unsubscribeFromAuth = () => {};

export default {
  name: "MessagesView",
  data() {
    return {
      userChat: {},
      userLogged: {},

      messages: [],
      newMessage: {
        text: "",
      },
    };
  },
  methods: {
    async handleSubmite() {
      try {
        savePrivateChatMessage(
          this.userLogged.usertag,
          this.userChat.usertag,
          this.newMessage.text
        );
        this.newMessage.text = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    unsubscribeFromAuth = subscribeToAuth(
      async (data) => (this.userLogged = await data)
    );
    await localizarLosDatosDelUsuarioLoggeadoByUsertag(
      this.$route.params.usertag,
      async (data) => (this.userChat = await data)
    );

    await subscribeToPrivateChat(
      this.userLogged.usertag,
      this.userChat.usertag,
      async (data) => (this.messages = await data)
    );
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
};
</script>

<template>

  <section class="mt-20 text-white max-w-[600px] container mx-auto text-4xl">
    <h2>Chat con {{ userChat.usertag}}</h2>

    <div>
      <ul class="flex flex-col items-start rounded-xl h-[500px]  py-2 bg-slate-700 gap-4">
        <li
          v-for="(m, index) in messages"
          :key="index"
          :class="{ 
            'bg-gray-600': m.user_id !== userLogged.usertag ,
            'bg-green-600 text-2xl px-2 mx-2 rounded-xl self-end': m.user_id === userLogged.usertag 
          }">
          {{ m.content }}
        </li>
      </ul>
    </div>
  </section>
  <section>
    <h2 class="sr-only">Enviar mensaje</h2>
    <form @submit.prevent="handleSubmite">
      <input type="text" v-model="newMessage.text" />
      <button type="submit">enviar</button>
    </form>
  </section>
</template>
