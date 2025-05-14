// controller = handle the request and response; fetches data from the database and send it back
import { Request, Response } from 'express';
import Quote from '../../models/quote.model'; // Import the Quote interface 

function getQuotes(req: Request, res: Response) : void {
    const sampleQuotes = [
        { id: 1, quote: "The only way to do great work is to love what you do." },
        { id: 2, quote: "WORK is not the key to happiness. Happiness is the key to success." },
        { id: 3, quote: "Believe you can and you're halfway there." },
        { id: 4, quote: "The future belongs to those who believe in the beauty of their dreams." },
        { id: 5, quote: "You miss 100% of the shots you don't take." }
    ];

    res.json(sampleQuotes);
}

function createQuote(req: Request, res: Response) {
if (!req.body.text) {
    return res.status(400).json({error: 'Quote text is not present.'}); 
}

if (!req.body.author) {
    req.body.author = 'Unknown'; // default  
}

    const newQuote: Quote = {
        id: Math.floor(Math.random() * 1000), // random id
        createdAt: new Date(), // current date  
        author: '', 
        text: 'If you cannot be happy, be sad.',
        tags: ['sad', 'happy']  
    };

    // sampleQuotes.push(newQuote); 
    res.status(200).json(newQuote);  



}

export default getQuotes;