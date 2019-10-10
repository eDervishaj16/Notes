import axios from 'axios'
import  { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

import {
    GET_NOTES, 
    SAVE_NOTE, 
    SEARCH_NOTES, 
    DELETE_NOTE, 
    EDIT_NOTE, 
    CREATE_NOTE, 
    NOTES_LOADING, 
    UPDATE_NOTE_TEXT,
    ERASE_PREV_USER_NOTES
} from './types'


export const getNotes = (author) => (dispatch, getState) => {
    dispatch(setNotesLoading())
    axios.get(`/api/notes/${author}`, tokenConfig(getState))
        .then(res => dispatch({type: GET_NOTES, payload: res.data}))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const createNote = (author) => (dispatch, getState) => {
    axios.post('/api/notes',{
        userText: ' ',
        author: author
    }, tokenConfig(getState))
        .then (res => {
            dispatch({
                type: CREATE_NOTE,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteNote = (id) => (dispatch, getState) => {
    if(id === undefined) return
    axios.delete(`/api/notes/${id}`, tokenConfig(getState))
        .catch(err => {
            console.log('Error!')
        })
        .then (res => {
                dispatch({
                    type: DELETE_NOTE,
                    payload: id
                })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const saveNote = (noteData) => (dispatch, getState) => {
    axios.post(`/api/notes/update/${noteData.note._id}`,{
        userText: noteData.note.userText
    }, tokenConfig(getState))
        .then (res => {
            dispatch({
                type: SAVE_NOTE,
                payload: noteData
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
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

export const erasePrevUserNotes = () => {
    return {
        type: ERASE_PREV_USER_NOTES
    }
}