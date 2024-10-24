<script>
export default {
  name: "comentario",
  props: {
    comentario: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
    <div class="hover:bg-black/50 relative w-full ">
      <div class="linia absolute  bg-white/20 h-full w-[1px] mt-4 mb-4 top-[20px] left-8"></div>
      <div class="headerMessage  p-4 w-full flex justify-between items-center text-cyan-950">

        <div class="flex items-center">
            <div v-if="!comentario.foto"
            class="h-9 w-9 overflow-hidden relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full"
          >
            <i
              
              class="fa-solid absolute bottom-[-2px] text-[26px] fa-user text-gray-500"
            ></i>
            </div>
            <div class="h-9 w-9 overflow-hidden relative bg-gray-200 border border-cyan-950 flex items-center justify-center rounded-full" v-else>
            <img
              
              class="h-full w-full"
              :src="comentario.foto"
              alt="Foto de perfil"
            />
            </div>
        
        
         
          <router-link :to="'/perfil/' + comentario.usertag" class="pl-3 font-semibold text-lg text-white" aria-label="Perfil de usuario">
            @{{ comentario.username }}
          </router-link>
          <router-link :to="'/perfil/' + comentario.usertag" class="pl-2 opacity-60 text-white" aria-label="Tag de usuario">
            @{{ comentario.usertag }}
          </router-link>
        </div>
        <div class="message pt-4 pb-4 px-2 text-white/50 text-wrap">
          <p class="break-all">{{ comentario.fecha }}</p>
        </div>
      </div>
      <div class="message pt-4 max-w-[550px] pl-[66px] pb-4 text-white text-wrap">
        <p class="break-all">{{ comentario.comentario }}</p>
      </div>
    </div>
  </template>
