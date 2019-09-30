import React from 'react'

class SearchBar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            userQuery: ''
        }
    }

    render() {
        return(
            <div className="searchBar">
                <label className="searchLabel">
                    <input 
                    onChange = {this.searchNote}
                    value = {this.state.userQuery}
                    name="userQuery"
                    type="text"
                    placeholder="Search"
                    /><img alt = "search-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"/>
                </label>
            </div>
        )
    }
    
}
export default SearchBar

// import React from 'react'

// class SearchBar extends React.Component{
//     constructor(props) {
//         super(props)
//         this.state = {
//             userQuery: '',
//             searchedNotes: []
//         }
//     }

//     handleChange = (event) => {
//         const {name, value}  = event.target
//         this.setState({
//             [name] : [value]
//         }, () => {this.props.searchNote(this.state.userQuery)})
//     }

//     searchNote = (query) => {
//         let filteredNotes = this.state.myNotes.filter((note) => {
//           return note.userText[0].indexOf(query[0]) !== -1
//         })
    
//         this.setState({
//           searchedNotes: filteredNotes
//         })
//     }

//     render() {
//         return(
//             <div className="searchBar">
//                 <label className="searchLabel">
//                     <input 
//                     onChange = {this.handleChange}
//                     value = {this.state.userQuery}
//                     name="userQuery"
//                     type="text"
//                     placeholder="Search"
//                     /><img alt = "search-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"/>
//                 </label>
//             </div>
//         )
//     }
    
// }

// export default SearchBar