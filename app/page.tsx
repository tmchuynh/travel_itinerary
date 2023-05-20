"use client"

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Autocomplete } from '@mantine/core';
import GlobeVisualization from './components/globe';

export default function Home() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((data) => {
        const allCities = data.data.reduce((acc: any[], country: { cities: any[]; country: any; }) => {
          if (Array.isArray(country.cities)) {
            const citiesWithCountry = country.cities.map((city) => `${city}, ${country.country}`);
            return acc.concat(citiesWithCountry);
          }
          return acc;
        }, []);

        setCities(allCities);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Autocomplete className={styles.fixed}
        label="Pick a city"
        placeholder="Los Angeles"
        data={cities}
      />
      <GlobeVisualization />
    </div>
  );
}

