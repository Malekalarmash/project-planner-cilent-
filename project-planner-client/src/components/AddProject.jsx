import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function AddProject(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { setData } = props

    const [projectName, setProjectName] = useState('')
    const [projectBudget, setProjectBudget] = useState('')
    const [projectTimeline, setProjectTimeline] = useState('')
    const [projectDes, setProjectDes] = useState('')

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
            await fetch('http://localhost:3500/projects', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
                .then(response => response.json())
                // Stores the object into the variable called data
                .then(data => {
                    let updatedProjectInfo = {
                        data
                    }
                    setData(false)
                    // dispatch(setProject(data))
                    // return projects
                })

        } catch (error) {
            console.error(error)

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
        </>
    );
}

