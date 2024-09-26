<script>
import { subscribeToAuth } from '@/service/auth';
import { obtenerPostsDeUsuarioById } from '@/service/chatGlobal';
import chatList from '@/components/chatGlobal/chatList.vue';
import { darFollow, localizarLosDatosDelUsuarioLoggeadoByUsertag } from '@/service/users';


export default{
    name: 'ProfileView',
    components: {chatList},
    data(){
        return{
           myProfile: false,
           seguido: false,
           messages: [],
           userProfile: {},
           userLogged: {
           id: '',
           email: '',
           username: '',
           usertag: '',
           seguidores: 0,
           seguidores_cuentas: [],
           seguidos: 0,
           seguidos_cuentas: []
          },
        }
    },
    async mounted(){
        subscribeToAuth( async userData => {
         this.userLogged = userData
        })
        const data = await localizarLosDatosDelUsuarioLoggeadoByUsertag(this.$route.params.usertag)
            if(data){
                this.userProfile = data
                obtenerPostsDeUsuarioById(data.usertag, mensajesDelUsuario => {this.messages = mensajesDelUsuario})
                if(data.id === this.userLogged.email){
                    this.myProfile = true
                }
            }
    },
    methods: {
        seguir(){
        this.seguido = darFollow(this.userLogged.email, this.userProfile.id)
        }
    }
}
</script>

<template>
    <div class="min-h-screen w-[600px] border-l border-r border-white/40 flex flex-col gap-2 ">
        <section class=" relative">
            <div class="banner h-[200px] bg-black w-full   border-b border-white/40">
                <!-- img banner -->
            </div>
            <div class="img-perfil absolute top-[80%] left-[15%] transform -translate-x-1/2  bg-white w-[130px] h-[130px] flex items-center justify-center rounded-full">
                <!-- <img src="" alt=""> -->
                 <i class="fa-solid fa-user text-[3rem]"></i>
            </div>

            <template v-if="!myProfile">
                <div class="follow-button absolute top-[109%] left-[85%] transform -translate-x-1/2 ">
                <form action="#" @submit.prevent="seguir()">
                    <template v-if="!seguido">
                        <button class='border transition-all hover:border-white hover:text-white border-white/50 rounded flex items-center h-[30px] w-[100px] justify-center text-white/50'>Seguir <i class="fa-solid fa-user-plus ml-4"></i></button>
                    </template>
               <template v-else>
                <button class='border transition-all hover:border-white hover:text-white border-white/50 rounded flex items-center h-[30px] w-[160px] justify-center text-white/50'>Dejar de seguir <i class="fa-solid fa-user-minus ml-4"></i></button>
               </template>
                </form>
            </div>
            </template>


            <div class="data-name-user absolute top-[109%] left-[40%] transform -translate-x-1/2  ">
                <p class="text-2xl text-white font-bold">{{ userProfile.username }}</p>
                <p class="text-lg text-white/50 font-bold">@{{ userProfile.usertag }}</p>
            </div>
        </section>
        
        
        <section class="mt-[180px] border-t border-white/40">
            <chatList :messages="messages" />
        </section>
    </div>
</template>
