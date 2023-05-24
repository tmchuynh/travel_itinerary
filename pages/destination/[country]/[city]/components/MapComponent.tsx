import React from 'react';
import { Map, GoogleApiWrapper, Marker, MapMouseEvent } from 'google-maps-react';

interface MapContainerProps {
  google: any; // Replace with the appropriate type for the Google Maps object
  center: number[];
  onMarkerChange: (latitude: number, longitude: number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ google, center, onMarkerChange }) => {
  const handleMapClick = (event: MapMouseEvent<google.maps.Map>) => {
    const latitude = event.latLng?.lat();
    const longitude = event.latLng?.lng();
    if (latitude && longitude) {
      onMarkerChange(latitude, longitude);
    }
  };

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
      onClick={handleMapClick}
    >
      <Marker position={{ lat: center[0], lng: center[1] }} onClick={handleMapClick} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
})(MapContainer);
