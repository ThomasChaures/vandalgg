<script>
import { subscribeToAuth } from "@/service/auth";
import { addPhotoToChat } from "@/service/chatGlobal";
import sButton from "../slot/sButton.vue";
import { enviarMensajeAfirebase } from "@/service/chatGlobal";
import SubmitPostLoaders from "../Loaders/SubmitPostLoaders.vue";
let unsubscribeFromAuth = () => {};

export default {
  name: "chatForm",
  components: { sButton, SubmitPostLoaders },
  data() {
    return {
      modalDelete: false,
      loaderSubmit: false,
      message: {},
      fecha: "",
      flagBlockCode: false,
      photoChat: "",
      photoPreview: "",
      newMessage: {
        content: "",
        blockCode: "",
        lenguaje: "javascript",
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
    unsubscribeFromAuth = subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
  methods: {
    deleteImage() {
      this.photoPreview = "";
      this.photoChat = "";
    },
    adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    sendMessage(newMessage) {
      enviarMensajeAfirebase(newMessage);
    },
    formaterData(data) {
      const formater = new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return formater.format(data).replace(",", "");
    },
    async handleFileSelection(e) {
      this.photoChat = e.target.files[0]; // El archivo seleccionado
      if (!this.photoChat) {
        console.error("No se ha seleccionado ningún archivo.");
        return;
      }
      // Crear la previsualización de la imagen
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.photoPreview = reader.result; // Almacena el resultado para previsualización
      });

      reader.readAsDataURL(this.photoChat); // Lee el archivo seleccionado para generar previsualización
    },
    async handleSubmit() {
      if (
        this.userLogged &&
        this.userLogged.id &&
        this.newMessage.content.trim() !== ""
      ) {
        this.loaderSubmit = true;
        this.message = {
          user_id: this.userLogged.id,
          email: this.userLogged.email,
          username: this.userLogged.username,
          usertag: this.userLogged.usertag,
          content: this.newMessage.content,
          blockCode: this.newMessage.blockCode || "",
          lenguaje: this.newMessage.lenguaje,
          photo: this.userLogged.photo,
          date: this.formaterData(new Date()),
          photoChat: "",
        };
        this.newMessage.content = "";
        this.newMessage.blockCode = "";
        let chatId = await enviarMensajeAfirebase(this.message);
        if (this.photoChat) {
          await addPhotoToChat(this.photoChat, chatId, this.userLogged.id);
        }
        this.deleteImage();
        this.loaderSubmit = false;
      }
    },
  },
};
</script>

<template>
  <div
    class="relative container p-5 pt-2 bg-slate-950 rounded-xl mt-10 mb-5 pb-4 w-full"
  >
    <template v-if="loaderSubmit">
      <SubmitPostLoaders />
    </template>
    <form action="#" @submit.prevent="handleSubmit()" class="bg-slate-950">
      <div class="mb-1 mt-3 relative">
        <div class="absolute">
          <div
            v-if="!userLogged.photo"
            class="h-12 w-12 mr-[15px] relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full overflow-hidden"
          >
            <i
              class="fa-solid fa-user absolute bottom-[-3px] text-gray-500 text-[36px]"
            ></i>
          </div>

          <div
            class="h-12 w-12 mr-[15px] object-contain overflow-hidden relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full"
            v-else
          >
            <img
              class="w-full h-full object-cover"
              :src="userLogged.photo"
              alt="Foto de perfil"
            />
          </div>
        </div>
        <label for="message" class="sr-only">Mensaje</label>
        <textarea
          id="message"
          name="content"
          v-model="newMessage.content"
          @input="adjustHeight"
          class="w-full text-2xl h-10 pl-[60px] bg-slate-950 resize-none rounded pt-2 outline-none text-white"
          placeholder="Que programaste hoy?"
          style="overflow: hidden"
        ></textarea>
      </div>
      <div
        v-if="flagBlockCode === true"
        class="animate__animated animate__fadeIn"
      >
        <div
          class="bg-[#1e1e1e] mt-[20px] rounded-lg shadow-xl overflow-hidden"
        >
          <div
            class="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between space-x-2"
          >
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span class="ml-2 text-gray-400 text-sm">untitled.dev</span>
          </div>
          <label for="code" class="sr-only">Bloque de codigo</label>
          <textarea
            id="codigo"
            name="content"
            v-model="newMessage.blockCode"
            @input="adjustHeight"
            class="w-full text-base bg-[#1e1e1e] resize-none rounded pt-2 p-2 outline-none text-white"
            placeholder=""
            style="overflow: hidden"
          >
          </textarea>
        </div>
      </div>

      <div
        v-if="photoPreview"
        @mouseleave="modalDelete = false"
        @mouseenter="modalDelete = true"
        class="relative mt-5 overflow-hidden w-full max-h-full rounded-xl"
      >
        <div
          v-if="modalDelete"
          class="absolute duration-150 animate__animated animate__fadeIn bg-slate-800/70 w-full h-full flex items-center justify-center"
        >
          <button @click="deleteImage"
            class="flex items-center bg-red-500 text-white px-4 py-4 rounded-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <p>Eliminar</p>
          </button>
        </div>
        <img :src="photoPreview" class="object-cover size-[100%]" alt="" />
      </div>
      <div class="items-center flex justify-between pt-4 mt-2">
        <div class="flex items-center gap-3">
          <div
            id="quoteCode"
            class="hover:bg-blue-700/50 w-7 rounded-full cursor-pointer"
            @click="flagBlockCode = !flagBlockCode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
          </div>

          <label for="lenguaje" class="sr-only">Lenguaje</label>
          <select
            v-if="flagBlockCode"
            name="lenguaje"
            v-model="newMessage.lenguaje"
            class="p-1 cursor-pointer animate__animated animate__fadeIn rounded-full bg-cyan-950 text-white"
          >
            <option value="javascript" selected>JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="typescript">TypeScript</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
          </select>

          <div>
            <label for="image">
              <div class="hover:bg-blue-700/50 w-7 rounded-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-7 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            </label>

            <input
              class="hidden"
              type="file"
              name="image"
              id="image"
              @change="handleFileSelection"
              accept="image/*"
            />
          </div>
        </div>
        <sButton
          :disabled="newMessage.content === ''"
          :class="{
            '!bg-cyan-700 !cursor-not-allowed': newMessage.content === '',
          }"
        >
          Publicar
        </sButton>
      </div>
    </form>
  </div>
</template>
