import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  addSavedLocationFailure,
  addSavedLocationStart,
  addSavedLocationSuccess,
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
          fetchSavedLocationFailure("Failed to fetch current weather")
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

      console.log("token", token);
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
      const data2 = {
        id: data.data,
        location: location,
        latitude: latitude,
        longitude: longitude,
        userId: userId,
      };
      thunkAPI.dispatch(addSavedLocationSuccess(data2));
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
  async (userId: string, thunkAPI) => {
    try {
      // Get token
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("token", token);
      const removeSavedLocation = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("removeSavedLocation", removeSavedLocation);

      if (!removeSavedLocation.ok) {
        thunkAPI.dispatch(
          removeSavedLocationFailure("Failed to fetch current weather")
        );
        return;
      }
      //success
      const data = await removeSavedLocation.json();
      thunkAPI.dispatch(removeSavedLocationSuccess(data));
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to remove location"
      );
    }
  }
);
