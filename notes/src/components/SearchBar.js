import React from 'react'

class SearchBar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            userQuery: ''
        }
    }

    searchNote = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: [value]
        })
        
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