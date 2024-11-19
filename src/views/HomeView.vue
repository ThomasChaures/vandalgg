<script>
import ChatGlobalSection from "@/components/chatGlobal/ChatGlobalSection.vue";
import MiniProfile from "@/components/Profile/MiniProfile.vue";
import RandomUsers from "@/components/UsuariosRecomendados/RandomUsers.vue";
import MessageList from "@/components/chatPrivate/MessageList.vue";

export default {
  name: "HomeView",
  components: { ChatGlobalSection, MiniProfile, RandomUsers, MessageList },
};
</script>

<template>
  <div class="flex w-full">
    <div class="w-full justify-between mx-auto max-xl:flex-col flex items-start">
      <MiniProfile class="max-xl:hidden" />
      <ChatGlobalSection />
      <RandomUsers  class="max-xl:hidden" />
    </div>
  </div>
</template>
