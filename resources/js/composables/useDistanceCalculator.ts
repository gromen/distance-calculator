import { computed, ref } from 'vue';
import { IDistance, IGPSCoordinates } from '../types/types';
import { calculateDistanceApi, fetchLocations } from '../config/api';
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
  const distance = ref<IDistance | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const validationResult = computed(() => validate(coordinates.value));

  const calculateDistance = async () => {
    if (!validationResult.value.isValid) return;

    try {
      isLoading.value = true;
      error.value = null;

      const [distanceResponse, locations] = await Promise.all([
        calculateDistanceApi(coordinates.value),
        fetchLocations(coordinates.value),
      ]);

      startLocation.value = locations.start;
      endLocation.value = locations.end;
      distance.value = distanceResponse;
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
