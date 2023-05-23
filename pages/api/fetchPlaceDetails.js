import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const fetchPlaceDetails = async (placeId) => {
  try {
    const url = `/api/googleplaces/details/json?place_id=${placeId}&key=${apiKey}`;

    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error('Error fetching Google Places data:', error);
    return null;
  }
};

export default fetchPlaceDetails;
