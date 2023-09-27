import { act } from "react-dom/test-utils"
import React from "react"

let intialProject =
{
    projectName: [],
    updatedProject: [],
    deletedProject: [],
    projectClients: [],

}
let intialClient =
{
    clientInfo: [],
    updatedClient: []
}
let intialTask =
{
    tasks: [],
    updatedTask: []
}
let isloggedIn = false
let user = []

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
export function taskSearch(state = intialTask, action) {
    switch (action.type) {
        case 'SET_TASK':
            return {
                ...state,
                tasks: action.payload
            }
        case 'UPDATE_TASK':
            return {
                ...state,
                updatedTask: action.payload
            }

        default:
            return (
                state
            )
    }

}
export function setLogIn(state = isloggedIn, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                isloggedIn: action.payload
            }
        default:
            return (
                state
            )
    }

}
export function setUser(state = user, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return (
                state
            )
    }

}

