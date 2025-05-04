import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectWeatherConditions } from "../../store/weather/weather.selector";
import { selectIsLoading } from "../../store/alerts/alerts.selector";

interface AddAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (alertData: {
    name: string;
    startDate: string;
    endDate: string;
    desiredWeather: number;
  }) => void;
  locationName: string;
}

const AddAlertModal: React.FC<AddAlertModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  locationName,
}) => {
  const weatherConditions = useSelector(selectWeatherConditions);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [desiredWeather, setDesiredWeather] = useState<number>(0);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    console.log("isOpen", isOpen);

    if (isOpen) {
      setName("");
      setStartDate("");
      setEndDate("");
      setDesiredWeather(weatherConditions[0]?.value || 0);
    }
  }, [isOpen, weatherConditions]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      startDate,
      endDate,
      desiredWeather,
    });
  };

  return (
    <div
      id="add-alert-modal"
      tabIndex={-1}
      aria-hidden={!isOpen}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200/50 rounded-t">
            <h3 className="text-xl font-semibold text-gray-800">
              New Alert for {locationName}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-blue-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-100/50"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* todo: form */}
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="alert-name"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Alert Name
                </label>
                <input
                  type="text"
                  id="alert-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="e.g., Rain Alert"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="start-date"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="end-date"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="weather-condition"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Weather Condition
                </label>
                <select
                  id="weather-condition"
                  value={desiredWeather}
                  onChange={(e) => setDesiredWeather(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  {weatherConditions.map((condition) => (
                    <option key={condition.value} value={condition.value}>
                      {condition.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end pt-4 border-t border-gray-200/50 rounded-b ">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 mr-2 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAlertModal;
