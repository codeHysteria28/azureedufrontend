import React, { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from "react-router-dom";
import bcrypt from 'bcryptjs'
import '../styles/sitebodycollection.css';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    // password must match error
    const [passwordMatch, setPasswordMatch] = useState(false);

    const navigate = useNavigate();

    // generate SALT
    const salt = bcrypt.genSaltSync(10); 

    // handling registration submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // hash password
        const hashedPassword = bcrypt.hashSync(password, salt);
        const hashedRepPassword = bcrypt.hashSync(repPassword, salt);

        // prepare data for post request
        const data = {
            username: username,
            password: hashedPassword,
            repPassword: hashedRepPassword,
            fullName: fullName,
            email: email
        }

        // check if passwords match
        if(passwordMatch) {
            axios.post("https://azureedube1.azurewebsites.net/signup", data)
            .then((res) => {
                navigate("/signin");
                e.target.reset();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    // check if passwords match on change
    const handlePasswordChange = (e) => {
        if(e.target.value === password) {
            setRepPassword(e.target.value);
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-5">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="content-row">
                    <Col sm>
                        <Form.Group className="mb-3" controlId="formBasicFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" required name="fullname" onChange={e => setFullName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" required name="username" onChange={e => setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" required name="email" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required name="password" onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat Password" required name="repPassword" onChange={handlePasswordChange}/>
                            { 
                                password === "" ? null : passwordMatch ? <Form.Text className="text-muted">Passwords match</Form.Text> : <Form.Text className="text-muted">Passwords do not match</Form.Text> 
                            }
                        </Form.Group>
                        <Button variant="primary" type="submit" className="submit_admin_btn mb-2">
                            Register
                        </Button><br/>
                        <small>Already have an account ? <Link to="/signin">Login here</Link></small>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default SignUp;