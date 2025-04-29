import Card from '../components/card/card.component';

export default function SavedLocations() {
  const locations = [
    { name: 'Tegal, Indonesia', temp: 23 },
    { name: 'Jakarta, Indonesia', temp: 28 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Locations</h1>
      <div className="grid gap-4">
        {locations.map((location) => (
          <Card key={location.name} className="p-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{location.name}</h3>
              <span className="text-lg font-bold">{location.temp}°C</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}