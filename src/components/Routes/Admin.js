import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { VscAzure } from "react-icons/vsc";
import { useIdleTimer } from 'react-idle-timer'
import { IoIosLogOut } from "react-icons/io";
import Accordion from 'react-bootstrap/Accordion';
import ReactQuill from 'react-quill';
import AdministerArticlesTable from "../ArticleManagement/AdministerArticlesTable";

import 'react-quill/dist/quill.snow.css';
import '../styles/admin.css'

const Admin = () => {
    const [auth, setAuth] = useState(false);
    const [idle, setIdle] = useState(false); 
    const [username, setUsername] = useState("");
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const navigate = useNavigate();

    const articleData = {
        'title': title,
        'content': value,
        'author': username,
        'description': description,
        'topic': topic,
        'approved': false
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image' , 'code'], // 'image' to be added later
          ['clean']
        ],
    };

    const getUser = () => {
        axios({
            method: 'post',
            url: 'http://localhost:80/admin',
            withCredentials: true
        }).then(res => {
            if(res.data === 'not authenticated'){
                navigate("/adminLogin");
            }else {
                setUsername(res.data.username);
                setAuth(true);
            }
        });
    }

    const handleOnIdle = event => {
        // console.log('user is idle', event);
        setIdle(true);
        // console.log('last active', getLastActiveTime());
    }

    const handleOnActive = event => {
        // console.log('user is active', event);
        setIdle(false);
        // console.log('time remaining', getRemainingTime());
    }

    const handleOnAction = (event) => {
        // console.log('user did something', event);
        setIdle(false);
    }

    const { getRemainingTime, getLastActiveTime, reset } = useIdleTimer({
        timeout: 900000,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    });

    const logout = () => {
        axios({
            method: 'post',
            url: 'http://localhost:80/logout',
            withCredentials: true
        }).then(res => {
            if(res.data === 'logged out'){
                setAuth(false);
                navigate("/adminLogin");
            }
        });
    }

    // upload artciles to server
    const uploadArticle = () => {
        axios({
            method: 'post',
            url: 'http://localhost:80/uploadNews',
            data: articleData,
            withCredentials: true
        }).then(res => {
            if(res.data === 'article uploaded'){
                setValue('');
                alert('article uploaded');
                // console.log(res.data);
            }
        });
    }

    const handleClose = () => {
        if(title !== '' && topic !== '' && value !== ''){
            uploadArticle();
            setShow(false);
        }else {
            setShow(false);
        }
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
        {auth 
            ?
            <>
                <Navbar expand="md" id="header-navbar">
                        <Container>
                            <h1><Navbar.Brand href="#home" className="brand"><VscAzure/>zure Education - <small>Admin Portal</small></Navbar.Brand></h1>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                <Nav>
                                    <a className="header_paragraph">
                                        {idle ? <span className="away_status"></span> : <span className="online_status"></span>}
                                        Logged in: <span style={{fontWeight:"bold"}}>{username}</span> | <IoIosLogOut className="logout_icon" onClick={logout}/>
                                    </a>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                </Navbar>

                <Container>
                    <Accordion className="mt-5">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Create new article</Accordion.Header>
                            <Accordion.Body>
                                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} modules={modules}/>
                                <Button className="mt-3" onClick={handleShow}>Upload</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Approve Articles</Accordion.Header>
                            <Accordion.Body>
                                <AdministerArticlesTable uploaded={uploaded}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add details about your article</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row className="content-row">
                                    <Col sm>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Title of the Article</Form.Label>
                                            <Form.Control type="text" placeholder="Title ..." required name="title" onChange={e => setTitle(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group className="mb-3" controlId="formBasicTopic">
                                            <Form.Label>Topic</Form.Label>
                                            <Form.Control type="text" placeholder="Topic of the article" required name="topic" onChange={e => setTopic(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Col sm>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Short description</Form.Label>
                                        <Form.Control as="textarea" rows={5} required onChange={e => setDescription(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="article_modal_footer">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes & Upload
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </>
            : ""
        }
        </>
    );
};

export default Admin;