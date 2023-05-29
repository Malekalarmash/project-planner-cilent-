import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateProject } from '../redux/actions';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function DeleteProject(props) {
    const { setData } = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const projectFilter = useSelector((state) => {
        return state.projectSearch.updatedProject
    })
    const handleDelete = async (e) => {
        e.preventDefault()
        const bodyData = {
            id: projectFilter.id
        }
        try {

            const response = await fetch('http://localhost:3500/projects', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
            if (response.ok) {
                const data = await response.json()
                setData(false)
                toast.success(`project was deleted`);
                setShow(false)

            } else {
                toast.error('Failed to submit form');

            }
            // Stores the object into the variable called data
        }
        catch (error) {
            console.error(error)
            toast.error('An error occurred');


        }

    }


    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete {projectFilter.projectName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row' onSubmit={(e) => handleDelete(e)}>
                        <p>Do you want to delete this project?</p>
                        <Modal.Footer>
                            <Button type='submit' variant="danger" >Yes</Button>
                            <Button onClick={handleClose} variant="primary" >No</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>

    )
}
