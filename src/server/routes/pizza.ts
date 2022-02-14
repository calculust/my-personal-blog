import { Router } from "express";
import { jwtConfig } from "../config";
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', (req, res) => {
    // no token? no access
    const bearerToken = req.headers.authorization?.split(' ');
    const token = bearerToken && bearerToken[0] === 'Bearer' ? bearerToken[1] : 'peepee';
    
    if (!bearerToken || !token) {
        res.status(401).json({ message: 'unauthorized' });
        return;
    }

    // Validate token
    const payload = <{ email: string }>jwt.verify(token, jwtConfig.secret);

    console.log(payload);

    res.json({ message: `Success! ${payload.email}` });
});

export default router;