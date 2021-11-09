import * as express from 'express';
import db from '../db';

let router = express.Router();

// GET - All Blogs
router.get('/', async (req, res) => {
    try {
        const allblogs = await db.Blogs.all();
        res.json(allblogs);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET - Single Blog
router.get('/:id', async (req, res) => {
    try {
        const singleblog = (await db.Blogs.one(Number(req.params.id)))[0];
        res.json (singleblog);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// POST - Create Blog
router.post('/', async (req, res) => {
    try {
        const newblogdata = req.body;
        const newblog = {
            title: newblogdata.title,
            content: newblogdata.content,
            authorid: newblogdata.authorid
        }
        const db_response = await db.Blogs.create(newblog);

        const newblogtag = {
            blogid: db_response.insertId,
            tagid: newblogdata.tagid
        }
        const db_response2 = await db.BlogTags.create(newblogtag);

        res.json({
            message: "The New blog was added successfully!",
            insertId: db_response.insertId
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ e });
    }
});

// PUT - Edit Blog
router.put('/', async (req, res) => {
    try {
        const { title, content, authorid, tagid, id } = req.body;
        const db_response = await db.Blogs.update(title, content, authorid, id);

        const updatedblogtag = {
            blogid: id,
            tagid: tagid
        }
        const db_response2 = await db.BlogTags.destroy(id);
        const db_response3 = await db.BlogTags.create(updatedblogtag);

        if (db_response.affectedRows === 1) {
            res.json({ message: "The blog post was updated successfully!" });
        } else {
            res.status(404).json({ message: `The post with id#${id} was not found` });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ e });
    }
});

// DELETE - Destroy Blog
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db.BlogTags.destroy(id);
        await db.Blogs.destroy(id);
        res.json({ mesage: "The blog was deleted successfully." });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;