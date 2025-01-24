import axios from 'axios';
import { IGPSCoordinates } from '../types/types';

export const getNearbyPlaces = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat.toFixed(7)}&lon=${lng.toFixed(7)}`
    );

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data.features[0]?.properties.display_name;
  } catch (error) {
    console.error('Error fetching place name:', error);
  }
};

export const fetchLocations = async (coordinates: IGPSCoordinates) => {
  const start = await getNearbyPlaces(
    coordinates.startLat,
    coordinates.startLng
  );
  if (!start) throw new Error('Invalid start coordinates');

  const end = await getNearbyPlaces(coordinates.endLat, coordinates.endLng);
  if (!end) throw new Error('Invalid end coordinates');

  return { start, end };
};

export const calculateDistanceApi = async (coordinates: IGPSCoordinates) => {
  const response = await axios.post('/api/calculate-distance', {
    startLat: Number(coordinates.startLat),
    startLng: Number(coordinates.startLng),
    endLat: Number(coordinates.endLat),
    endLng: Number(coordinates.endLng),
  });
  return response.data;
};
