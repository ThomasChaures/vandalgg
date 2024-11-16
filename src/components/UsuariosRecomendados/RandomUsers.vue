<script>
import { getRandomsUser } from "../../service/users";
import LiLoaders from "../Loaders/LiLoaders.vue";

export default {
  name: "RandomUsers",
  components: {LiLoaders},
  props: {
    usertag: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loader: false,
      users: [],
    };
  },
  async mounted() {
    console.log(this.usertag)
    const tag = this.usertag
    await getRandomsUser(tag, (data) => {
      this.users = data;
      this.loader = true;
    });
    this.users.forEach((element) => {
      console.log(element.usertag);
    });
  },
};
</script>

<template>
  <aside class="bg-slate-950 max-w-[330px] w-full overflow-hidden px-5 py-5 rounded-xl mt-[40px]">
    <p class="text-white font-semibold">Sugerencias</p>

    <ul v-if="loader" class="h-full flex flex-col gap-5 mt-6">
      <li
        v-for="(user, index) in users"
        class="text-white flex items-center gap-4 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
        :key="index"
      >
        <router-link :to="'/perfil/' + user.usertag" class="w-full flex items-center gap-3">
          <!-- Imagen de perfil -->
          <div class="img-perfil relative w-[35px] h-[35px] flex items-center justify-center rounded-full overflow-hidden bg-gray-200">
            <img
              v-if="user.photo"
              class="w-full h-full object-cover"
              :src="user.photo"
              alt="Foto de perfil"
            />
            <i v-else class="fa-solid text-[33px] fa-user text-gray-500 absolute bottom-[-4px]"></i>
          </div>

          <!-- Nombre de usuario y usertag -->
          <div class="flex flex-col">
            <p class="text-lg font-semibold">{{ user.username }}</p>
            <div class="flex items-center">
              <p class="text-white/50">@{{ user.usertag }}</p>
              <span class="mx-1">•</span>
              <p class="text-white/50">{{ user.rango }}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <ul v-else class="h-full w-[300px] flex flex-col gap-5 mt-6">
      <LiLoaders />
      <LiLoaders />
      <LiLoaders />
    </ul>
  </aside>
</template>
