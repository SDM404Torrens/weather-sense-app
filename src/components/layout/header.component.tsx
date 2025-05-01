import { FaSearch, FaRegBell } from 'react-icons/fa';
import TemperatureToggle from '../toggle/toggle.temperature.component';
import { convertTemp } from '../../utils/tempeture.utils';
import {  useSelector } from 'react-redux';
import { selectUnit } from '../../store/tempeture/tempeture.selector';
import { RootState } from '../../store/store';

interface HeaderProps {
  date: string;
  weatherData: {
    location: string;
    currentTemp: number;
  };
  onSearch?: (query: string) => void;
}
const Header: React.FC<HeaderProps> = ({ 
  date, weatherData, onSearch
}) => {
  const unit = useSelector((state: RootState) => selectUnit(state));
  return (
    <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{weatherData.location} {convertTemp(weatherData.currentTemp, unit)} {unit === 'celsius' ? 'C°' : 'F°'}</h1>
          <p className="text-gray-500">{date}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search location here"
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-10 pr-46 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <FaRegBell className="text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <TemperatureToggle />
        </div>
      </div>
    </header>
  );
}
export default Header;