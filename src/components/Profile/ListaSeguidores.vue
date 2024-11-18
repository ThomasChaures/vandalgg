<script>
export default {
    name: 'ListaSeguidores',
    props: {
        seguidores: {
            type: Array,
            required: true
        },
        type:{
          type: String,
          required: true
        }
    }
}
</script>

<template>
    <div class="rounded-xl ">
      <!-- Botón de Cerrar -->
      <div
        @click="$emit('close-modal')"
        aria-label="Close"
        class="absolute bg-white w-10 z-50 top-[-15px] hover:bg-red-500 hover:text-white transition-all cursor-pointer right-[-15px] rounded-full flex justify-center items-center text-3xl h-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      
      <!-- Título -->
      <p class="py-3 border-b border-white/20 px-10 font-semibold text-center text-xl text-white">{{ type }}</p>
      
      <!-- Lista de Seguidores -->
      <ul class="mt-4 px-10 flex flex-col gap-2">
        <li v-for="seguidor in seguidores" :key="seguidor.id" class="hover:bg-slate-800 px-2 py-2 rounded-xl">
          <router-link :to="'/perfil/' + seguidor.usertag">
            <div class="flex items-center">
              <div class="img-perfil bg-gray-200 w-[30px] h-[30px] flex items-center justify-center rounded-full overflow-hidden mr-2">
                <img v-if="seguidor.photo" :src="seguidor.photo" alt="Foto de perfil" class="w-full h-full object-cover" />
                <i v-else class="fa-solid fa-user text-gray-500"></i>
              </div>
              <p class="text-white">@{{ seguidor.usertag }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </template>