import React from 'react'
import { useState } from 'react'
import Signin from '../pages/Signin'
import UserRegiser from './UserRegiser'
import NavBar from '../components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Route, Routes, useNavigate
} from 'react-router-dom'
import Projects from '../pages/Projects';
import Singin from '../pages/Signin';
import Clients from '../pages/Clients';
import Tasks from '../pages/Tasks';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/actions'
import { Navigate } from "react-router-dom";

export default function Home() {
    return (
        <div>
            {/* Its not working, Sign out will set the isLoggedId to false but its not navigating to singin if LoggedIn = false */}

            <Header/>
            <Container className='container mt-5 ' >
                <Router>
             
                    <Row >
                        <Col sm={3} >
                            <NavBar />
                        </Col>
                        <Col className='d-felx align-items-center ' sm={9} style={{ height: '100%' }}>
                            <Routes>
                                <Route path="/signup" element={<UserRegiser />} exact />
                                <Route path="/signin" element={<Singin />} exact />
                                <Route path="/projects" element={<Projects />} exact />
                                <Route path="/clients" element={<Clients />} exact />
                                <Route path="/tasks" element={<Tasks />} exact />
                            </Routes>
                        </Col>
                    </Row>
                </Router>
            </Container>
        </div>
    )
}
