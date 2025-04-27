import axios from 'axios';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

export const getNearbyPlaces = async (south, west, north, east, amenityType) => {
    const query = `
      [out:json];
      (
        node["amenity"="${amenityType}"](${south},${west},${north},${east});
        way["amenity"="${amenityType}"](${south},${west},${north},${east});
        relation["amenity"="${amenityType}"](${south},${west},${north},${east});
      );
      out center;
    `;
  
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  
    const response = await axios.get(url);
  
    return response.data.elements;
  };