import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Toast, ToastContainer, Form, FloatingLabel } from 'react-bootstrap';
import Emoji from '../components/Emoji';

const Contact = (props: ContactProps) => {
    const history = useHistory();
    const [nameField, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    // Toast Config
    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);
    let toast;

    toast = <ToastContainer className="p-3" position="top-end" style={{ zIndex: 10000}}>
                <Toast show={showToast} onClose={toggleShowToast} delay={10000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error!</strong>
                    </Toast.Header>
                    <Toast.Body>There was an issue with submitting your message. Please check your fields and ensure they are all filled out.</Toast.Body>
                </Toast>
            </ToastContainer>              

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const handlePost = async () => {
        if (nameField == '' || email == '' || content == '') {
            setShowToast(true);
        } else {
            await submitContact();
        }
    }

    const submitContact = async () => {
        try {
            const data = {
                nameField,
                email,
                content
            }
            const res = await fetch('/api/contact', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            history.push(`/thanks`); // Once post is created, take viewer to new post
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="row">
                <div className="col fullWidthWrapper">
                    <Form className="mb-0">
                        <FloatingLabel
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control 
                                id="name"
                                value={nameField}
                                type="text"
                                placeholder="Name"
                                aria-label="Name"
                                onChange={handleNameChange} 
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control 
                                id="email"
                                value={email}
                                type="text"
                                placeholder="Email"
                                aria-label="Name"
                                onChange={handleEmailChange} 
                            />
                        </FloatingLabel>
                        
                        <FloatingLabel 
                            label="Message"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                id="content"
                                onChange={handleContentChange}
                                value={content}
                                placeholder="Message"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <Button variant="primary" onClick={handlePost}>
                            <Emoji symbol="✉️" label="email"/>Send Message
                        </Button>                     
                    </Form>
                </div>
            </div>
            {toast}
        </>
    );

}

interface ContactProps {
    
}

export default Contact;