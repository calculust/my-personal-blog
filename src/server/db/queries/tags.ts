import { Tags } from '../../../types';
import { Query } from '../index';

const all = async () => Query<Tags[]>(`SELECT * FROM Tags`);
const one = async (id: number) => Query<Tags[]>(`SELECT * FROM Tags WHERE id = ?`, [id]);
const create = (tag: Tags) => Query('INSERT INTO Tags SET ?', [tag]);

export default {
    all,
    one,
    create
}