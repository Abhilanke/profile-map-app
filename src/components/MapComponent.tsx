import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapComponentProps {
  lat: number;
  lng: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
  const mapStyles = {
    height: "300px",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: lat,
    lng: lng
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyD7kuX5_9FCB5fK9_UhXZvXJ4O8igbJo4A">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

