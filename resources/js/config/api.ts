import axios, { AxiosResponse } from 'axios';
import type {
  IDistanceResponse,
  ILocationResponse,
  IAPIError,
  INearbyPlacesResponse,
  IGPSCoordinates,
} from '../types/types';

type APIResponse<T> = Promise<AxiosResponse<T>['data']>;

const getNearbyPlaces = async (
  lat: number,
  lng: number
): APIResponse<INearbyPlacesResponse> => {
  try {
    const { data } = await axios.get<INearbyPlacesResponse>(
      `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat.toFixed(6)}&lon=${lng.toFixed(6)}`
    );
    if (data.error) {
      throw new Error(`${data.error}. Fix GPS coordinates, please.`);
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError<IAPIError>(error)) {
      throw new Error(
        error.response?.data.message || 'Failed to fetch nearby places'
      );
    }
    throw error;
  }
};

export const calculateDistanceApi = async (
  coordinates: IGPSCoordinates
): APIResponse<IDistanceResponse> => {
  try {
    const { data } = await axios.post<IDistanceResponse>(
      '/api/calculate-distance',
      coordinates
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError<IAPIError>(error)) {
      throw new Error(
        error.response?.data.message || 'Failed to calculate distance'
      );
    }
    throw error;
  }
};

export const fetchLocations = async (
  coordinates: IGPSCoordinates
): APIResponse<ILocationResponse> => {
  try {
    const [startPlaces, endPlaces] = await Promise.all([
      getNearbyPlaces(coordinates.startLat, coordinates.startLng),
      getNearbyPlaces(coordinates.endLat, coordinates.endLng),
    ]);

    return {
      start:
        startPlaces.features[0]?.properties.display_name || 'Unknown location',
      end: endPlaces.features[0]?.properties.display_name || 'Unknown location',
    };
  } catch (error) {
    if (axios.isAxiosError<IAPIError>(error)) {
      throw new Error(
        error.response?.data.message || 'Failed to fetch locations'
      );
    }
    throw error;
  }
};
