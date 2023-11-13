import React, { useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import moment from "moment";

const ComingUpManagement = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "https://azureedube1.azurewebsites.net/comingUpUpload",
            data: {
                "title": title,
                "date": date,
                "description": description
            },
            headers: {
                'ngrok-skip-browser-warning': 'any'
            },
            withCredentials: true
        }).then(res => {
            // console.log(res);
            alert(res.data);
        }).catch(err => {
            // console.log(err);
            alert(err);
        });
    }

    return (
        <div>
            <Form>
                <Col sm={3}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title ..." required name="title" onChange={e => setTitle(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" required name="date" onChange={e => setDate(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col sm={5}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Short description</Form.Label>
                        <Form.Control as="textarea" rows={5} required onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ComingUpManagement;