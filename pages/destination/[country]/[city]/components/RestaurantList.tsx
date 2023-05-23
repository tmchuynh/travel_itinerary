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
  formatted_address?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types?: string[];
  rating?: number;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: {
    getUrl: (options: { maxWidth: number; maxHeight: number }) => string;
  }[];
  reviews?: {
    author_name: string;
    rating: number;
    text: string;
  }[];
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
      type: 'restaurant', // Search for tourist attractions
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
            <h3>{place.name}</h3>
            <p>Address: {place.formatted_address}</p>
            <p>Rating: {place.rating}</p>
            {place.opening_hours && (
              <p>Open Now: {place.opening_hours.open_now ? 'Yes' : 'No'}</p>
            )}
            {place.photos && (
              <img
                src={place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })}
                alt="Place Photo"
              />
            )}
            {place.reviews && (
              <ul>
                {place.reviews.map((review) => (
                  <li key={review.author_name}>
                    <p>Author: {review.author_name}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Review: {review.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}





export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
})(RestaurantList);
