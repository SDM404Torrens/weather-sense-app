import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  fetchAllAlertsStart,
  fetchAllAlertsSuccess,
  fetchAllAlertsFailure,
  addAlertStart,
  addAlertSuccess,
  addAlertFailure,
  removeAlertSuccess,
  removeAlertFailure,
  removeAlertStart,
} from "./alerts.slice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/UserEvents";

interface SaveAlertParams {
  userId: string;
  name: string;
  start_Date: string;
  end_Date: string;
  desired_Weather: number;
  location: string;
  latitude: number;
  longitude: number;
}

export const fetchAllAlerts = createAsyncThunk(
  "alerts/fetch",
  async (userId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchAllAlertsStart());
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(
          fetchAllAlertsFailure("No authentication token found")
        );
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/list/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        thunkAPI.dispatch(fetchAllAlertsFailure("Failed to fetch all alerts"));
        return;
      }

      const data = await response.json();
      thunkAPI.dispatch(fetchAllAlertsSuccess(data.data));
    } catch (error: any) {
      thunkAPI.dispatch(fetchAllAlertsFailure(error.message));
      throw error;
    }
  }
);

export const addAlert = createAsyncThunk(
  "alerts/add",
  async (alertData: SaveAlertParams, thunkAPI) => {
    try {
      thunkAPI.dispatch(addAlertStart());
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(addAlertFailure("No authentication token found"));
        throw new Error("No authentication token found");
      }

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(alertData),
      });

      if (!response.ok) {
        thunkAPI.dispatch(addAlertFailure("Failed to add alert"));
        return;
      }

      const data = await response.json();
      const newAlert = { ...alertData, id: data.data };
      thunkAPI.dispatch(addAlertSuccess(newAlert));
      return newAlert;
    } catch (error: any) {
      thunkAPI.dispatch(addAlertFailure(error.message));
      throw error;
    }
  }
);

export const removeAlert = createAsyncThunk(
  "alerts/remove",
  async (alertId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(removeAlertStart());
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(removeAlertFailure("No authentication token found"));
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/${alertId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        thunkAPI.dispatch(removeAlertFailure("Failed to remove alert"));
        return;
      }

      thunkAPI.dispatch(removeAlertSuccess(alertId));
    } catch (error: any) {
      thunkAPI.dispatch(addAlertFailure(error.message));
      throw error;
    }
  }
);
