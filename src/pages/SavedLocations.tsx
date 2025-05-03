import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { selectUserId } from "../store/auth/auth.selectors";
import {
  fetchAllSavedLocations,
  removeSavedLocation,
} from "../store/saved-locations/saved-locations.thunks";
import {
  selectSavedLocations,
  selectSavedLocationsError,
  selectSavedLocationsLoading,
} from "../store/saved-locations/saved-locations.selector";
import { FaTrash } from "react-icons/fa";
import Loading from "../components/loading/loading.component";

export default function SavedLocations() {
  const dispatch = useAppDispatch();
  const locations = useSelector(selectSavedLocations);
  const loading = useSelector(selectSavedLocationsLoading);
  const error = useSelector(selectSavedLocationsError);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchAllSavedLocations(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = async (locationId: string) => {
    try {
      await dispatch(removeSavedLocation(locationId)).unwrap();
      if (userId) dispatch(fetchAllSavedLocations(userId));
    } catch (err) {
      console.error("Failed to delete location:", err);
    }
  };

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Saved Locations</h1>
      <div className="grid gap-4">
        {locations.length === 0 ? (
          <p className="text-gray-500">No locations saved yet</p>
        ) : (
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

                <button
                  onClick={() => handleDelete(location.id)}
                  className="text-red-500 hover:text-red-700 p-2 cursor-pointer transition-colors"
                  aria-label={`Delete ${location.location}`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
