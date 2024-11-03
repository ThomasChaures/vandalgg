<script>
import { subscribeToAuth } from "@/service/auth";

export default {
  name: "MiniProfile",
  data() {
    return {
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
    subscribeToAuth((data) => (this.userLogged = data));
  },
};
</script>

<template>
  <aside
    class="bg-slate-950 relative max-h-[330px] mt-[40px] max-w-[300px] overflow-hidden rounded-xl"
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
        class="img-perfil absolute top-[35%] left-[50%] transform -translate-x-1/2 bg-gray-200 w-[130px] h-[130px] flex items-center justify-center rounded-full overflow-hidden"
      >
        <i
          class="fa-solid absolute bottom-[-2px] text-[106px] fa-user text-gray-500"
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
        class="pt-[70px] pb-5 w-full flex flex-col justify-center items-center"
      >
        <p class="text-white text-2xl font-semibold first-letter:uppercase">
          {{ userLogged.username }}
        </p>
        <p class="text-white/70">@{{ userLogged.usertag }}</p>
        <p class="text-white/70">{{ userLogged.rango }}</p>
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
</template>
