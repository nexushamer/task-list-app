import React, { useEffect, useState } from 'react';
import { properties } from '../properties';
import axios from 'axios';
import {Button, Navbar, Form, Container, Col, Row, } from 'react-bootstrap';
import ModalPanel from './modal';
import './portal.css';

function Portal(props) {
    const tasks = [
        {
            id: "7fda4200-59fd-4838-946c-66c63782d88a",
            state: "PENDING",
            description: "Create all the files and sort it by the number",
            estimatedDateOfCompletion: "2020/06/21 18:15:15"
        },
        {
            id: "9a811a40-548b-46fd-9fd1-34b77a4b2e6d",
            state: "PENDING",
            description: "Create all the files and sort it by the number",
            estimatedDateOfCompletion: "2020/06/21 18:15:15"
        }
    ];
    const [userTasks, setUserTasks] = useState({tasks: tasks});
    const [showModal, setShowModal] = useState(false);
    const userId = localStorage.getItem('userId');
    const AUTH_URI = '/task/userId/'

    useEffect(() => {
        const fetchTasks = async function() {
            console.log('Fetching the taks from the bacend');
            const urlEndpoint = properties.wsEndpoint + AUTH_URI + userId;
            const response = await axios.get(urlEndpoint);
            if(response && response.data) {
                setUserTasks({
                    tasks: response.data
                })
            }
        };

        //fetchTasks();
    })

    const closeSession = (event) => {
        props.history.push('/');
        localStorage.removeItem('token');
    };

    const openModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar bg="light justify-content-between" expand="lg">
            <Navbar.Brand href="#home" style={{textTransform: 'uppercase'}} >task manager</Navbar.Brand>
            <Form inline>
              <Button onClick={closeSession} >Close Session</Button>
            </Form>
            </Navbar>
            <Container>
                <Row className="panelCreateButton" >
                    <Col md={2} className="panelCreateButtonCols" >
                        <Button onClick={openModalHandler} >Create Task</Button>
                    </Col>
                    <Col md={10} ></Col>
                </Row>
                <Row style={{ border:  'solid 1px black'}} >
                    <Col>
                    {userTasks.tasks.map(task => 
                    <Row style={{marginTop: '2px', marginBottom: '2px' }} >
                        <Col md={7} >{task.description}</Col>
                        <Col md={2} >{task.estimatedDateOfCompletion}</Col>
                        <Col md={2} >{task.state}</Col>
                        <Col md={1} ><Button onClick={openModalHandler} >Edit</Button></Col>
                    </Row>
                    )}
                    </Col>
                </Row>
            </Container>
            <ModalPanel show={showModal} handleClose={closeModalHandler} />
        </div>
    );
}

export default Portal;