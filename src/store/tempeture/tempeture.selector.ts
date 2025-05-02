import { RootState } from "../store";

export const selectUnit = (state: RootState) => state.temperature.unit;
