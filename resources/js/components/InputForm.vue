<template>
  <div class="sm:col-span-3">
    <label :for="id" class="block text-sm/6 font-medium text-gray-900">
      {{ label }}
    </label>
    <div class="mt-2">
      <input
        type="number"
        :id="id"
        :name="id"
        required
        :value="modelValue"
        @input="handleInput"
        step="0.000001"
        :min="isLatitude ? -90 : -180"
        :max="isLatitude ? 90 : 180"
        :placeholder="placeholder"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
    <Error v-if="!isFieldValid" :message="getMessage" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Error from './Error.vue';
  import { formInputs } from '../config/formInputs';
  import {
    isLatitudeField,
    isCoordinateInRange,
    getValidationMessage,
  } from '../validators/gpsValidators';

  interface IInputFormProps {
    modelValue: number;
    id: string;
    label: string;
    placeholder: string;
    isValid: boolean;
    errorMessage: string;
  }

  const props = defineProps<IInputFormProps>();
  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();
  const isLatitude = computed(() => isLatitudeField(props.id));
  const isFieldValid = computed(() => {
    if (!props.isValid) return false;
    return isCoordinateInRange(props.modelValue, isLatitude.value);
  });

  const getMessage = computed(() => {
    const input = formInputs.find((input) => input.id === props.id);
    return getValidationMessage(
      props.isValid,
      props.modelValue,
      isLatitude.value,
      props.errorMessage,
      input
    );
  });

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    emit('update:modelValue', value);
  };
</script>
