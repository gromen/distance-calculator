import { IValidationResult } from '../gps.types';

import { IGPSCoordinates } from '../gps.types';

const LATITUDE = {
  MIN: -90,
  MAX: 90,
} as const;

const LONGITUDE = {
  MIN: -180,
  MAX: 180,
} as const;

export type NumericValidationMethod = (input: number) => boolean;
const isInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

const isValidLat: NumericValidationMethod = (value: number) =>
  isInRange(value, LATITUDE.MIN, LATITUDE.MAX);
const isValidLng: NumericValidationMethod = (value: number) =>
  isInRange(value, LONGITUDE.MIN, LONGITUDE.MAX);

export const validate = (coordinates: IGPSCoordinates): IValidationResult => {
  const { startLat, endLat, startLng, endLng } = coordinates;

  const errors = {
    startLat: isValidLat(startLat),
    startLng: isValidLng(startLng),
    endLat: isValidLat(endLat),
    endLng: isValidLng(endLng),
  };

  return {
    isValid: Object.values(errors).every(Boolean),
    errors,
  };
};
