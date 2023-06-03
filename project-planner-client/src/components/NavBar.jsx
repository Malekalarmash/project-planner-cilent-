import React from 'react'
import { Text, Space } from '@mantine/core';
import { useState } from 'react';
import AddProject from './AddProject';
import { NavLink } from 'react-router-dom'
import Search from './Search';
import { setLogIn } from '../redux/reducers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../../src/Navbar.css'

export default function NavBar() {
    const loggedIn = useSelector((state) => state.setLogIn);
    const dispatch = useDispatch()

    return (
        <>
            <div className='Navbar-container ' >
                <ul className="row mt-10 ">
                    <li className="row mt-5">
                        <NavLink className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 hover:bg-gray-200 py-2 px-4" to="/projects">Projects</NavLink>
                    </li>
                    <li className="row mt-5">
                        <NavLink className="text-center block border border-primary rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" to="/clients">Clients</NavLink>
                    </li>
                    <li className="row mt-5">
                        <NavLink className="text-center block border border-primary rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" to="/tasks"> Tasks</NavLink>
                    </li>
                </ul>
      </div >

        </>

    );
}

