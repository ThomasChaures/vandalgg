<script>
export default {
  name: "MessagesView",
  data() {
    return {
      list: [
        "Alice",
        "Bob",
        "Charlie",
        "Diana",
        "Eve",
        "Frank",
        "Grace",
        "Hannah",
      ],
      messages: [
        {
          sender: "Alice",
          content: "Hola, ¿cómo estás?",
          timestamp: "2024-10-28 14:30",
          status: "enviado",
        },
        {
          sender: "Bob",
          content: "¡Todo bien! ¿Y tú?",
          timestamp: "2024-10-28 14:31",
          status: "enviado",
        },
        {
          sender: "Charlie",
          content: "Hola a todos",
          timestamp: "2024-10-28 14:32",
          status: "enviado",
        },
        {
          sender: "Diana",
          content: "¿Qué tal?",
          timestamp: "2024-10-28 14:33",
          status: "enviado",
        },
        {
          sender: "Eve",
          content: "¡Hola!",
          timestamp: "2024-10-28 14:34",
          status: "enviado",
        },
        {
          sender: "Frank",
          content: "Buen día",
          timestamp: "2024-10-28 14:35",
          status: "enviado",
        },
        {
          sender: "Grace",
          content: "¿Listos para la reunión?",
          timestamp: "2024-10-28 14:36",
          status: "enviado",
        },
        {
          sender: "Hannah",
          content: "Hola, ¿qué pasa?",
          timestamp: "2024-10-28 14:37",
          status: "enviado",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="bg-slate-600 w-[300px] max-h-[600px] overflow-y-auto  mt-20">
    <h2>Chats</h2>
    <div>
      <ul>
        <li class="bg-slate-400 p-4 mb-2" v-for="(chat, index) in list" :key="index">
          <p>{{ chat }}</p>

          <div v-for="message in messages" :key="message.timestamp">
            <p v-if="chat === message.sender">
              {{ message.content }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div>
        
  </div>
</template>
