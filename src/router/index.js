import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'

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
      component: RegisterView
    },
    {
      path: '/perfil/:usertag',
      name: 'perfil',
      component: ProfileView
    },
    {
      path: '/perfil/edit/:id',
      name: 'editar-perfil',
      component: EditProfileView
    }
  ]
})

export default router
