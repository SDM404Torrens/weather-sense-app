import React from "react";
import { RootState } from "../store";
import { FaWind, FaCloud, FaTachometerAlt } from "react-icons/fa";
import { RiWaterPercentLine } from "react-icons/ri";

export const selectCurrentWeather = (state: RootState) =>
  state.weather.currentWeather;
export const selectWeeklyWeather = (state: RootState) =>
  state.weather.weeklyWeather;
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;

export const selectWeatherMetrics = (state: RootState) => {
  const current = state.weather.currentWeather;
  if (!current) return null;

  return [
    {
      icon: React.createElement(FaWind),
      title: "Wind Speed",
      value: current.metrics.windSpeed,
    },
    {
      icon: React.createElement(FaCloud),
      title: "Cloudiness",
      value: current.metrics.cloudiness,
    },
    {
      icon: React.createElement(FaTachometerAlt),
      title: "Pressure",
      value: current.metrics.pressure,
    },
    {
      icon: React.createElement(RiWaterPercentLine),
      title: "Humidity",
      value: current.metrics.humidity,
    },
  ];
};

export const selectWeatherConditions = (state: RootState) =>
  state.weather.weatherConditions;
