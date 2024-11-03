<script>
import chatGlobalSection from '@/components/chatGlobal/chatGlobalSection.vue'
import MiniProfile from '@/components/Profile/MiniProfile.vue';

export default {
  name: 'HomeView',
  components: { chatGlobalSection, MiniProfile }
}
</script>

<template>
  <div class="flex w-full">
      <MiniProfile/>
    <div class="w-full max-w-[600px]">
      <chatGlobalSection class="ml-8" />
    </div>
  </div>
</template>
