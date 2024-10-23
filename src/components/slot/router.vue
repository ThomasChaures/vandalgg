<script>
    export default{
        name: 'Router',
        props:{
            link: {
                type: String,
                required: true
            }
        }
    }
</script>

<template>
    <router-link class="hover:bg-white/10 px-2 py-2 rounded-full text-xl flex items-center justify-start tracking-wider" :to="link">
            <slot></slot>
    </router-link>
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-white/10;
}
</style>