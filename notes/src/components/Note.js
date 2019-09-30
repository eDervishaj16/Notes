
import React from 'react'

function Note (props) {
    return(
        <div className='sideNote' onClick = {() => props.openToEdit(props.id)}>
            <div className='display'>
                <label className='noteTitle'>{props.displayTitle}</label><br/>
                <label className='restOfFile'>{props.displayText}</label><br/>
                <label className='timeOfSave'>{props.date}</label>
            </div>
        </div>
    )
}

export default Note


// import React from 'react'

// class Note extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             id: -1,
//             userText: '',
//             displayText: '',
//             displayTitle: '',
//             date: '',
//             author: null,
//             isOpened: false
//         }
//     }
//     render() {
//         if(props.isOpened){
//         return(
//             <div className='sideNote selected' onClick = {() => props.openToEdit(props.id)}>
//                 <div className='display'>
//                     <label className='noteTitle'>{props.displayTitle}</label><br/>
//                     <label className='restOfFile'>{props.displayText}</label><br/>
//                     <label className='timeOfSave'>{props.date}</label>
//                 </div>
//             </div>
//         )
//         } else {
//             return(
//                 <div className='sideNote' onClick = {() => props.openToEdit(props.id)}>
//                     <div className='display'>
//                         <label className='noteTitle'>{props.displayTitle}</label><br/>
//                         <label className='restOfFile'>{props.displayText}</label><br/>
//                         <label className='timeOfSave'>{props.date}</label>
//                     </div>
//                 </div>
//             )
//         }
//     }  
// }

// export default Note