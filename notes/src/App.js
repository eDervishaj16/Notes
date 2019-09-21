// Other
import React, { Component } from 'react'

// My Components
import AllNotes from './components/AllNotes'
import WritingSpace from './components/WritingSpace'
import Tools from './components/Tools';


class App extends Component {
  constructor() {
    super()
    this.state = {
      hasCreatedFile: true,
      loggedIn: false,
      email:  '',
      currentText: '',
      myNotes: [],
      currNote: {
        id: -1,
        userText: '',
        displayText: '',
        displayTitle: '',
        date: '',
        author: 'undefined',
        opened: false
      }
    }
  }

  // Create a new note 
  newNote = () => {

    if(this.state.hasCreatedFile) {
      this.saveNote()
    }      
    
    // Initialize the new note state
    this.setState(prevState =>{ 
      const newNote =  {
        hasCreatedFile: true,
        id: ++prevState.currNote.id,
        opened: true
      }

      return {
        currNote: newNote
      }
    })
  }

  // Get the user inserted characters and store them on the 'currentText' state variable
  updateUserText = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: [value]
    })
  }


  // Save the existing oppened note
  saveNote = () => {
    // Save date
    let date = Date().substring(0, 24)
    // Text entered by the user
    let showTxt = this.state.currentText[0].split("\n")
    // Text that will be displayed on the side panel
    let displayTitle = showTxt[0].substring(0, 10)
    let displayText = this.state.currentText.length <= 1? showTxt[0].substring(0, 10) : showTxt[1].substring(0, 10)

    let author = this.state.loggedIn? this.state.email : 'undefined'

    // If nothing is written -> return
    if(this.state.userText === null || this.state.userText === ''){
      return ("")
    }

    this.setState(prevState =>{
      let updatedMyNotes

      // See if this file already exists and return index if it does 
      const exists_id = this.state.myNotes.findIndex(item => item.id === this.state.currNote.id)
      console.log(exists_id)
      console.log(this.state.myNotes)
      if(exists_id === -1) {
        // If it does not exist create new instance with
        // a unique id number
        updatedMyNotes = {
          myNotes: prevState.myNotes.push(
            {
              id: ++prevState.currNote.id,
              userText: this.state.currentText,
              displayText: displayText,
              displayTitle: displayTitle,
              date: date,
              author: author,
              opened: true
            }
          )
        }
      } 
      else {
        // If it exists update current entry of the array
        updatedMyNotes = {
          myNotes: prevState.myNotes.splice(exists_id, 1, {
              id: this.state.currNote.id,
              userText: this.state.currentText,
              displayText: displayText,
              displayTitle: displayTitle,
              date: date,
              author: author,
              opened: true
          })
        }
      }
      return {
        updatedMyNotes
      }
    }) 
  }

  render() {
    return(
      <div className="main-container">
            <Tools
              saveNote = {this.saveNote}
            />
            <div className='secondary-container'>
              <AllNotes
                data = {this.state}
              />
              <WritingSpace
                updateUserText = {this.updateUserText}
                saveNote = {this.saveNote}
                userText = {this.state.userText}
                hasCreatedFile = {this.state.hasCreatedFile}
              />
            </div>
      </div>
    )
    
  }
}

export default App;
