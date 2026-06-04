import express from 'express'; 
import path from 'path';
import authRouter from './api/routes/auth'; 
import cors from 'cors'; 
import quotesRouter from './api/quotes/routes'; 

const app = express();
const port: number = parseInt(process.env.PORT || '5000');

// middleware
app.use(express.static(path.join(__dirname, 'public')));    
app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Coming at you live from the backend!');
});

app.use('/v1/api/quotes', quotesRouter); 
app.use('/v1/api/auth', authRouter); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 