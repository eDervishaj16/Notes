import React from 'react'

function WritingSpace(props) {
    if(props.hasCreatedFile){
        return(
            <div className='textArea-holder'>
                <textarea 
                    name='currentText'
                    onChange = {props.updateUserText}
                    value = {props.currentText}
                >
                </textarea>  
            </div>
        )
    } 
    else {
        return(
            <div className='textArea-holder'>
                <textarea className='fillerTxt' readOnly>
                    Press the "New Note" button above to get started
                </textarea>
            </div>
        )
    }
}

export default WritingSpace