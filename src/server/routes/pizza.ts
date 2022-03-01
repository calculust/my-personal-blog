import { Router } from "express";
import { ReqUser } from '../types'
import { tokenCheck } from '../middlewares/auth.mw'

const router = Router();

router.get('/', tokenCheck, (req: ReqUser , res) => {
    
    res.json({ message: `Success! ${req.user.email}` });
});

export default router;