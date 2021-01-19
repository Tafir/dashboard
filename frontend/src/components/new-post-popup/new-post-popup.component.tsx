import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import { PostDetailsRequest } from '../../models/PostDetailsRequest'

export const NewPostPopup = () => {
    const [show, setShow] = useState(false);
    // Default due date is in 24h
    const [dueDate, setDueDate] = useState(moment().add(1, 'days'));

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const postDetails: PostDetailsRequest = {
            title: e.target.title.value,
            category: e.target.category.value,
            dateDue: dueDate.toDate(),
            content: e.target.content.value
        };

        console.log(postDetails);
        fetch(`http://localhost:8080/posts`, {
            method: "POST",
            headers: {
                'token': localStorage.token,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(postDetails)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });

        setShow(false);
    }

    return (
        <div>
            <Button onClick={() => setShow(true)}>
                New post
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <h3>Create new post</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" name="title" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" placeholder="Category" name="category" required>
                                <option>Academic</option>
                                <option>Careers</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date due</Form.Label>
                            <Datetime 
                                value={dueDate} 
                                onChange={(date) => moment.isMoment(date) ? setDueDate(date) : null}
                                isValidDate={(current) => current.isAfter(new Date())}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} name="content"/>
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}