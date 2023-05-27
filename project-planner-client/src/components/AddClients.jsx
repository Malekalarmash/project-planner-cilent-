import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddClients() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientAddress, setClientAddress] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [clientBudget, setClientBudget] = useState('')
    const [clientProject, setClientProject] = useState('')
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
            await fetch('http://localhost:3500/clients', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            })

        } catch (error) {
            console.log(error)

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
                        <label>Project Name
                            <input required type="text" value={clientProject} onChange={(e) => handleClientProject(e.target.value)}></input>
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
        </>
    );
}


