import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const expressResponse = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_API}/v1/api/auth/demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await expressResponse.json();
    return res.status(expressResponse.status).json(data);
  } catch(error) {
    console.error('Error starting demo:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
