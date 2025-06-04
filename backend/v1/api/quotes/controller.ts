// controller = handle the request and response; fetches data from the database and send it back
import createSupabaseClient from '../../../supabaseclient'; // Import the supabase client
import { Request, Response } from 'express';
import { getUserAndClient } from '../helpers/getUserAndClient.ts'; 
// import Quote from '../../models/quote.model'; // Import the Quote interface 

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

// function postmanTester(req: Request, res: Response): void {
//     }

// async function getUserAndToken() {
//     const supabase = createSupabaseClient(req); // Create a new Supabase client instance 
//     const token = req.headers.authorization?.replace('Bearer ', '');
// }

async function getQuotes(req: Request, res: Response): Promise<void> {
    try {
    const { supabase } = await getUserAndClient(req, res); // Get the user and supabase client

    const {data: userSavedQuotes, error: quotesError} = await supabase
        .from('saved_quotes')
        .select('*'); // RLS should not allow any quotes that do not belong to the user 

        if (quotesError) {
            console.error('Error fetching quotes:', quotesError);
            res.status(500).json({ error: `${quotesError.message}` });
        }

        if (userSavedQuotes && userSavedQuotes.length > 0) {
            res.status(200).json({userSavedQuotes}); 
        } else {
            res.status(200).json({message: 'No quotes found for this user.'}); // GPT suggests returning an empty array instead
        }

    } catch(error) {
        console.error('Error in getQuotes:', error);
        res.status(500).json({ error: 'Failed to fetch quotes.' });
    }
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

async function createQuote(req: Request, res: Response): Promise<void> {
    try {
        // const supabase = createSupabaseClient(req); // Create a new Supabase client instance
        // const token = req.headers.authorization?.replace('Bearer ', ''); 

        // const { data: userData, error: userError } = await supabase.auth.getUser(token); 
            
        //     if (!userData || !userData.user) {
        //         res.status(401).json({ "error": userError || "User toklen not found." });
        //         return; 
        //     }

    const { supabase, userID } = await getUserAndClient(req, res); // Get the user and supabase client 
            
    const { data: insertedData, error: insertError } = await supabase.from('saved_quotes').insert([
                {
                    // user_id: userData.user.id, 
                    user_id: userID, 
                    text: req.body.text, 
                    author: req.body.author ? req.body.author : 'Unknown',
                    tags: req.body.tags || [], 
                    notes: req.body.notes || ''
                }
            ]
        ).select(); 
        
        console.log('Inserted data:', insertedData); 
        
        if (insertError) {
            res.status(500).json({ "error": insertError, 
                // "message": `${insertError.message}`
            });
            return; 
        }
        
        res.status(201).json({insertedData}); 
        // console.log(token);
    } catch(error) {
        console.error('Error creating quote:', error);
        res.status(500).json({ error: 'Failed to create quote.' });
    }
        
}

// function editQuote
async function editQuote(req: Request, res: Response): Promise<void> {
    try {

    } catch(error) {

    }
}


export { getQuotes, 
    createQuote, 
    deleteQuote, 
    editQuote, 
    // postmanTester,
    // testSupabaseConnection 
}; 