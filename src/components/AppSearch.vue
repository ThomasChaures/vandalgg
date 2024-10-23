<script>
import { subscribeToAuth } from '@/service/auth';
export default {
  name: "AppSearch",
  data() {
    return {
      busqueda: "",
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        description: "",
        seguidores: null,
        seguidores_cuentas: null,
        seguidos: null,
        seguidos_cuentas: null,
        rango: null,
      },
    };
  },
  async mounted() {
    subscribeToAuth((newUserData) => {
      this.userLogged = newUserData;
    });
  },
  methods: {
    async buscar() {
      this.$router.push(`/busqueda/${this.busqueda}`);
    },
   
  },
};
</script>

<template>
 
</template>
