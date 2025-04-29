import { FaWind, FaCloudRain, FaTachometerAlt, FaSun } from 'react-icons/fa';
import WeatherCard from '../components/card/card.weather.component';
import Header from '../components/layout/header.component';

export default function Home() {

  const weatherData = {
    currentTemp: 23,
    location: 'Tegal, Indonesia',
    metrics: [
      { icon: <FaWind />, title: 'Wind Speed', value: '12km/h', change: '+2km/h' },
      { icon: <FaCloudRain />, title: 'Rain Chance', value: '24%', change: '-10%' },
      { icon: <FaTachometerAlt />, title: 'Pressure', value: '720 hpa', change: '-32 hpa' },
      { icon: <FaSun />, title: 'UV Index', value: '2.3', change: '+0.3' },
    ],
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="p-6">
      <Header 
        date="Thursday, Jan 4, 2022"
        weatherData={weatherData}
        onSearch={handleSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {weatherData.metrics.map((metric, index) => (
          <WeatherCard
            key={index}
            icon={metric.icon}
            title={metric.title}
            value={metric.value}
            change={metric.change}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Forecast</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left pb-2">Day</th>
              <th className="text-left pb-2">Temp (°C)</th>
              <th className="text-left pb-2">Conditions</th>
            </tr>
          </thead>
          <tbody>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
              <tr key={day} className="border-b border-gray-100 last:border-0">
                <td className="py-3">{day}</td>
                <td className="py-3">{20 + i}</td>
                <td className="py-3">Sunny</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}