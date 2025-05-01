import { FaWind, FaCloudRain, FaTachometerAlt, FaSun } from 'react-icons/fa';
import WeatherCard from '../components/card/card.weather.component';
import Header from '../components/layout/header.component';
import WeatherChart from '../components/chart/weather.chart';

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

  const weeklyWeather = [
    { week: 'Week 1', temp: 22 },
    { week: 'Week 2', temp: 24 },
    { week: 'Week 3', temp: 19 },
    { week: 'Week 4', temp: 21 },
    { week: 'Week 5', temp: 28 },
    { week: 'Week 6', temp: 30 },
    { week: 'Week 7', temp: 25 },
  ];

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
      <WeatherChart
        title="Weekly Temperature"
        description="7-week average"
        changePercentage={5}
        weeklyData={weeklyWeather}
    />
    </div>
  );
}