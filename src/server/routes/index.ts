import * as express from 'express';
import blogsRouter from './blogs';
import authorsRouter from './authors';
import blogTagsRouter from './blogtags';
import tagsRouter from './tags';
import donateRouter from './donate';

const router = express.Router();

/*
router.get('/api/hello', (req, res, next) => {
    res.json('Pee Pee');
});
*/

router.use('/api/blogs', blogsRouter);
router.use('/api/authors', authorsRouter);
router.use('/api/blogtags', blogTagsRouter);
router.use('/api/tags', tagsRouter);
router.use('/api/donate', donateRouter);

export default router;