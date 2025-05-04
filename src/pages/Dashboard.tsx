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
import { toast, ToastContainer } from "react-toastify";

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

  const handleSearch = (query: string) => {
    dispatch(fetchWeatherByLocation(query));
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, [error]);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <ToastContainer />
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
          changePercentage={Number(
            (
              ((weeklyWeather[weeklyWeather.length - 1].temp -
                weeklyWeather[0].temp) /
                weeklyWeather[0].temp) *
              100
            ).toFixed(2)
          )} // Calculate percentage change based on weeklyWeather data
          weeklyData={weeklyWeather}
        />
      )}
    </div>
  );
};
export default Dashboard;
