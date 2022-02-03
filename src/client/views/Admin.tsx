import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import Emoji from '../components/Emoji';
import { Tags, Authors } from '../../types';


const Admin = (props: AdminProps) => {
    const [blog, setBlog] = useState(null);
    const [tags, setTags] = useState<Tags[]>(null);
    const [authors, setAuthors] = useState<Authors[]>([]);
    const [newtag, setNewTag] = useState('');
    const [newauthor, setNewAuthor] = useState('');
    const [newemail, setNewEmail] = useState('');
    const [count, setCount] = useState(0);

    const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(e.target.value);
    }

    const handleNewAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(e.target.value);
    }
    
    const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
    }    
    
    const handleNewTagPost = async () => {
        setNewTag('');
        try {
            const data = {
                name: newtag
            }
            const res = await fetch('/api/tags', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            setCount(count+1);
        } catch (e) {
            console.log(e)
        }
    }
    
    const handleNewAuthorPost = async () => {
        setNewAuthor('');
        setNewEmail('');
        try {
            const data = {
                name: newauthor,
                email: newemail
            }
            const res = await fetch('/api/authors', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            setCount(count+1);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch('/api/tags');
                const tagsData = await res.json();
                setTags(tagsData);

                const res2 = await fetch('/api/authors');
                const authorsData = await res2.json();
                setAuthors(authorsData);
            } catch(e) {
                console.log(e);
            }
        }
        getData();
        document.title = `Vishal's Blog - Admin`;
    }, [count]);

    if(!authors || !tags) { /* To avoid crash when state is empty */
        return(
            <></>
        )
    }    

    return (
        <div className="row">
            <div className="col-6">
                <h3>Tags</h3>
                
                <Form className="mb-3" onSubmit={e => { e.preventDefault(); }}> {/* Prevents enter key from submitting */}
                    <Row>
                        <Col sm={9}>
                            <Form.Control 
                                id="newtag"
                                value={newtag}
                                type="text"
                                placeholder="New #Tag"
                                aria-label="New Tag"
                                onChange={handleNewTagChange} 
                            />
                        </Col>
                        <Col sm={3}>
                            <Button variant="primary" onClick={handleNewTagPost}>
                                    <Emoji symbol="🏷" label="tag"/>Add Tag    
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {tags.map(val => <div><Link to={`/tag/${val.id}`} key={`tag-${val.name}`}>#{val.name}</Link></div>)}
            </div>
            
            <div className="col-6">
                <h3>Authors</h3>
                
                <Form className="mb-3" onSubmit={e => { e.preventDefault(); }}>
                    <Row>
                        <Col sm={4}>
                            <Form.Control 
                                id="newauthor"
                                value={newauthor}
                                type="text"
                                placeholder="Author Name"
                                aria-label="New Author"
                                onChange={handleNewAuthorChange} 
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control 
                                id="newemail"
                                value={newemail}
                                type="text"
                                placeholder="Author Email"
                                aria-label="New Author Email"
                                onChange={handleNewEmailChange} 
                            />
                        </Col>
                        <Col sm={4}>
                            <Button variant="primary" onClick={handleNewAuthorPost}>
                                <Emoji symbol="👤" label="person"/>Add Author 
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {authors.map(val => <div><Link to={`/author/${val.id}`} key={`author-${val.name}`}>{val.name}</Link></div>)}
            </div>
        </div>
    );
}

interface AdminProps {}

export default Admin;