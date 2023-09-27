import React from 'react'
import { useSelector } from 'react-redux';
import { updateProject } from '../redux/actions';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';


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
            const response = await fetch('http://localhost:3500/clients', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
            if(response.ok){
                const data = await response.json()
                setData(false)
                toast.success(`Client was deleted`);
                setShow(false)
            } else{
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
            <ToastContainer />
        </>
    )
}
