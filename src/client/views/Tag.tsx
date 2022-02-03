import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Tags } from '../../types';

const Tag = (props: TagProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [blogs, setBlogs] = useState([]);
    const [tag, setTag] = useState<Tags>({ name: '' });

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
                const res = await fetch(`/api/tags/blogs/${id}`);
                const blogsData = await res.json();
                setBlogs(blogsData);

                const res2 = await fetch(`/api/tags/${id}`);
                const tagData = await res2.json();
                setTag(tagData[0]);
            } catch (e) {
                console.log(e);
            }
        }

        getBlogs();
        document.title = `Vishal's Blog - Posts tagged #${tag.name}`;
    }, [tag.name]);

    if(!tag || !blogs) { /* To avoid crash when state is empty */
        return(
            <>Tag does not exist.</>
        )
    }  

    return (
        <div className="row">
            <div className="col-12">
                <Card className="rounded-3 mb-3">
                    <Card.Body>
                        <Card.Title>#{tag.name}</Card.Title>
                        <Card.Text>{blogs.length} {(blogs.length === 1) ? 'Post' : 'Posts'}</Card.Text>
                    </Card.Body>
                </Card>
                {}
            </div>
            {(blogs.length === 0) ? 'There are no blogs with this tag yet.' : printBlogs} {/* How do I set up my code so that the empty copy doesn't show up until after the fetch has run and confirmed there are no blogs? Right now it flashes for a quick sec */}
        </div>
    )
}

interface TagProps {}

export default Tag;