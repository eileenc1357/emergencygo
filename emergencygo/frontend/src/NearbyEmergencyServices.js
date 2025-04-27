import React, { useEffect, useState } from 'react';
import { getNearbyPlaces } from './api/EmergencyLocationService';

function NearbyEmergencyServices({ type = 'hospital' }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getNearbyPlaces(latitude, longitude, type);
      setPlaces(data);
      setLoading(false);
    });
  }, [type]);

  if (loading) {
    return <div className="p-4">Loading nearby {type}s...</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nearby {type.charAt(0).toUpperCase() + type.slice(1)}s</h1>
      {places.length === 0 ? (
        <p>No {type}s found nearby.</p>
      ) : (
        <ul className="space-y-4">
          {places.map((place, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{place.tags.name || 'Unnamed'}</h2>
              <p className="text-gray-600">{place.tags['addr:street'] || 'No address available'}</p>
              <p className="text-sm text-gray-400">
                lat: {place.lat.toFixed(4)}, lon: {place.lon.toFixed(4)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NearbyEmergencyServices;