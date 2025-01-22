<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Distance Calculator</h1>
    <p>Vue is working!</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',

    data() {
      return {
        startLat: 0 as number,
        startLng: 0 as number,
        endLat: 0 as number,
        endLng: 0 as number,
        distance: null as number | null,
      };
    },
  });
</script>
