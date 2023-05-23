import styles from '../../../page.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MapComponent from './components/MapComponent';
import RestaurantList from './components/RestaurantList';
import ThingsToDoList from './components/ThingsToDoList';

export default function DestinationPage() {
  const [data, setData] = useState(null);
  const position = [33.8076787, -117.9731417];
  
  useEffect(() => {
    const router = useRouter();
  const { pathname } = router;

  console.log('URL pathname:', pathname);

    // const cityCountry = decodeURIComponent(window.location.pathname.split('/')[2]);
    // const cityValue = decodeURIComponent(window.location.pathname.split('/')[3]);
    // console.log('cityCountry:', cityCountry);
    // console.log('cityValue:', cityValue);

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
        // console.log(data[0].city);
        // console.log(data[0].country);
        // console.log(data[0].latitude);
        // console.log(data[0].longitude);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Destination Page</h1>
      <MapComponent center={position} />
      {typeof window !== 'undefined' && window.google && (
        <div>
          <RestaurantList google={window.google} latitude={position[0]} longitude={position[1]} />
          <ThingsToDoList google={window.google} latitude={position[0]} longitude={position[1]} />
        </div>
      )}
      <Link href={'/'}>Home</Link>
    </div>
  );
}

