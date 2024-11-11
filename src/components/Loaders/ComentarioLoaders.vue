<script>
export default{
    name: 'ComentarioLoaders'
}
</script>

<template>
    <div class="hover:bg-black/50 bg-slate-950 mb-4 rounded-xl relative  w-[98%] mx-auto animate-pulse">
      <!-- Línea decorativa vertical -->
      <div class="linia absolute z-40 bg-white/10 h-full w-[1px] top-5 left-8"></div>
  
      <!-- Encabezado con imagen y detalles del usuario -->
      <div class="headerMessage p-4 w-full flex justify-between items-center text-cyan-950">
        <div class="flex items-center">
          <!-- Imagen de perfil (esqueleto redondo) -->
          <div class="h-9 w-9 z-50 bg-gray-700 border border-cyan-950 flex items-center justify-center rounded-full"></div>
  
          <!-- Esqueleto de nombre y tag -->
          <div class="pl-3 flex flex-col">
            <div class="w-24 h-4 bg-gray-700 rounded mb-1"></div>
            <div class="w-16 h-3 bg-gray-600 rounded opacity-60"></div>
          </div>
        </div>
  
        <!-- Esqueleto de la fecha -->
        <div class="w-20 h-4 bg-gray-600 rounded"></div>
      </div>
  
      <!-- Esqueleto del contenido del comentario -->
      <div class="pt-2 max-w-[550px] pl-[66px] pb-4 text-white">
        <div class="w-full h-4 bg-gray-700 rounded mb-2"></div>
        <div class="w-5/6 h-4 bg-gray-700 rounded mb-2"></div>
        <div class="w-4/6 h-4 bg-gray-700 rounded"></div>
      </div>
    </div>
  </template>
  