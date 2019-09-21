import React from 'react'

function Note (props) {
    return(
        <div className='sideNote'>
            <h1 className='noteTitle'>{props.displayTitle}</h1>
            <h3 className='restOfFile'>{props.displayText}</h3>
            <h4 className='timeOfSave'>{props.date}</h4>
        </div>
    )
}

export default Note