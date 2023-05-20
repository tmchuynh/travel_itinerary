// pages/destination/[country]/[city].tsx
import { useRouter } from 'next/router';

const DestinationPage = () => {
  const router = useRouter();
  const { country, city } = router.query;

  return (
    <div>
      <h1>Destination Page</h1>
      <p>Country: {country}</p>
      <p>City: {city}</p>
      {/* Add your destination-specific content here */}
    </div>
  );
};

export default DestinationPage;
