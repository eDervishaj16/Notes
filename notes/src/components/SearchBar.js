import React from 'react'

function SearchBar() {
    return(
        <div className="searchBar">
            <label className="searchLabel">
                <input 
                name="searchField"
                type="text"
                placeholder="Search"
                /><img alt = "search-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"/>
            </label>
        </div>
    )
}

export default SearchBar