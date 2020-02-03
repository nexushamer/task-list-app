import React from 'react';
import { Modal, Button, Form, Container,Row, Col, ButtonGroup  } from 'react-bootstrap';

function ModalEditPanel(props) {
   const {show, handleClose, handleSave, changeStateFunctionHandler } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task State</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="state">
                        <Container>
                            <Row>
                                <Col md={1} ><Form.Label>State</Form.Label></Col>
                                <Col md={6}>
                                    <ButtonGroup>
                                        <Button active onClick={() => { changeStateFunctionHandler('PENDING'); }}>Pending</Button>
                                        <Button onClick={() => { changeStateFunctionHandler('DONE'); }}>Done</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col md={5}></Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Update Task</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ModalEditPanel;