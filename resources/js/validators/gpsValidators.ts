import { IValidationResult, IGPSCoordinates } from '../types/types';

const LATITUDE = {
  MIN: -90,
  MAX: 90,
} as const;

const LONGITUDE = {
  MIN: -180,
  MAX: 180,
} as const;

export type NumericValidationMethod = (input: number) => boolean;
export type StringValidationMethod = (input: number) => boolean;
const isInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;
const isNotEmpty = (coordinates: IGPSCoordinates): boolean => {
  return Object.values(coordinates).every(
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== '' &&
      value.toString().trim() !== ''
  );
};

const isValidLat: NumericValidationMethod = (value: number) =>
  isInRange(value, LATITUDE.MIN, LATITUDE.MAX);
const isValidLng: NumericValidationMethod = (value: number) =>
  isInRange(value, LONGITUDE.MIN, LONGITUDE.MAX);

export const validate = (coordinates: IGPSCoordinates): IValidationResult => {
  if (!isNotEmpty(coordinates)) {
    return {
      isValid: false,
      errors: {
        startLat: false,
        startLng: false,
        endLat: false,
        endLng: false,
      },
    };
  }

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
