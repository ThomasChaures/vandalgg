<script>
import { subscribeToAuth } from '@/service/auth';
export default {
  name: "AppSearch",
  data() {
    return {
      busqueda: "",
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
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
  methods: {
    async buscar() {
      this.$router.push(`/busqueda/${this.busqueda}`);
    },
   
  },
};
</script>

<template>
  <div v-if="userLogged?.id" class="flex fixed top-[145px] right-[300px] w-full max-w-[260px] ml-6 max-[1820px]:right-[200px] max-[1600px]:right-[100px]  max-[1380px]:right-[0px] max-[1380px]:pr-[20px] max-[1160px]:hidden">
    <form
      action="#"
      @submit.prevent="buscar()"
      class="flex rounded-full items-center container h-[35px]"
    >
      <input
        type="text"
        v-model="busqueda"
        placeholder="Buscar..."
        class="px-2 bg-white/10 text-white rounded-bl-xl block w-full outline-none rounded-tl-xl border border-cyan-950 h-[100%]"
      />
      <button
        class="rounded-br-xl rounded-tr-xl bg-cyan-950 hover:bg-cyan-700 flex text-base justify-center items-center h-full px-2 ring-cyan-950/0 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>
