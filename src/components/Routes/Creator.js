import React, {useState, useEffect} from "react";
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
import { Table } from 'react-bootstrap';
import { VscAzure } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Accordion from 'react-bootstrap/Accordion';
import ReactQuill from 'react-quill';
import moment from 'moment';

import 'react-quill/dist/quill.snow.css';

const Creator = () => {
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState("");
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();

    const articleData = {
        'title': title,
        'content': value,
        'description': description,
        'author': email,
        'topic': topic,
        'approved': false
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image' , 'code'],
          ['clean']
        ],
    };

    const getUser = () => {
        axios({
            method: 'post',
            url: 'https://azureedube1.azurewebsites.net/usercreator',
            withCredentials: true
        }).then(res => {
            if(res.data === 'not authenticated'){
                navigate("/signin");
            }else {
                setArticles(res.data.scrapedArticles);
                setEmail(res.data.eMail);
                setAuth(true);
            }
        });
    }

    const logout = () => {
        const logoutType = 'user';
        axios({
            method: 'post',
            url: 'https://azureedube1.azurewebsites.net/userlogout',
            withCredentials: true,
            data: {
                logoutType: logoutType
            }
        }).then(res => {
            if(res.data === 'logged out'){
                setAuth(false);
                navigate("/signin");
            }
        });
    }

    // upload artciles to server
    const uploadArticle = () => {
        axios({
            method: 'post',
            url: 'https://azureedube1.azurewebsites.net/uploadNews',
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
        <div>
            {auth ?
                <>
                    <Navbar expand="md" id="header-navbar">
                        <Container>
                            <h1><Navbar.Brand href="#home" className="brand"><VscAzure/>zure Education - <small>Creator</small></Navbar.Brand></h1>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                <Nav>
                                    <a className="header_paragraph">
                                        Logged in: <span style={{fontWeight:"bold"}}>{email}</span> | <IoIosLogOut className="logout_icon" onClick={logout}/>
                                    </a>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <Container>
                        <h1 className="mt-5">Welcome to the Creator Dashboard</h1>
                        <Accordion className="mt-5" defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Create new article</Accordion.Header>
                                <Accordion.Body>
                                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} modules={modules}/>
                                    <Button className="mt-5" onClick={handleShow}>Upload</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Review Previous Articles</Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover className='text-center'>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Topic</th>
                                                <th>Description</th>
                                                <th>Created At</th>
                                                <th>Approved</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                articles.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.title}</td>
                                                            <td>{item.topic}</td>
                                                            <td>{item.description}</td>
                                                            <td>{moment(item.createdAt).format('MMM Do YY')}</td>
                                                            <td>{ item.approved === true ? <FcCheckmark/> : <FcCancel/>}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>
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
        </div>
    )
}

export default Creator;