// components/Map.js
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = ({ google , position}) => {
  const mapStyles = {
    width: '100%',
    height: '700px',
  };

  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: position[0],
        lng: position[1],
      }}
    >
      <Marker position={{ lat: position[0], lng: position[1] }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(MapContainer);
