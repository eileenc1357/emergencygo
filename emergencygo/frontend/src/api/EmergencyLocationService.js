import axios from 'axios';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

export const getNearbyPlaces = async (lat, lon, amenityType) => {
  const query = `
    [out:json];
    node(around:5000,${lat},${lon})["amenity"="${amenityType}"];
    out;
  `;

  const response = await axios.post(OVERPASS_URL, query, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.data.elements;
};