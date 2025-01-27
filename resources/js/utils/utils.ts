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

    console.log('startPlaces', startPlaces);

    return {
      start:
        startPlaces.features[0]?.properties.display_name || 'Unknown location',
      end: endPlaces.features[0]?.properties.display_name || 'Unknown location',
    };
  } catch (error) {
    if (axios.isAxiosError<IAPIError>(error)) {
      console.log('error', error);
      throw new Error(
        error.response?.data.message || 'Failed to fetch locations'
      );
    }
    throw error;
  }
};

// export const getNearbyPlaces = async (lat: number, lng: number) => {
//   try {
//     const response = await axios.get(
//       `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat.toFixed(6)}&lon=${lng.toFixed(6)}`
//     );

//     if (response.data.error) {
//       throw response.data.error;
//     }

//     return response.data.features[0]?.properties.display_name;
//   } catch (error) {
//     console.error('Error fetching place name:', error);
//   }
// };

// export const fetchLocations = async (coordinates: IGPSCoordinates) => {
//   const start = await getNearbyPlaces(
//     coordinates.startLat,
//     coordinates.startLng
//   );
//   if (!start) throw new Error('Invalid start coordinates');

//   const end = await getNearbyPlaces(coordinates.endLat, coordinates.endLng);
//   if (!end) throw new Error('Invalid end coordinates');

//   return { start, end };
// };

// export const calculateDistanceApi = async (coordinates: IGPSCoordinates) => {
//   const response = await axios.post('/api/calculate-distance', {
//     startLat: Number(coordinates.startLat),
//     startLng: Number(coordinates.startLng),
//     endLat: Number(coordinates.endLat),
//     endLng: Number(coordinates.endLng),
//   });
//   return response.data;
// };
