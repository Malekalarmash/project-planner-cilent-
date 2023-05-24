import React, { useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../redux/actions'
import { updateProject } from '../redux/actions';
import { deleteProject } from '../redux/actions';
import UpdateProject from '../components/UpdateProject';
import DeleteProject from '../components/DeleteProject';


export default function Projects() {
    const dispatch = useDispatch()
    const [Data, setData] = useState(false)
    const projectFilter = useSelector((state) => {
        return state.projectSearch.projectName
    })
    // Update the project function 
    const handleClick = async (project) => {
        dispatch(updateProject(project))
    }
    // const handleDeleteClick = async (project) => {
    //     dispatch(deleteProject(project))
    // }
    const search = async () => {

        try {
            await fetch('http://localhost:3500/projects')
                .then(response => response.json())
                // Stores the object into the variable called data
                .then(data => {
                    let projects = {
                        data
                    }
                    dispatch(setProject(data))
                    setData(true)
                    return projects
                })
        }
        catch (error) {
            console.error(error)

        }
    }
    useEffect(() => {
        // Code here will run after *every* render
        search()

    }, [Data]);

    return (
        <div>
            <h2>Projects</h2>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Budjet</th>
                        <th>Timeline</th>
                        <th>Description</th>
                        <th>Edit/Delete</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        projectFilter.map((project) => {
                            return <tr key={project.id}>
                                <td>{project.projectName}</td>
                                <td>{project.budget}</td>
                                <td>{project.timeline}</td>
                                <td>{project.description}</td>
                                <td>
                                    <span project={project} onClick={() => { handleClick(project) }}><UpdateProject setData={setData} /></span>
                                </td>
                                <td>
                                    <span project={project} onClick={() => { handleClick(project) }}><DeleteProject setData={setData} /></span>
                                </td>
                            </tr>

                        }
                        )
                    }
                </tbody>
            </Table>
            <AddProject />

        </div >



    )
}