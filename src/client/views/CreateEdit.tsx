import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Toast, ToastContainer, Form, FloatingLabel } from 'react-bootstrap';
import Emoji from '../components/Emoji';
import Select from 'react-select' // I tried to figure out how to use this to do async mutli-select and gave up

const CreateEdit = (props: CreateEditProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [authorid, setAuthorid] = useState('');
    const [tags, setTags] = useState([]);
    const [tagid, setTagid] = useState('');
    const [content, setContent] = useState('');

    // Toast Config
    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);
    let toast;

    if(props.isEdit) {
        toast = <ToastContainer className="p-3" position="top-end" style={{ zIndex: 10000}}>
                    <Toast show={showToast} onClose={toggleShowToast} delay={10000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Error!</strong>
                        </Toast.Header>
                        <Toast.Body>There was an issue with updating your blog. Please check your fields and ensure they are all filled out.</Toast.Body>
                    </Toast>
                </ToastContainer>
    } else {
        toast = <ToastContainer className="p-3" position="top-end" style={{ zIndex: 10000}}>
                    <Toast show={showToast} onClose={toggleShowToast} delay={10000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Error!</strong>
                        </Toast.Header>
                        <Toast.Body>There was an issue with posting your blog. Please check your fields and ensure they are all filled out.</Toast.Body>
                    </Toast>
                </ToastContainer>
    }                

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthorid(e.target.value);
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTagid(e.target.value);
    }    

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const handlePost = async () => {
        if(props.isEdit) {
            if (title == '' || authorid == '' || tagid == '' || content == '') {
                setShowToast(true);
            } else {
                await updatePost();
            }
        } else {
            if (title == '' || authorid == '' || tagid == '' || content == '') {
                setShowToast(true);
            } else {
                await createPost();
            }
        }
    }

    const createPost = async () => {
        try {
            const data = {
                title,
                content,
                authorid,
                tagid
            }
            const res = await fetch('/api/blogs', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            history.push(`/blog/${result.insertId}/new`); // Once post is created, take viewer to new post
        } catch (e) {
            console.log(e)
        }
    }

    const updatePost = async () => {
        try {
            const data = {
                id,
                title,
                content,
                authorid,
                tagid
            }
            const res = await fetch(`/api/blogs/`, {
                method: 'PUT',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            history.push(`/blog/${id}/edited`); // Once post is updated, take viewer to edited post
        } catch (e) {
            console.log(e)
        }
    }

    const getBlog = async () => {
        try {
            const res = await fetch('/api/blogs/' + id);
            const blogData = await res.json();

            const res2 = await fetch('/api/blogtags/' + id);
            const tagData = (await res2.json())[0];
            //console.log(tagData)

            setTitle(blogData.title);
            setAuthorid(blogData.authorid);
            setTagid(tagData[0].id);
            setContent(blogData.content);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function getAuthors() {
            try {
                const res = await fetch('/api/authors');
                const authorsData = await res.json();
                setAuthors(authorsData);
            } catch (e) {
                console.log(e);
            }
        }
        getAuthors();

        async function getTags() {
            try {
                const res = await fetch('/api/tags');
                const tagsData = await res.json();
                setTags(tagsData);
            } catch (e) {
                console.log(e);
            }
        }
        getTags();

        if(props.isEdit) {
            getBlog();
        }
    }, []);

    return (
        <>
            <div className="row">
                <div className="col fullWidthWrapper">
                    <Form className="mb-0">
                        <FloatingLabel
                            label="Title"
                            className="mb-3"
                        >
                            <Form.Control 
                                id="title"
                                value={title}
                                type="text"
                                placeholder="My Blog Post"
                                aria-label="Title"
                                onChange={handleTitleChange} 
                            />
                        </FloatingLabel>
                        <FloatingLabel 
                            label="Author"
                            className="mb-3"
                        >
                            <Form.Select 
                                id="author"
                                aria-label="Author"
                                onChange={handleAuthorChange}
                                defaultValue="DEFAULT"
                            >
                                <option value="DEFAULT" key="author-default" selected={authorid === ''}>...</option>
                                {authors.map(option => <option key={`author-${option.id}`} selected={authorid === option.id} value={option.id}>{option.name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel 
                            label="Author"
                            className="mb-3"
                        >
                            <Form.Select 
                                id="tag"
                                aria-label="Tag"
                                onChange={handleTagChange}
                                defaultValue="DEFAULT"
                            >
                                <option value="DEFAULT" key="tag-default" selected={tagid === ''}>...</option>
                                {tags.map(option => <option key={`tag-${option.id}`} selected={tagid === option.id} value={option.id}>{option.name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel 
                            label="Content"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                id="content"
                                onChange={handleContentChange}
                                value={content}
                                placeholder="I like turtles"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <Button variant="primary" onClick={handlePost}>
                            { props.isEdit ? <><Emoji symbol="🪄" label="magic wand"/>Update Blog Post</> : <><Emoji symbol="📄" label="document"/>Post New Blog</> }
                        </Button>                     
                    </Form>
                </div>
            </div>
            {toast}
        </>
    );

}

interface CreateEditProps {
    isEdit: boolean;
}

export default CreateEdit;