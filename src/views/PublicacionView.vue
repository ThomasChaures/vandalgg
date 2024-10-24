<script>
import ComentariosList from '@/components/chatGlobal/comentarios/comentariosList.vue';
import Post from '@/components/chatGlobal/post.vue';
import { subscribeToAuth } from '@/service/auth';
import { obtenerPost, getComentariosDelPost } from '@/service/chatGlobal';


export default{
    name: 'PublicacionView',
    components: {ComentariosList, Post},
    data(){
        return{
            loader: false,
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
        this.loader = false;
        console.log(m)
        console.log(this.post)
    }, this.ruta);
    getComentariosDelPost(this.ruta, (comentarios) => {
        this.comentarios = comentarios;
        console.log(this.comentarios)
        this.loader = false;
    });

},

}
</script>

<template>
    <div>
        <section>
            <Post v-if="post" :message="post" />
        <div v-else>
            <p>Cargando publicación...</p>
        </div>
        </section>

        <ComentariosList v-if="comentarios.length" :comentarios="comentarios"/>
        <div v-else>
            <p>No hay comentarios disponibles.</p>
        </div>
    </div>
</template>
