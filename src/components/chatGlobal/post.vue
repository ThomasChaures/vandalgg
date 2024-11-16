<script>
import { subscribeToAuth } from "@/service/auth";
import { darLike, getComentariosDelPost } from "@/service/chatGlobal";
import sButton from "../slot/sButton.vue";
import blockCode from "./blockCode/blockCode.vue";
import comentario from "./comentarios/comentario.vue";
import formComentario from "./comentarios/formComentario.vue";
import eliminarMensaje from "@/service/chatGlobal";
import SubmitPostLoaders from "../Loaders/SubmitPostLoaders.vue";
let unsubscribeFromAuth = () => {};

export default {
  name: "post",
  components: {
    sButton,
    blockCode,
    comentario,
    formComentario,
    SubmitPostLoaders,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toolbar: false,
      flagComment: false,
      deleteLoader: false,
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
        photo: null,
      },
      isLiking: false, // Controla si el botón de like está habilitado o no
    };
  },
  async mounted() {
    unsubscribeFromAuth = subscribeToAuth(
      (newUserData) => (this.userLogged = newUserData)
    );
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
  methods: {
    like(id) {
      if (this.userLogged.id !== null && !this.isLiking) {
        this.isLiking = true;
        darLike(id, this.userLogged.id);
        setTimeout(() => {
          this.isLiking = false;
        }, 1000);
      }
    },
    async deleteChat() {
      if (!this.isLiking) {
        // Establecer estados iniciales
        this.deleteLoader = true;
        this.isLiking = true;
        this.toolbar = false;

        try {
          // Esperar a que la función eliminarMensaje termine
          console.log(this.message); // Para depuración, si es necesario
          await eliminarMensaje(this.message.id, this.userLogged.id);

          // Añadir un retraso mínimo de 1 segundo
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Redirigir después del retraso
          this.$router.push(`/`);
        } catch (error) {
          console.error("Error al eliminar el mensaje:", error);
        } finally {
          // Restablecer los estados
          this.deleteLoader = false;
          this.isLiking = false;
        }
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
  <div
    class="hover:bg-black/50 bg-slate-950 rounded-xl relative cursor-pointer mb-2 overflow-hidden p-4"
  >
    <template v-if="deleteLoader">
      <SubmitPostLoaders />
    </template>
    <div
      class="bg-slate-700 absolute animate__animated z-20 animate__fadeIn top-12 rounded-lg right-7 px-3 py-2"
      v-if="toolbar"
    >
      <ul class="flex flex-col gap-2 text-white">
        <li class="bg-slate-800 hover:bg-slate-950 transition-all rounded-md text-center px-2">Editar</li>
        <li
          class="bg-slate-800 hover:bg-slate-950 transition-all rounded-md text-center px-2"
          @click="deleteChat"
        >
          Eliminar
        </li>
      </ul>
    </div>

    <RouterLink
      class="z-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full"
      :to="'/publicacion/' + message.id"
    ></RouterLink>
    <div class="flex justify-between items-center pb-5 z-10">
      <div class="headerMessage flex items-center text-white">
        <!-- img -->
        <router-link :to="'/perfil/' + message.usertag">
          <div
            v-if="!message.photo"
            class="h-9 w-9 overflow-hidden relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full"
          >
            <i
              class="fa-solid absolute bottom-[-2px] text-[26px] fa-user text-gray-500"
            ></i>
          </div>
          <div
            class="h-9 w-9 overflow-hidden rounded-full relative bg-gray-200 border border-cyan-950 flex items-center justify-center"
            v-else
          >
            <img
              class="w-full h-full object-cover"
              :src="message.photo"
              alt="Foto de perfil"
            />
          </div>
        </router-link>

        <div class="flex items-center">
          <router-link
            :to="'/perfil/' + message.usertag"
            class="pl-3 z-10 font-semibold text-lg"
          >
            {{ message.username }}
          </router-link>
          <router-link
            :to="'/perfil/' + message.usertag"
            class="text-sm z-10 pl-2 opacity-60"
          >
            @{{ message.usertag }}
          </router-link>
        </div>
      </div>

      <div class="flex items-center">
        <div class="message text-sm z-10 px-2 text-white/50 text-wrap">
          <p class="break-all">{{ message.date }}</p>
        </div>
        <div
          id="toolbar"
          v-if="userLogged.id === message.user_id"
          @click="toolbar = !toolbar"
          class="toolbar z-20 hover:bg-slate-700/60 rounded-lg transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="message pt-4 ml-1 z-10 text-white pb-8 text-wrap">
      <p class="break-all">{{ message.content }}</p>
    </div>

    <template v-if="message.blockCode">
      <blockCode class="z-10" :message="message" />
    </template>

    <template v-if="message.photoChat">
      <div class="mb-4 rounded-xl w-full overflow-hidden">
        <img :src="message.photoChat" class="w-full object-cover" alt="" />
      </div>
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
        <div v-if="userLogged.id" class="pt-2 pb-2">
          <formComentario :id="message.id" />
        </div>
      </div>
    </template>
  </div>
</template>
