import React from 'react'
import SearchBar from './SearchBar'

function Tools(props) {
    return(
        <div className="tools">
            <SearchBar/>
            <div className = 'otherBtns'>

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
            </div>

            {props.loggedIn? props.email : 
                <button className='logInBtn' onClick={props.displayForm}>
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


// import React from 'react'
// import SearchBar from './SearchBar'

// class Tools extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             displayPopUp: false
//         }
//     }

//     render() {
//        return(
//             <div className="tools">
//                 <SearchBar searchNote = {this.searchNote}/>
//                 <div className = 'otherBtns'>

//                     <button onClick={this.newNote}>
//                         <img 
//                             src="https://img.icons8.com/ios/50/000000/add-file.png"
//                             alt="New File"
//                         /><label>New Note</label>
//                     </button>
//                     <button onClick={this.saveNote}>
//                         <img 
//                             src="https://img.icons8.com/ios/50/000000/save.png"
//                             alt="Save"
//                         /><label>Save</label>
//                     </button>

//                     <button onClick={this.deleteNote}>
//                         <img 
//                             src="https://img.icons8.com/ios/50/000000/trash.png"
//                             alt="Delete"
//                         /><label>Delete</label>
//                     </button>
//                 </div>

//                 {props.loggedIn? 
//                     <label>props.email</label> 
//                     : 
//                     <button className='logInBtn' onClick={this.displayForm}>
//                         <img 
//                             src="https://img.icons8.com/ios/50/000000/login-rounded-right.png"
//                             alt="Log In"
//                         />
//                         <label>Log In</label>
//                     </button>    
//                 }
//             </div>
//         )  
//     }
    
// }
// export default Tools