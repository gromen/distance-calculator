export interface IGPSCoordinates {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export interface IValidationResult {
  isValid: boolean;
  errors: {
    startLat: boolean;
    startLng: boolean;
    endLat: boolean;
    endLng: boolean;
  };
}

export interface IDistance {
  kilometers: number;
  meters: number;
}

export type NumericValidationMethod = (input: number) => boolean;
