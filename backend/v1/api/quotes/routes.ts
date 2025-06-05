// Routes = URL + HTTP verb + which function to run
import express from 'express';  
import { getQuotes, createQuote, deleteQuote, editQuote } from './controller'; 
import { 
    // testSupabaseConnection, 
    // postmanTester 
} from './controller'; // Import the test connection function 
// import {createQuote} from './controller';  

const router = express.Router(); 

// router.get('/supabase-test', testSupabaseConnection); 

// router.get('/postman-test', postmanTester); 

router.get('/', getQuotes); // when the user hits /v1/api/quotes, run the getQuotes function 

router.post('/', createQuote); // when the user hits /v1/api/quotes, run the createQuote function 

router.patch('/:id', editQuote); // when the user hits /v1/api/quotes/:id, run the editQuote function

router.delete('/:id', deleteQuote); 

export default router; 
