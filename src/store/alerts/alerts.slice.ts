import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherCondition {
  type: string;
  value: number;
}

interface Alert {
  id?: string;
  userId: string;
  name: string;
  start_Date: string;
  end_Date: string;
  desired_Weather: number;
  location: string;
  latitude: number;
  longitude: number;
}

interface AlertsState {
  alerts: Alert[];
  weatherConditions: WeatherCondition[];
  alertsByLocation: Record<string, boolean>;
  loading: boolean;
  error: string | null;
}

const initialState: AlertsState = {
  alerts: [],
  weatherConditions: [],
  alertsByLocation: {} as Record<string, boolean>,
  loading: false,
  error: null,
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    fetchAllAlertsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllAlertsSuccess(state, action: PayloadAction<Alert[]>) {
      state.alerts = action.payload;
      state.loading = false;
      state.alertsByLocation = action.payload.reduce((acc, alert) => {
        acc[alert.location] = true;
        return acc;
      }, {} as Record<string, boolean>);
    },
    fetchAllAlertsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addAlertStart(state) {
      state.loading = true;
      state.error = null;
    },
    addAlertSuccess(state, action: PayloadAction<Alert>) {
      console.log("Adding alert payload:", action.payload);
      state.loading = false;
      state.alerts.push(action.payload);
      state.alertsByLocation[action.payload.location] = true;
    },
    addAlertFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    removeAlertStart(state) {
      state.loading = true;
      state.error = null;
    },
    removeAlertSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
    removeAlertFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllAlertsStart,
  fetchAllAlertsSuccess,
  fetchAllAlertsFailure,
  addAlertStart,
  addAlertSuccess,
  addAlertFailure,
  removeAlertStart,
  removeAlertSuccess,
  removeAlertFailure,
} = alertsSlice.actions;

export default alertsSlice.reducer;
