// Routes = URL + HTTP verb + which function to run
import express from 'express';  
import getQuotes from './controller'; 

const router = express.Router(); 

router.get('/', getQuotes); // when the user hits /v1/api/quotes, run the getQuotes function 

export default router; 
