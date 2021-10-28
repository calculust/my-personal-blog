import { Blogs } from '../../../types';
import { Query } from '../index';

const all = async () => Query<Blogs[]>(`
    SELECT b.*, a.name
    FROM Blogs b
    INNER JOIN Authors a
    ON b.authorid = a.id
    `);
const one = async (id: number) => Query<Blogs[]>(`
    SELECT b.*, a.name
    FROM Blogs b
    INNER JOIN Authors a
    on b.authorid = a.id
    WHERE b.id = ?
    `, [id]);
const create = (blog: Blogs) => Query('INSERT INTO Blogs SET ?', [blog]);
const update = (title: Blogs['title'], content: Blogs['content'], id: Blogs['id']) => Query('UPDATE Blogs set title=?, content=? WHERE id=?', [title,content, id]);
const destroy = (id: Blogs['id']) => Query('DELETE FROM Blogs WHERE id=?', [id]);

export default {
    all,
    one,
    create,
    update,
    destroy
}