<script>
import { subscribeToAuth } from '@/service/auth';
export default {
  name: "EditProfileView",
  data() {
    return {
      paramId: '',
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
      },
    }
  },
    mounted() {
    subscribeToAuth((newUserData) => (this.userLogged = newUserData))

    if(this.userLogged.id !== this.$route.params.id){
        this.$router.push('/')
    }
  },
  
}
</script>

<template>
 <div class="flex justify-between w-full min-h-screen">
    <div class="w-[600px] marker: border-l border-r border-white/40">
        <div class="w-full flex item-center justify-center border-t border-b border-white/40">
        <h2 class="font-semibold text-2xl py-2 text-white">Editar  Perfil</h2>

        
      </div>
    </div>
  </div>
</template>
