import React from 'react'

function Tools(props) {
    return(
        <div className="tools">
            <button onClick={props.saveNote}>
                <img 
                    src="https://img.icons8.com/ios/50/000000/save.png"
                    alt="Save"
                /><label>Save</label>
            </button>

            <button>
                <img 
                    src="https://img.icons8.com/ios/50/000000/trash.png"
                    alt="Delete"
                /><label>Delete</label>
            </button>
            <button>{props.loggedIn? 'Sign In' : props.email}</button>
        </div>
    )
}
export default Tools