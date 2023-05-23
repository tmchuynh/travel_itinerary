import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper, GoogleAPI } from 'google-maps-react';

interface ThingsToDoListProps {
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

function ThingsToDoList({ google, latitude, longitude }: ThingsToDoListProps) {
  const [thingsToDo, setThingsToDo] = useState<PlaceResult[]>([]);

  useEffect(() => {
    // Create a new PlacesService instance using the Google Maps API
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));

    // Define the request parameters for nearby search
    const request = {
      location: new google.maps.LatLng(latitude, longitude),
      radius: 1000, // Radius in meters
      type: 'tourist_attraction', // Search for tourist attractions or things to do
    };

    // Call the Places API nearby search
    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setThingsToDo(results);
      } else {
        console.error('Error fetching things to do:', status);
      }
    });
  }, [google, latitude, longitude]);

  return (
    <div style={{ color: 'black', position: 'absolute', top: '50%', left: '50%' }}>
      <h2>Things to Do Near Latitude: {latitude}, Longitude: {longitude}</h2>
      <ul>
        {thingsToDo.map((thing) => (
          <li key={thing.place_id}>
            <h3>{thing.name}</h3>
            <p>Address: {thing.formatted_address}</p>
            <p>Rating: {thing.rating}</p>
            {thing.opening_hours && (
              <p>Open Now: {thing.opening_hours.open_now ? 'Yes' : 'No'}</p>
            )}
            {thing.photos && (
              <img
                src={thing.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })}
                alt="Place Photo"
              />
            )}
            {thing.reviews && (
              <ul>
                {thing.reviews.map((review) => (
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
  apiKey: 'YOUR_API_KEY', // Replace with your own API key
})(ThingsToDoList);
