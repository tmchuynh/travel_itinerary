import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Autocomplete } from '@mantine/core';

interface City {
  label: string;
  value: string;
  country: string;
}

export default function AutoComplete() {
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


  /**
  * Handles the change event of an autocomplete input, navigating to the selected city's page
  * @param selectedCity The selected city from the autocomplete input
  */
  const handleAutocompleteChange = (selectedCity: String | null) => {
    if (selectedCity) {
      // Iterate through all cities and countries
      citiesAndCountries.forEach((city: City) => {
        // If the selected city matches a city in the array
        if (city.value === selectedCity) {
          // Destructure the city object to get the city value and country
          const { value: cityValue, country: cityCountry } = city;
          // Perform the necessary navigation logic with the selected city and country
          window.location.href = `/destination/${cityCountry}/${cityValue}`;
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
  )
}