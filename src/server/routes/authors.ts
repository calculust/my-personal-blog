import * as express from 'express';
import db from '../db';

let router = express.Router();

// GET - Get Author Data by Name
router.get('/:name', async (req, res) => {
    try {
        const author = (await db.Authors.getByName(req.params.name))[0];
        res.json(author);
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