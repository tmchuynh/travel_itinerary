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
}

function RestaurantList({ latitude, longitude }: RestaurantListProps) {
  const [restaurants, setRestaurants] = useState<PlaceResult[]>([]);

  useEffect(() => {
    // Create a new PlacesService instance using the Google Maps API
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));

    // Define the request parameters for nearby search
    const request = {
      location: new google.maps.LatLng(latitude, longitude),
      radius: 2000, // Radius in meters
      type: 'best_fancy_restaurant',
    };

    // Call the Places API nearby search
    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setRestaurants(results);
      } else {
        console.error('Error fetching restaurants:', status);
      }
    });
  }, [google, latitude, longitude]);

  return (
    <div style={{ color: 'black', position: 'absolute', top: '50%' }}>
      <h2>Restaurants Near Latitude: {latitude}, Longitude: {longitude}</h2>
      <ul>
        {restaurants.map((place) => (
          <li key={place.place_id}>
            {place.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
})(RestaurantList);
