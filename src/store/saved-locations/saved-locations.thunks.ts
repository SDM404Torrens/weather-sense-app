import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  addSavedLocationFailure,
  addSavedLocationStart,
  addSavedLocationSuccess,
  fetchAllSavedLocationsFailure,
  fetchAllSavedLocationsStart,
  fetchAllSavedLocationsSuccess,
  fetchSavedLocationFailure,
  removeSavedLocationFailure,
  removeSavedLocationSuccess,
} from "./saved-locations.slice";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL + "/UserFavoriteLocations";
console.log("API_BASE_URL", API_BASE_URL);

interface SaveLocationParams {
  location: string;
  latitude: number;
  longitude: number;
  userId: string;
}

export const fetchSavedLocation = createAsyncThunk(
  "savedLocations/fetch",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(
          fetchSavedLocationFailure("No authentication token found")
        );
        throw new Error("No authentication token found");
      }

      console.log("token", token);
      const savedLocationResponse = await fetch(`${API_BASE_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("savedLocationResponse", savedLocationResponse);

      if (!savedLocationResponse.ok) {
        thunkAPI.dispatch(
          fetchSavedLocationFailure("Failed to fetch saved location")
        );
        return;
      }
      const data = await savedLocationResponse.json();
      thunkAPI.dispatch(fetchSavedLocation(data));
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch saved locations"
      );
    }
  }
);

export const addSavedLocation = createAsyncThunk(
  "savedLocations/add",
  async (
    { userId, location, latitude, longitude }: SaveLocationParams,
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(addSavedLocationStart());
      // Get token
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(
          addSavedLocationFailure("No authentication token found")
        );
        throw new Error("No authentication token found");
      }

      if (state.savedLocations.savedLocations.length >= 6) {
        thunkAPI.dispatch(
          addSavedLocationFailure("Maximum of 6 locations allowed")
        );
        throw new Error("Maximum of 6 locations allowed");
      }

      const savedLocationsResponse = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location,
          latitude,
          longitude,
          userId,
        }),
      });
      console.log("savedLocationsResponse", savedLocationsResponse);

      if (!savedLocationsResponse.ok) {
        thunkAPI.dispatch(addSavedLocationFailure("Could not save location"));
        return;
      }

      const data = await savedLocationsResponse.json();
      const dataMap = {
        id: data.data,
        location: location,
        latitude: latitude,
        longitude: longitude,
        userId: userId,
      };
      thunkAPI.dispatch(addSavedLocationSuccess(dataMap));
      return location;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to save location"
      );
    }
  }
);

export const removeSavedLocation = createAsyncThunk(
  "savedLocations/remove",
  async (locationId: string, thunkAPI) => {
    try {
      // Get token
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(
          removeSavedLocationFailure("No authentication token found")
        );
        throw new Error("No authentication token found");
      }
      const removeSavedLocation = await fetch(`${API_BASE_URL}/${locationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!removeSavedLocation.ok) {
        thunkAPI.dispatch(
          removeSavedLocationFailure("Failed to remove saved location")
        );
        return;
      }
      thunkAPI.dispatch(removeSavedLocationSuccess(locationId));
    } catch (error: any) {
      thunkAPI.dispatch(
        removeSavedLocationFailure("Failed to remove saved locations")
      );
      throw new Error(
        error.response?.data?.message || "Failed to remove location"
      );
    }
  }
);

export const fetchAllSavedLocations = createAsyncThunk(
  "savedLocations/fetch/all",
  async (userId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchAllSavedLocationsStart());
      // Get token
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(
          fetchAllSavedLocationsFailure("No authentication token found")
        );
        throw new Error("No authentication token found");
      }

      console.log("token", token);
      const fetchAllSavedLocationsResponse = await fetch(
        `${API_BASE_URL}/list/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "fetchAllSavedLocationsResponse",
        fetchAllSavedLocationsResponse
      );

      if (!fetchAllSavedLocationsResponse.ok) {
        thunkAPI.dispatch(
          fetchAllSavedLocationsFailure("Could not fetch all saved location")
        );
        return;
      }

      const data = await fetchAllSavedLocationsResponse.json();
      const dataMap = data.data.map((item: any) => ({
        id: item.id,
        location: item.location,
        latitude: item.latitude,
        longitude: item.longitude,
      }));
      thunkAPI.dispatch(fetchAllSavedLocationsSuccess(dataMap));
      return location;
    } catch (error: any) {
      thunkAPI.dispatch(
        fetchAllSavedLocationsFailure("Failed to fetch all saved locations")
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch all saved locations"
      );
    }
  }
);
