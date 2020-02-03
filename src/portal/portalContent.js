import React from 'react';
import {Button, Navbar, Form, Container, Col, Row, } from 'react-bootstrap';

function PortalContent(props) {
    const { 
        userTasks,openModalHandlerForEdit,
        closeSession,openModalHandler} = props;

    let taskToRender;
    if(userTasks.tasks.length > 0) {
        taskToRender = userTasks.tasks.map(task => 
        <Row key={task.id} style={{marginTop: '2px', marginBottom: '2px' }} >
            <Col md={5} >{task.description}</Col>
            <Col md={3} >{task.estimatedDateOfCompletion}</Col>
            <Col md={2} >{task.state}</Col>
            <Col md={2} ><Button onClick={() => { openModalHandlerForEdit(task); }} >Edit</Button></Col>
        </Row>)
        
    } else {
        taskToRender = (
            <Row style={{marginTop: '2px', marginBottom: '2px' }} >
                <Col md={3}></Col>
                <Col>There a no task assigned to the user</Col>
                <Col md={3}></Col>
            </Row>
        );
    }

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
                        <Row style={{ marginTop: '2px', marginBottom: '2px' }} >
                            <Col md={5} >DESCRIPTION</Col>
                            <Col md={3} >Estimated Date of Completion</Col>
                            <Col md={2} >STATE</Col>
                            <Col md={2} >Edit</Col>
                        </Row>
                        {taskToRender}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PortalContent;