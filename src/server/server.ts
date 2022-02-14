import express from 'express';
import path from 'path';
import passport from 'passport';
import PassportLocal from 'passport-local';
import apiRouter from './routes';

const app = express();

import db from './db';
import { compareHash } from './utils/passwords';
passport.use(new PassportLocal.Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const [userFound] = await db.Authors.find('email', email);
        if (userFound && compareHash(password, userFound.password)) {
            done(null, userFound);
        } else {
            
        }
    } catch (error) {
        done(error);
    }
}));

app.use(passport.initialize()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(apiRouter);

app.get('*', (req, res) => { // Allow React to behave as SPA 
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));