<script>
export default {
  name: "blockCode",
  props: {
    message: Object,
  },
  mounted() {
    this.loadPrism();
  },
  updated() {
    this.highlightCode();
  },
  methods: {
    loadPrism() {
      const prismScriptExists = document.querySelector(
        'script[src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"]'
      );

      if (!prismScriptExists) {
        const prismScript = document.createElement("script");
        prismScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
        prismScript.onload = () => {
          this.loadLanguage(this.message.lenguaje);
          this.highlightCode();
        };
        document.head.appendChild(prismScript);
      } else {
        // Si Prism.js ya está cargado, simplemente cargamos el lenguaje
        this.loadLanguage(this.message.lenguaje);
        this.highlightCode();
      }
    },
    loadLanguage(language) {
      const languageScriptExists = document.querySelector(
        `script[src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${language.toLowerCase()}.min.js"]`
      );

      // Verifica si el lenguaje ya está cargado
      if (!languageScriptExists) {
        const languageScript = document.createElement("script");
        languageScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${language.toLowerCase()}.min.js`;
        languageScript.onload = () => {
          this.highlightCode();
        };
        document.head.appendChild(languageScript);
      } else {
        this.highlightCode();
      }
    },
    highlightCode() {
      if (typeof Prism !== "undefined") {
        Prism.highlightAll();
      }
    },
  },
};

</script>

<template>
  <div class="bg-[#1e1e1e] mb-6 rounded-lg shadow-xl overflow-hidden">
    <div class="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between space-x-2">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span class="ml-2 text-gray-400 text-sm">{{ message.lenguaje }}.dev</span>
    </div>
    <pre class="text-white bg-[#1e1e1e]  rounded whitespace-pre-wrap" >
  <code :class="`language-${message.lenguaje} block !bg-[#1e1e1e]`">{{ message.blockCode }}</code>
</pre>

  </div>
</template>

<style scoped>
pre{
  background: none;
}
</style>