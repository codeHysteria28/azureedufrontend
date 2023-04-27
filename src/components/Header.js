import React from "react";
import './styles/header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillPersonFill, BsFillCameraReelsFill, BsFillHouseDoorFill, BsFillSignpostSplitFill } from "react-icons/bs";


const Header = () => {
    return (
        <Navbar expand="md" id="header-navbar">
            <Container>
                <Navbar.Brand href="#home" className="brand">Azure Education</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home"><BsFillHouseDoorFill/> Home</Nav.Link>
                        <Nav.Link href="#sessions"><BsFillCameraReelsFill/> Sessions</Nav.Link>
                        <Nav.Link href="#guides"><BsFillSignpostSplitFill/> Guides</Nav.Link>
                        {/* <Nav.Link href="#login"><BsFillPersonFill/> Login</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;