import { Blogs } from '../../../types';
import { Query } from '../index';

const all = async () => Query<Blogs[]>(`
    SELECT b.*, a.name as author
    FROM Blogs b
    INNER JOIN Authors a
        ON b.authorid = a.id
    ORDER BY b._created DESC
    `);
const one = async (id: number) => Query<Blogs[]>(`
    SELECT b.*, a.name as author
    FROM Blogs b
    INNER JOIN Authors a
        ON b.authorid = a.id
    WHERE b.id = ?
    `, [id]);
const byauthor = async (id: number) => Query<Blogs[]>(`
    SELECT b.*, a.name as author
    FROM Blogs b
    INNER JOIN Authors a
        ON b.authorid = a.id
    WHERE b.authorid = ?
    `, [id]);
const bytag = async (id: number) => Query<Blogs[]>(`
    SELECT b.*, a.name as author
    FROM Blogs b
    INNER JOIN Authors a
        ON b.authorid = a.id
    INNER JOIN BlogTags bt
        ON b.id = bt.blogid
    WHERE bt.tagid = ?
    `, [id]);        
const create = (blog: Blogs) => Query('INSERT INTO Blogs SET ?', [blog]);
const update = (title: Blogs['title'], content: Blogs['content'], authorid: Blogs['authorid'], id: Blogs['id']) => Query('UPDATE Blogs set title=?, content=?, authorid=? WHERE id=?', [title,content,authorid,id]);
const destroy = (id: Blogs['id']) => Query('DELETE FROM Blogs WHERE id=?', [id]);

export default {
    all,
    one,
    byauthor,
    bytag,
    create,
    update,
    destroy
}