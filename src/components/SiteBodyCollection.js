import React from "react";
import './styles/sitebodycollection.css';
import News from "./News";
import Participate from "./Participate";
import Container from 'react-bootstrap/Container';
import ComingUp from "./ComingUp";

const SiteBodyCollection = () => {
    return (
        <Container id="body-wrapper">
            <ComingUp/>
            <News/>
            <Participate/>
        </Container>
    );
};

export default SiteBodyCollection;