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
} from '../actions/types'

const initialState = {
    notes: [],
    openedNote: [{}],
    loading: false,
    hasActiveNote: false,
    searchedNotes: []
}

export default function(state = initialState, action) {
    let temp_notes
    switch(action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload,
                loading: false
            }

        default:
            return state

        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload)
            }

        case EDIT_NOTE:
            return {
                ...state,
                openedNote: state.notes.filter(note => note._id === action.payload),
                hasActiveNote: true
            }

        case CREATE_NOTE: 
            temp_notes = state.notes
            temp_notes.push(action.payload)
            return {
                ...state,
                notes: temp_notes,
                openedNote: [action.payload],
                hasActiveNote: true
            }
        
        case SAVE_NOTE:
            temp_notes = state.notes
            temp_notes.splice(action.payload.index, 1, action.payload.note)
            return {
                ...state, 
                notes: temp_notes
            }
            
        case NOTES_LOADING:
            return {
                ...state,
                loading: true
            }
        
        case UPDATE_NOTE_TEXT:
            let temp = state.openedNote[0]
            temp.userText = action.payload
            return {
                ...state,
                openedNote: [temp]
            }

        case SEARCH_NOTES:
            let filteredNotes = state.notes.filter((note) => {
                const noteTxt_lower = note.userText.toLowerCase()
                const query = action.payload[0].toLowerCase()
                return noteTxt_lower.includes(query)
            })
            return {
                ...state,
                searchedNotes: filteredNotes
            }

        case ERASE_PREV_USER_NOTES:
            return {
                ...state,
                notes: [],
                openedNote:[{}],
                loading: false,
                hasActiveNote: false,
                searchedNotes: []
            }
    }
}