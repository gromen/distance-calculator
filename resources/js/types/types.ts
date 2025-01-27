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

export interface ILocationResponse {
  start: string;
  end: string;
}

export interface IDistanceResponse {
  kilometers: number;
  meters: number;
}

export interface ICalculateDistanceResponse {
  distance: IDistanceResponse;
  locations: ILocationResponse;
}

export interface IPlaceProperties {
  display_name: string;
  // dodaj inne właściwości jeśli są potrzebne
}

export interface IPlaceFeature {
  properties: IPlaceProperties;
}

export interface INearbyPlacesResponse {
  features: IPlaceFeature[];
  error?: string;
}

export interface IAPIError {
  message: string;
  status: number;
}
