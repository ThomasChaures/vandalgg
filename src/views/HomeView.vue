<script>
import chatGlobalSection from '@/components/chatGlobal/chatGlobalSection.vue'

export default {
  name: 'HomeView',
  components: { chatGlobalSection }
}
</script>

<template>
  <div class="flex justify-between w-full">
    <div class="w-full">
      <chatGlobalSection />
    </div>
  </div>
</template>
