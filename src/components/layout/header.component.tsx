import { FaSearch, FaRegBell, FaTimes } from "react-icons/fa";
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
import { useState } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  const userId = useSelector(selectUserId);

  const isSaved = useSelector((state: RootState) =>
    selectIsLocationSaved(state, weatherData.location)
  );

  const handleSave = () => {
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
    dispatch(removeSavedLocation(weatherData.location));
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
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-10 pr-46 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          {/* Saved locations dropdown */}
          {isAuthenticated && savedLocations.length > 0 && searchValue && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-b-lg">
              {savedLocations
                .filter((loc) =>
                  loc.location
                    ?.toLowerCase()
                    .includes(searchValue.toLowerCase())
                )
                .map((savedLoc) => (
                  <div
                    key={savedLoc.location}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                    onClick={() => {
                      setSearchValue(savedLoc.location);
                      onSearch?.(savedLoc.location);
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeSavedLocation(savedLoc.location));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
            </div>
          )}
          {location && (
            <div className="flex items-center ml-4">
              <SaveLocationButton
                isAuthenticated={isAuthenticated}
                isSaved={isSaved}
                onSave={handleSave}
                onRemove={handleRemove}
              />
            </div>
          )}
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <FaRegBell className="text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <TemperatureToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
