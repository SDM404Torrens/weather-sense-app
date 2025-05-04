import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWeatherStart,
  fetchCurrentWeatherSuccess,
  fetchWeeklyWeatherSuccess,
  fetchWeatherFailure,
  fetchWeatherConditionsStart,
  fetchWeatherConditionsFailure,
  fetchWeatherConditionsSuccess,
} from "./weather.slice";
import { CurrentWeather, WeeklyWeatherData } from "./weather.types";
import { RootState } from "../store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/WeatherInformation";

// todo to move to weather.types.ts
interface ApiWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
  };
  name: string;
  weather: Array<{
    main: string;
    description: string;
  }>;
  coord: {
    lon: number;
    lat: number;
  };
  timezone: number;
}

const mapCurrentWeatherData = (apiData: ApiWeatherResponse): CurrentWeather => {
  console.log("apiData", apiData);
  console.log("main", apiData.main);
  return {
    temp: apiData.main.temp,
    timezone: apiData.timezone,
    longitude: apiData.coord.lon,
    latitude: apiData.coord.lat,
    location: `${apiData.name}, ${apiData.sys.country}`,
    metrics: {
      windSpeed: `${apiData.wind.speed} m/s`,
      cloudiness: `${apiData.clouds.all}%`,
      pressure: `${apiData.main.pressure} hpa`,
      humidity: `${apiData.main.humidity}%`,
    },
  };
};

const mapWeeklyWeatherData = (apiData: any): WeeklyWeatherData[] => {
  return apiData.list.map((day: any, index: number) => ({
    week: `Week ${index + 1}`,
    temp: day.temp.day,
  }));
};

export const fetchWeatherByLocation = createAsyncThunk(
  "weather/fetchByLocation",
  async (location: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchWeatherStart());
      const currentResponse = await fetch(
        `${API_BASE_URL}/currentweather/location/${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (true) {
        thunkAPI.dispatch(
          fetchWeatherFailure("Failed to fetch current weather")
        );
        return;
      }

      const currentData = await currentResponse.json();
      console.log("currentData", currentData);
      const currentWeather = mapCurrentWeatherData(currentData.data);
      thunkAPI.dispatch(fetchCurrentWeatherSuccess(currentWeather));

      //weekly weather
      const weeklyResponse = await fetch(
        `${API_BASE_URL}/dailyweather/location/${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!weeklyResponse.ok) {
        thunkAPI.dispatch(
          fetchWeatherFailure("Failed to fetch weekly weather")
        );
        return;
      }

      const weeklyData = await weeklyResponse.json();
      const weeklyWeather = mapWeeklyWeatherData(weeklyData.data);
      thunkAPI.dispatch(fetchWeeklyWeatherSuccess(weeklyWeather));
    } catch (error: any) {
      thunkAPI.dispatch(fetchWeatherFailure(error.message));
      throw error;
    }
  }
);

export const fetchWeatherConditions = createAsyncThunk(
  "weather/fetchWeatherConditions",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchWeatherConditionsStart());
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        thunkAPI.dispatch(
          fetchWeatherConditionsFailure("No authentication token found")
        );
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/weathertypes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        thunkAPI.dispatch(
          fetchWeatherConditionsFailure("Failed to fetch weather conditions")
        );
        return;
      }

      const data = await response.json();
      thunkAPI.dispatch(fetchWeatherConditionsSuccess(data.data));
    } catch (error: any) {
      thunkAPI.dispatch(fetchWeatherConditionsFailure(error.message));
      throw error;
    }
  }
);
