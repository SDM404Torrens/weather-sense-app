import { useSelector } from "react-redux";
import {
  selectAlertError,
  selectAllAlerts,
  selectIsLoading,
} from "../store/alerts/alerts.selector";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { fetchAllAlerts, removeAlert } from "../store/alerts/alerts.thunks";
import { selectUserId } from "../store/auth/auth.selectors";
import { FaTrash } from "react-icons/fa";
import Loading from "../components/loading/loading.component";

const SavedAlerts = () => {
  const alerts = useSelector(selectAllAlerts);
  const dispatch = useAppDispatch();
  const userId = useSelector(selectUserId);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectAlertError);

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
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{alert.name}</h3>
                  <p className="text-sm text-gray-500">
                    Location: {alert.location}
                  </p>
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
    </div>
  );
};

export default SavedAlerts;
