<script>
export default {
  name: "sButton",
};
</script>

<template>
  <button
    type="submit"
    class="py-2 px-4 rounded bg-cyan-950 text-white hover:bg-cyan-700 transition-all"
  >
  <slot></slot>
  </button>
</template>
