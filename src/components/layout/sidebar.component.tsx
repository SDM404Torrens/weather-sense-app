import { FaRegSave, FaRegCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function SidebarItem({ icon, children, to }: { 
  icon: React.ReactNode; 
  children: React.ReactNode;
  to: string;
}) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive ? 'bg-blue-700' : 'hover:bg-blue-700/50'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{children}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="w-64 bg-blue-600 text-white p-6 flex flex-col h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-8">
          <NavLink to="/">WeatherSense</NavLink>
        </h1>
        <nav className="space-y-4">
          <SidebarItem icon={<FaRegSave />} to="/saved">Saved Locations</SidebarItem>
          <SidebarItem icon={<FaRegCalendarAlt />} to="/calendar">Calendar</SidebarItem>
        </nav>
      </div>

      <div className="mt-auto space-y-4">
        <SidebarItem icon={<FaCog />} to="/settings">Settings</SidebarItem>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg transition-colors w-full hover:bg-blue-700/50 text-white-200 hover:text-white"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}