import React from "react";
import './styles/header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillPersonFill, BsFillHouseDoorFill, BsFillSignpostSplitFill } from "react-icons/bs";
import { VscAzure } from "react-icons/vsc";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <Navbar expand="md" id="header-navbar" sticky="top">
                <Container>
                    <h1><Navbar.Brand href="/" className="brand"><VscAzure/>zure Edu</Navbar.Brand></h1>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Link className="nav-link" to="/"><BsFillHouseDoorFill/> Home</Link>
                            <Link className="nav-link" to="/news"><BsFillSignpostSplitFill/> Articles</Link>
                            {/* <Link className="nav-link" to="/signin"><BsFillPersonFill/> Login</Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
};

export default Header;