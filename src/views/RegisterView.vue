<script>
import { register } from "@/service/auth";
import { crearDatosDeUsuario, esUnicoTag } from "@/service/users";
import Error from "@/components/slot/Error.vue";

export default {
  name: "RegisterView",
  components: { Error },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {
        usertag: "",
        username: "",
        surname: "",
        email: "",
        password: "",
      },
      collectionUser: {
        username: "",
        surname: "",
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
        } else if (this.collectionUser.username.length <= 3) {
          errorFlag = true;
          this.errors.username = "Debe tener más de 3 caracteres.";
        }

        if (this.collectionUser.surname === "") {
          errorFlag = true;
          this.errors.surname = "No puedes dejar este campo vacío."; // Cambié 'this.errors.username' por 'this.errors.surname'
        } else if (this.collectionUser.surname.length <= 3) {
          errorFlag = true;
          this.errors.surname = "Debe tener más de 3 caracteres."; // Cambié 'this.errors.username' por 'this.errors.surname'
        }

        if (this.collectionUser.usertag === "") {
          errorFlag = true;
          this.errors.usertag = "No puedes dejar este campo vacío.";
        } else if (this.collectionUser.usertag.length > 12) {
          errorFlag = true;
          this.errors.usertag = "Debe tener menos de 12 caracteres."; // Cambié 'menos de 10' por 'menos de 12'
        }

        if (this.user.email === "") {
          errorFlag = true;
          this.errors.email = "No puedes dejar este campo vacío.";
        }

        const unico = await esUnicoTag(this.collectionUser.usertag);

        if (!unico) {
          errorFlag = true;
          this.errors.usertag = "Este usertag ya existe.";
        }

        if (!errorFlag) {
          const nombreCompleto = `${this.collectionUser.username} ${this.collectionUser.surname}`;

          const uid = await register({
            ...this.user,
          });
          await crearDatosDeUsuario(
            uid,
            this.user.email,
            nombreCompleto,
            this.collectionUser.usertag,
            1
          );

          this.$router.push("/");
        }
      } catch (err) {
        this.errors.email = 'No es valido.';
      }
    },
  },
};
</script>

<template>
  <section
    class="w-full fixed h-full animate__animated animate__fadeInLeft top-[0%] left-[0%] translate-y-[-50%] max-w-[50%] bg-slate-950 shadow-sm"
  >
    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] max-w-[600px] w-full translate-y-[-50%]"
    >
      <div class="w-full flex item-center justify-center mb-10">
        <h1 class="font-semibold text-2xl mt-5 py-5 text-white">
          Registro de Cuenta
        </h1>
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
          <label for="username" class="text-white block mb-2">Apellido</label>
          <input
            type="text"
            name="username"
            autocomplete="username"
            v-model="collectionUser.surname"
            class="w-full p-2 border rounded"
          />
          <template v-if="errors.surname !== ''">
            <error>{{ errors.surname }}</error>
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
