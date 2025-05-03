export interface WeatherMetrics {
  windSpeed: string;
  cloudiness: string;
  pressure: string;
  humidity: string;
}

export interface CurrentWeather {
  temp: number;
  location: string;
  timezone: number;
  metrics: WeatherMetrics;
  longitude: number;
  latitude: number;
}

export interface WeeklyWeatherData {
  week: string;
  temp: number;
}

export interface WeatherState {
  currentWeather: CurrentWeather | null;
  weeklyWeather: WeeklyWeatherData[];
  loading: boolean;
  error: string | null;
}
