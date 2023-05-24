import { act } from "react-dom/test-utils"
import React from "react"

let intialProject =
{
    projectName: [],
    updatedProject: [],
    deletedProject: [],
    projectClients: []
}
let intialClient =
{
    clientInfo: [],
    updatedClient: []

}
export function projectSearch(state = intialProject, action) {
    switch (action.type) {
        case 'SET_PROJECT':
            return {
                ...state,
                projectName: action.payload
            }
        case 'UPDATE_PROJECT':
            return {
                ...state,
                updatedProject: action.payload
            }
        case 'DELETE_PROJECT':
            return {
                ...state,
                deletedProject: action.payload
            }
        default:
            return (
                state
            )
    }

}
export function clientSearch(state = intialClient, action) {
    switch (action.type) {
        case 'SET_CLIENT':
            return {
                ...state,
                clientInfo: action.payload
            }
        case 'UPDATE_CLIENT':
            return {
                ...state,
                updatedClient: action.payload
            }

        default:
            return (
                state
            )
    }

}
