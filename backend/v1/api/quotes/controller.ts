// controller = handle the request and response; fetches data from the database and send it back
import { Request, Response } from 'express';
import Quote from '../../models/quote.model'; // Import the Quote interface 

function getQuotes(req: Request, res: Response): void {
    const sampleQuotes = [
        { id: 1, quote: "The only way to do great work is to love what you do." },
        { id: 2, quote: "Success is not the key to happiness. Happiness is the key to success." },
        { id: 3, quote: "Believe you can and you're halfway there." },
        { id: 4, quote: "The future belongs to those who believe in the beauty of their dreams." },
        { id: 5, quote: "You miss 100% of the shots you don't take." }
    ];

     res.json(sampleQuotes);
}

function createQuote(req: Request, res: Response): void {
if (!req.body.text) {
     res.status(400).json({error: 'Quote text is not present.'}); 
     return; 
}

if (!req.body.author) {
    req.body.author = 'Unknown'; // default  
}

    const newQuote: Quote = {
        id: Math.floor(Math.random() * 1000), // random id
        createdAt: new Date(), // current date  
        author: req.body.author, 
        text: req.body.text,
        // text: '',
        tags: ['sad', 'happy']  
    };

    // sampleQuotes.push(newQuote); 
    // console.log(newQuote); 
     res.status(201).json(newQuote); 

}

function deleteQuote(req: Request, res: Response): void { 
    const quoteID = parseInt(req.params.id); 
    // const quoteID = req.query.id;  
    console.log(quoteID);
    if (quoteID) {
        res.status(200).json({message: `Quote with ID ${quoteID} deleted.`}); 
        console.log(`Quote with ID ${quoteID} deleted.`);   
    } else {
        res.status(400).json({error: 'Quote ID is not valid.'}); 
        console.log('Quote ID is not valid.');
        return; 
    }
}

// function editQuote

export { getQuotes, createQuote, deleteQuote }; 