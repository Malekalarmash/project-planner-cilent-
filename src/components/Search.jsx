import React from 'react'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setProject } from '../redux/actions'

export default function Search() {
    const projectFilter = useSelector((state) => {
        return state.projectSearch
    })
    const dispatch = useDispatch()
    const search = async (e, searchWord) => {

        e.preventDefault()
        try {
            await fetch('http://localhost:3500/projects')
                .then(response => response.json())
                // Stores the object into the variable called data
                .then(data => {
                    let projects = {
                        data
                    }
                    dispatch(setProject(data))
                    return projects
                })
        }
        catch (error) {
            console.error(error)

        }
    }
    return (
        <div>
            <button onClick={(event) => search(event)}>search</button>
        </div>
    )
}
