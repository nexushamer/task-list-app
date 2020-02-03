import React, { useState } from 'react';
import {Container, Col, Row, Card, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { properties } from '../properties';

function Login(props) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const AUTH_URI = '/auth'

    const styles = {
        centerContent: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
        },
        formGroup: {
            textAlign: 'left'
        }
    };

    const loginUser = async function (event) {
        console.log('The email is ' + email);
        console.log('The password is ' + password);

        const loginRequest = {
            "userId": email,
            "password": password
        };

        console.log('Before call the endpoint with axios');

        const createSessionEndpoint = properties.wsEndpoint + AUTH_URI;
        let response = null;
        try {
            response = await axios.post(createSessionEndpoint, loginRequest);
            if(response && response.data) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', email);
    
                console.log('User LogIn Sucessful');
    
                props.history.push('/portal');
            }
            console.log(response);
        } catch (e) {
            
        }
    };

    const emailHandler = function (event) {
        const value = event.target.value;
        setEmail(value);
    }

    const passwordHandler = event => {
        const value = event.target.value;
        setPassword(value);
    }

    return (
        <Container>
            <Row style={styles.centerContent} >
                <Col />
                <Col>
                    <Card style={{ marginTop: 50, marginBottom: 50, paddingTop: 20, paddingBottom: 20 }}>
                        <Card.Title>Login</Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="emailData" style={styles.formGroup}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={emailHandler} />
                                </Form.Group>
                                <Form.Group controlId="passwordData" style={styles.formGroup}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={passwordHandler} />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={loginUser} >Login Session</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col />
            </Row>
        </Container>
        
    );
}

export default Login;