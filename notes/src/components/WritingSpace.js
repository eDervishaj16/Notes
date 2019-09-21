import React from 'react'

function WritingSpace(props) {
    
    return(
        <div className='textArea-holder'>
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