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
    <router-link class="hover:bg-white/10 border-r border-l border-white/10 w-[100px] px-2 py-2 h-full  flex flex-col items-center justify-center" :to="link">
            <slot></slot>
    </router-link>
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-white/10;
}
</style>