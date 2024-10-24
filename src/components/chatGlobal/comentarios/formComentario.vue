<script>
import sButton from "@/components/slot/sButton.vue";
import { subscribeToAuth } from "@/service/auth";
import { enviarComentarioAlPost } from "@/service/chatGlobal";

export default {
  name: "formComentario",
  components: { sButton },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userLogged: {}, 
      comentario: "",
    };
  },

  mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
  methods: {
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
    comentar() {
      let date = this.formaterData(new Date());
      if (
        this.userLogged &&
        this.userLogged.id &&
        this.comentario.trim() !== ""
      ) {
        enviarComentarioAlPost(
          this.comentario,
          this.userLogged.usertag,
          this.userLogged.username,
          this.id,
          date,
          this.userLogged.photo
        );
        this.comentario = "";
      }
    },
  },
};
</script>

<template>
  <form
    action="#"
    @submit.prevent="comentar()"
    class="flex items-center justify-between animate__animated animate__fadeIn"
  >
    <label for="content" class="block w-full">
      <input
        type="text"
        name="content"
        v-model="comentario"
        class="w-full px-2 bg-white/10 text-white rounded-bl-xl block outline-none rounded-tl-xl border-[2px] border-cyan-950"
      />
    </label>
    <sButton class="!py-1 rounded-tr-xl text-sm  rounded-tl-none  rounded-bl-none rounded-br-xl">Comentar</sButton>
  </form>
</template>
