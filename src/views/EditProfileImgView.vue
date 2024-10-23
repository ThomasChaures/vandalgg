<script>
import { editarMiFotoDePerfil } from "@/service/auth";

export default {
  name: "EditProfileImg",
  data() {
    return {
      editing: false,
      foto: null, // Aquí se almacenará el archivo seleccionado
      fotoPreview: null, // Aquí se almacenará la URL para previsualización
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.log("Foto seleccionada para subir:", this.foto); // Verificar si la foto se está pasando correctamente
        if (!this.foto) {
          throw new Error("No se ha seleccionado ninguna foto.");
        }

        await editarMiFotoDePerfil(this.foto, 'avatar'); // Llamar la función con la foto
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

      console.log("Archivo seleccionado:", this.foto);

      // Crear la previsualización de la imagen
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.fotoPreview = reader.result; // Almacena el resultado para previsualización
        console.log("Previsualización generada:", this.fotoPreview);
      });

      reader.readAsDataURL(this.foto); // Lee el archivo seleccionado para generar previsualización
    },
  },
};
</script>

<template>
  <section>
    <div
        class="w-full flex item-center justify-center"
      >
        <h2 class="font-semibold text-2xl pt-5 pb-10 py-2 text-white">Editar Foto</h2>
      </div>
    <div
      class="img-perfil bg-white w-[130px] h-[130px] flex items-center justify-center rounded-full border-2"
    >
      <i class="fa-solid text-4xl fa-user text-black"></i>
    </div>

    <form action="#" @submit.prevent="handleSubmit">
      <div>
        <label for="foto">Foto</label>
        <input
          type="file"
          name="foto"
          id="foto"
          @change="handleFileSelection"
        />
      </div>
      <button  class="py-2 mt-8 w-full rounded bg-cyan-950 text-white hover:bg-cyan-700 transition-all"
       type="submit">Cambiar foto</button>
    </form>

    <!-- Previsualización de la imagen seleccionada -->
    <img
      v-if="fotoPreview"
      :src="fotoPreview"
      alt="Previsualización de la foto de perfil"
    />
  </section>
</template>
