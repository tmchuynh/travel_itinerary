import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const searchPlace = async (placeName) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      placeName
    )}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.results.length > 0) {
      const place = response.data.results[0];
      console.log(place);
      return place.place_id;
    }

    return null;
  } catch (error) {
    console.error('Error searching for place:', error);
    return null;
  }
};

export default searchPlace;
