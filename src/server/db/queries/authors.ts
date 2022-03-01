import { Authors, MySQL_Res } from '../../../types';
import { Query } from '../index';

const all = async () => Query<Authors[]>(`SELECT id, name, email, _created FROM Authors`);
const one = async (id: number) => Query<Authors[]>(`SELECT * FROM Authors WHERE id = ?`, [id]);
const getByName = async (name: string) => Query<Authors[]>('SELECT * FROM Authors WHERE name=?', [name]);
const find = async (column: string, value: string) => Query<Authors[]>('SELECT * FROM Authors WHERE ?? = ?', [column, value]);
const create = (author: Authors) => Query<MySQL_Res>('INSERT INTO Authors SET ?', [author]);

export default {
    all,
    one,
    getByName,
    find,
    create
}