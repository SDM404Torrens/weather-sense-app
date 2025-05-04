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
import { useCallback, useEffect } from "react";
import Loading from "../components/loading/loading.component";
import { selectUserId } from "../store/auth/auth.selectors";
import { fetchAllSavedLocations } from "../store/saved-locations/saved-locations.thunks";

// Debounce
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const currentWeather = useSelector(selectCurrentWeather);
  const weeklyWeather = useSelector(selectWeeklyWeather);
  const metrics = useSelector(selectWeatherMetrics);
  const loading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);
  const userId = useSelector(selectUserId);

  // Initial load - current location || selected location //todo: get current location of user
  useEffect(() => {
    dispatch(fetchWeatherByLocation("Santo Domingo"));
  }, [dispatch]);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchAllSavedLocations(userId));
    }
  }, [dispatch, userId]);

  // Debounced
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim().length > 4) {
        dispatch(fetchWeatherByLocation(query));
      }
    }, 500), // 500ms delay
    [dispatch]
  );

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  if (loading) return <Loading />;
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
            latitude: currentWeather.latitude,
            longitude: currentWeather.longitude,
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
