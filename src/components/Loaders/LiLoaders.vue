<script>
export default{
    name: 'LiLoaders'
}
</script>

<template>
    <li class="text-white flex  w-full items-center gap-2 animate-pulse">
  <div class="flex items-center rounded-xl w-full bg-cyan-950/50 px-1 py-1 gap-2">
    <!-- Esqueleto de la imagen de perfil -->
    <div class="bg-gray-700 w-[35px] h-[35px] flex items-center justify-center rounded-full overflow-hidden"></div>

    <!-- Esqueleto del nombre de usuario -->
    <div class="block h-4 bg-gray-700 w-full rounded ml-1"></div>
    
  </div>
</li>
</template>