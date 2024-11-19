<script>
import comentario from './comentario.vue';


export default{
    name: 'comentariosList',
    components: {comentario},
    props: {
        comentarios: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <section >
        <h2 class="sr-only">Comentarios</h2>
        <div v-for="(comentario, index) in comentarios" :key="index">
            <comentario :comentario="comentario"/>
        </div>
    </section>
</template>