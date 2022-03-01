import passport from 'passport';
import PassportLocal from 'passport-local';
import PassportJWT from 'passport-jwt';
import db from '../db';
import { jwtConfig } from '../config';
import { Application } from 'express';
import { compareHash } from '../utils/passwords';
import { Payload } from '../types';

export function configurePassport(app: Application) {

    passport.serializeUser((user: Payload, done) => {
        if (user.password) {
            delete user.password;
        }
        done(null, user);
    });
    passport.deserializeUser((user, done) => done(null, user));

    // Local
    passport.use(new PassportLocal.Strategy({
        usernameField: 'email',
        session: false
    }, async (email, password, done) => {
        try {
            const [userFound] = await db.Authors.find('email', email);
            if (userFound && compareHash(password, userFound.password)) {
                done(null, userFound);
            } else {
                done(null, false); // Status 401 text of Unauthorized
            }
        } catch (error) {
            done(error);
        }
    }));

    // JWT
    passport.use(new PassportJWT.Strategy({
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.secret
    }, (payload: Payload, done) => {
        try {
            done(null, payload);
        } catch (error) {
            done
        }
    }));

    app.use(passport.initialize());
}

