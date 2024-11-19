<script>


export default {
  name: "MessageList",
  data() {
    return {
      chats: [],
    };
  },

};
</script>
<!-- 
<template>

  <div
    class="bg-slate-950 max-w-[330px] w-full overflow-hidden px-5 py-5 rounded-xl"
  >
    <p class="text-white font-semibold">Mensajes</p>
    <ul class="mt-6">
      <li
        class="text-white flex items-center gap-4 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-al"
        v-for="(chat, index) in chats"
        :key="index"
      >
        <RouterLink :to="`/mensajes/${chat.nombre}`">
            {{ chat.nombre }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template> -->

<!-- Componente para mas adelante -->