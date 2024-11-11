<script>
export default{
    name: 'ProfileLoaders'
}
</script>

<template>
    <aside class="bg-slate-950 relative mt-[40px] h-[300px] w-[250px] overflow-hidden rounded-xl animate-pulse">
      <!-- Banner de carga -->
      <div class="max-h-[100px] bg-gray-700"></div>
  
      <!-- Esqueleto de la foto de perfil -->
      <div class="img-perfil absolute top-[10%] left-[50%] transform -translate-x-1/2 bg-gray-700 w-[100px] h-[100px] flex items-center justify-center rounded-full overflow-hidden"></div>
  
      <!-- Esqueleto del nombre y rango de usuario -->
      <div class="mt-[160px] pb-5 w-full flex flex-col justify-center items-center">
        <div class="w-3/4 h-6 bg-gray-700 rounded mb-2"></div>
        <div class="w-1/2 h-5 bg-gray-600 rounded"></div>
      </div>
  
      <!-- Esqueleto de seguidores y seguidos -->
      <div class="pt-[20px] pb-4 border-t border-white/20 w-full flex gap-4 justify-center items-center">
        <div class="w-16 h-5 bg-gray-700 rounded"></div>
        <div class="w-16 h-5 bg-gray-700 rounded"></div>
      </div>
    </aside>
  </template>
  