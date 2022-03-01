import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config'
import db from '../../db'
import { generateHash } from '../../utils/passwords';

const router = Router();

router.post('/', async (req, res) => {
    const newAuthor = req.body;
    try {
        newAuthor.password = generateHash(newAuthor.password);
        const result = await db.Authors.create(newAuthor);
        
        const token = jwt.sign(
            { userid: result.insertId, email: newAuthor.email, role: 1},
            jwtConfig.secret,
            { expiresIn: jwtConfig.expire}
        );
        res.json(token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'uh oh'});
    }
});

export default router;