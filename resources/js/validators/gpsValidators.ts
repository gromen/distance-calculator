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
  return Object.values(coordinates).some((value) => value !== 0);
};
const isValidLat: NumericValidationMethod = (value: number) =>
  isInRange(value, LATITUDE.MIN, LATITUDE.MAX);
const isValidLng: NumericValidationMethod = (value: number) =>
  isInRange(value, LONGITUDE.MIN, LONGITUDE.MAX);
export const isLatitudeField = (id: string): boolean =>
  id.toLowerCase().includes('lat');

export const isCoordinateInRange = (
  value: number,
  isLatitude: boolean
): boolean => {
  if (isLatitude) {
    return value >= LATITUDE.MIN && value <= LATITUDE.MAX;
  }
  return value >= LONGITUDE.MIN && value <= LONGITUDE.MAX;
};

export const getCoordinateErrorMessage = (isLatitude: boolean): string => {
  return isLatitude
    ? `Latitude should be range from (${LATITUDE.MIN}, ${LATITUDE.MAX})`
    : `Longitude should be range from (${LONGITUDE.MIN}, ${LONGITUDE.MAX})`;
};

export const getValidationMessage = (
  isValid: boolean,
  modelValue: number,
  isLatitude: boolean,
  errorMessage: string,
  formInput?: { errorMessage: string }
): string => {
  if (!isValid) {
    return errorMessage;
  }

  if (!isCoordinateInRange(modelValue, isLatitude)) {
    return formInput?.errorMessage || getCoordinateErrorMessage(isLatitude);
  }

  return '';
};

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
