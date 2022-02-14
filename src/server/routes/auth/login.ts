import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { jwtConfig } from '../../config';
import db from '../../db';
import { compareHash } from '../../utils/passwords';

const router = Router();

router.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        // check for the user's email
        const [userFound] = await db.Authors.find('email', email);
        // check if user's email IS found
        // and if passwords compare and pass
        if (userFound && compareHash(password, userFound.password)) {
            const token = jwt.sign(
                { userid: userFound.id, email: userFound.email, role: 1},
                jwtConfig.secret,
                { expiresIn: '15d'}
            );
            res.json(token);
            return;
        }
        res.status(401).json({ message: 'invalid credentials' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'uh oh'});
    }
});

export default router;