"use client"

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Autocomplete } from '@mantine/core';

export default function Home() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((data) => {
        const allCities = data.data.reduce((acc, country) => {
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

  return (
    <div className={styles.container}>
      <Autocomplete
        label="Pick a city"
        placeholder="Los Angeles"
        data={cities}
      />
    </div>
  );
}

