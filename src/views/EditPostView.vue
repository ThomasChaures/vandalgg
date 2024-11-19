<script>
import { subscribeToAuth } from "@/service/auth";
import { editarChat, obtenerPost } from "@/service/chatGlobal";
import sButton from "@/components/slot/sButton.vue";
import SubmitPostLoaders from "@/components/Loaders/SubmitPostLoaders.vue";

let unsubscribeFromAuth = () => {};

export default {
  name: "EditPostView",
  components: { sButton, SubmitPostLoaders },
  data() {
    return {
      modalDelete: false,
      editLoader: false,
      blockCodeFlag: false,
      userLogged: {},
      post: {
        content: "",
        blockCode: "",
        lenguaje: "javascript",
        photo: "",
      },
    };
  },
  async mounted() {
    unsubscribeFromAuth = subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });

    const postId = this.$route.params.id;
    try {
      const postData = obtenerPost((data) => {
        this.post = data;
        if (data.blockCode) {
          this.blockCodeFlag = true;
        }
      }, postId);
    } catch (error) {
      console.error("Error al cargar el post:", error);
    }
  },
  unmounted() {
    unsubscribeFromAuth();
  },
  methods: {
    adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    async handleSubmit() {
      if (
        this.userLogged &&
        this.userLogged.id &&
        this.post.content.trim() !== ""
      ) {
        this.editLoader = true;

        try {
          await editarChat(
            this.$route.params.id,
            this.post.content,
            this.post.blockCode,
            true
          );

          this.editLoader = false;
          this.$router.push(`/perfil/${this.userLogged.usertag}`);
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
          this.editLoader = false;
        }
      }
    },
  },
};
</script>

<template>
  <section>
    <h2 class="sr-only">Editar Publicacion</h2>
    <div
      class="relative container p-5 pt-2 bg-slate-950 max-w-[600px] mx-auto rounded-xl mt-10 mb-5 pb-4 w-full"
    >
      <template v-if="editLoader">
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
          <textarea
            id="message"
            name="content"
            v-model="post.content"
            @input="adjustHeight"
            class="w-full text-2xl h-10 pl-[60px] bg-slate-950 resize-none rounded pt-2 outline-none text-white"
            placeholder="Edita tu post"
            style="overflow: hidden"
          ></textarea>
        </div>
        <div v-if="blockCodeFlag" class="animate__animated animate__fadeIn">
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
              <span class="ml-2 text-gray-400 text-sm"
                >{{ post.lenguaje }}.dev</span
              >
            </div>
            <label for="code" class="sr-only">Bloque de codigo</label>
            <textarea
              id="codigo"
              name="content"
              v-model="post.blockCode"
              @input="adjustHeight"
              class="w-full text-base bg-[#1e1e1e] resize-none rounded pt-2 p-2 outline-none text-white"
              placeholder=""
              style="overflow: hidden"
            >
            </textarea>
          </div>
        </div>
        <div
          v-if="post.photoChat"
          class="relative mt-5 overflow-hidden w-full max-h-full rounded-xl"
        >
          <img :src="post.photoChat" class="object-cover size-[100%]" alt="" />
        </div>
        <div class="flex justify-between w-full gap-x-3 pt-4 mt-2">
          <div
            class="w-full bg-red-500 rounded-md text-white text-lg flex items-center justify-center"
            @click="$router.go(-1)"
          >
            Cancelar
          </div>

          <sButton class="w-full"> Guardar Cambios </sButton>
        </div>
      </form>
    </div>
  </section>
</template>
