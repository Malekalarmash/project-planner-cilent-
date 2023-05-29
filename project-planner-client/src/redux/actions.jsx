
export function setProject(projectName) {
    return {
        type: 'SET_PROJECT',
        payload: projectName
    }
}
export function setTask(tasks) {
    return {
        type: 'SET_TASK',
        payload: tasks
    }
}
export function updateProject(updatedProject) {
    return {
        type: 'UPDATE_PROJECT',
        payload: updatedProject
    }
}
export function deleteProject(deletedProject) {
    return {
        type: 'DELETE_PROJECT',
        payload: deletedProject
    }
}
export function setClient(clientInfo) {
    return {
        type: 'SET_CLIENT',
        payload: clientInfo
    }
}
export function updateClient(updatedClient) {
    return {
        type: 'UPDATE_CLIENT',
        payload: updatedClient
    }
}
export function setLoggedIn(isloggedIn) {
    console.log("IS LOGGED IN", isloggedIn)
    return {
        type: 'SET_TOKEN',
        payload: isloggedIn
    }
}
