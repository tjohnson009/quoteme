 // src/pages/api/auth/login.ts
// this is our Next.js API route that acts as a proxy to the Express backend for user login 
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;

  try {
    const expressResponse = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await expressResponse.json();
    return res.status(expressResponse.status).json(data);
  } catch(error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
