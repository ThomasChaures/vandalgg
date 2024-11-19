<script>
import chatGlobalSection from "@/components/chatGlobal/chatGlobalSection.vue";
import MiniProfile from "@/components/Profile/MiniProfile.vue";
import RandomUsers from "@/components/UsuariosRecomendados/RandomUsers.vue";
import MessageList from "@/components/chatPrivate/MessageList.vue";

export default {
  name: "HomeView",
  components: { chatGlobalSection, MiniProfile, RandomUsers, MessageList },
};
</script>

<template>
  <div class="flex w-full">
    <div class="w-full justify-between max-xl:flex-col flex items-start">
      <MiniProfile class="max-xl:hidden" />
      <chatGlobalSection />
      <RandomUsers />
    </div>
  </div>
</template>
