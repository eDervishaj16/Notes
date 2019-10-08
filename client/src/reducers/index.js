import { combineReducers } from 'redux'
import noteReducer from './noteReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    note: noteReducer,
    error: errorReducer,
    auth: authReducer
})