import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config'
import { ReqUser } from '../../types'

const router = Router();

router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => {

    try {
        
        const token = jwt.sign(
            { userid: req.user.id, email: req.user.email, role: 1},
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