import React from 'react'
import Note from './Note'

function AllNotes(props) {
    return (
        <div className='allPrevNotes'>
            {props.myNotes.map(items=>{
                return (
                    <Note
                        id = {items.id}
                        userText = {items.userText}  
                        displayText = {items.displayText}
                        displayTitle = {items.displayTitle}
                        date = {items.date}
                        author = {items.author}
                        isOpened = {items.isOpened}
                        key = {items.id}
                        // Methods
                        openToEdit = {props.openToEdit}
                    />
                )
            })}
        </div>
    )
}

export default AllNotes

// class AllNotes extends React.Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             myNotes: [],
//             searchedNotes: []
//         }
//     }

//     componentDidMount() {
//         if(this.state.openedNote.author !== null) {
//           const url = 'http://localhost:5000/notes/' + this.state.openedNote.author
    
//           axios.get(url)
//               .then(res => {
//                   if(res.data.length > 0) {
//                       this.setState({
//                           myNotes: res.data.map(note => {
//                             return {
//                               id: note._id,
//                               userText: note.userText,
//                               author: note.author,
//                               date: note.date,
//                             }
//                           })
//                       })
//                   }
//               })
//         }
//     }
    
//     render() {
//         return (
//         <div className='allPrevNotes'>
//             {props.myNotes.map(items=>{
//                 // Text that will be displayed on the side panel
//                 let text = items.userText.split("\n")
//                 let displayTitle = text[0].substring(0, 10)
//                 let displayText = text.length <= 1? text[0].substring(0, 20)+' ...' : text[1].substring(0, 20)+' ...'
//                 return (
//                     <Note  
//                         // Variables
//                         isOpened = {items.isOpened}
//                         displayTitle = {displayTitle}
//                         displayText = {displayText}
//                         date = {items.date}
//                         key = {items.id}
//                         id = {items.id}
//                         // Functions
//                         openToEdit={props.openToEdit}
//                     />
//                 )
//             })}
//         </div>
//         )
//     }
    
// }

// export default AllNotes