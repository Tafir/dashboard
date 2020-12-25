import React from "react";
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from "react-bootstrap/Jumbotron";

import { RegistrationFormComponentProps } from "./registration-form.types";

import './registration-form.styles.css';

export const RegistrationForm = ({ handleSubmit, errors }: RegistrationFormComponentProps) => {
    return (
    <Container className='registration-container'>
        <Jumbotron>
        <h1> Registration Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="name" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" name="email" required/>
                    <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" required/>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Register
                </Button>
            </Form>
            {errors.length > 0 && 
                <Alert variant="danger" className="registration-jumbotron-alert">
                    <Alert.Heading>Authentication Error</Alert.Heading>
                    <ul>
                        { errors.map((value, index) => (<li key={index}>{value.message}</li>)) }
                    </ul>
                </Alert>
            }
        </Jumbotron>
        <Jumbotron>
                <h2>Already have an account?</h2>
                <Link to="/login">Sign in here!</Link>                
            </Jumbotron>
    </Container>
    )
}

