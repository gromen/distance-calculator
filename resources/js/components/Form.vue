<template>
  <form @submit.prevent="calculateDistance">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="startLat"
              class="block text-sm/6 font-medium text-gray-900"
              >Start Latitude</label
            >
            <div class="mt-2">
              <input
                type="number"
                name="startLat"
                step="0.00000001"
                v-model="startLat"
                id="startLat"
                placeholder="Start Latitude"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <template v-if="!validationResult.errors.startLat">
              <Error message="Latitude should be range from (-90, 90)" />
            </template>
          </div>
          <div class="sm:col-span-3">
            <label
              for="startLng"
              class="block text-sm/6 font-medium text-gray-900"
              >Start Longitude</label
            >
            <div class="mt-2">
              <input
                type="number"
                name="startLng"
                step="0.00000001"
                v-model="startLng"
                id="startLng"
                placeholder="Start Longtitude"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <template v-if="!validationResult.errors.startLng">
              <Error message="Longtitude should be range from (-180, 180)" />
            </template>
          </div>
          <div class="sm:col-span-3">
            <label
              for="endLat"
              class="block text-sm/6 font-medium text-gray-900"
              >End Latitude</label
            >
            <div class="mt-2">
              <input
                type="number"
                name="endLat"
                step="0.00000001"
                v-model="endLat"
                id="endLat"
                placeholder="Start Latitude"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <template v-if="!validationResult.errors.endLat">
              <Error message="Latitude should be range from (-90, 90)" />
            </template>
          </div>
          <div class="sm:col-span-3">
            <label
              for="endLng"
              class="block text-sm/6 font-medium text-gray-900"
              >End Longitude</label
            >
            <div class="mt-2">
              <input
                type="number"
                name="endLng"
                step="0.00000001"
                v-model="endLng"
                id="endLng"
                placeholder="Start Latitude"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <template v-if="!validationResult.errors.endLng">
              <Error message="Longtitude should be range from (-180, 180)" />
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        :disabled="!this.validationResult.isValid"
        type="submit"
        class="disabled:text-opacity-65 disabled:bg-opacity-65 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Calculate Distance
      </button>
      <template v-if="distance">
        {{ distance.meters }}
      </template>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { validate } from '../validators/gpsValidators';
  import Error from './Error.vue';

  export default defineComponent({
    name: 'Form',
    components: {
      Error,
    },
    data() {
      return {
        startLat: 0 as number,
        startLng: 0 as number,
        endLat: 0 as number,
        endLng: 0 as number,
        distance: {
          kilometers: 0 as number,
          meters: 0 as number,
        },
      };
    },
    computed: {
      validationResult() {
        return validate({
          startLat: this.startLat,
          startLng: this.startLng,
          endLat: this.endLat,
          endLng: this.endLng,
        });
      },
    },
    methods: {
      async calculateDistance() {
        if (!this.validationResult.isValid) {
          return;
        }

        try {
          const response = await axios.post('/api/calculate-distance', {
            startLat: Number(this.startLat),
            startLng: Number(this.startLng),
            endLat: Number(this.endLat),
            endLng: Number(this.endLng),
          });
          this.distance = response.data;
          console.log('this.distance', this.distance);
        } catch (error) {
          if (error.response) {
            console.error('Błąd:', error.response.data);
          } else {
            console.error('Błąd:', error);
          }
        }
      },
    },
  });
</script>
