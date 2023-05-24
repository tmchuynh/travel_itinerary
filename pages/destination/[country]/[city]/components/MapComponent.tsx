import React from 'react';
import { Map, GoogleApiWrapper, Marker, MapMouseEvent } from 'google-maps-react';

interface MapContainerProps {
  google: any; // Replace with the appropriate type for the Google Maps object
  center: number[];
  onMarkerChange: (latitude: number, longitude: number) => void;
}

/**
 * Renders a Map component using Google Maps API, with a marker at the specified center location.
 *
 * @param {MapContainerProps} props - the component props:
 * @param {google.maps} props.google - the Google Maps API object
 * @param {number[]} props.center - the coordinates of the center of the map
 * @param {Function} props.onMarkerChange - function called when the map is clicked, with the latitude and longitude of the clicked position
 * @return {JSX.Element} the Map component with a Marker component at the specified center
 */
const MapContainer: React.FC<MapContainerProps> = ({ google, center, onMarkerChange }) => {
  // Define map styles
  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  // Handle map click event
  const handleMapClick = (event: MapMouseEvent<google.maps.Map>) => {
    // Extract latitude and longitude from the clicked location
    const latitude = event.latLng?.lat();
    const longitude = event.latLng?.lng();

    // Check if latitude and longitude are valid
    if (latitude && longitude) {
      // Call the onMarkerChange function with the new coordinates
      onMarkerChange(latitude, longitude);
    }
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
