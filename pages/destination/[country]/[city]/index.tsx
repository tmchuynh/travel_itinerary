// "use client"

// import styles from '../../../page.module.css';
// import Link from 'next/link';
// import MapComponent from './components/MapComponent';
// import { useState, useEffect } from 'react';

// export default function DestinationPage() {
//   const cityCountry = decodeURIComponent(window.location.pathname.split('/')[2]);
//   const cityValue = decodeURIComponent(window.location.pathname.split('/')[3]);

//   const [data, setData] = useState(null);

//   // Perform any necessary logic based on the cityCountry and cityValue values
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('/api/destination', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             cityCountry,
//             cityValue,
//           })

//         });
//         const data = await response.json();
//         // setData[data];
//         console.log(data);
//       } catch (error) {
//         console.error(error);
//       }
//     } fetchData();
//   }, [cityCountry, cityValue]);

//   const position = [33.8076787, -117.9731417]

//   return (
//     <div className={styles.container}>
//       <h1>Destination Page</h1>
//       <p>Country: {cityCountry}</p>
//       <p>City: {cityValue}</p>
//       <MapComponent center={position} />

//       <Link href={'/'}>Home</Link>
//     </div>
//   );
// }

import styles from '../../../page.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import RestaurantList from './components/RestaurantList';
import ThingsToDoList from './components/ThingsToDoList';

export default function DestinationPage() {
  const [data, setData] = useState(null);
  const position = [33.8076787, -117.9731417];
  const router = useRouter();
  const { cityCountry, cityValue } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
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
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [cityCountry, cityValue]);

  return (
    <div className={styles.container}>
      <h1>Destination Page</h1>
      <p>Country: {cityCountry}</p>
      <p>City: {cityValue}</p>
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

