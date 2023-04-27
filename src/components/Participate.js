import React from "react";
import './styles/sitebodycollection.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Participate = () => {
    return (
        <div>
            <h2 className="content-h2-heading">Participate</h2>
            <Container className="participate-container mb-5">
                <h3 className="participate-h3 text-center">Want to run a live session or add your recording ?</h3>
                <Form>
                    <Row className="content-row">
                        <Col sm>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Your name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Your email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicTopic">
                                <Form.Label>Topic</Form.Label>
                                <Form.Control type="text" placeholder="Your topic" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={5} />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-4">
                                Submit Request
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default Participate;