import React, { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:1337/adminLogin',
            data: {
                username: username,
                password: password
            },
            withCredentials: true
        }).then(res => {
            if(res.data === 'No user exists' || res.data === 'Incorrect password') {
                alert(res.data);
            }else {
                navigate("/admin");
                e.target.reset();
            }
        });
    }

    return (
        <Container className="mt-5">
            <h2>Admin Login</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="content-row">
                    <Col sm>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" required name="username" onChange={e => setUsername(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required name="password" onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-4">
                    Submit Request
                </Button>
            </Form>
        </Container>
    );
};

export default AdminLogin;