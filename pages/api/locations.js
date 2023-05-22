import { travel_itinerary } from '../../config/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cityCountry, cityValue } = req.query;

    try {
      // errno: 1054,
      // sqlMessage: "Unknown column '$1' in 'where clause'",
      // sqlState: '42S22',
      // index: 0,
      // sql: 'SELECT * FROM locations WHERE city = $1 AND country = $2'
      const data = await travel_itinerary.query('SELECT * FROM locations WHERE city = $1 AND country = $2', [cityValue, cityCountry]);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred BUT HEY I GOT HERE' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
