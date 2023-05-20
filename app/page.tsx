"use client"

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './page.module.css';
import { Autocomplete } from '@mantine/core';
import GlobeVisualization from './components/globe';
import { useRouter } from 'next/router';

export default function Home() {
  const [cities, setCities] = useState<{ label: string; value: string; country: string }[]>([]);
  const router = useRouter();

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


  const handleAutocompleteChange = (selectedCity) => {
    if (selectedCity) {
      const { value, country } = selectedCity;
      // Perform the necessary navigation logic with the selected city and country
      router.push(`/destination/${country}/${value}`);
    }
  };
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
    <Container fluid className={styles.container}>
      <h1>Travel</h1>
      <Autocomplete
        className={styles.fixed}
        label="Pick a city"
        placeholder="Los Angeles"
        data={cities}
        onChange={handleAutocompleteChange}
      />
      <GlobeVisualization />
    </Container>
  );
}
