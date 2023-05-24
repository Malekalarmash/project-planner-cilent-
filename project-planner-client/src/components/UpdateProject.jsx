import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../redux/actions'
import { updateProject } from '../redux/actions';


export default function UpdateProject(props) {

    const { setData } = props

    const [projectName, setProjectName] = useState('')
    const [projectBudget, setProjectBudget] = useState(0)
    const [projectTimeline, setProjectTimeline] = useState('')
    const [projectDes, setProjectDes] = useState('')

    const projectFilter = useSelector((state) => {
        return state.projectSearch.updatedProject
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    // Functions to handle changes of input 
    const handleProject = (input) => {
        setProjectName(input)
    }
    const handleProjectBudget = (input) => {
        setProjectBudget(input)
    }
    const handleProjectTimeline = (input) => {
        setProjectTimeline(input)
    }
    const handProjectDes = (input) => {
        setProjectDes(input)
    }
    // Update the project function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let bodyData = {
            id: projectFilter.id,
            projectName: projectName,
            budget: projectBudget,
            timeline: projectTimeline
        }
        try {
            await fetch('http://localhost:3500/projects', {
                method: 'PUT',
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
        }
        catch (error) {
            console.error(error)

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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* The submit btn should be inside the form but if its not, then we need  */}
                    <form className='row' onSubmit={(e) => handleSubmit(e)}>
                        <label>Project Name
                            {/* The input is the target and we want the value of the input, the event is on the change, the target is the input  */}
                            <input type="text" value={projectName} onChange={(e) => handleProject(e.target.value)}></input>
                        </label>
                        <label>Project Budget
                            <input type="number" value={projectBudget} onChange={(e) => handleProjectBudget(e.target.value)} ></input>
                        </label>
                        <label>Timeline
                            <input type='date' value={projectTimeline} onChange={(e) => handleProjectTimeline(e.target.value)}></input>
                        </label>
                        <label>Description
                            <input type='text' value={projectDes} onChange={(e) => handProjectDes(e.target.value)}></input>
                        </label>

                        <Modal.Footer>
                            <Button type='submit' variant="primary" >Update</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
