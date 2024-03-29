import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Badge from 'react-bootstrap/Badge';
import './styles/news.css';

const ComingUp = () => {
    const [comingUp, setComingUp] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://azureedube1.azurewebsites.net/getComingUp',
            withCredentials: true
        }).then(res => {
            let comingUp = res.data;
            setComingUp(comingUp);
        });
    }, []);

    return (
        comingUp.length > 0 ? (
            <div className="mb-5">
                <h2 className="content-h2-heading">Coming up</h2>
                <Container>
                    <div className="content-row row">
                        {
                            comingUp.map((item, index) => {
                                return (
                                    <Col className="comingUpCard m-2" xs={12} sm={12} md key={index}>
                                        <h3 className="comingUpHeading">{item.title}</h3>
                                        <p>{item.description}</p>
                                        <Badge className="mb-2">
                                            {moment(item.date).format("MMM Do YYYY")}
                                        </Badge>
                                    </Col>
                                );
                            })
                        }
                    </div>
                </Container>
            </div>
        ) : null
    );
}

export default ComingUp;