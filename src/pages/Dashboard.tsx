import WeatherCard from "../components/card/card.weather.component";
import Header from "../components/layout/header.component";
import WeatherChart from "../components/chart/weather.chart";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  selectCurrentWeather,
  selectWeatherError,
  selectWeatherLoading,
  selectWeatherMetrics,
  selectWeeklyWeather,
} from "../store/weather/weather.selector";
import { fetchWeatherByLocation } from "../store/weather/weather.thunk";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const currentWeather = useSelector(selectCurrentWeather);
  const weeklyWeather = useSelector(selectWeeklyWeather);
  const metrics = useSelector(selectWeatherMetrics);
  const loading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);

  // Initial load - current location || selected location
  useEffect(() => {
    dispatch(fetchWeatherByLocation("Santo Domingo"));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(fetchWeatherByLocation(query));
  };

  if (loading) return <div>Loading weather data...</div>; // todo better loading state
  if (error) return <div>Error: {error}</div>; //todo better error handling showing error message

  return (
    <div className="p-6">
      {currentWeather && (
        <Header
          date={new Date(
            new Date().getTime() + currentWeather.timezone * 1000
          ).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          weatherData={{
            currentTemp: currentWeather.temp,
            location: currentWeather.location,
          }}
          onSearch={handleSearch}
        />
      )}

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <WeatherCard
              key={index}
              icon={metric.icon}
              title={metric.title}
              value={metric.value}
              change={""} // todo: calculate base on data
            />
          ))}
        </div>
      )}
      {weeklyWeather.length > 0 && (
        <WeatherChart
          title="Weekly Temperature"
          description="7-week average"
          changePercentage={5} // todo: calculate base on data
          weeklyData={weeklyWeather}
        />
      )}
    </div>
  );
};
export default Dashboard;
