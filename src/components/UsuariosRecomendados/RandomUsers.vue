<script>
import { getRandomsUser } from "../../service/users";

export default {
  name: "RandomUsers",
  props: {
    usertag: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    console.log(this.usertag)
    const tag = this.usertag
    await getRandomsUser(tag, (data) => {
      this.users = data;
    });
    this.users.forEach((element) => {
      console.log(element.usertag);
    });
  },
};
</script>

<template>
    <aside class="bg-slate-950  overflow-hidden px-5 py-5 rounded-xl mt-[40px]">
      <p class="text-white font-semibold">Sugerencias</p>

      <ul class="h-full flex flex-col gap-5 mt-6">
       <li v-for="(user, index) in users" class="text-white flex items-center gap-2" :key="index">
          <router-link :to="'/perfil/' + user.usertag"  class="text-white flex items-center rounded-xl w-full bg-cyan-950/50 transition-all hover:bg-cyan-950 px-1 py-1 gap-2">
            <div
        v-if="!user.photo"
        class="img-perfil relative bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full overflow-hidden"
      >
        <i
          class="fa-solid absolute bottom-[-4px] text-[33px] fa-user text-gray-500"
        ></i>
      </div>
      <div
        class="img-perfil  object-contain  bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full overflow-hidden"
        v-else
      >
        <img
          class="w-full h-full object-cover"
          :src="user.photo"
          alt="Foto de perfil"
        />
      </div>
          <p class="text-lg ml-1 font-semibold">{{ user.username }}</p>
          <span>•</span>
          <p class="text-white/50">@{{ user.usertag }}</p>
          <span>•</span>
          <p class="text-white/50">{{ user.rango }}</p>
          </router-link>
       </li>
    </ul>
    </aside>
</template>
