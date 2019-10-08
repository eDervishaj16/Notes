import axios from 'axios'
import {GET_NOTES, SAVE_NOTE, SEARCH_NOTES, DELETE_NOTE, EDIT_NOTE, CREATE_NOTE, NOTES_LOADING, UPDATE_NOTE_TEXT} from './types'

export const getNotes = (author) => dispatch => {
    dispatch(setNotesLoading())
    const url = '/api/notes/' + author
    axios.get(url)
        .then(res => dispatch({type: GET_NOTES, payload: res.data}))
}

export const createNote = (author) => dispatch => {
    axios.post('/api/notes',{
        userText: ' ',
        author: author
    }).then (res => {
        dispatch({
            type: CREATE_NOTE,
            payload: res.data
        })
    })
}

export const deleteNote = (id) => dispatch => {
    if(id === undefined) return
    const url = '/api/notes/' + id
    axios.delete(url)
        .catch(err => {
            console.log('Error!')
        })
        .then (res => {
                dispatch({
                    type: DELETE_NOTE,
                    payload: id
                })
        })
}

export const saveNote = (noteData) => dispatch => {

    const url = '/api/notes/update/' + noteData.note._id
    console.log(url)
    axios.post(url, {
        userText: noteData.note.userText
    })
        .then (res => {
            dispatch({
                type: SAVE_NOTE,
                payload: noteData
            })
        })
}

export const editNote = (id) => {
    return {
        type: EDIT_NOTE,
        payload: id
    }
}

export const updateNoteText = (text) => {
    return {
        type: UPDATE_NOTE_TEXT,
        payload: text
    }
}

export const setNotesLoading = () => {
    return {
        type: NOTES_LOADING
    }
}

export const searchNote = (query) => {
    return {
        type: SEARCH_NOTES,
        payload: query
    }
}