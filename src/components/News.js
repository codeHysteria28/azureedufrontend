import React, {useEffect, useState} from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import moment from "moment";
import { ThreeCircles } from  'react-loader-spinner';
import readingTime from "reading-time";
import { BiTimer } from "react-icons/bi";

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
            let news = res.data;
            
            let newsWithReadingTime = news.map((item,index) => {
                let itemContent = item.content;
                let itemReadingTime = Math.round(readingTime(itemContent).minutes);
                item.readingTime = itemReadingTime;
                return item;
            });

            setNews(newsWithReadingTime);
        })
        .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <ThreeCircles height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="spinner" visible={isLoading} ariaLabel="three-circles-rotating" outerCircleColor="#0078d4" innerCircleColor="#0078d4" middleCircleColor="#005a9e"/>

    return (
        <div className="mb-5">
            <h2 className="content-h2-heading">Latest Articles</h2>
            <Container>
                <div className="content-row">
                    {
                        news.map((item, index) => {
                            return (
                                <Col sm className="standard-col news" key={index}>
                                    <h3 className="news-card-heading">{item.title}</h3>
                                    <Badge className="mb-2">
                                        {moment(item.createdAt).format("MMM Do YYYY")}
                                    </Badge>
                                    <p>{item.description}</p>
                                    <div className="article-item-details">
                                        {/* {
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
                                        } */}
                                        <p><BiTimer size={20}/><small className="fw-bold">{item.readingTime} min</small></p>
                                        <Link to={`/article/${item.slug}`} className="content-link-single-article">Read More</Link>
                                    </div>
                                </Col>
                            );
                        })
                    }
                </div>
                <Link to="/news" className="content-link">
                    <Button variant="primary" className="content-btn mt-5">View all articles</Button>
                </Link>
            </Container>
        </div>
    );
};

export default News;