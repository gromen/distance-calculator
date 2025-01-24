<template>
  <div class="mt-6">
    <div v-if="startLocation" class="mb-2">
      Start location: {{ startLocation }}
    </div>
    <div v-if="endLocation" class="mb-2">End location: {{ endLocation }}</div>
    <div v-if="distance">Distance: {{ distance.meters }} meters</div>
  </div>
</template>

<script lang="ts" setup>
  export interface LocationNamesProps {
    startLocation: string | null;
    endLocation: string | null;
    distance: { meters: number } | null;
  }

  defineProps<LocationNamesProps>();
</script>
