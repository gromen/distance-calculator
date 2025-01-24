import { computed, ref } from 'vue';
import { IGPSCoordinates } from '../types/gps.types';
import axios from 'axios';
import { fetchLocations, getNearbyPlaces } from '../utils/utils';
import { validate } from '../validators/gpsValidators';

export function useDistanceCalculator() {
  const coordinates = ref<IGPSCoordinates>({
    startLat: 0,
    startLng: 0,
    endLat: 0,
    endLng: 0,
  });
  const startLocation = ref<string | null>(null);
  const endLocation = ref<string | null>(null);
  const distance = ref<{ meters: number } | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const validationResult = computed(() => validate(coordinates.value));

  const calculateDistance = async () => {
    if (!validationResult.value.isValid) return;

    try {
      isLoading.value = true;
      error.value = null;

      const [distanceResponse, locations] = await Promise.all([
        axios.post('/api/calculate-distance', {
          startLat: Number(coordinates.value.startLat),
          startLng: Number(coordinates.value.startLng),
          endLat: Number(coordinates.value.endLat),
          endLng: Number(coordinates.value.endLng),
        }),
        fetchLocations(coordinates.value),
      ]);

      startLocation.value = locations.start;
      endLocation.value = locations.end;
      distance.value = distanceResponse.data;
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Failed to calculate distance';
    } finally {
      isLoading.value = false;
    }
  };
  return {
    coordinates,
    startLocation,
    endLocation,
    distance,
    validationResult,
    isLoading,
    error,
    calculateDistance,
  };
}
