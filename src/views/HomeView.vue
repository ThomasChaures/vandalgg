<script>
import chatGlobalSection from '@/components/chatGlobal/chatGlobalSection.vue'

export default {
  name: 'HomeView',
  components: { chatGlobalSection }
}
</script>

<template>
  <div class="flex justify-between w-full min-h-screen">
    <div class="w-[600px] marker: border-l border-r border-white/20">
      <chatGlobalSection />
    </div>
  </div>
</template>
