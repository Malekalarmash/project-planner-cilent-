import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddProject(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { setData } = props

    const [projectName, setProjectName] = useState('')
    const [projectBudget, setProjectBudget] = useState('')
    const [projectTimeline, setProjectTimeline] = useState('')
    const [projectDes, setProjectDes] = useState('')
    const [sueccess, setSuccess] = useState(false)

    const handleProjectName = (input) => {
        setProjectName(input)
    }
    const handleProjectBudget = (input) => {
        setProjectBudget(input)
    }
    const handleProjectTimeline = (input) => {
        setProjectTimeline(input)
    }
    const handleProjectDes = (input) => {
        setProjectDes(input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let bodyData = {
            projectName: projectName,
            budget: projectBudget,
            description: projectDes,
            timeline: projectTimeline
        }
        try {
            const response = await fetch('http://localhost:3500/projects', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
            if (response.ok) {
                const data = await response.json()
                setData(false)
                setSuccess(true)
                toast.success('Project was created successfully');
                setShow(false);

            } else {
                toast.error('Failed to submit form');
            }
            // Stores the object into the variable called data

        } catch (error) {
            console.error(error)
            toast.error('An error occurred');

        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create Project
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row' onSubmit={(e) => handleSubmit(e)}>
                        <label>Project Name
                            <input type='text' required value={projectName} onChange={(e) => handleProjectName(e.target.value)}></input>
                        </label>
                        <label>Project Budget
                            <input type='number' required value={projectBudget} onChange={(e) => handleProjectBudget(e.target.value)}></input>
                        </label>
                        <label>Timeline
                            <input type='date' required value={projectTimeline} onChange={(e) => handleProjectTimeline(e.target.value)}></input>
                        </label>
                        <label>Description
                            <input type='text' required value={projectDes} onChange={(e) => handleProjectDes(e.target.value)}></input>
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

