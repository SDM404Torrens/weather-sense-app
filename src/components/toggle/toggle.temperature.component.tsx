import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../../store/tempeture/tempeture.slice";
import { selectUnit } from "../../store/tempeture/tempeture.selector";
import { RootState } from "../../store/store";

export default function TemperatureToggle() {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => selectUnit(state));

  return (
    <div className="flex items-center space-x-2 ">
      <span className={`${unit === "celsius" ? "font-bold" : "opacity-50"}`}>
        °C
      </span>
      <Switch
        checked={unit === "fahrenheit"}
        onChange={() => dispatch(toggleUnit())}
        className={`${
          unit === "fahrenheit" ? "bg-blue-600" : "bg-gray-200"
        }  cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      >
        <span
          className={`${
            unit === "fahrenheit" ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <span className={`${unit === "fahrenheit" ? "font-bold" : "opacity-50"}`}>
        °F
      </span>
    </div>
  );
}
