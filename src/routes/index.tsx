import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import SavedLocations from '../pages/SavedLocations';
import Calendar from '../pages/Calendar';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'saved', element: <SavedLocations /> },
      { path: 'calendar', element: <Calendar /> },
    ],
  },
]);