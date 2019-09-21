import React from 'react'
import Note from './Note'
import SearchBar from './SearchBar'

function AllNotes(props) {
    return (
        <div className='allPrevNotes'>
            {console.log(props.data.myNotes[0])}
            <SearchBar/>
        </div>
    )
}

export default AllNotes