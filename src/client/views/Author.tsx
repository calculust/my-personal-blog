import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Authors } from '../../types';

const Author = (props: AuthorProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [blogs, setBlogs] = useState([]);
    const [author, setAuthor] = useState<Authors>({ name: '', email: '' });

    const printBlogs = blogs.map(val => {
        return (
            <div className="col-4" key={val.id}>
                <Card role="button" className="rounded-3 mb-3" onClick={() => history.push('/blog/' + val.id)}>
                    <Card.Body>
                        <Card.Title>{val.title}</Card.Title>
                        <Card.Text className="author mb-1">By {val.author}</Card.Text>
                        <Card.Text className="date">{moment(val._created).format('MMM Do, YYYY')}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    });

    useEffect(() => {
        async function getBlogs() {
            try {
                const res = await fetch(`/api/authors/blogs/${id}`);
                const blogsData = await res.json();
                setBlogs(blogsData);

                const res2 = await fetch(`/api/authors/${id}`);
                const authorData = await res2.json();
                setAuthor(authorData[0]);
            } catch (e) {
                console.log(e);
            }
        }

        getBlogs();
        /* document.title = `Vishal's Blog - Posts by ${author.name}`;*/
    }, [author.name]);

    if(!author || !blogs) { /* To avoid crash when state is empty */
        return(
            <>Author does not exist.</>
        )
    }    

    return (
        <div className="row">
            <div className="col-12">
                <Card className="rounded-3 mb-3">
                    <Card.Body>
                        <Card.Title>{author.name}</Card.Title>
                        <Card.Text className="mb-1">Contact: <a href={`mailto:${author.email}`}>{author.email}</a></Card.Text>
                        <Card.Text>{blogs.length} {(blogs.length === 1) ? 'Post' : 'Posts'}</Card.Text>
                    </Card.Body>
                </Card>
                {}
            </div>
            {((blogs.length === 0)) ? 'There are no blogs with this author yet.' : printBlogs}
        </div>
    )
}

interface AuthorProps {}

export default Author;