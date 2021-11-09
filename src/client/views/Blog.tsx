import * as React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment';
import Emoji from '../components/Emoji';
import { Tags } from '../../types';


const Blog = (props: BlogProps) => {
    const history = useHistory();
    const { id, status } = useParams<{ id: string, status: string }>();
    const [blog, setBlog] = useState({ authorid:0, title: '', author: '', content: '', _created: '' });
    const [tags, setTags] = useState<Tags[]>(null);
    const editURL = `/edit/${id}`;

    // Toast Config
    const [showToast, setShowToast] = useState(true);
    const toggleShowToast = () => setShowToast(!showToast);
    let toast;

    if (status == 'new') {
        toast = <ToastContainer className="p-3" position="top-end" style={{ zIndex: 10000}}>
                    <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Created!</strong>
                        </Toast.Header>
                        <Toast.Body>Your post has been created.</Toast.Body>
                    </Toast>
                </ToastContainer>
    }
    else if (status == 'edited') {
        toast = <ToastContainer className="p-3" position="top-end" style={{ zIndex: 10000}}>
                    <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Updated!</strong>
                        </Toast.Header>
                        <Toast.Body>Your post has been updated.</Toast.Body>
                    </Toast>
                </ToastContainer>
    }

    const handleDelete = async () => {
        const r = confirm('Are you sure you want to delete?');
        if (r) {
            try {
                console.log(id);
                const res = await fetch(`/api/blogs/${id}`, {
                    method: 'DELETE',
                    mode: 'same-origin'
                });
                history.push('/');
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        async function getBlog() {
            try {
                const res = await fetch('/api/blogs/' + id);
                const blogData = await res.json();
                setBlog(blogData);

                const res2 = await fetch('/api/blogtags/' + id);
                const tagData = await res2.json();
                setTags(tagData[0]);
            } catch(e) {
                console.log(e);
            }
        }
        getBlog();
        document.title = `Vishal's Blog - ${blog.title}`;
    }, [blog.title]);

    if(!blog || !tags) { /* To avoid crash when state is empty */
        return(
            <></>
        )
    }

    return (
        <>
            <div className="row">
                <div className="col blogPost">
                    <h2>{blog.title}</h2>
                    <div className="blogInfo mb-4">
                        <Link to={`/author/${blog.authorid}`}>By {blog.author}</Link> •&nbsp; 
                        {moment(blog._created).format('MMM Do, YYYY')} •&nbsp;
                        {tags.map(val => <Link to={`/tag/${val.id}`} key={`tag-${val.name}`}>#{val.name} </Link>)}
                    </div>
                    <div className="blogContent">{blog.content}</div>
                    <div className="blogControls">
                        <Link to="/" className=""><Button><Emoji symbol="🏠" label="house"/>Back Home</Button></Link>
                        <Link to={editURL}><Button><Emoji symbol="🔧" label="wrench"/>Edit</Button></Link>
                        <Button onClick={handleDelete}><Emoji symbol="🗑" label="trash"/>Delete</Button>
                    </div>
                </div>
            </div>
            {toast}
        </>
    );
}

interface BlogProps {}

export default Blog;