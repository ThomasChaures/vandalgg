import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import EditProfileView from "@/views/EditProfileView.vue";
import EditProfileImgView from "@/views/EditProfileImgView.vue";
import SearchView from "@/views/SearchView.vue";
import PublicacionView from "@/views/PublicacionView.vue";
import { subscribeToAuth } from "@/service/auth";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/publicacion/:id",
      name: "publicacion",
      component: PublicacionView,
      meta: { requiresAuth: true },
    },
    {
      path: "/iniciar-sesion",
      name: "iniciar-sesion",
      component: LoginView,
    },
    {
      path: "/registro",
      name: "registro",
      component: RegisterView,
    },
    {
      path: "/perfil/:usertag",
      name: "perfil",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/perfil/",
      name: "perfil-2",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/perfil/edit/:id",
      name: "editar-perfil",
      component: EditProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/perfil/edit/img/:id",
      name: "editar-perfil-img",
      component: EditProfileImgView,
      meta: { requiresAuth: true },
    },
    {
      path: "/busqueda/:search",
      name: "buscador-param",
      component: SearchView,
      meta: { requiresAuth: true, buscador: false},
    },
    {
      path: "/busqueda",
      name: "buscador",
      component: SearchView,
      meta: { requiresAuth: true, buscador: false},
    },
    {
      path: "/mensajes",
      name: "mensajes",
      component: HomeView,
      meta: { requiresAuth: true},
    },
  ],
});

let userLogged = {
  id: null,
  email: null,
  username: null,
  usertag: null,
  description: null,
  seguidores: null,
  seguidores_cuentas: null,
  seguidos: null,
  seguidos_cuentas: null,
  rango: null,
};

subscribeToAuth((newUser) => (userLogged = newUser));

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && userLogged.id === null) {
    return "/iniciar-sesion";
  }
});

export default router;
