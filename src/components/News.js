import React, {useEffect, useState} from "react";
import './styles/sitebodycollection.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { Link } from "react-router-dom";
import './styles/news.css';

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
                    {
                        news.map((item, index) => {
                            if(item.approved === true){
                                return (
                                    <Col sm className="standard-col news" key={index}>
                                        <div className="news-card">
                                            <h3 className="news-card-heading">{item.title}</h3>
                                            <p>{item.description}</p>
                                            <small>{item.author} / {item.topic}</small>
                                            <Link to={`/article/${item.title}`} className="content-link-single-article">Read More</Link>
                                        </div>
                                    </Col>
                                );
                            }else {
                                return
                            }
                        })
                    }
                </Row>
                <a href="/news" className="content-link" style={{marginLeft: "-12px"}}>All News</a>
            </Container>
        </div>
    );
};

export default News;