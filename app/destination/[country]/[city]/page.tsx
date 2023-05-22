"use client"

import styles from '../../../page.module.css';
import Link from 'next/link';
import MapComponent from './components/MapComponent';

export default function DestinationPage() {
  const cityCountry = decodeURIComponent(window.location.pathname.split('/')[2]);
  const cityValue = decodeURIComponent(window.location.pathname.split('/')[3]);

  // Perform any necessary logic based on the cityCountry and cityValue values


  const position = [33.8076787,-117.9731417]

  return (
    <div className={styles.container}>
      <h1>Destination Page</h1>
      <p>Country: {cityCountry}</p>
      <p>City: {cityValue}</p>
      <MapComponent center={position} />

      <Link href={'/'}>Home</Link>
    </div>
  );
}
