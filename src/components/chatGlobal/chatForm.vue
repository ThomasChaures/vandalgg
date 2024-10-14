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
    this.dateNow();
    setInterval(() => {
      this.dateNow();
    }, 1000);

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
    dateNow() {
      const fecha = new Date();
      this.fecha = fecha.toLocaleString();
    },
  },
};
</script>

<template>
  <form
    action="#"
    @submit.prevent="handleSubmit()"
    class="container-md bg-white p-5 mb-5 rounded-md w-full"
  >
    <div class="mb-4">
      <label for="message" class="sr-only">Mensaje</label>
      <textarea
        id="message"
        name="content"
        v-model="newMessage.content"
        class="w-full h-28 resize-none border-slate-900 border rounded py-2 px-4 bg-slate-9000 bg-slate-500 text-white focus:border-slate-950"
        placeholder="Que esta pasando en Valorant?"
      ></textarea>
    </div>
    <div class="grid items-center">
      <p class="col-start-1 flex items-center text-cyan-950">
        <i class="fa-solid fa-calendar mr-2"></i>
        {{ fecha }}
      </p>
      <button
        type="submit"
        class="col-end-9 py-1 px-4 rounded bg-cyan-950 text-white ring-cyan-950 ring-offset-white ring hover:ring-offset-2 ring-offset-0 transition-all"
      >
        Postear
      </button>
    </div>
  </form>
</template>
