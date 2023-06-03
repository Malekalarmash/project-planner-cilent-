import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { setTask } from '../redux/actions';
import { useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AddTask(props) {
    const { setData } = props
    const dispatch = useDispatch()
    const clientSearch = useSelector((state) => {
        return state.clientSearch.clientInfo
    })
    const projectSearch = useSelector((state) => {
        return state.projectSearch.projectName
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [taskName, setTaskName] = useState('');
    const [client, setClient] = useState('');
    const [isDone, setIsDone] = useState(false)
    const [isInProgress, setIsInProgress] = useState(false)
    const [project, setProject] = useState('')
    const [dueDate, setDueDate] = useState(null)
    const [description, setDescription] = useState('')
    const dateInputRef = useRef(null)

    const handleTaskName = (input) => {
        setTaskName(input)
    }
    const handleClient = (input) => {
        setClient(input)
    }

    const handleIsDone = (input) => {
        setIsDone(input)
    }
    const handleIsInProgress = (input) => {
        setIsInProgress(input)
    }
    const handleProject = (input) => {
        setProject(input)
    }
    const handleDueDate = (input) => {  
        const date = new Date(input);
  const formattedDate = date.toISOString().slice(0, 10);
  setDueDate(formattedDate);
    }
    const handleDescription = (input) => {
        setDescription(input)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let bodyData = {
            taskName: taskName,
            client: client,
            project: project,
            isDone: false,
            isinprogress: false,
            dueDate: dueDate,
            description: description


        }
        try {
           const response = await fetch('http://localhost:3500/tasks', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
            if(response.ok){
                const data = await response.json()
                toast.success(`Task was Created`);
                setShow(false)
                setData(true)

            }else{
                toast.error('Failed to submit form');
            }       

        } catch (e) {
            console.log(e)
            toast.error('An error occurred');
        }
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create Task
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row' onSubmit={(e) => handleSubmit(e)}>
                        <label>Task
                            <input type='text' required value={taskName} onChange={(e) => handleTaskName(e.target.value)}></input>
                        </label>
                        <Dropdown onSelect={handleClient}>
                            <Dropdown.Toggle id="dropdown-basic"  >
                                Select Client {client}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                {clientSearch.map((client) => (
                                    <Dropdown.Item key={client.id} className='dropdown' id={client.id} eventKey={client.clientName}>{client.clientName}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown onSelect={handleProject}>
                            <Dropdown.Toggle id="dropdown-basic">
                                Select Project {project}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {projectSearch.map((project) => (
                                    <Dropdown.Item key={project.id} id={project.id} eventKey={project.projectName}>{project.projectName}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <label>Due Date
                            <DatePicker 
                            value={dueDate}
                            onChange={(date) => handleDueDate(date)}
                             />
                        </label>
                        <label>Description
                            <input type='text' required value={description} onChange={(e) => handleDescription(e.target.value)}></input>
                        </label>

                        <Modal.Footer>
                            <Button type='submit' variant="primary">Create</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>
            <ToastContainer />
        </>
    )
}
