import React from "react";
import './styles/sitebodycollection.css';
import News from "./News";
import LastRecordings from "./LastRecordings";
import Participate from "./Participate";
import Container from 'react-bootstrap/Container';

const SiteBodyCollection = () => {
    return (
        <Container id="body-wrapper">
            <News/>
            {/* <LastRecordings/> */}
            <Participate/>
        </Container>
    );
};

export default SiteBodyCollection;