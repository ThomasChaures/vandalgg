import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/iniciar-sesion',
      name: 'iniciar-sesion',
      component: LoginView
    },
    {
      path: '/registro',
      name: 'registro',
      component: LoginView
    },
    {
      path: '/perfil/:user-tag',
      name: 'perfil',
      component: LoginView
    }
  ]
})

export default router
