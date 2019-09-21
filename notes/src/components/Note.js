import React from 'react'

function Note (props) {
    return(
        <div className='sideNote'>
            <div className='display'>
                <label className='noteTitle'>{props.displayTitle}</label><br/>
                <label className='restOfFile'>{props.displayText}</label><br/>
                <label className='timeOfSave'>{props.date}</label>
            </div>
        </div>
    )
}

export default Note