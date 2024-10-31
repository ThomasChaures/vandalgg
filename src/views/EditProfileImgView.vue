<script>
import { editarMiFotoDePerfil } from "@/service/auth";
import { subscribeToAuth } from "@/service/auth";

export default {
  name: "EditProfileImg",
  data() {
    return {
      userLogged: {},
      editing: false,
      foto: null, // Aquí se almacenará el archivo seleccionado
      fotoPreview: null, // Aquí se almacenará la URL para previsualización
    };
  },
  mounted() {
    subscribeToAuth((data) => (this.userLogged = data));
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.foto) {
          throw new Error("No se ha seleccionado ninguna foto.");
        }

        await editarMiFotoDePerfil(this.foto, "avatar"); // Llamar la función con la foto
        this.$router.go(-1);
      } catch (err) {
        console.error("Error al actualizar la foto:", err);
      }
    },
    async handleFileSelection(e) {
      this.foto = e.target.files[0]; // El archivo seleccionado
      if (!this.foto) {
        console.error("No se ha seleccionado ningún archivo.");
        return;
      }
      // Crear la previsualización de la imagen
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.fotoPreview = reader.result; // Almacena el resultado para previsualización
      });

      reader.readAsDataURL(this.foto); // Lee el archivo seleccionado para generar previsualización
    },
  },
};
</script>

<template>
  <section class="bg-slate-950 py-5 px-5 mt-10 rounded-xl">
    <div class="w-full flex item-center justify-center">
      <h2 class="font-semibold text-2xl pt-5 pb-10 py-2 text-white">
        Editar Foto
      </h2>
    </div>

    <div class="flex justify-between">
      <div
        v-if="!userLogged.photo"
        class="img-perfil bg-gray-200 relative w-[330px] overflow-hidden h-[330px] flex items-center justify-center rounded-full border-2"
      >
        <i
          class="fa-solid text-[200px] absolute bottom-[-5px] fa-user text-gray-500"
        ></i>
      </div>
      <div
        v-else
        class="img-perfil bg-gray-200 relative w-[250px] overflow-hidden h-[250px] flex items-center justify-center rounded-full border-2"
      >
        <img
          :src="userLogged.photo"
          class="h-[250px] w-[250px]"
          alt="Foto de perfil"
        />
      </div>

      <div
        class="img-perfil bg-gray-200 relative h-[250px] w-[250px] overflow-hidden flex items-center justify-center rounded-full border-2"
      >
        <!-- Previsualización de la imagen seleccionada -->
        <img
          class="h-[250px] w-[250px]"
          v-if="fotoPreview"
          :src="fotoPreview"
          alt="Previsualización de la foto de perfil"
        />
      </div>
    </div>

    <form action="#" class="w-full mt-5 text-center" @submit.prevent="handleSubmit">
      <div>
        <label for="foto" class="bg-cyan-950 cursor-pointer hover:bg-cyan-700 transition-all py-3 px-2 rounded-sm text-white">Seleccionar imagen</label>
        <input
          class="sr-only"
          type="file"
          name="foto"
          id="foto"
          @change="handleFileSelection"
        />
      </div>
      <button
        class="py-2 mt-14 w-full rounded bg-cyan-950 text-white hover:bg-cyan-700 transition-all"
        type="submit"
      >
        Cambiar foto
      </button>
    </form>
  </section>
</template>
