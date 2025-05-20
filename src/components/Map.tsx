
'use client';

import { FC, useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })?._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  label?: string;
}

interface MapProps {
  locations: Location[];
}

// Component to zoom to selected location
const FlyToLocation: FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], 15); // You can change zoom level
  }, [lat, lng, map]);

  return null;
};

const Map: FC<MapProps> = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Center on India
  const defaultCenter = { lat: 22.9734, lng: 78.6569 };

  return (
    <MapContainer
      center={[defaultCenter.lat, defaultCenter.lng]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={[loc.lat, loc.lng]}
          eventHandlers={{
            click: () => setSelectedLocation(loc),
          }}
        >
          <Popup>
            {loc.label || `Lat: ${loc.lat}, Lng: ${loc.lng}`}
            <br />
            <a
              href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </Popup>
        </Marker>
      ))}

      {/* Zoom to location when selected */}
      {selectedLocation && (
        <FlyToLocation lat={selectedLocation.lat} lng={selectedLocation.lng} />
      )}
    </MapContainer>
  );
};

export default Map;
