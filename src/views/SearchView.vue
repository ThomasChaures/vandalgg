<script>
import { busqueda } from "@/service/search";
import post from "@/components/chatGlobal/post.vue";

export default {
  name: "SearchView",
  components: { post },
  data() {
    return {
      loader: true,
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
        this.busqueda = await busqueda(this.searchParam, "chat");
        console.log(this.busqueda);
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
          <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="animate-spin rounded-full h-20 w-20  border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              class="animate-spin rounded-full h-20 w-20 border-slate-900"
            ></div>
          </div>
        </div>
  </section>
  <section v-else-if="!loader">
   <div class="px-2 py-4 mb-2 bg-white rounded-xl">
    <h2 class="text-center font-semibold text-2xl py-2 text-cyan-950">Resultados de busqueda</h2>
   </div>

    <div>
      <div v-for="(message, index) in busqueda" :key="index">
        <post :message="message" />
      </div>
    </div>
  </section>
</template>
