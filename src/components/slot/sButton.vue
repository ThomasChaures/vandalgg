<script>
export default {
  name: "sButton",
};
</script>

<template>
  <button
    type="submit"
    class="py-2 px-4 rounded bg-blue-700 text-white hover:bg-blue-600 transition-all"
  >
  <slot></slot>
  </button>
</template>
