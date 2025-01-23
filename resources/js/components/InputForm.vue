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
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        step="0.00000001"
        :placeholder="placeholder"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
    <Error v-if="!isValid" :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
  import Error from './Error.vue';

  interface IInputFormProps {
    modelValue: number;
    id: string;
    label: string;
    placeholder: string;
    isValid: boolean;
    errorMessage: string;
  }

  defineProps<IInputFormProps>();
  defineEmits<{
    'update:modelValue': [value: string];
  }>();
</script>
