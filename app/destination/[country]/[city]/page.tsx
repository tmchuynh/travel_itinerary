"use client"

import styles from '../../../page.module.css';
import Link from 'next/link';


export default function DestinationPage() {
  const cityCountry = decodeURIComponent(window.location.pathname.split('/')[2]);
  const cityValue = decodeURIComponent(window.location.pathname.split('/')[3]);

  // Perform any necessary logic based on the cityCountry and cityValue values

  return (
    <div className={styles.container}>
      <h1>Destination Page</h1>
      <p>Country: {cityCountry}</p>
      <p>City: {cityValue}</p>
      <Link href={"/"}>Home</Link>
    </div>
  );
}
