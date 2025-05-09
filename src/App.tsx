import { Outlet } from "react-router-dom";
import Sidebar from "./components/layout/sidebar.component";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
