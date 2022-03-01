import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';

const router = Router();

router.use('/auth/login', loginRouter);
router.use('/auth/register', registerRouter);

export default router;