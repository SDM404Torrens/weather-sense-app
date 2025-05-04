import { FaSearch } from "react-icons/fa";
import TemperatureToggle from "../toggle/toggle.temperature.component";
import { convertTemp } from "../../utils/tempeture.utils";
import { useSelector } from "react-redux";
import { selectUnit } from "../../store/tempeture/tempeture.selector";
import { RootState } from "../../store/store";
import {
  selectIsAuthenticated,
  selectUserId,
} from "../../store/auth/auth.selectors";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import {
  addSavedLocation,
  removeSavedLocation,
} from "../../store/saved-locations/saved-locations.thunks";
import {
  selectIsLocationSaved,
  selectSavedLocations,
} from "../../store/saved-locations/saved-locations.selector";
// import { useState } from "react";
import { SaveLocationButton } from "../button/saved.locations.button";

interface HeaderProps {
  date: string;
  weatherData: {
    location: string;
    currentTemp: number;
    longitude: number;
    latitude: number;
  };
  onSearch?: (query: string) => void;
}
const Header: React.FC<HeaderProps> = ({ date, weatherData, onSearch }) => {
  const unit = useSelector((state: RootState) => selectUnit(state));
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const savedLocations = useSelector(selectSavedLocations);
  const userId = useSelector(selectUserId);

  const isSaved = useSelector((state: RootState) =>
    selectIsLocationSaved(
      state,
      weatherData.location,
      weatherData.latitude,
      weatherData.longitude
    )
  );

  const handleSave = () => {
    if (savedLocations.length >= 6) return;
    dispatch(
      addSavedLocation({
        userId: userId || "",
        location: weatherData.location,
        latitude: weatherData.latitude || 0,
        longitude: weatherData.longitude || 0,
      })
    );
  };

  const handleRemove = () => {
    const savedLocation = savedLocations.find(
      (loc) =>
        loc.location === weatherData.location ||
        (loc.latitude === weatherData.latitude &&
          loc.longitude === weatherData.longitude)
    );
    if (!savedLocation) return;
    dispatch(removeSavedLocation(savedLocation.id));
  };

  return (
    <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {weatherData.location} {convertTemp(weatherData.currentTemp, unit)}{" "}
            {unit === "celsius" ? "C°" : "F°"}
          </h1>
          <p className="text-gray-500">{date}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search location here"
              onChange={(e) => {
                e.preventDefault();
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // removing numbers and special characters
                onSearch?.(value);
              }}
              className="w-full pl-10 pr-46 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {savedLocations.length > 0 && (
            <div className="flex items-center ml-4">
              <SaveLocationButton
                isAuthenticated={isAuthenticated}
                isSaved={isSaved}
                onSave={handleSave}
                onRemove={handleRemove}
                hasReachedLimit={savedLocations.length >= 6}
              />
            </div>
          )}

          <TemperatureToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
