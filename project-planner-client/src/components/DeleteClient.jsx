import React from 'react'
import { useSelector } from 'react-redux';
import { updateProject } from '../redux/actions';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteClient(props) {
    const clientFilter = useSelector((state) => {
        return state.clientSearch.updatedClient
    })

    const { setData } = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        const bodyData = {
            id: clientFilter.id
        }
        console.log(bodyData)

        try {
            await fetch('http://localhost:3500/clients', {
                method: 'DELETE',
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
                    handleClose()
                    window.alert("Project was deleted")
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
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row' onSubmit={(e) => handleDelete(e)}>
                        <p>Do you want to delete this client?</p>
                        <Modal.Footer>
                            <Button type='submit' variant="danger" >Yes</Button>
                            <Button onClick={handleClose} variant="primary" >No</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
