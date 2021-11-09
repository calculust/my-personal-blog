import * as express from 'express';
import db from '../db';

let router = express.Router();

// GET - All Authors
router.get('/', async (req, res) => {
    try {
        const allauthors = await db.Authors.all();
        res.json(allauthors);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET - Get Author Data by Name
/*
router.get('/:name', async (req, res) => {
    try {
        const author = (await db.Authors.getByName(req.params.name))[0];
        res.json(author);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
*/

// GET - Author Details by ID
router.get('/:id', async (req, res) => {
    try {
        const authorinfo = await db.Authors.one(Number(req.params.id));
        res.json(authorinfo);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET - Get All Blogs by Author
router.get('/blogs/:id', async (req, res) => {
    try {
        const allblogsbyauthor = await db.Blogs.byauthor(Number(req.params.id));
        res.json(allblogsbyauthor);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// POST - Create Author
router.post('/', async (req, res) => {
    try {
        const newauthor = req.body;
        const db_response = await db.Authors.create(newauthor);
        res.json({
            message: "The new author was added successfully!",
            insertId: db_response.insertId
        });
    } catch (e) {
        
    }
});

export default router;