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
                <textarea 
                    className='fillerTxt' 
                    value = 'Press the "New Note" button above to get started'
                    readOnly>
                </textarea>
            </div>
        )
    }
}

export default WritingSpace