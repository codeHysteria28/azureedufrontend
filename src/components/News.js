import React, {useEffect, useState} from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import moment from "moment";
import { ThreeCircles } from  'react-loader-spinner';

import './styles/sitebodycollection.css';
import './styles/news.css';

const News = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const now = moment().format("MMM Do YY");

    useEffect(() => {
        setIsLoading(true);
        axios({
            method: 'get',
            url: 'https://azureedube1.azurewebsites.net/getNews',
            withCredentials: true
        }).then(res => {
            setNews(res.data);
        })
        .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <ThreeCircles height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="spinner" visible={isLoading} ariaLabel="three-circles-rotating" outerCircleColor="#0078d4" innerCircleColor="#0078d4" middleCircleColor="#005a9e"/>

    return (
        <div className="mb-5">
            <h2 className="content-h2-heading">Latest News</h2>
            <Container>
                <div className="content-row">
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
                </div>
                <Link to="/news" className="content-link">
                    <Button variant="primary" className="content-btn mt-5">View all news</Button>
                </Link>
            </Container>
        </div>
    );
};

export default News;