import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Toast, ToastContainer, Form } from 'react-bootstrap';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Donate = (props: DonateProps) => {

    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');
    const [load, setLoad] = useState(false);

    // Toast Config
    const [toastHeader, setToastHeader] = useState('');
    const [toastBody, setToastBody] = useState('');
    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);
    let toast = <ToastContainer className="p-3" position="top-end" style={{ zIndex: 10000}}>
                    <Toast show={showToast} onClose={toggleShowToast} delay={10000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">{toastHeader}</strong>
                        </Toast.Header>
                        <Toast.Body>{toastBody}</Toast.Body>
                    </Toast>
                </ToastContainer>;

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });

        if (error) {
            console.log('[error]', error);
        } else {
            setLoad(true); // Disable Donate Button

            // POST the created payment method to our own endpoint
            const res = await fetch('/api/donate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, paymentMethod })
            });
            const successfulPayment = await res.json ();

            setLoad(false); // Re-enable Donate Button

            console.log(successfulPayment);

            if (successfulPayment.status === 'succeeded') {
                setToastHeader('Success!');
                setToastBody('Your donation was processed :)');
                toggleShowToast();
            } else {
                setToastHeader('Error!');
                setToastBody('We were unable to process your donation.');
                toggleShowToast();
            }
        }
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <input
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="Amount"
                            className="form-control mb-2"
                        />
                        <CardElement 
                            className="form-control mb-2"
                        />
                        <Button
                            onClick={handleSubmit}
                            disabled={load}
                            className="btn btn-primary float-end"
                        >
                            Donate to Me!
                        </Button>
                    </Form>
                </Col>
            </Row>
            {toast}
        </>
    );
}

interface DonateProps {

}

export default Donate;