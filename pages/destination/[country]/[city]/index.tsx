import Link from 'next/link';
import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import RestaurantList from './components/RestaurantList';
import ThingsToDoList from './components/ThingsToDoList';

export default function DestinationPage() {
  const [data, setData] = useState<any>(null); // State variable to hold data, initially set to null
  const [position, setPosition] = useState<[number, number]>([]); // State variable for position, initially an empty array

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
        setData(data); // Update data state with the fetched data
        console.log("DATA: ", data); // Log the data coming back from the MySQL server
        if (data && data.length > 0) {
          const latitude = data[0].latitude; // Extract latitude from data
          const longitude = data[0].longitude; // Extract longitude from data
          setPosition([latitude, longitude]); // Update position state with latitude and longitude
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(); // Call the fetchData function to fetch data
  }, []);

  return (
    <div>
      <h1>Destination Page</h1>
      <MapComponent center={position} />
      <div style={{ display: 'flex' }}>
        <RestaurantList latitude={position[0]} longitude={position[1]} />
        <ThingsToDoList latitude={position[0]} longitude={position[1]} />
      </div>
      <Link href={'/'}>Home</Link>
    </div>
  );
}
