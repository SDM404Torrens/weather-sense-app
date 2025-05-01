import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import SavedLocations from "../pages/SavedLocations";
import Calendar from "../pages/Calendar";
import ProtectedRoute from "../components/protected/protected.route.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "saved",
        element: (
          <ProtectedRoute>
            <SavedLocations />
          </ProtectedRoute>
        ),
      },
      {
        path: "calendar",
        element: (
          <ProtectedRoute>
            <Calendar />
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
