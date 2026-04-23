import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method !== 'PATCH' && req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method is not allowed.' });
    }

    try {
        const { id } = req.query; 
        const expressResponse = `${process.env.NEXT_PUBLIC_EXPRESS_API}/v1/api/quotes/${id}`; 
        const response = await fetch(expressResponse, {
            method: req.method, 
            headers: {
                'Content-type': 'application/json', 
                'Authorization': req.headers.authorization || ''
            }, 
            body: req.method === 'PATCH' ? JSON.stringify(req.body) : undefined
        })
        
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch(error) {
        console.error(`Error during operation on quote #${req.query}:`, error);
    return res.status(500).json({ error: 'Internal server error' });
    }
}