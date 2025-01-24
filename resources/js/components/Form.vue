<template>
  <Suspense>
    <template #default>
      <LocationNames
        :start-location="startLocation"
        :end-location="endLocation"
        :distance="distance"
      />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
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
        {{ isLoading ? 'Calculating...' : 'Calculate Distance' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import InputForm from './InputForm.vue';
  import LocationNames from './LocationNames.vue';
  import { useDistanceCalculator } from '../composables/useDistanceCalculator';
  import LoadingSpinner from './LoadingSpinner.vue';

  const {
    coordinates,
    startLocation,
    endLocation,
    distance,
    validationResult,
    isLoading,
    calculateDistance,
  } = useDistanceCalculator();
</script>
