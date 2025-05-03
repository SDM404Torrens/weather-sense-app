import { RootState } from "../store";

export const selectSavedLocations = (state: RootState) =>
  state.savedLocations.savedLocations;

export const selectSavedLocationsLoading = (state: RootState) =>
  state.savedLocations.loading;

export const selectSavedLocationsError = (state: RootState) =>
  state.savedLocations.error;

export const selectIsLocationSaved = (
  state: RootState,
  location: string,
  lat?: number,
  lon?: number
) => {
  return state.savedLocations.savedLocations.some(
    (loc) =>
      loc.location === location ||
      (lat !== undefined &&
        lon !== undefined &&
        loc.latitude === lat &&
        loc.longitude === lon)
  );
};
