<script>
import { subscribeToAuth } from "@/service/auth";
import sButton from "../slot/sButton.vue";


export default {
  name: "chatForm",
  emits: ["newMessages"],
  components: {sButton},
  data() {
    return {
  
      fecha: "",
      newMessage: {
        content: "",
      },
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
  mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
  methods: {
    async handleSubmit() {
      if (
        this.userLogged &&
        this.userLogged.id &&
        this.newMessage.content.trim() !== ""
      ) {
        this.$emit("newMessages", {
          user_id: this.userLogged.id,
          username: this.userLogged.username,
          usertag: this.userLogged.usertag,
          content: this.newMessage.content,
          photo: this.userLogged.photo,
          date: new Date().toLocaleDateString(),
        });
        this.newMessage.content = "";
      }
    },
  },
};
</script>

<template>
  <div class="container-md bg-white p-5 mb-5 rounded-xl w-full">
    <h2 class="font-bold pb-2">Crear Publicacion</h2>
    <form action="#" @submit.prevent="handleSubmit()" class="">
      <div class="mb-1 mt-3 relative">
        <div
          class="absolute h-9 w-9 bg-gray-200 border-cyan-950 border overflow-hidden flex items-center justify-center rounded-full"
        >
          <i v-if="!userLogged.photo" class="absolute bottom-[-2px] text-[27px] fa-solid fa-user text-gray-500"></i>
          <img
            v-else
            class="h-full w-full"
            :src="userLogged.photo"
            alt="Foto de perfil"
          />
        </div>
        <label for="message" class="sr-only">Mensaje</label>
        <textarea
          id="message"
          name="content"
          v-model="newMessage.content"
          class="w-full h-20 resize-none rounded pt-2 pl-[50px] bg-slate-9000 outline-none placeholder-cyan-950/50 focus:placeholder-cyan-950 text-cyan-950"
          placeholder="Que esta pasando en Valorant?"
        ></textarea>
      </div>
      <div class="items-center border-t pt-5">
        <sButton>Publicar</sButton>
      </div>
    </form>
  </div>
</template>
