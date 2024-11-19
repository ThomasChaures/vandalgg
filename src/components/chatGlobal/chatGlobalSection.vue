<script>
import chatForm from './ChatForm.vue'
import chatList from './ChatList.vue'
import { cambiosEnElChat } from '@/service/chatGlobal.js'
import { subscribeToAuth } from '@/service/auth'
import PostLoaders from '../Loaders/PostLoaders.vue'


export default {
  name: 'ChatGlobalSection',
  components: { chatForm, chatList, PostLoaders },
  data() {
    return {
      messages: [],
      postCargados: false,
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        description: "",
        seguidores: null,
        seguidores_cuentas: null,
        seguidos: null,
        seguidos_cuentas: null,
        rango: null
      },
    }
  },
  async mounted() {
    cambiosEnElChat((mensajesDB) => {
      this.messages = mensajesDB.reverse()
      this.postCargados = true
    })
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData
    })
  },
  methods: {
  
  }
}
</script>

<template>
  <div class="flex flex-col max-w-[600px] mx-auto  w-[100%]">
    <section v-if="this.userLogged.id">
      <h2 class="sr-only">Nueva publicacion</h2>
      <chatForm />
    </section>
    <section class="max-w-[600px] ">
      <h2 class="sr-only">Publicaciones</h2>
      <template v-if="postCargados">
        <chatList class="border-t border-white/10 pt-5"  :messages="messages" />
      </template>
      <template v-else>
       <div class="flex flex-col gap-4">
        <PostLoaders/>
        <PostLoaders/>
        <PostLoaders/>
        <PostLoaders/>
       </div>
      </template>
    </section>
  </div>
</template>
