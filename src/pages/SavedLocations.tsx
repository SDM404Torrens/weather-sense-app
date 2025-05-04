import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { selectUserId } from "../store/auth/auth.selectors";
import { RiAddLargeLine } from "react-icons/ri";
import {
  fetchAllSavedLocations,
  removeSavedLocation,
} from "../store/saved-locations/saved-locations.thunks";
import {
  selectSavedLocations,
  selectSavedLocationsError,
  selectSavedLocationsLoading,
} from "../store/saved-locations/saved-locations.selector";
import { FaTrash, FaRegBell, FaCheck } from "react-icons/fa";
import Loading from "../components/loading/loading.component";
import { fetchWeatherConditions } from "../store/weather/weather.thunk";
import { addAlert, fetchAllAlerts } from "../store/alerts/alerts.thunks";
import AddAlertModal from "../components/modal/add-alert.modal.component";
import { selectAlertsByLocation } from "../store/alerts/alerts.selector";

export default function SavedLocations() {
  const dispatch = useAppDispatch();
  const locations = useSelector(selectSavedLocations);
  const loading = useSelector(selectSavedLocationsLoading);
  const error = useSelector(selectSavedLocationsError);
  const userId = useSelector(selectUserId);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    location: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchAllSavedLocations(userId));
      dispatch(fetchAllAlerts(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchWeatherConditions());
  }, [dispatch]);

  const alertsByLocation = useSelector(selectAlertsByLocation);

  const hasAlert = (location: string) => {
    return alertsByLocation[location];
  };

  const handleDelete = async (locationId: string) => {
    try {
      await dispatch(removeSavedLocation(locationId)).unwrap();
      if (userId) dispatch(fetchAllSavedLocations(userId));
    } catch (err) {
      console.error("Failed to delete location:", err);
    }
  };

  const handleAddAlertClick = (location: {
    id: string;
    location: string;
    latitude: number;
    longitude: number;
  }) => {
    setSelectedLocation(location);
    if (!!hasAlert(location.location)) {
      setIsAlertModalOpen(false);
      return;
    }
    setIsAlertModalOpen(true);
  };

  const handleSubmitAlert = async (alertData: {
    name: string;
    startDate: string;
    endDate: string;
    desiredWeather: number;
  }) => {
    if (!selectedLocation || !userId) return;

    dispatch(
      addAlert({
        userId,
        name: alertData.name,
        start_Date: alertData.startDate,
        end_Date: alertData.endDate,
        desired_Weather: alertData.desiredWeather,
        location: selectedLocation.location,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      })
    ).unwrap();

    setIsAlertModalOpen(false);
  };

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Saved Locations</h1>
      <div className="grid gap-4">
        {locations.length === 0 ? (
          <p className="text-gray-500">No locations saved yet</p>
        ) : (
          <>
            <div className="grid gap-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{location.location}</h3>
                    <p className="text-sm text-gray-500">
                      Latitude: {location.latitude.toFixed(4)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Longitude: {location.longitude.toFixed(4)}
                    </p>
                  </div>

                  <div className="flex gap-2  ">
                    <button
                      onClick={() => handleAddAlertClick(location)}
                      className={`text-blue-500 hover:text-blue-700 p-2  transition-colors relative flex items-center justify-center p-2 rounded-full transition-all duration-200"
                      ${
                        !!hasAlert(location.location)
                          ? "text-green-600  hover:text-green-600"
                          : "text-blue-700 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                      }`}
                      aria-label={`Add alert for ${location.location}`}
                    >
                      <FaRegBell />
                      <span
                        className={`absolute -top-1 -right-1 h-3 w-3 flex items-center justify-center rounded-full ${
                          !!hasAlert(location.location)
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white "
                        }`}
                      >
                        {!!hasAlert(location.location) ? (
                          <FaCheck className="w-2 h-2" />
                        ) : (
                          <RiAddLargeLine className="w-2 h-2 cursor-pointer" />
                        )}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="text-red-500 hover:text-red-700 p-2 cursor-pointer transition-colors"
                      aria-label={`Delete ${location.location}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mb-4 text-sm text-gray-500">
              {locations.length}/6 locations saved
              {locations.length >= 6 && (
                <span className="ml-2 text-red-500">(Maximum reached)</span>
              )}
            </div>
          </>
        )}
      </div>
      {isAlertModalOpen && selectedLocation && (
        <AddAlertModal
          isOpen={isAlertModalOpen}
          onClose={() => setIsAlertModalOpen(false)}
          onSubmit={handleSubmitAlert}
          locationName={selectedLocation.location}
        />
      )}
    </div>
  );
}
