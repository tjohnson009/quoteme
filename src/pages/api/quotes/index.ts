import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method is not allowed.' });
    }

    try {
        const expressResponse = `${process.env.NEXT_PUBLIC_EXPRESS_API}/v1/api/quotes`; 
        const response = await fetch(expressResponse, {
            method: req.method, 
            headers: {
                'Content-type': 'application/json', 
                'Authorization': req.headers.authorization || ''
            }, 
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
        })
        
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch(error) {
        console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
    }
}