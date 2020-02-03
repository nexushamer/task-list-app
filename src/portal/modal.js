import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalPanel(props) {
   const {show, handleClose, title, description, descriptionHandler, } = props;

    return (
        <Modal show={show} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" value={description} onChange={descriptionHandler} />
                    </Form.Group>
                    <Form.Group controlId="completionDate">
                        <Form.Label>Estimated date of Completition</Form.Label>
                        <Form.Control type="date" placeholder="" value={description} onChange={descriptionHandler} />
                    </Form.Group>
                    <Button variant="primary" type="button" >Login Session</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ModalPanel;