import { Authors } from '../../../types';
import { Query } from '../index';

const all = async () => Query<Authors[]>(`SELECT * FROM Authors`);
const one = async (id: number) => Query<Authors[]>(`SELECT * FROM Authors WHERE id = ?`, [id]);
const getByName = async (name: string) => Query<Authors[]>('SELECT * FROM Authors WHERE name=?', [name]);
const create = (author: Authors) => Query('INSERT INTO Authors SET ?', [author]);

export default {
    all,
    one,
    getByName,
    create
}