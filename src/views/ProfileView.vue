<script>
import { subscribeToAuth } from "@/service/auth";
import { obtenerPostsDeUsuarioById } from "@/service/chatGlobal";
import chatList from "@/components/chatGlobal/chatList.vue";
import { localizarLosDatosDelUsuarioLoggeadoByUsertag } from "@/service/users";

export default {
  name: "ProfileView",
  components: { chatList },
  data() {
    return {
      myProfile: null,
      seguido: null,
      messages: [],
      userProfile: {},
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        desciption: "",
      },
    };
  },
  async mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });

    try {
      await localizarLosDatosDelUsuarioLoggeadoByUsertag(
        this.$route.params.usertag,
        (userData) => {
          this.userProfile = userData;
        }
      );

      console.log(this.userProfile.id_m)

      await obtenerPostsDeUsuarioById(
        this.$route.params.usertag,
        (messagees) => {
          this.messages = messagees
        }
      )

      if (this.userLogged.email === this.userProfile.id_m) {
        console.log(this.userProfile.id_m)
        this.myProfile = true
      } else {
        this.myProfile = false
      }
    } catch (err) {
      console.log("Error al cargar los datos:", err)
    }
  },
};
</script>

<template>
  <div
    class="min-h-screen w-[600px] border-l border-r border-white/40 flex flex-col gap-2"
  >
    <section class="relative min-h-[400px]">
      <div class="banner h-[200px] bg-black w-full object-contain border-b border-white/40">
          <img src="../assets/img/banner-placeholder/banner-placeholder.jpeg" alt="Banner de usuario">
      </div>
      <div
        class="img-perfil absolute top-[32%] left-[15%] transform -translate-x-1/2 bg-white w-[130px] h-[130px] flex items-center justify-center rounded-full"
      >
        <!-- <img src="" alt=""> -->
        <i class="fa-solid fa-user text-[3rem]"></i>
      </div>

      <template v-if="myProfile">
        <div
          class="follow-button absolute top-[53.8%] left-[85%] transform -translate-x-1/2"
        >
          <router-link
            :to="'/perfil/edit/' + this.userLogged.id"
            class="border transition-all hover:border-white hover:text-white border-white/50 rounded flex items-center h-[30px] w-[100px] justify-center text-white/50"
          >
            Editar <i class="fa-solid fa-pen ml-4"></i>
          </router-link>
        </div>
      </template>

      <div class="data-name-user flex items-center pt-[70px] pl-[29px]">
        <p class="text-2xl mr-2 text-white font-bold">{{ userProfile.username }}</p>
        <span class="text-xl text-white/50">•</span>
        <p class=" ml-2 text-xl text-white/50 font-normal">
          @{{ userProfile.usertag }}
        </p>
      </div>

      <div class="data-name-user pt-[10px] pl-[29px] text-wrap">
        <p class="mr-4 text-[1.1rem] text-white/40">  Biografia: </p>
        <p class="mr-4 text-[1.1rem] text-white break-all">
         {{ userProfile.description }}
        </p>
      </div>
    </section>

    <section class="border-t border-white/40">
      <chatList :messages="messages" />
    </section>
  </div>
</template>
