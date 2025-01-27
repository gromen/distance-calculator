<template>
  <template v-if="!isLoading">
    <LocationNames
      :start-location="startLocation"
      :end-location="endLocation"
      :distance="distance"
    />
  </template>
  <template v-else>
    <LoadingSpinner />
  </template>
  <p v-if="error" class="text-red-700">{{ error }}</p>

  <form @submit.prevent="calculateDistance">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <InputForm
            v-for="input in formInputs"
            :key="input.id"
            :id="input.id"
            :label="input.label"
            :placeholder="input.placeholder"
            :error-message="input.errorMessage"
            :is-valid="validationResult.errors[input.coordKey]"
            :model-value="coordinates[input.coordKey]"
            @update:model-value="coordinates[input.coordKey] = Number($event)"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        :disabled="!validationResult.isValid"
        type="submit"
        :class="[
          BUTTON_CLASSES.primary,
          !validationResult.isValid && BUTTON_CLASSES.disabled,
        ]"
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
  import { formInputs } from '../config/formInputs';
  import { BUTTON_CLASSES } from '../styles/constants';

  const {
    coordinates,
    startLocation,
    endLocation,
    distance,
    validationResult,
    isLoading,
    error,
    calculateDistance,
  } = useDistanceCalculator();
</script>
