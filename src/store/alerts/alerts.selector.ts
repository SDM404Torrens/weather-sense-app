import { RootState } from "../store";

export const selectAllAlerts = (state: RootState) => state.alerts;
export const selectIsLoading = (state: RootState) => state.alerts.loading;
export const selectAlertsByLocation = (state: RootState) =>
  state.alerts.alertsByLocation;
