import React from 'react'
import Tools from './Tools'
import Note from './Note'

function WritingSpace(props) {
    return(
        <div className='textArea-holder'>
            <Tools
                saveNote = {props.saveNote}
            />
            <textarea 
                name='currentText'
                onChange = {props.updateUserText}
                value = {props.userText}
            >
            </textarea>
            
        </div>
    )
}

export default WritingSpace