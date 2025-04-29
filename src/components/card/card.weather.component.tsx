import { ReactNode } from 'react';
import Card from './card.component';

interface WeatherCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
}

export default function WeatherCard({ icon, title, value, change }: WeatherCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <Card>
      <div className="flex items-center gap-2 text-gray-500 mb-1">
        <span className="text-blue-500">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
      </div>
    </Card>
  );
}