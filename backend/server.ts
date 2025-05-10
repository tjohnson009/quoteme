// this is where I define my express server
import express from 'express'; 
import path from 'path';
import cors from 'cors'; // allows frontend to access / talk to backend

// import Home from '../../src/pages/index'; // this is a page from the frontend, therefore it is not a good idea to import it here

const app = express();
const port: number = 5000; 

// middleware
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from public directory    
app.use(cors());
app.use(express.json()); 



app.get('/', (req, res) => {
    res.send('Coming at you live from the backend!');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
}); 