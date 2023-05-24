import { travel_itinerary } from '../../config/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface DestinationRequestBody {
  cityCountry: string;
  cityValue: string;
}

/**
 * This is an async function that handles a POST request to query a database for travel itinerary data
 * based on a city and country input.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request. It contains information about the request such as the HTTP method, headers, and body. It is
 * of type `NextApiRequest`, which is a custom type defined by the Next.js framework.
 * @param {NextApiResponse} res - `res` is an object representing the HTTP response that will be sent
 * back to the client. It has methods like `status()` to set the HTTP status code, and `json()` to send
 * a JSON response.
 */
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
