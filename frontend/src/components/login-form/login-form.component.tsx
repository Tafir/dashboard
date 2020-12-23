import React from "react";

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import "./login-form.styles.css";

// CHANGE TYPE HERE
export const LoginForm = ({ handleSubmit, error }: any) => {
    return (
        <Container className="container">
            <Jumbotron className="jumbotron">
                <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" required/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required/>
                    </Form.Group>
                    <div>
                        <input type="submit" value="Login"/>
                    </div>
                </Form>
                {error && 
                    <Alert variant="danger" className="jumbotron-alert">
                        <Alert.Heading>Authentication Error</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                }
            </Jumbotron>
        </Container>
    );
}