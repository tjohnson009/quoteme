// controller = handle the request and response; fetches data from the database and send it back
import supabase from '../../../supabaseclient'; // Import the supabase client
import { Request, Response } from 'express';
import Quote from '../../models/quote.model'; // Import the Quote interface 

//--------
// async function testSupabaseConnection(req: Request, res: Response) {
//   const { data, error } = await supabase
//     .from('saved-quotes')
//     .select('id') // just select a lightweight column

//   if (error) {
//     console.error('Supabase error:', error);
//     res.status(500).json({ error: 'Supabase connection failed...' });
//   }

//   res.status(200).json({ message: '✅ Supabase connected successfully!', data });
// }
//--------

function postmanTester(req: Request, res: Response): void {
    }

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

async function createQuote(req: Request, res: Response): Promise<void> {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'tikimantim@gmail.com',
        password: 'girlshakethatlaffytaffy123@',
      });

const token = req.headers.authorization?.replace('Bearer ', ''); 
const { data: userData, error: userError } = await supabase.auth.getUser(token); 
console.log(userData); 

if (!userData) {
    res.status(400).json({ "error": `${userError}` });
    return; 
}

 const { data: insertedData, error: insertError } = await supabase.from('saved_quotes').insert([
    {
        user_id: userData.user?.id, 
        text: req.body.text, 
        author: req.body.author ? req.body.author : 'Unknown',
        tags: req.body.tags || [], 
        notes: req.body.notes || ''
    }
]
); 

console.log('Inserted data:', insertedData); 

if (insertError) {
    res.status(500).json({ insertError, 
        // "message": `${insertError.message}`
     });
}

res.json({insertedData, insertError}); 
// console.log(token);

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

export { getQuotes, 
    createQuote, 
    deleteQuote, 
    postmanTester,
    // testSupabaseConnection 
}; 