import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function UserRegiser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleSubmit = async (e) => {
        e.preventDefault()
        let bodyData = {
            name: name,
            emailAddress: email,
            password: psw
        }
        try {
            await fetch('http://localhost:3500/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
                .then(response => response.json())
                .then(data => {
                    let userData = {
                        data
                    }
                })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Sign Up
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
                    <form onSubmit={handleSubmit}>
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
                            <Button type='submit' variant="primary">Create</Button>

                        </Modal.Footer>
                    </form>


                </Modal.Body>

            </Modal>


        </>

    )
}
