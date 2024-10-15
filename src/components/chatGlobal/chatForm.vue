<script>
import { subscribeToAuth } from "@/service/auth";

export default {
  name: "chatForm",
  emits: ["newMessages"],
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
    <h2 class="font-bold">Crear Post</h2>
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
      <div class="grid grid-cols-9 items-center border-t pt-5">
    

        <button
          type="submit"
          class="col-start-1 col-span-2 py-1 px-4 rounded bg-cyan-950 text-white ring-cyan-950 ring-offset-white ring hover:ring-offset-2 ring-offset-0 transition-all"
        >
          Postear
        </button>
      </div>
    </form>
  </div>
</template>
