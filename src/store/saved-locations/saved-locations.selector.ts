import { RootState } from "../store";

export const selectSavedLocations = (state: RootState) =>
  state.savedLocations.savedLocations;

export const selectSavedLocationsLoading = (state: RootState) =>
  state.savedLocations.loading;

export const selectSavedLocationsError = (state: RootState) =>
  state.savedLocations.error;

export const selectIsLocationSaved = (state: RootState, locationName: string) =>
  state.savedLocations.savedLocations.some(
    (loc) => loc.location === locationName
  );
