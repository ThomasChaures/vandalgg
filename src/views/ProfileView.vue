<script>
import { subscribeToAuth } from '@/service/auth';
import { obtenerPostsDeUsuarioById } from '@/service/chatGlobal';
import chatList from '@/components/chatGlobal/chatList.vue';
import { checkFollow, darFollow, localizarLosDatosDelUsuarioLoggeadoByUsertag } from '@/service/users';


export default{
    name: 'ProfileView',
    components: {chatList},
    data(){
        return{
           myProfile: null,
           seguido: null,
           messages: [],
           userProfile: {},
           userLogged: {
           id: '',
           email: '',
           username: '',
           usertag: ''
          },
        }
    },
    async mounted(){
       

subscribeToAuth(newUserData => {

  let dataUserStorage = localStorage.getItem('user')
  if(!dataUserStorage){
    localStorage.setItem('user', JSON.stringify(newUserData))
  }
  this.userLogged = newUserData

})

const user = localStorage.getItem('user')
this.userLogged = JSON.parse(user)
console.log(user)

        
        

        try{
            await localizarLosDatosDelUsuarioLoggeadoByUsertag(this.$route.params.usertag, userData => {this.userProfile = userData})

            console.log(this.userProfile.id_m)

             await obtenerPostsDeUsuarioById(this.$route.params.usertag,
                messagees => {this.messages = messagees}
            )

            if(this.userLogged.email === this.userProfile.id_m){
                console.log(this.userProfile.id_m)
                this.myProfile = true
            } else {
                this.myProfile = false
            }

            this.seguido = await checkFollow(this.userLogged.email, this.userProfile.id_m);
        }catch(err){
            console.log('Error al cargar los datos:', err)
        }
    },
    methods: {
    async seguir() {
      try {
        this.seguido = await darFollow(this.userLogged.email, this.userProfile.id_m);
      } catch (err) {
        console.error('Error al seguir:', err);
      }
    }
}

}
</script>

<template>
    <div class="min-h-screen w-[600px] border-l border-r border-white/40 flex flex-col gap-2 ">
        <section class=" relative min-h-[400px]">
            <div class="banner h-[200px] bg-black w-full   border-b border-white/40">
                <!-- img banner -->
            </div>
            <div class="img-perfil absolute top-[32%] left-[15%] transform -translate-x-1/2  bg-white w-[130px] h-[130px] flex items-center justify-center rounded-full">
                <!-- <img src="" alt=""> -->
                 <i class="fa-solid fa-user text-[3rem]"></i>
            </div>

            <template v-if="!myProfile && this.userLogged.id ">
                <div class="follow-button absolute top-[53.8%] left-[85%] transform -translate-x-1/2 ">
                <form action="#" @submit.prevent="seguir()">
                  
               <template v-if="seguido">
                <button class='border transition-all hover:border-white hover:text-white border-white/50 rounded flex items-center h-[30px] w-[160px] justify-center text-white/50'>Dejar de seguir <i class="fa-solid fa-user-minus ml-4"></i></button>
               </template>
               <template v-else>
                        <button class='border transition-all hover:border-white hover:text-white border-white/50 rounded flex items-center h-[30px] w-[100px] justify-center text-white/50'>Seguir <i class="fa-solid fa-user-plus ml-4"></i></button>
                    </template>
                </form>
            </div>
            </template>
            <template v-else-if="myProfile">
                    <div class="follow-button absolute top-[53.8%] left-[85%] transform -translate-x-1/2 ">
                        <button class='border transition-all hover:border-white hover:text-white border-white/50 rounded flex items-center h-[30px] w-[100px] justify-center text-white/50'>Editar <i class="fa-solid fa-pen ml-4"></i></button>
                    </div>
            </template>


            <div class="data-name-user pt-[100px] pl-[29px]">
                <p class="text-2xl text-white font-bold">{{ userProfile.username }}</p>
                <p class="text-lg text-white/50 font-normal">@{{ userProfile.usertag }}</p>
            </div>

            

            <div class="followers  text-lg text-white flex pt-[20px] pb-[16px] pl-[29px] ">
                <p class="mr-4">{{ userProfile.seguidores }} <span class="text-white/50" >Seguidores</span></p>
                <p>{{ userProfile.seguidos }} <span class="text-white/50" >Seguidos</span></p>
            </div>
        </section>
        
        
        <section class=" border-t border-white/40">
            <chatList :messages="messages" />
        </section>
    </div>
</template>
