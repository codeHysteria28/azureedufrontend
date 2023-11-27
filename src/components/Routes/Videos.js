import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ThreeCircles } from  'react-loader-spinner'

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        try{
            axios({
                method: 'get',
                url: 'https://www.googleapis.com/youtube/v3/search',
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    key: process.env.REACT_APP_YOUTUBE_API_KEY,
                    channelId: process.env.REACT_APP_YOUTUBE_CHANNEL_ID,
                    type: 'video',
                    order: 'date'
                }
            }).then(res => {
                setVideos(res.data.items);
            }).finally(() => setIsLoading(false));
        }catch(err){
            console.log(err);
        }
    }, []);

    if (isLoading) return <ThreeCircles height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="spinner" visible={isLoading} ariaLabel="three-circles-rotating" outerCircleColor="#0078d4" innerCircleColor="#0078d4" middleCircleColor="#005a9e"/>

    return (
        <Container className="mt-5 mb-5">
            <h2 className="content-h2-heading">Videos</h2>
            {videos.map(video => (
                <div key={video.id.videoId} className="mb-5 ratio ratio-16x9">
                    <iframe allowFullScreen src={`https://www.youtube.com/embed/${video.id.videoId}`}></iframe>
                </div>
            ))}
        </Container>
    );
}

export default Videos;