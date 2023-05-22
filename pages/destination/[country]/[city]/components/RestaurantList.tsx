import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper, GoogleAPI } from 'google-maps-react';

interface RestaurantListProps {
  google: GoogleAPI;
  latitude: number;
  longitude: number;
}

interface PlaceResult {
  place_id: string;
  name: string;
  rating: number;
  // Add more properties as needed
}

function RestaurantList({ google, latitude, longitude }: RestaurantListProps) {
  const [restaurants, setRestaurants] = useState<PlaceResult[]>([]);

  useEffect(() => {
    // Create a new PlacesService instance using the Google Maps API
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));

    // Define the request parameters for nearby search
    const request = {
      location: new google.maps.LatLng(latitude, longitude),
      radius: 1000, // Radius in meters
      type: 'tourist_attraction', // Search for tourist attractions
    };

    // Call the Places API nearby search
    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Filter the results to include only places with a rating greater than 4
        const filteredResults = results.filter((place) => place.rating && place.rating > 4);
        setRestaurants(filteredResults);
      } else {
        console.error('Error fetching tourist places:', status);
      }
    });
  }, [google, latitude, longitude]);

  return (
    <div>
      <h2>Tourist Places Near Latitude: {latitude}, Longitude: {longitude}</h2>
      <ul>
        {restaurants.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
})(RestaurantList);
