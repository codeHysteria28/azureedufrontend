import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { VscAzure } from "react-icons/vsc";
import { useIdleTimer } from 'react-idle-timer'
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import '../styles/admin.css'

const Admin = () => {
    const [auth, setAuth] = useState(false);
    const [idle, setIdle] = useState(false); 
    const [username, setUsername] = useState("");
    const [value, setValue] = useState('');

    const navigate = useNavigate();

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
                                        Logged in: {username}
                                    </a>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                </Navbar>

                <Container fluid >
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                    {/* <button onClick={logout}>Logout</button> */}
                    
                </Container>
            </>
            : ""
        }
        </>
    );
};

export default Admin;