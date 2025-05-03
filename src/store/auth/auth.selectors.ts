import { decodeToken } from "../../utils/token.utils";
import { RootState } from "../store";

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectUserId = (state: RootState) => {
  return (
    state.auth.user?.id ||
    (state.auth.token ? decodeToken(state.auth.token)?.nameid : "") ||
    ""
  );
};
