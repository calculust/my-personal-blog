import { BlogTags } from '../../../types';
import { Query } from '../index';

const all = (blogid: BlogTags['blogid']) => Query('CALL spBlogTags(?)', [[blogid]]);
const create = (blogtag: BlogTags) => Query('INSERT INTO BlogTags SET ?', [blogtag]);
const destroy = (blogid: BlogTags['blogid']) => Query('DELETE FROM BlogTags WHERE blogid=?', [blogid]);

export default {
    all,
    create,
    destroy
}