import { combineReducers } from "@reduxjs/toolkit";
import  temperatureReducer  from "./tempeture/tempeture.slice";

export const rootReducer = combineReducers({
  temperature: temperatureReducer,
});