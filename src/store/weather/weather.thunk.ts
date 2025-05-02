import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWeatherStart,
  fetchCurrentWeatherSuccess,
  fetchWeeklyWeatherSuccess,
  fetchWeatherFailure,
} from "./weather.slice";
import { CurrentWeather, WeeklyWeatherData } from "./weather.types";

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
  timezone: number;
}

const mapCurrentWeatherData = (apiData: ApiWeatherResponse): CurrentWeather => {
  console.log("apiData", apiData);
  console.log("main", apiData.main);
  return {
    temp: apiData.main.temp,
    timezone: apiData.timezone,
    location: `${apiData.name}, ${apiData.sys.country}`,
    metrics: {
      windSpeed: `${apiData.wind.speed} km/h`,
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
      //   dispatch(fetchWeatherStart());
      thunkAPI.dispatch(fetchWeatherStart());

      // // Get token from Redux state
      // const state = thunkAPI.getState() as RootState;
      // const token = state.auth.token;

      // if (!token) {
      //   throw new Error("No authentication token found");
      // }

      // console.log("token", token);
      // current weather
      const currentResponse = await fetch(
        `${API_BASE_URL}/currentweather/location/${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("currentResponse)", currentResponse);

      if (!currentResponse.ok) {
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
            // Authorization: `Bearer ${token}`,
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
      console.log("weeklyData", weeklyData);
      const weeklyWeather = mapWeeklyWeatherData(weeklyData.data);
      console.log("weeklyWeather", weeklyWeather);
      thunkAPI.dispatch(fetchWeeklyWeatherSuccess(weeklyWeather));
    } catch (error: any) {
      thunkAPI.dispatch(fetchWeatherFailure(error.message));
      throw error;
    }
  }
);
