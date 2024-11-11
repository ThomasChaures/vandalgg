<script>
import { subscribeToAuth } from "@/service/auth";
import ProfileLoaders from "../Loaders/ProfileLoaders.vue";
let unsubscribeFromAuth = () => {};

export default {
  name: "MiniProfile",
  components: { ProfileLoaders },
  data() {
    return {
      loader: false,
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
    unsubscribeFromAuth = subscribeToAuth((data) => {
      this.userLogged = data;
      this.loader = true;
    });
  },
  async unmounted() {
    unsubscribeFromAuth();
  },
};
</script>

<template>
  <aside
    v-if="loader"
    class="bg-slate-950 relative mt-[40px] max-w-[250px] overflow-hidden rounded-xl"
  >
    <router-link :to="'/perfil/' + userLogged.usertag">
      <!-- banner -->

      <div class="max-h-[100px] overflow-hidden">
        <img
          src="../../assets/img/banner-placeholder/banner-placeholder.jpeg"
          alt="Banner"
        />
      </div>

      <!-- Foto -->

      <div
        v-if="!userLogged.photo"
        class="img-perfil absolute top-[15%] left-[50%] transform -translate-x-1/2 bg-gray-200 w-[100px] h-[100px] flex items-center justify-center rounded-full overflow-hidden"
      >
        <i
          class="fa-solid absolute bottom-[-2px] text-[87px] fa-user text-gray-500"
        ></i>
      </div>
      <div
        class="img-perfil absolute top-[15%] left-[50%] object-contain transform -translate-x-1/2 bg-gray-200 w-[100px] h-[100px] flex items-center justify-center rounded-full overflow-hidden"
        v-else
      >
        <img
          class="w-full h-full object-cover"
          :src="userLogged.photo"
          alt="Foto de perfil"
        />
      </div>

      <div
        class="pt-[60px] pb-5 w-full flex flex-col justify-center items-center"
      >
        <div class="flex items-center gap-2">
          <p class="text-white text-2xl font-semibold first-letter:uppercase">
            {{ userLogged.username }}
          </p>
        </div>
        <p class="text-white/70 text-xl">{{ userLogged.rango }}</p>
      </div>

      <div
        class="pt-[20px] pb-4 border-t border-white/20 w-full flex gap-4 justify-center items-center"
      >
        <p class="text-white">
          {{ userLogged.seguidores }}
          <span class="text-white/70">Seguidores</span>
        </p>
        <p class="text-white">
          {{ userLogged.seguidos }} <span class="text-white/70">Seguidos</span>
        </p>
      </div>
    </router-link>
  </aside>
  <div v-else>
    <ProfileLoaders />
  </div>
</template>
