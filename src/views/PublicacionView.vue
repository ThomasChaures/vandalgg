<script>
import ComentariosList from '@/components/chatGlobal/comentarios/comentariosList.vue';
import Post from '@/components/chatGlobal/post.vue';
import ComentarioLoaders from '@/components/Loaders/ComentarioLoaders.vue';
import PostLoaders from '@/components/Loaders/PostLoaders.vue';
import { subscribeToAuth } from '@/service/auth';
import { obtenerPost, getComentariosDelPost } from '@/service/chatGlobal';


export default{
    name: 'PublicacionView',
    components: {ComentariosList, Post, ComentarioLoaders , PostLoaders},
    data(){
        return{
            loader: false,
            comentarioLoader: false,
            userLogged: {},
            ruta: this.$route.params.id,
            post: {},
            comentarios: []
        }
    },
    async mounted() {
    this.loader = true;
    subscribeToAuth((newUserData) => (this.userLogged = newUserData));
     obtenerPost((m) => {
        this.post = m;
        this.loader = true;
        console.log(m)
        console.log(this.post)
    }, this.ruta);
    getComentariosDelPost(this.ruta, (comentarios) => {
        this.comentarios = comentarios;
        console.log(this.comentarios)
        this.comentarioLoader = true;
    });

},

}
</script>

<template>
    <div class="mx-auto max-w-[600px]">
        <section class="mt-10 border-b border-white/20 mb-5 pb-3">
            <h2 class="sr-only">Publicación</h2>
            <Post v-if="post" :message="post" />
            <div v-else>
                <PostLoaders />
            </div>
        </section>

        <section class="mt-5 mb-5 pb-3">
            <h2 class="sr-only">Comentarios</h2>
            <ComentariosList v-if="comentarioLoader && comentarios.length > 0" :comentarios="comentarios"/>
            <div v-else-if="comentarioLoader && comentarios.length === 0" class="text-white/20 flex justify-center py-8 text-xl">
                <p>No hay comentarios disponibles.</p>
            </div>
            <div v-else>
                <ComentarioLoaders />
                <ComentarioLoaders />
                <ComentarioLoaders />
            </div>
        </section>
    </div>
</template>
