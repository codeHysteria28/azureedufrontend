import React, {useEffect, useState} from "react";
import './styles/sitebodycollection.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import parse from 'html-react-parser';

const News = () => {
    const [news, setNews] = useState([]);

    const getNews = () => {
        axios({
            method: 'get',
            url: 'http://localhost:80/getNews',
            withCredentials: true
        }).then(res => {
            console.log(res.data);
            setNews(res.data);
        });
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="mb-5">
            <h2 className="content-h2-heading">News</h2>
            <Container>
                <Row className="content-row">
                    {/* <Col sm className="standard-col">a</Col>
                    <Col sm className="standard-col">b</Col>
                    <Col sm className="standard-col">c</Col> */}
                    {
                        news.map((item, index) => {
                            return (
                                <Col sm className="standard-col" key={index}>
                                    <div className="news-card">
                                        <h3 className="news-card-heading">{item.title}</h3>
                                        <p>{item.description}</p>
                                        <small>{item.author} / {item.topic}</small>
                                        {/* {parse(item.content)} */}
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </div>
    );
};

export default News;