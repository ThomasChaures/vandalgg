<script>
import { subscribeToAuth } from "@/service/auth";
export default {
  name: "EditProfileView",
  data() {
    return {
      paramId: "",
      userLogged: {
        id: "",
        email: "",
        username: "",
        usertag: "",
        desciption: "",
      },
      editProfile: {
        username: "",
        usertag: "",
        desciption: "",
      },
      errors: {
        usertag: "",
        username: "",
        desciption: "",
      },
    };
  },
  mounted() {
    subscribeToAuth((newUserData) => (this.userLogged = newUserData));

    this.editProfile.username = this.userLogged.username;
    this.editProfile.usertag = this.userLogged.usertag;
    this.editProfile.desciption = this.userLogged.desciption;
    if (this.userLogged.id !== this.$route.params.id) {
      this.$router.push("/");
    }
  },
};
</script>

<template>
  <div class="flex justify-between w-full min-h-screen">
    <div class="w-[600px] marker: border-l  border-r border-white/40">
      <div
        class="w-full flex item-center justify-center border-t border-b border-white/40"
      >
        <h2 class="font-semibold text-2xl py-2 text-white">Editar Perfil</h2>
      </div>
      <form class="p-8">
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
          <label for="username" class="text-white block mb-2">Usertag</label>
          <input
            type="text"
            name="usertag"
            v-model="editProfile.usertag"
            class="w-full p-2 border border-slate-950 rounded"
          />
          <template v-if="errors.usertag !== ''">
            <error>{{ errors.usertag }}</error>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>
