import Link from 'next/link';
import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import RestaurantList from './components/RestaurantList';
import ThingsToDoList from './components/ThingsToDoList';

export default function DestinationPage() {
  const [data, setData] = useState(null);
  const [position, setPosition] = useState([]);

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
        const data = await response.json();
        setData(data);
        console.log("DATA: ", data); // data coming back from the mysql server
        if (data && data.length > 0) {
          const latitude = data[0].latitude;
          const longitude = data[0].longitude;
          setPosition([latitude, longitude]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div >
      <h1>Destination Page</h1>
      <MapComponent center={position} />
      <div style={{ display: 'flex'}}>
        <RestaurantList latitude={position[0]} longitude={position[1]} />
        <ThingsToDoList latitude={position[0]} longitude={position[1]} />
      </div>
      <Link href={'/'}>Home</Link>
    </div>
  );
}

