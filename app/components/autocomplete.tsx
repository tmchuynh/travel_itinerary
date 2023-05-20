import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Autocomplete } from '@mantine/core';

interface City {
  label: string;
  value: string;
  country: string;
}

interface AutoCompleteProps {
  router: any;
}

export function AutoComplete({ router }: AutoCompleteProps) {
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
  }, []);

  const handleAutocompleteChange = (selectedCity: string | null) => {
    if (selectedCity) {
      citiesAndCountries.forEach((city: City) => {
        if (city.value === selectedCity) {
          const { value: cityValue, country: cityCountry } = city;
          console.log(cityValue, cityCountry);
          // Perform the necessary navigation logic with the selected city and country
          router.push(`/destination/${cityCountry}/${cityValue}`);
        }
      });
    }
  };

  return (
    <Autocomplete
      className={styles.fixed}
      label="Pick a city"
      placeholder="Los Angeles"
      data={citiesAndCountries}
      onChange={handleAutocompleteChange}
    />
  );
}
