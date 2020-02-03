import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalCreatePanel(props) {
   const { show, handleClose, handleSave, descriptionProperty, dateToCompleteProperty} = props;

   useEffect((props) => {
        setDescription('');
        setDateToComplete(new Date().toISOString().substring(0, 10));
   }, [props.descriptionProperty, props.dateToCompleteProperty]);

   const [description, setDescription] = useState(descriptionProperty);
   const [dateToComplete, setDateToComplete] = useState(dateToCompleteProperty);

   const descriptionChangeHandler = (event) => {
       const value = event.target.value;
       setDescription(value);
   };

   const completionDateChangeHandler = (event) => {
       const value = event.target.value;
       setDateToComplete(value);
   };

   return (
       <Modal show={show} onHide={handleClose} >
           <Modal.Header closeButton>
               <Modal.Title>Create Task</Modal.Title>
           </Modal.Header>
           <Modal.Body>
               <Form>
                   <Form.Group controlId="description">
                       <Form.Label>Description</Form.Label>
                       <Form.Control as="textarea" rows="3" value={description} onChange={descriptionChangeHandler} />
                   </Form.Group>
                   <Form.Group controlId="completionDate">
                       <Form.Label>Estimated date of Completition</Form.Label>
                       <Form.Control type="date" placeholder="" value={dateToComplete} onChange={completionDateChangeHandler} />
                   </Form.Group>
               </Form>
           </Modal.Body>
           <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>Close</Button>
               <Button variant="primary" onClick={() => { handleSave(description, dateToComplete); }}>Create Task</Button>
           </Modal.Footer>
       </Modal>
   );
}

export default ModalCreatePanel;