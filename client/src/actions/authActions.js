import axios from 'axios'
import { returnErrors } from './errorActions'
import { getNotes } from '../actions/noteActions'
import { erasePrevUserNotes } from '../actions/noteActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
} from '../actions/types'

// Check token 
// Load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({
        type: USER_LOADING
    })
    
    // Get User
    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        // If error
        .catch(err => {
            console.log(err)
            // Send error data to initialState of errorReducer
            dispatch(
                returnErrors(err.response.data, err.response.status)
            )
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Register User
export const register = ({ name, surname, email, password}) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    } 

    // Request Body
    const body = JSON.stringify({
        name,
        surname,
        email,
        password
    })

    // Making the request to register
    axios.post('api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login User
export const  login = ({email, password}) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    } 

    // Request Body
    const body = JSON.stringify({
        email,
        password
    })

    // Making the request to register
    axios.post('api/auth', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // Getting User notes
            dispatch(getNotes(res.data.user.name))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


// Logout User
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
    dispatch(erasePrevUserNotes())
}

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token
    
    // Headers
    const config = {
        headers: { 
            "Content-type": "application/json"
        }
    }
 
    // If token, add to header
    if(token) {
        config.headers['x-auth-token'] = token
    }
    
    return config
}