import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setLoggedIn } from '../redux/actions'
import '../Signin.css'
import UserRegiser from './UserRegiser'
import { ToastContainer, toast } from 'react-toastify';
import { setUser } from '../redux/actions'
import 'react-toastify/dist/ReactToastify.css';


export default function signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loggedIn = useSelector((state) => state.setLogIn);
    const user = useSelector((state) => state.setUser);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignUpClick = () => {
        setShowSignUp(true);
    };

    const dispatch = useDispatch()
    const handleEmail = (input) => {
        setEmail(input)
    }
    const handlePassword = (input) => {
        setPassword(input)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let bodyData = {
            emailAddress: email,
            password: password
        }
        try {
            const response = await fetch('http://localhost:3500/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            })
            if (response.ok) {
                const data = await response.json()
                toast.success('User was logged in successfully');
                localStorage.setItem("JWT", data.jwt);
                dispatch(setLoggedIn(true))
                dispatch(setUser(data.data.name))
            } else {
                toast.error('Failed to submit form');

            }

        } catch (error) {
            console.log(error)
            toast.error('An error occurred');

        }
    }
    return (
        <>
            <div className='signin-container'>
                <p>Sign in or create a new account</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Email
                        <input type="email" required value={email} onChange={(e) => handleEmail(e.target.value)}></input>
                    </label>
                    <label>Password
                        <input type='password' required value={password} onChange={(e) => handlePassword(e.target.value)}></input>
                    </label>
                    <button type='submit' >log in</button>
                </form>
                {!showSignUp ? (
                    <button onClick={handleSignUpClick}>Sign up</button>
                ) : (
                    <UserRegiser />
                )}
            </div>
            <ToastContainer />
        </>
    )
}
