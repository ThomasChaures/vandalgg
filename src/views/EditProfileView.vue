<script>
import { subscribeToAuth } from "@/service/auth";
import { editarPerfil } from "@/service/users";
import error from "@/components/slot/error.vue";

export default {
  name: "EditProfileView",
  components: { error },
  data() {
    return {
      paramId: "",
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
      editProfile: {
        rango: "",
        username: "",
        description: "",
      },
      errors: {
        rango: "",
        username: "",
        description: "",
      },
    };
  },
  mounted() {
    subscribeToAuth((newUserData) => {
      if (newUserData) {
        this.userLogged = newUserData;
        this.editProfile.username = this.userLogged.username || "";
        this.editProfile.description = this.userLogged.description || "";
        this.editProfile.rango = this.userLogged.rango || "";

        if (this.userLogged.id !== this.$route.params.id) {
          this.$router.push("/");
        }
      }
    });
  },

  methods: {
    async envioDeFormulario() {
      let flag = false;

      if (!this.editProfile.username) {
        // Verificar que username no sea null
        flag = true;
        this.errors.username = "El nombre no puede estar vacío.";
      } else if (this.editProfile.username.length > 10) {
        flag = true;
        this.errors.username = "El nombre no puede tener más de 10 caracteres.";
      }

      if (!this.editProfile.description) {
        // Verificar que description no sea null
        flag = true;
        this.errors.description = "La descripción no puede estar vacía.";
      } else if (this.editProfile.description.length > 150) {
        flag = true;
        this.errors.description =
          "La descripción no puede exceder los 150 caracteres.";
      }

      if (!flag) {
        try {
          await editarPerfil(
            this.userLogged.email,
            this.editProfile.description,
            this.editProfile.username,
            this.editProfile.rango
          );
          this.$router.push("/perfil/" + this.userLogged.usertag);
        } catch (err) {
          console.log("Error al editar el perfil.");
        }
      }
    },
  },
};
</script>

<template>
 <section>
  <div class="flex justify-between w-full min-h-screen">
    <div class="w-[600px] marker: border-l border-r border-white/40">
      <div
        class="w-full flex item-center justify-center border-t border-b border-white/40"
      >
        <h2 class="font-semibold text-2xl py-2 text-white">Editar Perfil</h2>
      </div>
      <form class="p-8" action="#" @submit.prevent="envioDeFormulario()">
        <div class="mb-4">
          <label for="username" class="text-white block mb-2">Nombre</label>
          <input
            type="text"
            name="username"
            v-model="editProfile.username"
            class="w-full p-2 border border-slate-950 rounded"
          />
          <template v-if="errors.username !== ''">
            <error>{{ errors.username }}</error>
          </template>
        </div>

        <div class="mb-4">
          <label for="rango" class="text-white block mb-2"
            >Rango en Valorant</label
          >
          <select
            name="rango"
            v-model="editProfile.rango"
            class="w-full p-2 border border-slate-950 rounded"
          >
            <option value="unranked">Unranked</option>
            <option value="hierro">Hierro</option>
            <option value="bronce">Bronce</option>
            <option value="plata">Plata</option>
            <option value="oro">Oro</option>
            <option value="platino">Platino</option>
            <option value="diamante">Diamante</option>
            <option value="ascendant">Ascendant</option>
            <option value="inmortal">Inmortal</option>
            <option value="radiant">Radiant</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="description" class="text-white block mb-2"
            >Descripción</label
          >
          <textarea
            name="description"
            v-model="editProfile.description"
            class="w-full h-28 resize-none border-slate-900 border rounded py-2 px-4 text-slate-900 focus:border-slate-950"
          >
{{}}</textarea
          >
          <template v-if="errors.description !== ''">
            <error>{{ errors.description }}</error>
          </template>
        </div>
        <button
          class="py-1 mt-8 w-full rounded bg-red-600 flex items-center justify-center ring-red-600 ring-offset-slate-900 ring hover:ring-offset-2 ring-offset-0 transition-all text-white disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
 </section>
</template>
