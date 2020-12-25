import React from "react";
import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { LoginFormComponentProps } from "./login-form.types";

import "./login-form.styles.css";

export const LoginForm = ({ handleSubmit, error }: LoginFormComponentProps) => {
    return (
        <Container className="login-container">
            <Jumbotron className="jumbotron">
                <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required/>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Login
                    </Button>
                </Form>
                {error && 
                    <Alert variant="danger" className="login-jumbotron-alert">
                        <Alert.Heading>Authentication Error</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                }
            </Jumbotron>
            <Jumbotron className="jumbotron">
                <h2>Don't have an account?</h2>
                <Link to="/register">Register here!</Link>                
            </Jumbotron>
        </Container>
    );
}