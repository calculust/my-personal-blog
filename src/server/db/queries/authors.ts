import { Authors } from '../../../types';
import { Query } from '../index';

const getByName = async (name: string) => Query<Authors[]>('SELECT * FROM Authors WHERE name=?', [name]);
const create = (author: Authors) => Query('INSERT INTO Authors SET ?', [author]);

export default {
    getByName,
    create
}