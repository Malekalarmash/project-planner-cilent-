import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';



export default function UpdateClient(props) {
    const { setData } = props
    const [clientName, setClient] = useState('')
    const [clientEmail, setClientEmail] = useState(0)
    const [clientAddress, setClientAddress] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [clientProject, setClientProject] = useState('')
    const [clientBudget, setClientBudget] = useState('')

    const projectSearch = useSelector((state) => {
        return state.projectSearch.projectName
    })
    const clientFilter = useSelector((state) => {
        return state.clientSearch.updatedClient
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
        // Functions to handle changes of input 
        const handleClient = (input) => {
            setClient(input)
        }
        const handleClientEmail = (input) => {
            setClientEmail(input)
        }
        const handleClientAddress = (input) => {
            setClientAddress(input)
        }
        const handleClientPhone = (input) => {
            setClientPhone(input)
        }
        const handleClientProject = (input)=>{
            setClientProject(input)
        }
        const handleClientBudget = (input)=>{
            setClientBudget(input)
        }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let bodyData = {
            id: clientFilter.id,
            clientName: clientName,
            email: clientEmail,
            address: clientAddress,
            phone: clientPhone, 
            project: clientProject,
            budget: clientBudget
        }
        try {
            const response = await fetch('http://localhost:3500/clients', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
            if (response.ok) {
                const data = await response.json()
                setData(false)
                toast.success('Client was updated successfully');
                setShow(false);
            } else {
                toast.error('Failed to submit form');

            }
        }
        catch (error) {
            console.error(error)
            toast.error('An error occurred');


        }
    }
  return (
    <>
    <Button variant="outline-primary" onClick={handleShow}>
        Update
    </Button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal'
    >
        <Modal.Header closeButton>
            <Modal.Title>Update Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* The submit btn should be inside the form but if its not, then we need  */}
            <form className='row' onSubmit={(e) => handleSubmit(e)}>
                <label>Full Name
                    {/* The input is the target and we want the value of the input, the event is on the change, the target is the input  */}
                    <input type="text" value={clientName} onChange={(e) => handleClient(e.target.value)}></input>
                </label>
                <label>Email
                    <input type="email" value={clientEmail} onChange={(e) => handleClientEmail(e.target.value)} ></input>
                </label>
                <label>Address
                    <input type='date' value={clientAddress} onChange={(e) => handleClientAddress(e.target.value)}></input>
                </label>
                <label>Phone number
                    <input type='number' value={clientPhone} onChange={(e) => handleClientPhone(e.target.value)}></input>
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
                <label>Client Budget
                    <input type='number' value={clientBudget} onChange={(e) => handleClientBudget(e.target.value)}></input>
                </label>

                <Modal.Footer>
                    <Button type='submit' variant="primary" >Update</Button>
                </Modal.Footer>
            </form>
        </Modal.Body>
    </Modal>
    <ToastContainer />
</>

  )
}
