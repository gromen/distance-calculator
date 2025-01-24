<template>
  <div class="mt-6">
    <div v-if="startLocation" class="mb-2">
      <span class="font-bold">Start location:</span> {{ startLocation }}
    </div>
    <div v-if="endLocation" class="mb-2">
      <span class="font-bold">End location:</span> {{ endLocation }}
    </div>
    <div v-if="distance">
      <span class="font-bold">Distance:</span>
      {{ distance.meters }} m, {{ distance.kilometers }} km
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { IDistance } from '../types/types';

  export interface LocationNamesProps {
    startLocation: string | null;
    endLocation: string | null;
    distance: IDistance | null;
  }

  defineProps<LocationNamesProps>();
</script>
