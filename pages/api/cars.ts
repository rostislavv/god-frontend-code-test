import { NextApiRequest, NextApiResponse } from 'next';
import cars from '../../public/api/cars.json'


/* sole purpose of this api endpoint is to emulate 1s delay */
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  setTimeout(() => {
    res.json(cars);
  }, 1000);
}

