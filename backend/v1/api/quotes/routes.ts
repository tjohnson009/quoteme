import express from 'express';  
import { getQuotes, createQuote, deleteQuote, editQuote } from './controller'; 

const router = express.Router(); 

router.get('/', getQuotes);  

router.post('/', createQuote);  

router.patch('/:id', editQuote); 

router.delete('/:id', deleteQuote); 

export default router; 
