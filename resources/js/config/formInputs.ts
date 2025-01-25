import type { IGPSCoordinates } from '../types/types';

export interface IFormInput {
  id: string;
  coordKey: keyof IGPSCoordinates;
  label: string;
  placeholder: string;
  errorMessage: string;
}

export const formInputs: readonly IFormInput[] = [
  {
    id: 'startLat',
    coordKey: 'startLat',
    label: 'Start Latitude',
    placeholder: 'Start Latitude',
    errorMessage: 'Latitude should be range from (-90, 90)',
  },
  {
    id: 'startLng',
    coordKey: 'startLng',
    label: 'Start Longitude',
    placeholder: 'Start Longitude',
    errorMessage: 'Longitude should be range from (-180, 180)',
  },
  {
    id: 'endLat',
    coordKey: 'endLat',
    label: 'End Latitude',
    placeholder: 'End Latitude',
    errorMessage: 'Latitude should be range from (-90, 90)',
  },
  {
    id: 'endLng',
    coordKey: 'endLng',
    label: 'End Longitude',
    placeholder: 'End Longitude',
    errorMessage: 'Longitude should be range from (-180, 180)',
  },
] as const;
