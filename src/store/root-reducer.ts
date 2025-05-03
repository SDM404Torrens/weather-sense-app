import { combineReducers } from "@reduxjs/toolkit";
import temperatureReducer from "./tempeture/tempeture.slice";
import authReducer from "./auth/auth.slice";
import weatherReducer from "./weather/weather.slice";
import savedLocationsReducer from "./saved-locations/saved-locations.slice";

export const rootReducer = combineReducers({
  temperature: temperatureReducer,
  auth: authReducer,
  weather: weatherReducer,
  savedLocations: savedLocationsReducer,
});
