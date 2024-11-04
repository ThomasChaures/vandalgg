<script>
import { register } from "@/service/auth";
import { crearDatosDeUsuario, esUnicoTag } from "@/service/users";
import error from "@/components/slot/error.vue";

export default {
  name: "RegisterView",
  components: { error },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {
        usertag: "",
        username: "",
        email: "",
        password: "",
      },
      collectionUser: {
        username: "",
        usertag: "",
      },
      loading: false,
    };
  },
  methods: {
    async envioDeFormulario() {
      this.loading = true;
      let errorFlag = false;
      try {
        if (this.user.password.length < 6) {
          errorFlag = true;
          this.errors.password =
            "La contraseña debe tener mas de 6 caracteres.";
        }

        if (this.user.password === "") {
          errorFlag = true;
          this.errors.password = "No puedes dejar este campo vacío.";
        }

        if (this.collectionUser.username === "") {
          errorFlag = true;
          this.errors.username = "No puedes dejar este campo vacío.";
        } else if (this.collectionUser.username.length > 10) {
          errorFlag = true;
          this.errors.username = "Debe tener menos de 10 caracteres.";
        }

        if (this.user.email === "") {
          errorFlag = true;
          this.errors.email = "No puedes dejar este campo vacío.";
        }

        if (this.collectionUser.usertag === "") {
          errorFlag = true;
          this.errors.usertag = "No puedes dejar este campo vacío.";
        } else if (this.collectionUser.usertag.length > 12) {
          errorFlag = true;
          this.errors.usertag = "Debe tener menos de 10 caracteres.";
        }

        const unico = await esUnicoTag(this.collectionUser.usertag);

        if (!unico) {
          errorFlag = true;
          this.errors.usertag = "Este usertag ya existe.";
        }

        if (!errorFlag) {
          await register({
            ...this.user,
          });
          await crearDatosDeUsuario(
            this.user.email,
            this.collectionUser.username,
            this.collectionUser.usertag,
            1
          );
          setTimeout(() => {
          this.$router.push("/");
        }, 2000);
        }
      } catch (err) {
        this.errors.email = "El email es invalido o ya esta en uso.";
      }
    },
  },
};
</script>

<template>
  <section class="w-full fixed h-full  animate__animated animate__fadeInLeft  top-[0%] left-[0%] translate-y-[-50%] max-w-[50%]  bg-slate-950 shadow-sm">
   <div class="absolute top-[50%] left-[50%] translate-x-[-50%] max-w-[600px] w-full translate-y-[-50%]"> 
    <div
      class="w-full flex item-center justify-center mb-10"
    >
      <h1 class="font-semibold text-2xl mt-5 py-5 text-white">Registro de Cuenta</h1>
    </div>

    <form action="#" class="px-8" @submit.prevent="envioDeFormulario()">
      <div class="mb-4">
        <label for="username" class="text-white block mb-2">Nombre</label>
        <input
          type="text"
          name="username"
          autocomplete="username"
          v-model="collectionUser.username"
          class="w-full p-2 border rounded"
        />
        <template v-if="errors.username !== ''">
          <error>{{ errors.username }}</error>
        </template>
      </div>
      <div class="mb-4">
        <label for="usertag" class="text-white block mb-2">User tag</label>
        <input
          type="text"
          name="usertag"
           autocomplete="usertag"
          v-model="collectionUser.usertag"
          class="w-full p-2 border rounded"
        />
        <template v-if="errors.usertag !== ''">
          <error>{{ errors.usertag }}</error>
        </template>
      </div>
      <div class="mb-4">
        <label for="email" class="text-white block mb-2">E-mail</label>
        <input
          type="mail"
          name="email"
           autocomplete="email"
          v-model="user.email"
          class="w-full p-2 border rounded"
        />
        <template v-if="errors.email !== ''">
          <error>{{ errors.email }}</error>
        </template>
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
        <template v-if="errors.password !== ''">
          <error>{{ errors.password }}</error>
        </template>
      </div>
      <button
        class="py-2 mt-8 w-full rounded bg-cyan-950 text-white hover:bg-cyan-700 transition-all"
      >
        Enviar
      </button>
    </form>

    <p class="py-7 mt-5 mb-5 text-white text-center">
      Ya contas con una cuenta?
      <router-link to="/iniciar-sesion"
        ><span class="text-blue-500 underline"
          >Inicia sesion!</span
        ></router-link
      >
    </p>
   </div>
  </section>
</template>
