
export function setProject(projectName) {
    return {
        type: 'SET_PROJECT',
        payload: projectName
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
