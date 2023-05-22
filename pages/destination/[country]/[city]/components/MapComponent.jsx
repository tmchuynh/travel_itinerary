// components/Map.js
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = ({ google, center }) => {
  const mapStyles = {
    width: '100%',
    height: '400px',
  };
  
  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      scrollwheel={false}
      minZoom={4}
      mapTypeControl={false}
      initialCenter={{
        lat: center[0],
        lng: center[1],
      }}
    >
      <Marker position={{ lat: center[0], lng: center[1] }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(MapContainer);
