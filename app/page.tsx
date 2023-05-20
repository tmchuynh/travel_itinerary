"use client"

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './page.module.css';
import { Autocomplete } from '@mantine/core';
import GlobeVisualization from './components/globe';

interface City {
  label: string;
  value: string;
  country: string;
}

export default function Home(): JSX.Element {
  const [citiesAndCountries, setCitiesAndCountries] = useState<City[]>([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((data) => {
        const citiesAndCountriesData: City[] = data.data.reduce((acc: City[], country: any) => {
          if (Array.isArray(country.cities)) {
            const citiesWithCountry: City[] = country.cities.map((city: string) => ({
              label: `${city}, ${country.country}`,
              value: city,
              country: country.country,
            }));
            return acc.concat(citiesWithCountry);

          }
          return acc;
        }, []);

        setCitiesAndCountries(citiesAndCountriesData);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
  }, []);``

  const handleAutocompleteChange = (selectedCity: String | null) => {
    if (selectedCity) {
      // const { value, country, label } = selectedCity;

      // const selectedCountry = selectedCity.country;
      console.log(typeof(selectedCity));

      citiesAndCountries.forEach((city: City) => {
        if (city.value === selectedCity) {
          const { value: cityValue, country: cityCountry } = city;
          console.log(cityValue, cityCountry)
          // Perform the necessary navigation logic with the selected city and country
          window.location.href = `/destination/${cityCountry}/${cityValue}`;
        }
      });
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
        data={citiesAndCountries}
        onChange={handleAutocompleteChange}
      />
      <GlobeVisualization />
    </Container>
  );
}
