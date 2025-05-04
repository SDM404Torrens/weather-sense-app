import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import SavedLocations from "../pages/SavedLocations";
import ProtectedRoute from "../components/protected/protected.route.component";
import SavedAlerts from "../pages/SavedAlerts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "saved-locations",
        element: (
          <ProtectedRoute>
            <SavedLocations />
          </ProtectedRoute>
        ),
      },
      {
        path: "saved-alerts",
        element: (
          <ProtectedRoute>
            <SavedAlerts />
          </ProtectedRoute>
        ),
      },
      {
        path: "sign-up",
        element: null,
      },
    ],
  },
]);
