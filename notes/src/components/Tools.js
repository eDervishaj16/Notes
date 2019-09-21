import React from 'react'
import SearchBar from './SearchBar'

function Tools(props) {
    return(
        <div className="tools">
            <SearchBar/>
            <button onClick={props.newNote}>
                <img 
                    src="https://img.icons8.com/ios/50/000000/add-file.png"
                    alt="New File"
                /><label>New Note</label>
            </button>
            <button onClick={props.saveNote}>
                <img 
                    src="https://img.icons8.com/ios/50/000000/save.png"
                    alt="Save"
                /><label>Save</label>
            </button>

            <button onClick={props.deleteNote}>
                <img 
                    src="https://img.icons8.com/ios/50/000000/trash.png"
                    alt="Delete"
                /><label>Delete</label>
            </button>
            {props.loggedIn? props.email : 
                <button onClick={props.loginForm}>
                    <img 
                        src="https://img.icons8.com/ios/50/000000/login-rounded-right.png"
                        alt="Log In"
                    />
                    <label>Log In</label>
                </button>
                
            }
        </div>
    )
}
export default Tools