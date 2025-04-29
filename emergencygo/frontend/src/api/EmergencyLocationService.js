import axios from 'axios';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

export const getNearbyPlaces = async (south, west, north, east, type, isEmergency = false) => {
    const key = isEmergency ? "emergency" : "amenity";
    const query = `
      [out:json];
      (
        node["${key}"="${type}"](${south},${west},${north},${east});
        way["${key}"="${type}"](${south},${west},${north},${east});
        relation["${key}"="${type}"](${south},${west},${north},${east});
      );
      out center;
    `;
  
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  
    const response = await axios.get(url);
  
    return response.data.elements;
  };