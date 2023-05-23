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
}

function ThingsToDoList({ google, latitude, longitude }: ThingsToDoListProps) {
  const [thingsToDo, setThingsToDo] = useState<PlaceResult[]>([]);

  useEffect(() => {
    // Create a new PlacesService instance using the Google Maps API
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));

    // Define the request parameters for nearby search
    const request = {
      location: new google.maps.LatLng(latitude, longitude),
      radius: 2000, // Radius in meters
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
    <div style={{ color: 'black', position: 'absolute', top: '100%' }}>
      <h2>Things to Do Near Latitude: {latitude}, Longitude: {longitude}</h2>
      <ul>
        {thingsToDo.map((thing) => (
          <li key={thing.place_id}>{thing.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY', // Replace with your own API key
})(ThingsToDoList);
