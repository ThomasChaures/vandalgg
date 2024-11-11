<script>
export default {
  name: "PostLoader",
};
</script>

<template>
  <div
    class="hover:bg-black/50 animate-pulse bg-slate-950 h-[250px] w-[98%] mx-auto rounded-xl relative cursor-pointer mb-2 overflow-hidden p-4"
  >
    <div class="flex justify-between items-center pb-5 z-10">
      <div class="headerMessage flex items-center text-white">
        <!-- Esqueleto de la imagen de perfil -->
        <div
          class="h-9 w-9 overflow-hidden bg-gray-700 rounded-full flex-shrink-0"
        ></div>

        <!-- Esqueleto del nombre y detalles -->
        <div class="pl-3 flex flex-col">
          <div class="w-24 h-4 bg-gray-700 rounded mb-1"></div>
          <div class="w-16 h-3 bg-gray-600 rounded opacity-60"></div>
        </div>
      </div>
    </div>

    <!-- Esqueleto del mensaje -->
    <div class="message w-full h-20 bg-gray-700 rounded mb-4"></div>

    <!-- Pie o texto adicional -->
    <div class="w-16 h-4 bg-gray-600 rounded ml-1"></div>
  </div>
</template>

