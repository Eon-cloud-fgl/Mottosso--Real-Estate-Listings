import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for broken default icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Function to get coordinates from address using Nominatim
const getCoordinatesFromAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'YourAppName/1.0' },
    });
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
  }
  return null;
};

const MapArray = ({ locations }) => {
  const [locationsWithCoords, setLocationsWithCoords] = useState([]);

  useEffect(() => {
    const fetchCoords = async () => {
      const results = await Promise.all(
        locations.map(async (loc) => {
          const coords = await getCoordinatesFromAddress(loc.address);
          return coords ? { ...loc, ...coords } : null;
        })
      );
      setLocationsWithCoords(results.filter(Boolean));
    };

    if (locations?.length) {
      fetchCoords();
    }
  }, [locations]);

  if (locationsWithCoords.length === 0) {
    return <p>Cargando Mapa...</p>;
  }

  const center = [locationsWithCoords[0].lat, locationsWithCoords[0].lng];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '350px', width: '100%', borderRadius: '10px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data © OpenStreetMap contributors"
      />
      {locationsWithCoords.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong><br />
            {loc.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapArray;
