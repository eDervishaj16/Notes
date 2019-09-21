import React from 'react'
import SearchBar from './SearchBar'

function Tools(props) {
    return(
        <div className="tools">
            <SearchBar/>
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
            <button>{props.loggedIn? props.email : 'Log In'}</button>
        </div>
    )
}
export default Tools