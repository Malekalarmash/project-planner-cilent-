import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import '../signup.css'


export default function UserRegiser() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('')



    const handleSubmit = async (e) => {
        e.preventDefault()
        let bodyData = {
            name: name,
            emailAddress: email,
            password: psw
        }
        try {
           const response =  await fetch('https://project-planner-server-qqkm.onrender.com/signup', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
            if(response.ok){
                const data = await response.json()
                toast.success('User was Created successfully');
                setShow(false)

            }else{
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
                Create Account
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="signup" onSubmit={(e) => handleSubmit(e)}>
                        <label>Name
                            <input required value={name} type='text' onChange={(e) => setName(e.target.value)}>
                            </input>
                        </label>
                        <label>Email
                            <input required value={email} type='email' onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </label>
                        <label>Password
                            <input type='password' value={psw} onChange={(e) => setPsw(e.target.value)}>
                            </input>
                        </label>
                        <Modal.Footer>
                            <Button type='submit' variant="primary">Create User</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
            <ToastContainer />

        </>

    )
}
