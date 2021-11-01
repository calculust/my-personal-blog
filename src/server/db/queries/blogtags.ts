import { BlogTags } from '../../../types';
import { Query } from '../index';

const create = (blogtag: BlogTags) => Query('INSERT INTO BlogTags SET ?', [blogtag]);
const destroy = (blogid: BlogTags['blogid']) => Query('DELETE FROM BlogTags WHERE blogid=?', [blogid]);

export default {
    create,
    destroy
}