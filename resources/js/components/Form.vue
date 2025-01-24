<template>
  <LocationNames
    :start-location="startLocation"
    :end-location="endLocation"
    :distance="distance"
  />
  <form @submit.prevent="calculateDistance">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <InputForm
            id="startLat"
            name="startLat"
            label="Start Latitude"
            placeholder="Start Latitude"
            error-message="Latitude should be range from (-90, 90)"
            :is-valid="validationResult.errors.startLat"
            :model-value="coordinates.startLat"
            @update:model-value="coordinates.startLat = Number($event)"
          />
          <InputForm
            id="startLng"
            name="startLng"
            label="Start Longitude"
            placeholder="Start Longitude"
            error-message="Longtitude should be range from (-180, 180)"
            :is-valid="validationResult.errors.startLng"
            :model-value="coordinates.startLng"
            @update:model-value="coordinates.startLng = Number($event)"
          />
          <InputForm
            id="endLat"
            name="endLat"
            label="End Latitude"
            placeholder="End Latitude"
            error-message="Latitude should be range from (-90, 90)"
            :is-valid="validationResult.errors.endLat"
            :model-value="coordinates.endLat"
            @update:model-value="coordinates.endLat = Number($event)"
          />
          <InputForm
            id="endLng"
            name="endLng"
            label="End Longtitude"
            placeholder="End Longtitude"
            error-message="Latitude should be range from (-90, 90)"
            :is-valid="validationResult.errors.endLng"
            :model-value="coordinates.endLng"
            @update:model-value="coordinates.endLng = Number($event)"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        :disabled="!validationResult.isValid"
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

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import axios from 'axios';
  import { validate } from '../validators/gpsValidators';
  import type { IGPSCoordinates } from '../types/gps.types';
  import InputForm from './InputForm.vue';
  import { getNearbyPlaces } from '../utils/utils';
  import LocationNames from './LocationNames.vue';

  const coordinates = ref<IGPSCoordinates>({
    startLat: 0,
    startLng: 0,
    endLat: 0,
    endLng: 0,
  });

  const startLocation = ref<string | null>(null);
  const endLocation = ref<string | null>(null);
  const distance = ref<{ meters: number } | null>(null);
  const validationResult = computed(() => validate(coordinates.value));

  const calculateDistance = async () => {
    if (!validationResult.value.isValid) {
      return;
    }

    try {
      const response = await axios.post('/api/calculate-distance', {
        startLat: Number(coordinates.value.startLat),
        startLng: Number(coordinates.value.startLng),
        endLat: Number(coordinates.value.endLat),
        endLng: Number(coordinates.value.endLng),
      });

      startLocation.value =
        (await getNearbyPlaces(
          coordinates.value.startLat,
          coordinates.value.startLng
        )) || 0;

      endLocation.value =
        (await getNearbyPlaces(
          coordinates.value.endLat,
          coordinates.value.endLng
        )) || 0;

      distance.value = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Błąd:', error.response?.data);
      } else {
        console.error('Błąd:', error);
      }
    }
  };
</script>
