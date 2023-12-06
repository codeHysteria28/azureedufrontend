import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { ThreeCircles } from  'react-loader-spinner'
import readingTime from "reading-time";
import { BiTimer } from "react-icons/bi";
import "../styles/news.css";
import '../styles/sitebodycollection.css';
// import { appInsights } from "../../ApplicationInsightsService";

const News = () => {
    const [allNews, setAllNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const now = moment().format("MMM Do YY");

    useEffect(() => {
        setIsLoading(true);
        // appInsights.trackPageView({name: "News"});

        axios({
            method: 'get',
            url: 'https://azureedube1.azurewebsites.net/getNewsAdmin',
            withCredentials: true
        }).then(res => {
            let news = res.data;

            let newsWithReadingTime = news.map((item,index) => {
                let itemContent = item.content;
                let itemReadingTime = Math.round(readingTime(itemContent).minutes);
                item.readingTime = itemReadingTime;
                return item;
            });

            setAllNews(newsWithReadingTime);
        })
        .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <ThreeCircles height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="spinner" visible={isLoading} ariaLabel="three-circles-rotating" outerCircleColor="#0078d4" innerCircleColor="#0078d4" middleCircleColor="#005a9e"/>

    return (
        <>
        <Container className="mt-5 mb-5">
            <h2 className="content-h2-heading">All Articles</h2>
            <div className="content-row">
                {
                    allNews.length < 1 ? <Col sm className="standard-col news text-center"><p className="font-weight-bold">No news yet ...</p></Col> :
                    allNews.map((item, index) => {
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
                                        <p><BiTimer size={20}/><small className="fw-bold">{item.readingTime} min</small></p>
                                        <Link to={`/article/${item.slug}`} className="content-link-single-article">Read More</Link>
                                    </div>
                                </Col>
                            );
                        }else {
                            return
                        }
                    })
                }
            </div>
        </Container>
        </>
    );
};

export default News;