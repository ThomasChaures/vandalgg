<script>
import chatGlobalSection from '@/components/chatGlobal/chatGlobalSection.vue'
import ResuemenPerfil from '@/components/User/resuemenPerfil.vue'
export default {
  name: 'HomeView',
  components: { chatGlobalSection, ResuemenPerfil }
}
</script>

<template>
  <div class="flex justify-between w-full min-h-screen">
    <div class="w-[600px] marker: border-l border-r border-white/40">
      <chatGlobalSection />
    </div>
  </div>
</template>
