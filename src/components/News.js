import React, {useEffect, useState} from "react";
import './styles/sitebodycollection.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import moment from "moment";

import './styles/news.css';

const News = () => {
    const [news, setNews] = useState([]);

    const now = moment().format("MMM Do YY");

    const getNews = () => {
        axios({
            method: 'get',
            url: 'https://azureedube1.azurewebsites.net/getNews',
            withCredentials: true
        }).then(res => {
            // console.log(res.data);
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
                                        <h3 className="news-card-heading">{item.title}</h3>
                                        <p>{item.description}</p>
                                        <div className="article-item-details">
                                            <small>{item.author} / {item.topic} / </small> 
                                            {
                                                now === moment(item.createdAt).format("MMM Do YY") ? 
                                                <OverlayTrigger key="right" placement="right"
                                                overlay={
                                                    <Tooltip className="tooltip-new-badge">
                                                        {moment(item.createdAt).format("MMM Do YY")}
                                                    </Tooltip>
                                                }
                                                >
                                                    <small className="newBadge">NEW</small>
                                                </OverlayTrigger> :
                                                <OverlayTrigger key="right" placement="right"
                                                overlay={
                                                    <Tooltip className="tooltip-old-badge">
                                                        {moment(item.createdAt).format("MMM Do YY")}
                                                    </Tooltip>
                                                }
                                                >
                                                    <small className="oldBadge">OLDER</small>
                                                </OverlayTrigger> 
                                            }
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
                <Link to="/news" className="content-link" style={{marginLeft: "-12px"}}>
                    <Button variant="primary" className="content-btn mt-5">View all news</Button>
                </Link>
            </Container>
        </div>
    );
};

export default News;