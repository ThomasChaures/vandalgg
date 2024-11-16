<script>
import chatGlobalSection from '@/components/chatGlobal/chatGlobalSection.vue'
import MiniProfile from '@/components/Profile/MiniProfile.vue';
import RandomUsers from '@/components/UsuariosRecomendados/RandomUsers.vue';

export default {
  name: 'HomeView',
  components: { chatGlobalSection, MiniProfile, RandomUsers },
  data(){
    return{
        usertag: ''
    }
  },
  mounted(){
    let local = localStorage.getItem('user')
    let usuario = JSON.parse(local)
    this.usertag = usuario.usertag
    console.log(this.usertag)
  }
}
</script>

<template>
  <div class="flex w-full">

    <div class="w-full justify-between max-xl:flex-col flex items-start ">
      <MiniProfile class="max-xl:hidden" />
      <chatGlobalSection/>
      <RandomUsers :usertag="usertag"/>
    </div>
      
  </div>
</template>
