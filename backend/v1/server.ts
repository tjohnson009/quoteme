// server.ts wires everything together. - connects all the routers
//routes.ts defines what should happen when specific URLs are hit.
//controller.ts holds the function that actually runs when those routes are hit.
//model.ts is used if you need to hit a database.

import express from 'express'; 
import path from 'path';
import cors from 'cors'; // allows frontend to access / talk to backend

import quotesRouter from './api/quotes/routes'; // this is the router for the quotes API 
// import usersRouter from './api/users/routes'; // this is the router for the users API


// // import Home from '../../src/pages/index'; // this is a page from the frontend, therefore it is not a good idea to import it here

const app = express();
const port: number = 5000; 

// middleware
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from public directory    
app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('Coming at you live from the backend!');
});

app.use('/v1/api/quotes', quotesRouter); 
// app.use('/v1/api/users', usersRouter); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
}); 