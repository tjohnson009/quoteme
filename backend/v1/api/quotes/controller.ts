// controller = handle the request and response; fetches data from the database and send it back
// import createSupabaseClient from '../../../supabaseclient'; // Import the supabase client
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

 async function deleteQuote(req: Request, res: Response): Promise<void> { 
    try {
        const { supabase, userID } = await getUserAndClient(req, res);
        const deletedQuoteID = parseInt(req.params.id);  

        if (!deletedQuoteID || isNaN(deletedQuoteID)) {
            console.error('Invalid quote ID:', deletedQuoteID); 
            res.status(400).json({ error: 'Invalid quote ID selected for deletion.' });
            return; 
        }

        const { data: deletedQuoteData, error: deletionError } = await supabase
            .from('saved_quotes')
            .delete()
            .eq('user_id', userID) // ensures only updating logged in user's quote - should be covered by RLS but this is an extra check - trust but verify! 
            .eq('id', deletedQuoteID) // Ensure we are updating the correct quote
            .select(); 

        if (deletionError) {
            console.error(`Error deleting quote # ${deletedQuoteID}:`, deletionError);
            res.status(500).json({ error: deletionError.message });
            return; 
        } 

        if (deletedQuoteData.length === 0) {
            res.status(404).json({ error: `No quote found with ID #${deletedQuoteID} for this user.` });
                return;
        }

        res.status(200).json({ message: `Quote #${deletedQuoteID} successfully deleted`, deletedQuoteData});

    } catch(error) {
        console.error('Error in deleteQuote:', error);
        res.status(500).json({ error: 'Failed to delete quote.' });
    }
}

async function createQuote(req: Request, res: Response): Promise<void> {
    try {
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

async function editQuote(req: Request, res: Response): Promise<void> {
    try {
        const { supabase, userID } = await getUserAndClient(req, res);
        const editedQuoteID = parseInt(req.params.id);  

        if (!editedQuoteID || isNaN(editedQuoteID)) {
            console.error('Invalid quote ID:', editedQuoteID);
            res.status(400).json({ error: 'Invalid quote ID.' });
            return; 
        }

        // const { text, author, tags, notes} = req.body; 
        const updatedFields: { [key: string]: string } = {}; 
        const potentialUpdatedFields = ['text', 'author', 'tags', 'notes'];
        
        for (const field of potentialUpdatedFields) {
            if (req.body[field] !== undefined && req.body[field] !== null) {
                updatedFields[field] = req.body[field]; 
            }
        }

        const { data: updatedData, error: updateError } = await supabase
            .from('saved_quotes')
            .update(updatedFields)
            .eq('user_id', userID) // ensures only updating logged in user's quote - should be covered by RLS but this is an extra check - trust but verify! 
            .eq('id', editedQuoteID) // Ensure we are updating the correct quote
            .select(); 

        if (updateError) {
            console.error('Error updating quote:', updateError);
            res.status(500).json({ error: updateError.message });
            return; 
        } 

        res.status(200).json({ updatedData });

    } catch(error) {
        console.error('Error in editQuote:', error);
        res.status(500).json({ error: 'Failed to edit quote.' });
    }
}


export { getQuotes, 
    createQuote, 
    deleteQuote, 
    editQuote, 
    // postmanTester,
    // testSupabaseConnection 
}; 