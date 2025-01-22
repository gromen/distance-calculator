<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Distance Calculator</h1>
    <Form />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Form from './Form.vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
    },
    data() {
      return {
        startLat: 0 as number,
        startLng: 0 as number,
        endLat: 0 as number,
        endLng: 0 as number,
        distance: null as number | null,
      };
    },
    methods: {
      async calculateDistance() {
        try {
          const response = await axios.post('/api/calculate-distance', {
            startLat: Number(this.startLat),
            startLng: Number(this.startLng),
            endLat: Number(this.endLat),
            endLng: Number(this.endLng),
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      },
    },
  });
</script>
