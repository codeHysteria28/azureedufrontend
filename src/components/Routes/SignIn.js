import React, { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:80/signIn',
            data: {
                email: email,
                password: password
            },
            withCredentials: true
        }).then(res => {
            if(res.data === 'No user exists' || res.data === 'Incorrect password') {
                alert(res.data);
            }else {
                navigate("/creator");
                e.target.reset();
            }
        });
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-5">Sign in</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="content-row">
                    <Col sm>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="E-mail" required name="email" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required name="password" onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <small>Don't have an account yet ? <Link to="/signup">Create one here</Link></small><br/>
                <Button variant="primary" type="submit" className="mt-4">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default SignIn;