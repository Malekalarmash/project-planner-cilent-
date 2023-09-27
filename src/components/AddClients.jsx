import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddClients(props) {
    const { setData } = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientAddress, setClientAddress] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [clientBudget, setClientBudget] = useState('')
    const [clientProject, setClientProject] = useState('')
    const projectSearch = useSelector((state) => {
        return state.projectSearch.projectName
    })
    const handleClientName = (input) => {
        setClientName(input)
    }
    const handleClientEmail = (input) => {
        setClientEmail(input)
    }
    const handleClientAdress = (input) => {
        setClientAddress(input)
    }
    const handleClientPhone = (input) => {
        setClientPhone(input)
    }
    const handleClientBudget = (input) => {
        setClientBudget(input)
    }
    const handleClientProject = (input) => {
        setClientProject(input)
    }

    const createClient = async (e) => {
        e.preventDefault()
        let bodyData = {
            clientName: clientName,
            email: clientEmail,
            address: clientAddress,
            phoneNumber: clientPhone,
            project: clientProject,
            budget: clientBudget

        }

        try {
           const response =  await fetch('https://project-planner-server-qqkm.onrender.com/clients', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            })
            if(response.ok){
                const data = await response.json()                
                toast.success('Client was created successfully');
                setShow(false);
                setData(false)

            }else {
                toast.error('Failed to submit form');
            }

        } catch (error) {
            console.log(error)
            toast.error('An error occurred');


        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create Client
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row' onSubmit={(e) => createClient(e)}>
                        <label>Client Name
                            <input required type="text" value={clientName} onChange={(e) => handleClientName(e.target.value)}></input>
                        </label>
                        <label> Select Project
                        <Dropdown onSelect={handleClientProject}>
                            <Dropdown.Toggle id="dropdown-basic"  >
                                 {clientProject}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                {projectSearch.map((project) => (
                                    <Dropdown.Item className='dropdown' id={project.id} eventKey={project.projectName}>{project.projectName}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        </label>
                       
                        <label>Budget
                            <input required type='number' value={clientBudget} onChange={(e) => handleClientBudget(e.target.value)}></input>
                        </label>
                        <label>Email
                            <input required type='email' value={clientEmail} onChange={(e) => handleClientEmail(e.target.value)}></input>
                        </label>
                        <label>Address
                            <input required type='text' value={clientAddress} onChange={(e) => handleClientAdress(e.target.value)}></input>
                        </label>
                        <label>Phone Number
                            <input required type='number' value={clientPhone} onChange={(e) => handleClientPhone(e.target.value)}></input>
                        </label>

                        <Modal.Footer>
                            <Button type='submit' variant="primary">Create</Button>

                        </Modal.Footer>
                    </form>


                </Modal.Body>

            </Modal>
            <ToastContainer />
        </>
    );
}


