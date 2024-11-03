<script>
import { busqueda } from "@/service/search";
import post from "@/components/chatGlobal/post.vue";
import sButton from "@/components/slot/sButton.vue";

export default {
  name: "SearchView",
  components: { post, sButton },
  data() {
    return {
      loader: true,
      search: "",
      busqueda: [],
      searchParam: this.$route.params.search,
    };
  },
  async mounted() {
    await this.buscador();
  },
  methods: {
    async buscador() {
      try {
        this.busqueda = await busqueda(this.searchParam, "chat", (search) => {
          this.busqueda = search;
        });
        this.loader = false;
      } catch (err) {
        this.loader = false;
        throw "No se pudo realizar la busqueda.";
      }
    },
  },
  watch: {
    "$route.params.search": function (newSearch) {
      this.searchParam = newSearch;
      this.buscador();
    },
  },
};
</script>

<template>
  <section v-if="loader">
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
        <div class="animate-spin rounded-full h-20 w-20 border-slate-900"></div>
      </div>
    </div>
  </section>
  <section v-else-if="!loader" class="mx-auto max-w-[600px]">
    <h2 class="sr-only">Buscador</h2>
    <div
      class=" py-1 mb-2 flex flex-col items-start gap-2 justify-start text-white pt-10 border-b border-white/10"
    >
      <div class="flex justify-end items-center mr-0 w-full h-20 bg-slate-950  px-4  rounded-xl mt-5 mb-5  max-w-[700px]">
        <form
          action="#"
          @submit.prevent="buscador(), this.$router.push(`/busqueda/${this.searchParam}`)"
          class="flex rounded-full items-center w-[100%] container h-[35px]"
        >
          <input
            type="text"
            v-model="searchParam"
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
    </div>

   
  </section>
  <section class="mx-auto max-w-[600px]">
    <h2 class="sr-only">Publicaciones encontradas</h2>
    <div
      class="flex items-center justify-center pt-20 text-white text-2xl"
      v-if="Array.isArray(busqueda) && busqueda.length === 0"
    >
      <p>No se encontraron resultados para la búsqueda.</p>
    </div>
    <div v-else>
      <div class="mt-5" v-for="(message, index) in busqueda" :key="index">
        <post :message="message" />
      </div>
    </div>
  </section>
</template>
