import express from 'express';
import blogsRouter from './blogs';
import authorsRouter from './authors';
import blogTagsRouter from './blogtags';
import tagsRouter from './tags';
import donateRouter from './donate';
import contactRouter from './contact';

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
router.use('/api/contact', contactRouter);

export default router;