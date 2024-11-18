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
import EditPostView from "@/views/EditPostView.vue";
import SearchView from "@/views/SearchView.vue";
import PublicacionView from "@/views/PublicacionView.vue";
import { subscribeToAuth } from "@/service/auth";
import MessagesView from "@/views/MessagesView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true, title: "Inicio" },
    },
    {
      path: "/publicacion/:id/editar/",
      name: "Editar publicacion",
      component: EditPostView,
      meta: { requiresAuth: true, title: "Editar Publicación" },
    },
    {
      path: "/publicacion/:id",
      name: "publicacion",
      component: PublicacionView,
      meta: { requiresAuth: true, title: "Publicacion" },
    },
    {
      path: "/iniciar-sesion",
      name: "iniciar-sesion",
      component: LoginView,
      meta: { nav: false, title: "Inicio de Sesión" },
    },
    {
      path: "/registro",
      name: "registro",
      component: RegisterView,
      meta: { nav: false, title: "Registro" },
    },
    {
      path: "/perfil/:usertag",
      name: "perfil",
      component: ProfileView,
      meta: { requiresAuth: true, title: "Perfil" },
    },
    {
      path: "/perfil/edit/:id",
      name: "editar-perfil",
      component: EditProfileView,
      meta: { requiresAuth: true, title: "Editar Perfil" },
    },
    {
      path: "/busqueda/:search",
      name: "buscador-param",
      component: SearchView,
      meta: { requiresAuth: true, buscador: false, title: "Buscador" },
    },
    {
      path: "/mensajes/:usertag",
      name: "mensajes",
      component: MessagesView,
      meta: { requiresAuth: true, title: "Mensajes" },
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

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = `DevLog - ${to.meta.title}`;
  } else {
    document.title = "DevLog";
  }
  if (to.meta.requiresAuth && userLogged.id === null) {
    next("/iniciar-sesion");
  } else {
    next();
  }
});

export default router;
