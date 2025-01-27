import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDistanceCalculator } from '../../composables/useDistanceCalculator';
import { calculateDistanceApi, fetchLocations } from '../../config/api';

// Mock external dependencies
vi.mock('../../config/api', () => ({
  calculateDistanceApi: vi.fn(),
  fetchLocations: vi.fn(),
}));

describe('useDistanceCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const {
      coordinates,
      startLocation,
      endLocation,
      distance,
      isLoading,
      error,
      validationResult,
    } = useDistanceCalculator();

    expect(coordinates.value).toEqual({
      startLat: 0,
      startLng: 0,
      endLat: 0,
      endLng: 0,
    });
    expect(startLocation.value).toBeNull();
    expect(endLocation.value).toBeNull();
    expect(distance.value).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
    expect(validationResult.value.isValid).toBe(true);
  });

  it('should calculate distance successfully', async () => {
    const mockDistance = { meters: 1000, kilometers: 1 };
    const mockLocations = {
      start: 'Start Location',
      end: 'End Location',
    };

    vi.mocked(calculateDistanceApi).mockResolvedValue(mockDistance);
    vi.mocked(fetchLocations).mockResolvedValue(mockLocations);

    const {
      coordinates,
      startLocation,
      endLocation,
      distance,
      isLoading,
      error,
      calculateDistance,
    } = useDistanceCalculator();

    coordinates.value = {
      startLat: 50,
      startLng: 20,
      endLat: 51,
      endLng: 21,
    };

    await calculateDistance();

    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
    expect(distance.value).toEqual(mockDistance);
    expect(startLocation.value).toBe(mockLocations.start);
    expect(endLocation.value).toBe(mockLocations.end);
  });

  it('should handle API errors', async () => {
    const errorMessage = 'API Error';
    vi.mocked(calculateDistanceApi).mockRejectedValue(new Error(errorMessage));

    const { coordinates, error, isLoading, calculateDistance } =
      useDistanceCalculator();

    coordinates.value = {
      startLat: 50,
      startLng: 20,
      endLat: 51,
      endLng: 21,
    };

    await calculateDistance();

    expect(isLoading.value).toBe(false);
    expect(error.value).toBe(errorMessage);
  });

  it('should not calculate if validation fails', async () => {
    const { coordinates, calculateDistance } = useDistanceCalculator();

    coordinates.value = {
      startLat: 91,
      startLng: 20,
      endLat: 51,
      endLng: 21,
    };

    await calculateDistance();

    expect(calculateDistanceApi).not.toHaveBeenCalled();
    expect(fetchLocations).not.toHaveBeenCalled();
  });

  it('should update loading state correctly', async () => {
    vi.mocked(calculateDistanceApi).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    vi.mocked(fetchLocations).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const { coordinates, isLoading, calculateDistance } =
      useDistanceCalculator();

    coordinates.value = {
      startLat: 50,
      startLng: 20,
      endLat: 51,
      endLng: 21,
    };

    const calculation = calculateDistance();
    expect(isLoading.value).toBe(true);

    await calculation;
    expect(isLoading.value).toBe(false);
  });
});
