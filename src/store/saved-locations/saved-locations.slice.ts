import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedLocations {
  id: string;
  userId: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface SavedLocationsState {
  savedLocations: SavedLocations[];
  loading: boolean;
  error: string | null;
}

const initialState: SavedLocationsState = {
  savedLocations: [],
  loading: false,
  error: null,
};

const savedLocationsSlice = createSlice({
  name: "savedLocations",
  initialState,
  reducers: {
    fetchSavedLocationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSavedLocationsSuccess(state, action: PayloadAction<SavedLocations[]>) {
      state.savedLocations = action.payload;
      state.loading = false;
    },
    fetchSavedLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSavedLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    addSavedLocationSuccess(state, action: PayloadAction<SavedLocations>) {
      console.log("Adding location:", action.payload);
      if (!state.savedLocations.includes(action.payload)) {
        state.loading = false;
        state.savedLocations.push(action.payload);
      }
    },
    addSavedLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    removeSavedLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    removeSavedLocationSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.savedLocations = state.savedLocations.filter(
        (loc) => loc.id !== action.payload
      );
    },
    removeSavedLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllSavedLocationsStart(state) {
      state.loading = true;
      state.error = null;
      state.savedLocations = [];
    },
    fetchAllSavedLocationsSuccess(
      state,
      action: PayloadAction<SavedLocations[]>
    ) {
      state.savedLocations = action.payload;
      state.loading = false;
    },
    fetchAllSavedLocationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSavedLocationsStart,
  fetchSavedLocationsSuccess,
  fetchSavedLocationFailure,
  addSavedLocationStart,
  addSavedLocationSuccess,
  addSavedLocationFailure,
  removeSavedLocationStart,
  removeSavedLocationSuccess,
  removeSavedLocationFailure,
  fetchAllSavedLocationsStart,
  fetchAllSavedLocationsSuccess,
  fetchAllSavedLocationsFailure,
} = savedLocationsSlice.actions;

export default savedLocationsSlice.reducer;
