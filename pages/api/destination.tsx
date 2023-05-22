import { travel_itinerary } from '../../config/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface DestinationRequestBody {
  cityCountry: string;
  cityValue: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cityCountry, cityValue }: DestinationRequestBody = req.body;

    try {
      const query = `SELECT * FROM locations WHERE city = '${cityValue.toString()}' AND country = '${cityCountry.toString()}'`;

      const data = await travel_itinerary.query(query);

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
