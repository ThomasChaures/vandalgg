<script>
import { subscribeToAuth } from "@/service/auth";
import {
  darLike,
  enviarComentarioAlPost,
  getComentariosDelPost,
} from "@/service/chatGlobal";
import sButton from "../slot/sButton.vue";

export default {
  name: "post",
  components: {sButton},
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
        description: "",
        seguidores: null,
        seguidores_cuentas: null,
        seguidos: null,
        seguidos_cuentas: null,
        rango: null,
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
          this.userLogged.username,
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
  <div class="bg-white p-4 border-b mb-2 rounded-xl">
    <div class="flex justify-between items-center">
      <div class="headerMessage flex items-center text-cyan-950">
        <!-- img -->
        <router-link :to="'/perfil/' + message.usertag">
          <div
            class="h-9 w-9 overflow-hidden relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full"
          >
            <i v-if="!message.photo" class="fa-solid absolute bottom-[-2px] text-[27px] fa-user text-gray-500"></i>
            <img
              v-else
              class="h-full w-full"
              :src="message.photo"
              alt="Foto de perfil"
            />
          </div>
        </router-link>

        <router-link
          :to="'/perfil/' + message.usertag"
          class="pl-3 font-semibold text-lg"
          >{{ message.username }}</router-link
        >
        <router-link :to="'/perfil/' + message.usertag" class="pl-2 opacity-60"
          >@{{ message.usertag }}</router-link
        >
      </div>

      <div class="message pt-4 pb-4 px-2 text-cyan-950/50 text-wrap">
        <p class="break-all">{{ message.date }}</p>
      </div>
    </div>

    <div class="message pt-4 pb-8 pl-[50px] px-2 text-cyan-950text-wrap">
      <p class="break-all">{{ message.content }}</p>
    </div>

    <div class="interaccion pl-[50px] flex items-center">
      <div
        @click="like(message.id)"
        class="like flex items-center  text-cyan-950/75 pr-2 text-lg cursor-pointer"
      >
        <div class="hover:bg-blue-700/50 rounded-full">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-5 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        </div>

        <p class="ml-1">{{ message.likes }}</p>
      </div>
      <div
        class="like flex items-center text-cyan-950/75 pl-2 text-lg cursor-pointer"
        @click="verComentarios"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-5 hover:bg-blue-700/50 rounded-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>

        <p class="ml-1">{{ message.comentarios }}</p>
      </div>
    </div>
    <template v-if="flagComment">
      <div class=" mt-2 rounded-xl">
       
        <div v-if="userLogged.id" class="border-b pt-2 pb-2 border-white/20">
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
                class="w-[98%] py-1 px-1 rounded"
              />
            </label>
             <sButton>Comentar</sButton>
          </form>
        </div>
        <template v-if="comentarios.length !== 0">
          <h3 class="text-lg text-cyan-950">Comentarios:</h3>
          <div
            class="border border-white/20 p-4 flex items-center justify-start"
            v-for="(comentarios, index) in comentarios"
            :key="index"
          >
         
            <div>
              <div class="headerMessage flex items-center text-cyan-950">
                <div
                  class="h-9 w-9 bg-white flex items-center justify-center rounded-full"
                >
                  <i class="fa-solid fa-user text-black"></i>
                </div>
                <router-link
                  :to="'/perfil/' + comentarios.usertag"
                  class="pl-2 font-semibold text-lg"
                  >@{{ comentarios.username }}</router-link
                >
                <router-link
                  :to="'/perfil/' + comentarios.usertag"
                  class="pl-2 font-semibold text-white/60"
                  >@{{ comentarios.usertag }}</router-link
                >
              </div>
              <div class="message pt-4 pb-4 text-white text-wrap">
                <p class="break-all">{{ comentarios.comentario }}</p>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="text-cyan-950">Este post no tiene ningún comentario.</p>
        </template>
      </div>
    </template>
  </div>
</template>
