import React from 'react'
import Note from './Note'

function AllNotes(props) {
    return (
        <div className='allPrevNotes'>
            {props.data.myNotes.map(items=>{
                return (
                    <Note  
                        displayTitle = {items.displayTitle}
                        displayText = {items.displayText}
                        date = {items.date}
                        key = {items.id}
                    />
                )
            })}
        </div>
    )
}

export default AllNotes