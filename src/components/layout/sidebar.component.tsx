import { FaRegSave, FaRegBell } from "react-icons/fa";
import { CgLogOut, CgLogIn } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../store/auth/auth.slice";
import { selectIsAuthenticated } from "../../store/auth/auth.selectors";
import { useState } from "react";
import LoginModal from "../modal/login.modal.component";
import { getTemperatureColor } from "../../utils/tempeture.color.utils";
import SignUpModal from "../modal/sign-up.modal.component";
import { selectCurrentWeather } from "../../store/weather/weather.selector";
import { selectUnit } from "../../store/tempeture/tempeture.selector";
import { convertTemp } from "../../utils/tempeture.utils";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";

function SidebarItem({
  icon,
  children,
  to,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  to: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 p-3 rounded-lg transition-colors hover:text-blue-800 " ${
          isActive ? "text-blue-700" : "text-gray-600 hover:text-blue-800"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{children}</span>
    </NavLink>
  );
}

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  const currentWeather = useSelector(selectCurrentWeather);
  const unit = useSelector(selectUnit);
  const [activeModal, setActiveModal] = useState<"login" | "signup" | null>(
    null
  );

  const temperature = currentWeather?.temp
    ? convertTemp(currentWeather.temp, unit)
    : convertTemp(10, unit);

  const gradientClasses =
    temperature !== undefined
      ? getTemperatureColor(temperature, unit)
      : "from-blue-500 to-teal-400";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-64 bg-gray-300 text-gray-600 p-6 flex flex-col h-screen">
      <div>
        <h1
          className={`flex justify-center text-2xl font-bold mb-8 bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text`}
        >
          <NavLink to="/">WeatherSense</NavLink>
        </h1>
        {isAuthenticated ? (
          <nav className="space-y-4">
            <SidebarItem icon={<FaRegSave />} to="/saved-locations">
              Saved Locations
            </SidebarItem>
            <SidebarItem icon={<FaRegBell />} to="/saved-alerts">
              Saved Alerts
            </SidebarItem>
            {/* <SidebarItem icon={<FaRegCalendarAlt />} to="/calendar">
              Calendar
            </SidebarItem> */}
          </nav>
        ) : (
          <></>
        )}
      </div>

      <div className="mt-auto space-y-4">
        {isAuthenticated ? (
          <>
            {/* <SidebarItem icon={<FaCog />} to="/settings">
              Settings
            </SidebarItem> */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-lg transition-colors w-full hover:text-blue-800"
            >
              <CgLogOut className="text-lg" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setActiveModal("login")}
            className="flex items-center space-x-3 p-3 rounded-lg transition-colors w-full hover:text-blue-800"
          >
            <CgLogIn className="text-lg" />
            <span>Login</span>
          </button>
        )}
      </div>
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        onSignUpClick={() => setActiveModal("signup")}
      />
      <SignUpModal
        isOpen={activeModal === "signup"}
        onClose={() => setActiveModal(null)}
        onLoginClick={() => setActiveModal("login")}
      />
    </div>
  );
};

export default Sidebar;
