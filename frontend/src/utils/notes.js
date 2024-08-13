import { client } from "./api"

const listCreateNotesURL = import.meta.env.VITE_API_LIST_CREATE_NOTES_URL
const retrieveNoteURL = import.meta.env.VITE_API_RETRIEVE_NOTE_URL

function getNotesFromLocalStorage() {
    return localStorage.getItem('notesList')
}

function clearNotesFromLocalStorage() {
    localStorage.removeItem('notesList')
}

export async function getNotesList() {
    const notesList = getNotesFromLocalStorage()
    if (notesList) {
        return JSON.parse(notesList)
    } else {
        return client.get(listCreateNotesURL).then((response) => {
            localStorage.setItem('notesList', JSON.stringify(response.data))
            return response.data
        }).catch((error) => {
            console.error(error)
        })
    }
}

export async function createNote(noteData) {
    return client.post(
        listCreateNotesURL,
        noteData,
    ).then((response) => {
        clearNotesFromLocalStorage()
        return {
            message: 'Note Created Successfully!',
            type: 'success',
        }
    }).catch((error) => {
        if (error.response) {
            console.log(error.response.data)
            return Promise.reject({
                message: error.response.data['title'],
                type: 'failure'
            })
        } else {
            return Promise.reject({
                message: 'Seems like the servers are down, please try later!',
                type: 'failure',
            })
        }
    })
}

export async function updateNote(noteData, noteId) {
    return client.put(
        retrieveNoteURL.replace(':id', noteId),
        noteData,
    ).then((response) => {
        clearNotesFromLocalStorage()
        return {
            message: 'Note Updated Successfully!',
            type: 'success',
        }
    }).catch((error) => {
        if (error.response) {
            return Promise.reject({
                message: error.response.data['title'],
                type: 'failure'
            })
        } else {
            return Promise.reject({
                message: 'Error with the servers, please tey later!',
                type: 'failure'
            })
        }
    })
}

export async function deleteNote(noteId) {
    return client.delete(retrieveNoteURL.replace(':id', noteId)).then((response) => {
        clearNotesFromLocalStorage()
        return {
            message: 'Note Deleted Successfully!',
            type: 'success',
        }
    }).catch((error) => {
        return Promise.reject({
            message: 'Error with the server, please try later!',
            type: 'failure'
        })
    })
}

export async function retrieveNote(noteId) {
    return client.get(retrieveNoteURL.replace(':id', noteId)).then((response) => {
        return response.data
    }).catch((error) => {
        console.error(error)
    })
}