<script>
import { RouterLink, RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: { RouterLink, RouterView, AppNavbar, AppFooter }
}
</script>

<template>
  <div class="flex mx-auto w-[1200px] relative">
    <AppNavbar />
    <main class="container w-full ml-[300px]">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
