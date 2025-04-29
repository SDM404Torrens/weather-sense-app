import { FaCalendarAlt } from 'react-icons/fa';
import Card from '../components/card/card.component';

export default function Calendar() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FaCalendarAlt className="text-blue-500" />
        <h1 className="text-2xl font-bold">Weather Calendar</h1>
      </div>
      <Card className="p-6">
        <p>Monthly weather trends will appear here</p>
       
      </Card>
    </div>
  );
}