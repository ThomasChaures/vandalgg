
  <script>

  export default {
    name: 'blockCode',
    props: {
      message: Object
    },
  };
  </script>
  

  <template>
  <div class="bg-[#1e1e1e] mb-6 rounded-lg shadow-xl overflow-hidden">
    <div class="bg-[#2d2d2d] px-4 py-2 flex items-center space-x-2">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
      <span class="ml-2 text-gray-400 text-sm">untitled.dev</span>
    </div>
   <pre class="text-white bg-[#1e1e1e] overflow-x-scroll p-4 rounded whitespace-pre-wrap">
      <code :class="`language-${message.language}`">{{message.blockCode}}</code>
    </pre>
    </div>
  </template>
  

