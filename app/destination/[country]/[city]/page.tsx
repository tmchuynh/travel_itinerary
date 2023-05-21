"use client"

// pages/destination/[cityCountry]/[cityValue]/page.tsx

export default function DestinationPage() {
  const cityCountry = window.location.pathname.split('/')[2];
  const cityValue = window.location.pathname.split('/')[3];

  // Perform any necessary logic based on the cityCountry and cityValue values

  return (
    <div>
      <h1>Destination Page</h1>
      <p>Country: {cityCountry}</p>
      <p>City: {cityValue}</p>
    </div>
  );
}
