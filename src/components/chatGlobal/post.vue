<script>
import { subscribeToAuth } from "@/service/auth";
import {
  darLike,
  enviarComentarioAlPost,
  getComentariosDelPost,
} from "@/service/chatGlobal";

export default {
  name: "post",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      flagComment: false,
      comentarios: [],
      comentario: "",
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        desciption: "",
        seguidores: null,
        seguidores_cuentas: null,
        seguidos: null,
        seguidos_cuentas: null,
        rango: null
      },
    };
  },
  async mounted() {
    subscribeToAuth((newUserData) => (this.userLogged = newUserData));
    getComentariosDelPost(this.message.id, (comentariosPost) => {
      this.comentarios = comentariosPost;
      console.log(comentariosPost);
      console.log(this.comentarios);
    });
  },
  methods: {
    like(id) {
      if (this.userLogged.id !== null) {
        darLike(id, this.userLogged.id);
      }
    },
    comentar() {
      if (
        this.userLogged &&
        this.userLogged.id &&
        this.comentario.trim() !== ""
      ) {
        enviarComentarioAlPost(
          this.comentario,
          this.userLogged.usertag,
          this.message.id
        );
      }
      this.comentario = "";
    },
    verComentarios() {
      if (!this.flagComment) {
        this.flagComment = true;
      } else {
        this.flagComment = false;
      }
    },
  },
};
</script>

<template>
  <div class="headerMessage flex items-center text-white">
    <div class="h-9 w-9 bg-white flex items-center justify-center rounded-full">
      <i class="fa-solid fa-user text-black"></i>
    </div>
    <router-link
      :to="'/perfil/' + message.usertag"
      class="pl-2 font-semibold text-lg"
      >{{ message.username }}</router-link
    >
    <router-link :to="'/perfil/' + message.usertag" class="pl-2 opacity-60"
      >@{{ message.usertag }}</router-link
    >
  </div>
  <div class="message pt-4 pb-4 px-2 text-white text-wrap">
    <p class="break-all">{{ message.content }}</p>
  </div>

  <div class="interaccion flex items-center">
    <div
      @click="like(message.id)"
      class="like flex items-center text-white/75 mr-4 text-lg cursor-pointer"
    >
      <i class="fa-regular fa-heart hover:bg-blue-700/50 rounded-full p-2"></i>
      <p>{{ message.likes }}</p>
    </div>
    <div
      class="like flex items-center text-white/75 mr-4 text-lg cursor-pointer"
      @click="verComentarios"
    >
      <i
        class="fa-regular fa-comment hover:bg-blue-700/50 rounded-full p-2"
      ></i>
      <p>{{ message.comentarios }}</p>
    </div>
  </div>
  <template v-if="flagComment">
    <div class="border-t mt-2 border-white/20">
      <h3 class="text-lg py-2 text-white">Comentarios:</h3>
      <div v-if="userLogged.id" class="border-b pt-2 pb-6 border-white/20">
        <form
          action="#"
          @submit.prevent="comentar()"
          class="flex items-center justify-between"
        >
          <label for="content" class="block w-full">
            <input
              type="text"
              name="content"
              v-model="comentario"
              class="w-[98%] py-1 rounded"
            />
          </label>
          <button
            type="submit"
            class="py-1 px-4 rounded bg-red-600 text-white ring-red-600 ring-offset-slate-900 ring hover:ring-offset-2 ring-offset-0 transition-all"
          >
            Comentar
          </button>
        </form>
      </div>
      <template v-if="comentarios.length !== 0">
        <div
          class="border border-white/20 p-2"
          v-for="(comentarios, index) in comentarios"
          :key="index"
        >
          <div>
            <div class="headerMessage flex items-center text-white">
              <div
                class="h-9 w-9 bg-white flex items-center justify-center rounded-full"
              >
                <i class="fa-solid fa-user text-black"></i>
              </div>
              <router-link
                :to="'/perfil/' + comentarios.usertag"
                class="pl-2 font-semibold text-lg"
                >@{{ comentarios.usertag }}</router-link
              >
            </div>
            <div class="message pt-4 pb-4 px-2 text-white text-wrap">
              <p class="break-all">{{ comentarios.comentario }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="text-white">Este post no tiene ningun comentario.</p>
      </template>
    </div>
  </template>
</template>
