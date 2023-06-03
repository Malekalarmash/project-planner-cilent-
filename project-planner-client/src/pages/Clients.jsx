import React, { useState } from 'react'
import AddClients from '../components/AddClients'
import Table from 'react-bootstrap/Table';
import { setClient } from '../redux/actions';
import { useSelector } from 'react-redux';
import { clientSearch } from '../redux/reducers';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import DeleteClient from '../components/DeleteClient';
import { updateClient } from '../redux/actions';
import UpdateClient from '../components/UpdateClient';
export default function Clients() {
    const dispatch = useDispatch()
    const [Data, setData] = useState(false)

    const clientFilter = useSelector((state) => {
        return state.clientSearch.clientInfo
    })
    const handleClick = async (client) => {
        dispatch(updateClient(client))
    }

    const search = async () => {
        try {
            await fetch('http://localhost:3500/clients')
                .then(response => response.json())
                // Stores the object into the variable called data
                .then(data => {
                    let clients = {
                        data
                    }
                    dispatch(setClient(data))
                    setData(true)
                    return clients
                })


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        // Code here will run after *every* render
        search()

    }, [Data]);

    return (
        <>
            <h2>Clients</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Project</th>
                        <th>Spending</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Delete</th>
                        <th>edit</th>
     
                    </tr>
                </thead>
                <tbody>

                    {
                        clientFilter.map((client) => {
                            return <tr key={client.id}>
                                <td>{client.clientName}</td>
                                <td>{client.project}</td>
                                <td>{client.budget}</td>
                                <td>{client.email}</td>
                                <td>{client.address}</td>
                                <td>
                                    <span client={client} onClick={() => { handleClick(client) }}><DeleteClient setData={setData} /></span>
                                </td>
                                <td>
                                    <span client={client} onClick={() => { handleClick(client) }}><UpdateClient setData={setData}/> </span>
                                </td>
                            </tr>

                        }
                        )
                    }
                </tbody>

            </Table>
            <AddClients setData={setData} />


        </>
    )
}
