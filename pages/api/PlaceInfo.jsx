import fetchPlaceDetails from './fetchPlaceDetails';
import searchPlace from './searchPlace';
import React, {useEffect} from 'react'

const PlaceInfo = ({ pageTitle }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeID = await searchPlace('walt-disney-concert-hall-los-angeles');
        const data = await fetchPlaceDetails(placeID);

        // Process and use the retrieved data
        if (data) {
          const { name, rating, review_count, location } = data;

          console.log('Name:', name);
          console.log('Rating:', rating);
          console.log('Review Count:', review_count);
          console.log('Location:', location);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{pageTitle.replace(/_/g, ' ')}</h1>
    </div>
  );
};

export default PlaceInfo;
