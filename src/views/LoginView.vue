<script>
import { login } from "@/service/auth";
import error from '../components/slot/error.vue';
import GeneralLoaders from "@/components/Loaders/GeneralLoaders.vue";
export default {
  name: "LoginView",
  components: { error, GeneralLoaders },
  data() {
    return {
      error: "",
      user: {
        email: "",
        password: "",
      },
      loading: false,
      confirm: false,
    };
  },
  methods: {
    async envioDeFormulario() {
      this.loading = true;

      try {
        await login(this.user);
        this.loading = false;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (err) {
        this.error = `${err}`;
        console.log(err);
        this.loading = false;
      }
    },
  },
};
</script>

<template>

        <Section v-if="loading">
          <GeneralLoaders/>
        </Section>
 

  <section class="w-full fixed h-full animate__animated animate__fadeInLeft top-[0%] left-[0%] translate-y-[-50%] max-w-[50%] bg-slate-950 shadow-sm"
  >



    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] max-w-[600px] w-full translate-y-[-50%]"
    >
      <div class="w-full flex item-center justify-center mt-5 mb-10">
        <h1 class="font-semibold text-2xl py-4 text-white">Ingresar Cuenta</h1>
      </div>

      <form action="#" class="px-8" @submit.prevent="envioDeFormulario()">
        <div class="mb-4">
          <label for="email" class="text-white block mb-2">E-mail</label>
          <input
            type="mail"
            name="email"
            autocomplete="email"
            v-model="user.email"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="hidden">
          <label for="username">Username</label>
          <input type="text" name="username" autocomplete="username" />
        </div>
        <div class="mb-4">
          <label for="password" class="text-white block mb-2">Password</label>
          <input
            type="password"
            name="password"
            autocomplete="new-password"
            v-model="user.password"
            class="w-full p-2 border rounded"
          />
        </div>
        <button
          class="py-2 mt-8 w-full rounded bg-cyan-950 text-white hover:bg-cyan-700 transition-all"
        >
          Enviar
        </button>

        <template v-if="error !== ''">
          <error>Error al iniciar sesión. Credenciales incorrectas.</error>
        </template>

        <p class="py-7 mt-5 mb-5 text-white text-center">
          No contas con una cuenta?
          <router-link to="/registro"
            ><span class="text-blue-500 underline"
              >Registrate!</span
            ></router-link>
        </p>
      </form>
    </div>
  </section>
</template>
