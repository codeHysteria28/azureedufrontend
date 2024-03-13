import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import parse from 'html-react-parser';
import { BsArrowBarLeft } from "react-icons/bs";
import { ThreeCircles } from  'react-loader-spinner'
import readingTime from 'reading-time';
import { BiTimer } from "react-icons/bi";
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import ReactAudioPlayer from 'react-audio-player';
import './styles/news.css';
import './styles/sitebodycollection.css';
import ModalImage from 'react-modal-image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { appInsights } from '../ApplicationInsightsService';

const SingleArticle = () => {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [readingtime, setReadingTime] = useState(0);
    const { title } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        // appInsights.trackPageView({ name: title });
        axios({
            method: 'get',
            url: `https://azureedube1.azurewebsites.net/getArticle/${title}`,
            withCredentials: true,
            params: { title }
        }).then(res => {
            setArticle(res.data);
            console.log(article);
            setReadingTime(Math.round(readingTime(res.data.content).minutes));
        }).finally(() => setIsLoading(false));
    }, []);

    // define options for react parser
    const options = {
        replace: ({attribs, children, name}) => {
            if(!attribs) return;

            // replace <img/> tags with ModalImage
            if(name === "img" && attribs.src){
                return (
                    <ModalImage
                        small={attribs.src}
                        large={attribs.src}
                        alt={attribs.alt}
                    />
                );
            }
            
            // replace <code> tags with SyntaxHighlighter
            if(name === 'code'){
                const codeString = children[0].data;
                return (
                    <SyntaxHighlighter language="javascript" style={dark}>
                        {codeString}
                    </SyntaxHighlighter>
                );
            }
        }
    }

    const parsedContent = parse(article.content || "", options);

    if (isLoading) return <ThreeCircles height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="spinner" visible={isLoading} ariaLabel="three-circles-rotating" outerCircleColor="#0078d4" innerCircleColor="#0078d4" middleCircleColor="#005a9e"/>

    return (
        <div>
            <Container>
                <Col sm md={9} className="standard-col mt-5 mb-5">
                    <div className="news-card">
                        <a className='go-back-btn' onClick={() => navigate(-1)}><BsArrowBarLeft/> Go back</a>
                        <h3 className="news-card-heading mt-3"> {article.title}</h3>
                        <p className='mt-2'><FaAssistiveListeningSystems size={20}/> <small className="fw-bold">Listen to this article:</small></p>
                        <ReactAudioPlayer
                            src={article.textToSpeechAudioUrl}
                            controls
                            className='mb-3 mt-1'
                        />
                        <p><BiTimer size={20}/> <small className="fw-bold">Estimate reading time: {readingtime} min</small></p>
                        {parsedContent}
                        <small>{article.author} / {article.topic}</small>
                    </div>
                </Col>
            </Container>
        </div>
    );
}

export default SingleArticle;