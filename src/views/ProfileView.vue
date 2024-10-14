<script>
import { subscribeToAuth } from "@/service/auth";
import { obtenerPostsDeUsuarioById } from "@/service/chatGlobal";
import chatList from "@/components/chatGlobal/chatList.vue";
import unranked from "@/assets/img/rangos/unranked.png";
import hierro from "@/assets/img/rangos/hierro.png";
import bronce from "@/assets/img/rangos/bronce.png";
import plata from "@/assets/img/rangos/plata.png";
import oro from "@/assets/img/rangos/oro.png";
import platino from "@/assets/img/rangos/platino.png";
import diamante from "@/assets/img/rangos/diamante.png";
import ascendant from "@/assets/img/rangos/ascendant.png";
import inmortal from "@/assets/img/rangos/inmortal.png";
import radiant from "@/assets/img/rangos/radiant.png";
import {
  darFollow,
  localizarLosDatosDelUsuarioLoggeadoByUsertag,
  checkFollow,
} from "@/service/users";

export default {
  name: "ProfileView",
  components: { chatList },
  data() {
    return {
      rangos: {
        unranked,
        hierro,
        bronce,
        plata,
        oro,
        platino,
        diamante,
        ascendant,
        inmortal,
        radiant,
      },
      myProfile: null,
      seguido: false,
      cargado: false,
      messages: [],
      userProfile: {},
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
      },
    };
  },
  watch: {
    "userLogged.email": {
      handler(newEmail) {
        if (newEmail) {
          this.loadData();
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
      console.log(this.userLogged);
      this.cargado = true;
    });
  },
  methods: {
    async loadData() {
      try {
        await localizarLosDatosDelUsuarioLoggeadoByUsertag(
          this.$route.params.usertag,
          (userData) => {
            this.userProfile = userData;
            console.log(this.userProfile);
          }
        );

        console.log(this.userProfile.id_m);
        console.log(this.userLogged.email);

        await obtenerPostsDeUsuarioById(
          this.$route.params.usertag,
          (messagees) => {
            this.messages = messagees;
          }
        );

        if (this.userLogged.email === this.userProfile.id_m) {
          console.log(this.userProfile.id_m);
          this.myProfile = true;
        } else {
          this.myProfile = false;
        }
        await this.checkFollowStatus();

        this.cargado = false;
      } catch (err) {
        console.log("Error al cargar los datos:", err);
      }
    },
    async seguir() {
      const estado = await darFollow(
        this.userLogged.email,
        this.userProfile.id_m
      );
      this.seguido = estado;
    },
    async checkFollowStatus() {
      this.seguido = await checkFollow(
        this.userLogged.email,
        this.userProfile.id_m
      );
    },
  },
};
</script>

<template>
  <div
    class="min-h-screen w-[600px] flex flex-col gap-2"
  >
    <template v-if="this.cargado">
      <div class="relative h-screen">
        <div
          class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            class="animate-spin rounded-full h-20 w-20 border-slate-900"
          ></div>
        </div>
      </div>
    </template>
    <template v-else>
      <section class="relative bg-white rounded shadow-sm min-h-[400px]">
        <div
          class="banner h-[200px] bg-black w-full object-contain border-b border-white/40"
        >
          <img
            src="../assets/img/banner-placeholder/banner-placeholder.jpeg"
            alt="Banner de usuario"
          />
        </div>
        <div
          class="img-perfil absolute top-[30%] left-[15%] transform -translate-x-1/2 bg-white w-[130px] h-[130px] flex items-center justify-center rounded-full"
        >
          <img :src="userProfile.photo" alt="foto" />
        </div>

        <div
          class="img-perfil absolute top-[70%] left-[85%] transform -translate-x-1/2 object-contain w-[90px] h-[90px] flex items-center flex-col justify-center rounded-full"
        >
          <img :src="rangos[userProfile.rango]" :alt="userProfile.rango" />

          <p class="text-white/50 pt-2">({{ userProfile.rango }})</p>
        </div>

        <template v-if="myProfile">
          <div
            class="follow-button absolute top-[52%] left-[65%] transform -translate-x-1/2"
          >
            <router-link
              :to="'/perfil/edit/' + this.userLogged.id"
              class="border transition-all hover:border-white hover:text-white  rounded flex items-center h-[30px] w-[100px] justify-center text-white bg-cyan-950"
            >
              Editar <i class="fa-solid fa-pen ml-4"></i>
            </router-link>
          </div>
          <div
            class="follow-button absolute top-[52%] left-[85%] transform -translate-x-1/2"
          >
            <router-link
              :to="'/perfil/edit/img/' + this.userLogged.id"
              class="border transition-all hover:border-white hover:text-white rounded flex items-center h-[30px] w-[130px] justify-center text-white bg-cyan-950"
            >
              Editar Foto <i class="fa-solid fa-image ml-4"></i>
            </router-link>
          </div>
        </template>

        <template v-if="!myProfile">
          <div
            class="follow-button absolute top-[52%] left-[85%] transform -translate-x-1/2"
          >
            <form action="#" @submit.prevent="seguir()">
              <template v-if="!seguido">
                <button
                  class="border transition-all hover:border-white hover:text-white  rounded flex items-center h-[30px] w-[100px] justify-center text-white bg-cyan-950"
                >
                  Seguir <i class="fa-solid fa-user-plus ml-4"></i>
                </button>
              </template>
              <template v-else>
                <button
                  class="border transition-all hover:border-white hover:text-white rounded flex items-center h-[30px] w-[160px] justify-center text-white bg-cyan-950"
                >
                  Dejar de seguir <i class="fa-solid fa-user-minus ml-4"></i>
                </button>
              </template>
            </form>
          </div>
        </template>

        <div class="data-name-user flex items-center pt-[110px] pl-[29px]">
          <p class="text-2xl mr-2 text-cyan-950 font-bold">
            {{ userProfile.username }}
          </p>
          <span class="text-xl text-cyan-950/50">•</span>
          <p class="ml-2 text-xl text-cyan-950/50 font-normal">
            @{{ userProfile.usertag }}
          </p>
        </div>

        <div class="data-name-user pt-[10px] pl-[29px] w-full text-wrap">
          <p class="mr-4 text-[1.1rem] text-cyan-950/40">Biografía:</p>
          <p class="mr-4 text-[1.1rem] text-cyan-950 break-all w-[60%]">
            {{ userProfile.description }}
          </p>
        </div>

        <div
          class="followers text-lg text-cyan-950 flex pt-[20px] pb-[16px] pl-[29px]"
        >
          <p class="mr-4">
            {{ userProfile.seguidores }}
            <span class="text-cyan-950/50">Seguidores</span>
          </p>
        </div>
      </section>

      <section>
        <chatList :messages="messages" />
      </section>
    </template>
  </div>
</template>
