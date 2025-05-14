// Routes = URL + HTTP verb + which function to run
import express from 'express';  
import getQuotes from './controller'; 
import createQuote from './controller';  

const router = express.Router(); 

router.get('/', getQuotes); // when the user hits /v1/api/quotes, run the getQuotes function 

router.post('/', createQuote); // when the user hits /v1/api/quotes, run the createQuote function 

export default router; 
