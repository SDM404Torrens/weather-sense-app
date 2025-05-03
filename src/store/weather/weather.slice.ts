import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentWeather,
  WeatherState,
  WeeklyWeatherData,
} from "./weather.types";

const initialState: WeatherState = {
  currentWeather: null,
  weeklyWeather: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCurrentWeatherSuccess(state, action: PayloadAction<CurrentWeather>) {
      state.currentWeather = action.payload;
      state.loading = false;
    },
    fetchWeeklyWeatherSuccess(
      state,
      action: PayloadAction<WeeklyWeatherData[]>
    ) {
      state.weeklyWeather = action.payload;
      state.loading = false;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearWeatherData(state) {
      state.currentWeather = null;
      state.weeklyWeather = [];
    },
  },
});

export const {
  fetchWeatherStart,
  fetchCurrentWeatherSuccess,
  fetchWeeklyWeatherSuccess,
  fetchWeatherFailure,
  clearWeatherData,
} = weatherSlice.actions;

export default weatherSlice.reducer;
