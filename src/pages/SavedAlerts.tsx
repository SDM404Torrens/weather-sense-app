import { useSelector } from "react-redux";
import {
  selectAlertError,
  selectAllAlerts,
  selectIsLoading,
} from "../store/alerts/alerts.selector";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { fetchAllAlerts, removeAlert } from "../store/alerts/alerts.thunks";
import { selectUserId } from "../store/auth/auth.selectors";
import Loading from "../components/loading/loading.component";
import { useEffect } from "react";
import { TbCalendarMonth, TbLocation } from "react-icons/tb";

const SavedAlerts = () => {
  const alerts = useSelector(selectAllAlerts);
  const dispatch = useAppDispatch();
  const userId = useSelector(selectUserId);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectAlertError);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchAllAlerts(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = async (alertId: string) => {
    try {
      await dispatch(removeAlert(alertId));
      if (userId) dispatch(fetchAllAlerts(userId));
    } catch (err) {
      console.error("Failed to delete alert:", err);
    }
  };

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Saved Alerts</h1>
      <div className="grid gap-4">
        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts saved yet</p>
        ) : (
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-lg shadow-sm p-3 flex justify-between content-center hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline  items-center gap-2">
                    <h3 className="font-medium truncate">{alert.name}</h3>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {alert.desired_Weather_Description}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <TbLocation className="inline  w-3 h-3 text-blue-700" />
                    <p className="text-sm text-gray-500 flex items-center">
                      {alert.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <TbCalendarMonth className="inline  w-3 h-3 text-blue-700" />
                    <p className="text-xs text-gray-500">
                      {new Date(alert.start_Date).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}{" "}
                      to{" "}
                      {new Date(alert.end_Date).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert.id && handleDelete(alert.id)}
                  className="text-red-500 hover:text-red-700 p-2 cursor-pointer transition-colors"
                  aria-label={`Delete ${alert.location}`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-right mb-4 p-4 text-sm text-gray-500">
        {alerts.length}/6 alerts saved
        {alerts.length >= 6 && (
          <span className="ml-2 text-red-500">(Maximum reached)</span>
        )}
      </div>
    </div>
  );
};

export default SavedAlerts;
