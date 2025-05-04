import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentWeather,
  WeatherCondition,
  WeatherState,
  WeeklyWeatherData,
} from "./weather.types";

const initialState: WeatherState = {
  currentWeather: null,
  weeklyWeather: [],
  weatherConditions: [],
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
    fetchWeatherConditionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherConditionsSuccess(
      state,
      action: PayloadAction<WeatherCondition[]>
    ) {
      state.weatherConditions = action.payload;
      state.loading = false;
    },
    fetchWeatherConditionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchWeatherStart,
  fetchCurrentWeatherSuccess,
  fetchWeeklyWeatherSuccess,
  fetchWeatherFailure,
  clearWeatherData,
  fetchWeatherConditionsStart,
  fetchWeatherConditionsSuccess,
  fetchWeatherConditionsFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;
