import express from 'express';
import path from 'path';
import apiRouter from './routes';
import { configurePassport } from './middlewares/passport-strategies.mw';


const app = express();
 
configurePassport(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(apiRouter);

app.get('*', (req, res) => { // Allow React to behave as SPA 
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));