import { FaSearchLocation, FaTimes } from "react-icons/fa";
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
import { SaveLocationButton } from "../button/saved.locations.button";
import { useState } from "react";

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
  const [isHovering, setIsHovering] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearchQuery, setHasSearchQuery] = useState(false);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setSearchQuery(value);
    setHasSearchQuery(value.length > 0);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setHasSearchQuery(false);
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
              value={searchQuery}
              onChange={(e) => handleSearchChange(e)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                hasSearchQuery &&
                onSearch?.(searchQuery.trim())
              }
              className="w-full pl-4 pr-24 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {hasSearchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleSearchSubmit}
                // disabled={!hasSearchQuery}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`
                  ml-2 px-2 py-1 text-sm rounded-full transition-colors 
                  ${
                    hasSearchQuery
                      ? "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      : "text-gray-400 "
                  }
                `}
              >
                <FaSearchLocation className="w-4 h-4" />
              </button>
              {searchQuery != "" && isHovering && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-blue-700 text-white text-xs rounded whitespace-nowrap">
                  Click to search location
                </div>
              )}
            </div>
          </div>

          {/* {savedLocations.length > 0 && ( */}
          <div className="flex items-center ml-4">
            <SaveLocationButton
              isAuthenticated={isAuthenticated}
              isSaved={isSaved}
              onSave={handleSave}
              onRemove={handleRemove}
              hasReachedLimit={savedLocations.length >= 6}
            />
          </div>
          {/* )} */}

          <TemperatureToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
