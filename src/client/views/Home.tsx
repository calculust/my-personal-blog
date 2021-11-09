import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import moment from 'moment';
import { Tags, Authors } from '../../types';
import Emoji from '../components/Emoji';

const Home = (props: HomeProps) => {
    const history = useHistory();
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState<Tags[]>([]);
    const [authors, setAuthors] = useState<Authors[]>([]);
    

    const printBlogs = blogs.map((val, index) => {
        return (
            <div className={(index == 0) ? "col-12" : "col-4"} key={val.id}>
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
                const res = await fetch('/api/blogs');
                const blogsData = await res.json();
                setBlogs(blogsData);

                const res2 = await fetch('/api/tags');
                const tagsData = await res2.json();
                setTags(tagsData);

                const res3 = await fetch('/api/authors');
                const authorsData = await res3.json();
                setAuthors(authorsData);
            } catch (e) {
                console.log(e);
            }
        }

        getBlogs();
        document.title = `Vishal's Blog - Home`;
    }, []);

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="row">
                    {printBlogs}
                </div>
            </div>
            <div className="col-md-3 homeLinks">
                <h3>Tags</h3>
                {tags.map(val => <div><Link to={`/tag/${val.id}`} key={`tag-${val.name}`}>#{val.name}</Link></div>)}

                <h3 className="mt-3">Authors</h3>
                {authors.map(val => <div><Link to={`/author/${val.id}`} key={`author-${val.name}`}>{val.name}</Link></div>)}
            </div>
        </div>
    )
}

interface HomeProps {}

export default Home;