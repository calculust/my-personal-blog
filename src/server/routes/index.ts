import * as express from 'express';
import blogsRouter from './blogs';
import authorsRouter from './authors';

const router = express.Router();

/*
router.get('/api/hello', (req, res, next) => {
    res.json('Pee Pee');
});
*/

router.use('/api/blogs', blogsRouter);
router.use('/api/authors', authorsRouter);

export default router;