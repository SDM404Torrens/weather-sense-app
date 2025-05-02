import { combineReducers } from "@reduxjs/toolkit";
import temperatureReducer from "./tempeture/tempeture.slice";
import authReducer from "./auth/auth.slice";
import weatherReducer from "./weather/weather.slice";

export const rootReducer = combineReducers({
  temperature: temperatureReducer,
  auth: authReducer,
  weather: weatherReducer,
});
