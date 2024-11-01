<script>
import Comentario from './comentario.vue';


export default{
    name: 'comentariosList',
    components: {Comentario},
    props: {
        comentarios: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <section class="min-h-screen">
        <h2 class="sr-only">Comentarios</h2>
        <div v-for="(comentario, index) in comentarios" :key="index">
            <Comentario :comentario="comentario"/>
        </div>
    </section>
</template>