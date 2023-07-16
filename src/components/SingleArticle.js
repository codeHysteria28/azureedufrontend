import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import Header from './Header';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import parse from 'html-react-parser';
import { BsArrowBarLeft } from "react-icons/bs";
import { ThreeCircles } from  'react-loader-spinner'
import './styles/news.css';
import './styles/sitebodycollection.css';

const SingleArticle = () => {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { title } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios({
            method: 'get',
            url: `https://azureedube1.azurewebsites.net/getArticle/${title}`,
            withCredentials: true,
            params: { title }
        }).then(res => {
            setArticle(res.data);
        }).finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <ThreeCircles height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="spinner" visible={isLoading} ariaLabel="three-circles-rotating" outerCircleColor="#0078d4" innerCircleColor="#0078d4" middleCircleColor="#005a9e"/>

    return (
        <div>
            <Container>
                <Col sm className="standard-col mt-5">
                    <div className="news-card">
                        <a className='go-back-btn' onClick={() => navigate(-1)}><BsArrowBarLeft/> Go back</a>
                        <h3 className="news-card-heading mt-3"> {article.title}</h3>
                        {parse(article.content || "")}
                        <small>{article.author} / {article.topic}</small>
                    </div>
                </Col>
            </Container>
        </div>
    );
}

export default SingleArticle;