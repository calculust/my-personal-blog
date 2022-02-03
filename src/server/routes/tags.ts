import express from 'express';
import db from '../db';

let router = express.Router();

// GET - All Tags
router.get('/', async (req, res) => {
    try {
        const alltags = await db.Tags.all();
        res.json(alltags);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET - Get Tag Info by ID
router.get('/:id', async (req, res) => {
    try {
        const taginfo = await db.Tags.one(Number(req.params.id));
        res.json(taginfo);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET - Get All Blogs by Tag
router.get('/blogs/:id', async (req, res) => {
    try {
        const allblogsbytag = await db.Blogs.bytag(Number(req.params.id));
        res.json(allblogsbytag);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// POST - Create Tag
router.post('/', async (req, res) => {
    try {
        const newtag = req.body;
        const db_response = await db.Tags.create(newtag);
        res.json({
            message: "The new tag was added successfully!",
            insertId: db_response.insertId
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);        
    }
});

export default router;