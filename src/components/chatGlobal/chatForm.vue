<script>
import { subscribeToAuth } from "@/service/auth";
import sButton from "../slot/sButton.vue";

export default {
  name: "chatForm",
  emits: ["newMessages"],
  components: { sButton },
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
    adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px"; 
    },
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
  <div class="container p-5 pb-4 border-b border-white/10 mb-5 pt-10 w-full">
    <form action="#" @submit.prevent="handleSubmit()" class="bg-slate-950">
      <div class="mb-1 mt-3 relative">
        <div
          class="absolute h-12 w-12 bg-gray-200 border-cyan-950 border overflow-hidden flex items-center justify-center rounded-full"
        >
          <i v-if="!userLogged.photo" class="absolute bottom-[-2px] text-[47px] fa-solid fa-user text-gray-500"></i>
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
          @input="adjustHeight"  
          class="w-full text-2xl bg-slate-950 resize-none rounded pt-2 pl-[65px] outline-none text-white"
          placeholder="Que esta pasando en Valorant?"
          style="overflow:hidden"
        ></textarea>
      </div>
      <div class="items-center flex justify-end border-t border-white/10 pt-4 mt-2">
        <sButton>Publicar</sButton>
      </div>
    </form>
  </div>
</template>
