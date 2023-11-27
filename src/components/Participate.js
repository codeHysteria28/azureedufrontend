import React, { useState } from "react";
import './styles/sitebodycollection.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

const Participate = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        const data = {
            name: name,
            email: email,
            topic: topic,
            message: message
        }

        axios.post(process.env.REACT_APP_logicAppUrl, data)
        .then((res) => {
            setShowAlert(true);
        
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);

            e.target.reset();
        });
    }

    return (
        <div>
            <h2 className="content-h2-heading">Participate</h2>
            <Container className="participate-container mb-5">
                <h3 className="participate-h3 text-center">Would you like to contribute ?</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="content-row">
                        <Col sm>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Your name" required onChange={e => setName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Your email" required onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicTopic">
                                <Form.Label>Topic</Form.Label>
                                <Form.Control type="text" placeholder="Your topic" required onChange={e => setTopic(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={5} required onChange={e => setMessage(e.target.value)}/>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-4">
                                Submit Request
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Alert key="success" variant="success" show={showAlert}>
                    Your message was sent successfully. We will get back to you soon.
                </Alert>
            </Container>
        </div>
    );
};

export default Participate;