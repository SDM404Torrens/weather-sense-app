import { RootState } from "../store";

export const selectAllAlerts = (state: RootState) => state.alerts.alerts;
export const selectIsLoading = (state: RootState) => state.alerts.loading;
export const selectAlertsByLocation = (state: RootState) =>
  state.alerts.alertsByLocation;

export const selectAlertError = (state: RootState) => state.alerts.error;
