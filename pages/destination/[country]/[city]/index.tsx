import Link from 'next/link';
import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import RestaurantList from './components/RestaurantList';
import ThingsToDoList from './components/ThingsToDoList';

interface Data {
  latitude: number;
  longitude: number;
  // Add other properties as needed
}

export default function DestinationPage() {
  const [data, setData] = useState<Data[] | null>(null);
  const [position, setPosition] = useState<number[]>([]);

  useEffect(() => {
    const cityCountry = decodeURIComponent(window.location.pathname.split('/')[2]);
    const cityValue = decodeURIComponent(window.location.pathname.split('/')[3]);

    async function fetchData() {
      try {
        console.log('Executing query...');
        const response = await fetch('/api/destination', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cityCountry,
            cityValue,
          }),
        });
        const data: Data[] = await response.json();
        setData(data);
        console.log('DATA: ', data); // data coming back from the MySQL server
        if (data && data.length > 0) {
          const { latitude, longitude } = data[0];
          setPosition([latitude, longitude]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleMarkerChange = (latitude: number, longitude: number) => {
    // Update the marker position
    setPosition([latitude, longitude]);
  };

  return (
    <div>
      <h1>Destination Page</h1>
      <MapComponent center={position} onMarkerChange={handleMarkerChange} />
      <div style={{ display: 'flex' }}>
        <RestaurantList latitude={position[0]} longitude={position[1]} />
        <ThingsToDoList latitude={position[0]} longitude={position[1]} />
      </div>
      <Link href="/">Home</Link>
    </div>
  );
}
