<template>
  <p class="text-red-600" v-text="message" />
</template>

<script setup lang="ts">
  interface Props {
    message: string;
  }

  defineProps<Props>();
</script>
