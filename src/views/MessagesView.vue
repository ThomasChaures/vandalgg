<script>
import Router from "@/components/slot/Router.vue";
import SButton from "@/components/slot/SButton.vue";
import { subscribeToAuth } from "@/service/auth";
import {
  savePrivateChatMessage,
  subscribeToPrivateChat,
} from "@/service/chatPrivate";
import { localizarLosDatosDelUsuarioLoggeadoByUsertag } from "@/service/users";

let unsubscribeFromAuth = () => {};

export default {
  name: "MessagesView",
  components: { SButton, Router },
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
      if (this.newMessage.text) {
        try {
          savePrivateChatMessage(
            this.userLogged.id,
            this.userChat.u_id,
            this.newMessage.text,
            this.userLogged.usertag
          );
          this.newMessage.text = "";
        } catch (error) {
          console.log(error);
        }
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

    console.log(this.userLogged.id, this.userChat.u_id);

    await subscribeToPrivateChat(
      this.userLogged.id,
      this.userChat.u_id,
      async (data) => (this.messages = await data)
    );
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
 
};
</script>

<template>
  <section class="mt-20 flex flex-col max-w-2xl mx-auto text-white">



   <div  class=" flex justify-between rounded-tl-xl rounded-tr-xl px-4 bg-slate-700 py-2 font-semibold">
    <h2
     class="text-3xl"
    >
      Chat con {{ userChat.username }}
    </h2>

    <router-link :to="`/perfil/${userChat.usertag}`" class="rounded-lg bg-slate-900 flex items-center justify-center text-white hover:bg-slate-500 transition-all px-2">Volver atras</router-link>
   </div>


    <div
      class="rounded-bl-xl rounded-br-xl bg-slate-800 shadow-lg p-4 h-[500px] overflow-auto custom-scrollbar"
    >
      <ul class="flex flex-col gap-4">
        <li
          v-for="(m, index) in messages"
          :key="index"
          :class="{
            'bg-gray-700 text-sm px-4 py-2 self-start rounded-lg max-w-[80%] shadow':
              m.user_id !== userLogged.id,
            'bg-green-500 text-sm px-4 py-2 rounded-lg max-w-[80%] shadow self-end':
              m.user_id === userLogged.id,
          }"
        >
          <p>  {{ m.content }}</p>
        </li>
      </ul>
    </div>

    <div class="mt-6 bg-slate-700 p-4 rounded-xl shadow-lg">
      <form class="flex items-center gap-4" @submit.prevent="handleSubmite">
        <input
          class="flex-grow py-2 px-4 rounded-lg bg-slate-900 text-white focus:outline-none focus:ring focus:ring-green-500 placeholder-gray-400"
          type="text"
          placeholder="Escribi un mensaje..."
          v-model="newMessage.text"
        />
        <SButton
          class="py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition"
        >
          Enviar
        </SButton>
      </form>
    </div>
  </section>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
