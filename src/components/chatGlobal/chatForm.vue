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
      flagBlockCode: false,
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
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
  methods: {
    adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
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
          blockCode: this.newMessage.blockCode || "",
          lenguaje: this.newMessage.lenguaje,
          photo: this.userLogged.photo,
          date: this.formaterData(new Date()),
        });
        this.newMessage.content = "";
        this.newMessage.blockCode = "";
      }
    },
  },
};
</script>

<template>
  <div class="container p-5 pt-2 bg-slate-950 rounded-xl mt-10 mb-10 pb-4 w-full">
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
              class="h-full w-full"
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
          <label for="code" class="sr-only">Code</label>
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
