import React from "react";
import './styles/sitebodycollection.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const News = () => {
    return (
        <div className="mb-5">
            <h2 className="content-h2-heading">News</h2>
            <Container>
                <Row className="content-row">
                    <Col sm className="standard-col">a</Col>
                    <Col sm className="standard-col">b</Col>
                    <Col sm className="standard-col">c</Col>
                </Row>
            </Container>
        </div>
    );
};

export default News;