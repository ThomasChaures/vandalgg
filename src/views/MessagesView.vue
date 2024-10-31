<script>
import { subscribeToAuth } from "@/service/auth";
import {
  savePrivateChatMessage,
  subscribeToPrivateChat,
} from "@/service/chatPrivate";
import { localizarLosDatosDelUsuarioLoggeadoByUsertag } from "@/service/users";
// import ListChats from "@/components/chatPrivado/listChats.vue";
let unsubscribeFromAuth = () => {};

export default {
  name: "MessagesView",
  // components: {ListChats},
  data() {
    return {
      // datos de usuarios
      userChat: {},
      userLogged: {},

      // datos de chat

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
  <section>
    <form @submit.prevent="handleSubmite">
      <input type="text" v-model="newMessage.text" />
      <button type="submit">enviar</button>
    </form>
  </section>
  <section class="mt-20 text-white text-4xl">
    <h1>Chat con {{ userChat.id_m }}</h1>

    <div>
      <ul class="flex flex-col items-start gap-4">
        <li
          v-for="(m, index) in messages"
          :key="index"
          :class="{ 
            'bg-gray-600': m.user_id !== userLogged.usertag ,
            'bg-green-600 self-end': m.user_id === userLogged.usertag 
          }">
          {{ m.content }}
        </li>
      </ul>
    </div>
  </section>
  <!-- <section>
     <ListChats/>
  </section> -->
</template>
