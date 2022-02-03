import express from 'express';
import db from '../db';

let router = express.Router();

// GET - All Tags
router.get('/:id', async (req, res) => {
    try {
        const tags = await db.BlogTags.all(Number(req.params.id));
        res.json(tags);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



export default router;