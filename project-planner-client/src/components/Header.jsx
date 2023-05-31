import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/actions'
import { Navigate } from "react-router-dom";
import { setUser } from '../redux/actions'


export default function Header() {
    const loggedIn = useSelector((state) => state.setLogIn);
    
    const user = useSelector((state) => state.setUser.user);

    const dispatch = useDispatch()
    const handleLogOut = ()=>{
        dispatch(setLoggedIn(false))
    }


    return (
        <>

        <Navbar>
        <Container className='mb-5'>
          <Navbar.Brand href="#home">Project Planner</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{[user]}</a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Button href='/signin' variant="danger" onClick={ handleLogOut}>sign out</Button>
        </Container>
      </Navbar>

        </>
       );
}
