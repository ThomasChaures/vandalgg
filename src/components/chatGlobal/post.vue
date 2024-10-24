<script>
import { subscribeToAuth } from "@/service/auth";
import {
  darLike,
  getComentariosDelPost,
} from "@/service/chatGlobal";
import sButton from "../slot/sButton.vue";
import blockCode from "./blockCode/blockCode.vue";
import comentario from "./comentarios/comentario.vue";
import formComentario from "./comentarios/formComentario.vue";

export default {
  name: "post",
  components: { sButton, blockCode, comentario, formComentario },
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
        photo: null
      },
    };
  },
  async mounted() {
    subscribeToAuth((newUserData) => (this.userLogged = newUserData));
  },
  methods: {
    like(id) {
      if (this.userLogged.id !== null) {
        darLike(id, this.userLogged.id);
      }
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

    <div class="hover:bg-black/50 relative cursor-pointer overflow-hidden p-4 border-b border-white/10">
      <RouterLink class="z-0 absolute top-1/2 left-1/2 translate-x-[-50%]   translate-y-[-50%]  w-full h-full" :to="'/publicacion/' + message.id">
      </RouterLink>
    <div class="flex justify-between items-center z-10">
      <div class="headerMessage flex items-center text-white">
        <!-- img -->
        <router-link :to="'/perfil/' + message.usertag">
          <div v-if="!message.photo"
            class="h-9 w-9 overflow-hidden relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full"
          >
            <i
              
              class="fa-solid absolute bottom-[-2px] text-[26px] fa-user text-gray-500"
            ></i>
            </div>
            <div class="h-9 w-9 overflow-hidden relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full" v-else>
            <img
              
              class="h-full w-full"
              :src="message.photo"
              alt="Foto de perfil"
            />
            </div>
        </router-link>

        <router-link
          :to="'/perfil/' + message.usertag"
          class="pl-3 z-10 font-semibold text-lg"
          >{{ message.username }}</router-link
        >
        <router-link :to="'/perfil/' + message.usertag" class=" z-10 pl-2 opacity-60"
          >@{{ message.usertag }}</router-link
        >
      </div>

      <div class="message pt-4 z-10 pb-4 px-2 text-white/50 text-wrap">
        <p class="break-all">{{ message.date }}</p>
      </div>
    </div>

    <div class="message pt-4 z-10 text-white pb-8  text-wrap">
      <p class="break-all">{{ message.content }}</p>
    </div>

    <template v-if="message.blockCode">
      <blockCode class="z-10" :message="message" />
    </template>

    <div class="interaccion z-20 flex items-center">
      <div
        @click="like(message.id)"
        class="like z-20 flex items-center text-white/70 pr-2 text-lg cursor-pointer"
      >
        <div class="hover:bg-blue-700/50 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5"
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
        class="like z-20 flex items-center text-white/70 pr-2 pl-2 text-lg cursor-pointer"
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
      <div class="mt-2 rounded-xl">
        <div v-if="userLogged.id" class=" pt-2 pb-2">
            <formComentario :id="message.id" />
        </div>
      </div>
    </template>
  </div>
  
</template>
