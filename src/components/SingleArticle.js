import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import Header from './Header';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import parse from 'html-react-parser';
import { BsArrowBarLeft } from "react-icons/bs";
import './styles/news.css';

const SingleArticle = () => {
    const [article, setArticle] = useState([]);
    const { title } = useParams();
    const navigate = useNavigate();

    const singleArticle = () => {
        axios({
            method: 'get',
            url: `http://localhost:80/getArticle/${title}`,
            withCredentials: true,
            params: { title }
        }).then(res => {
            // console.log(res.data);
            setArticle(res.data);
        });
    }

    useEffect(() => {
        singleArticle();
    }, []);

    return (
        <div>
            <Header />
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