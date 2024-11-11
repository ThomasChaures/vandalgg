<script>
import { subscribeToAuth } from "@/service/auth";
import { getListadoDeChats } from "@/service/chatPrivate";
let unsubscribeFromAuth = () => {};


export default {
  name: "listChats",
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
        rango: null,
      },
      lista: [],
    };
  },
  async mounted() {
    unsubscribeFromAuth = subscribeToAuth(newUserData => {
      this.userLogged = newUserData;
      this.loadChats(); 
    });
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
  methods: {
    async loadChats() {
      if (this.userLogged.usertag) {
        try {
          const chats = await getListadoDeChats(this.userLogged.usertag);
          this.lista = chats;
        } catch (error) {
          console.log(error); 
        }
      }
    },
  },
};
</script>

<template>
  <ul class="flex flex-col">
    <li class="px-2 py-4" v-for="(chat, index) in lista" :key="index">
      <p>{{ chat.nombre }}</p>
      <p>{{ chat.contenido }}</p>
    </li>
  </ul>
</template>
