import React, { useEffect, useState } from 'react';
import { properties } from '../properties';
import axios from 'axios';
import './portal.css';
import PortalContent from './portalContent';
import ModalCreatePanel from './modalCreatePanel';
import ModalEditPanel from './modalEditPanel';

function Portal(props) {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [userTasks, setUserTasks] = useState({tasks: []});
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [currentTaskToEdit, setCurrentTaskToEdit] = useState({task:null});
    const userId = localStorage.getItem('userId');
    const [description, setDescription] = useState('');
    const [dateToComplete, setDateToComplete] = useState('');
    const AUTH_URI = '/task'

    useEffect(() => {
        const fetchTasks = async function() {
            const USER_ID_PATH = '/userId/';
            const urlEndpoint = properties.wsEndpoint + AUTH_URI + USER_ID_PATH + userId;
            const response = await axios.get(urlEndpoint);
            if(response && response.data) {
                setUserTasks({
                    tasks: response.data
                })
                setDataLoaded(true);
            }
        };

        const checkSession = function() {
            const token = localStorage.getItem('token');
            if(!token) {
                props.history.push('/');
                return false;
            }

            return true;
        };

        if(!checkSession())
            return;

        if(!dataLoaded)
            fetchTasks();
    });

    const closeSession = (event) => {
        props.history.push('/');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    const openModalHandler = () => {
        setShowModal(true);
        setShowModalEdit(false);
    };

    const openModalHandlerForEdit = (task) => {
        let taskToSend = {
            id:task.id,
            state:task.state,
            userId: userId
        };
        
        setCurrentTaskToEdit(taskToSend);
        setShowModal(false);
        setShowModalEdit(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const closeModalEditHandler = () => {
        setShowModalEdit(false);
    };

    const changeStateHandler = (state) => {
        currentTaskToEdit.state = state;

        setCurrentTaskToEdit(currentTaskToEdit);
    };

    const saveTaskHandler = async (description, dateToComplete) => {
        const formatDate = (date, hour, minute, second) => `${date} ${hour}:${minute}:${second}`;
        let validation = true;
        if(!description) {
            alert('Description is Required');
            validation = false;
        }

        if (validation) {
            const date = new Date();
            const estimatedDateOfCompletion =
                formatDate(dateToComplete, date.getHours(), date.getMinutes(), date.getSeconds());
            const task = {
                userId: userId,
                task: {
                    description: description,
                    estimatedDateOfCompletion: estimatedDateOfCompletion
                }
            };

            const urlEndpoint = properties.wsEndpoint + AUTH_URI;
            const response = await axios.post(urlEndpoint, task);
            if (response) {
                closeModalHandler();
                setDataLoaded(false);
                setDescription(description);
                setDateToComplete(dateToComplete)
            }
        } else 
            return validation;
    };

    const updateTaskHandler = async () => {
        console.log('The update of the task will be send');

        console.log(currentTaskToEdit);

        const urlEndpoint = properties.wsEndpoint + AUTH_URI;
        const response = await axios.patch(urlEndpoint, currentTaskToEdit);
        if (response) {
            closeModalEditHandler();
            setDataLoaded(false);
        }
    };

    return (
        <div>
            <PortalContent 
            userTasks={userTasks} 
            closeSession={closeSession} 
            openModalHandlerForEdit={openModalHandlerForEdit} 
            openModalHandler={openModalHandler}/>
            <ModalCreatePanel 
            descriptionProperty = {description}
            dateToCompleteProperty = {dateToComplete}
            show={showModal} 
            handleClose={closeModalHandler} 
            handleSave={saveTaskHandler}
            handleUpdate={updateTaskHandler}
            changeStateFunctionHandler={changeStateHandler} />
            <ModalEditPanel 
            show={showModalEdit} 
            handleClose={ closeModalEditHandler }
            handleSave={updateTaskHandler}
            changeStateFunctionHandler={changeStateHandler} />
        </div>
    );
}

export default Portal;