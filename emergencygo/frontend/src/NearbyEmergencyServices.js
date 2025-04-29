import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getNearbyPlaces } from './api/EmergencyLocationService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Layout from './components/Layout';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const hospitalIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/2749/2749678.png',
    iconSize: [42, 42],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const policeIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/5600/5600529.png',
    iconSize: [42, 42],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const aedIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/6019/6019004.png',
    iconSize: [42, 42],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const fetchAllEmergencyServices = async (south, west, north, east) => {
    const hospitals = await getNearbyPlaces(south, west, north, east, 'hospital');
    const policeStations = await getNearbyPlaces(south, west, north, east, 'police');
    const aeds = await getNearbyPlaces(south, west, north, east, 'defibrillator', true);
    return [...hospitals, ...policeStations, ...aeds];
};

function NearbyEmergencyServices() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);

  const handleMoveEnd = useCallback(async (event) => {
    const map = event.target;
    const bounds = map.getBounds();
  
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
  
    const south = southWest.lat;
    const west = southWest.lng;
    const north = northEast.lat;
    const east = northEast.lng;
  
    const places = await fetchAllEmergencyServices(south, west, north, east);
    setPlaces(places);
  }, []);

  useEffect(() => {
    setLoading(true); // Always reset loading when component remounts
  
    const geoSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
      setUserPosition([latitude, longitude]);
  
      const offset = 0.05; // ~5km
      const south = latitude - offset;
      const west = longitude - offset;
      const north = latitude + offset;
      const east = longitude + offset;
  
      const places = await fetchAllEmergencyServices(south, west, north, east);
      setPlaces(places); 
      setLoading(false);
    };
  
    const geoError = (error) => {
      console.error("Geolocation error:", error);
      setLoading(false); // Stop spinner even on error
    };
  
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="p-4">Loading nearby emergency services...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Nearby Emergency Services</h1>

        {userPosition ? (
          <MapContainer
              center={userPosition}
              zoom={14}
              style={{ height: "80vh", width: "100%" }}
              whenCreated={(mapInstance) => { setUserPosition([mapInstance.getCenter().lat, mapInstance.getCenter().lng]); }}
              onMoveEnd={handleMoveEnd}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
    
            <Marker position={userPosition}>
              <Popup>
                You are here.
              </Popup>
            </Marker>
    
            {places.map((place, index) => {
              let customIcon = hospitalIcon;
              if (place.tags.amenity === 'police') {
                customIcon = policeIcon;
              }
              if (place.tags.emergency === 'defibrillator') {
                  customIcon = aedIcon;
                }
              
              const lat = place.lat || (place.center && place.center.lat);
              const lon = place.lon || (place.center && place.center.lon);

              if (lat === undefined || lon === undefined) {
                return null; // Skip marker if no valid coordinates
              }

              return (
                <Marker
                  key={index}
                  position={[lat, lon]}
                  icon={customIcon}
                >
                  <Popup>
                      <div>
                          <h2 className="font-bold">
                              {place.tags.name 
                                  ? place.tags.name 
                                  : (place.tags.emergency === 'defibrillator' ? 'Public AED' : 'Unnamed')}
                          </h2>   
                          <p>
                          <a
                              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                          >
                              View location on Google Maps
                          </a>
                          </p>
                      </div>
                  </Popup>
                </Marker>
              );
            })}
    
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </Layout>
  );
}

export default NearbyEmergencyServices;
