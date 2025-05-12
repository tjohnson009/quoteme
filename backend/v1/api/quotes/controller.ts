// controller = handle the request and response; fetches data from the database and send it back
import { NextFunction, Request, Response } from 'express';

function getQuotes(req: Request, res: Response, next?: NextFunction) : void {
    const sampleQuotes = [
        { id: 1, quote: "The only way to do great work is to love what you do." },
        { id: 2, quote: "Success is not the key to happiness. Happiness is the key to success." },
        { id: 3, quote: "Believe you can and you're halfway there." },
        { id: 4, quote: "The future belongs to those who believe in the beauty of their dreams." },
        { id: 5, quote: "You miss 100% of the shots you don't take." }
    ];

    res.json(sampleQuotes);
}

export default getQuotes;