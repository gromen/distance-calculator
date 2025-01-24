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
        @input="handleInput"
        step="0.00000001"
        :placeholder="placeholder"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
    <Error
      v-if="showEmptyError || !isValid"
      :message="showEmptyError ? 'This field cannot be empty' : errorMessage"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
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
  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const showEmptyError = ref(false);

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    showEmptyError.value = value === '';
    emit('update:modelValue', value);
  };
</script>
