// Other
import React, { Component } from 'react'
import shortid from 'shortid'

// My Components
import AllNotes from './components/AllNotes'
import WritingSpace from './components/WritingSpace'
import Tools from './components/Tools'
import LogInForm from './components/LogInForm'
import PopUp from './components/PopUp'


class App extends Component {
  
  constructor() {
    super()
    this.state = {
      // User LogIn
      displayPopUp: false,
      isLoggedIn: false,
      email:  '',
      password: '',
      // Active Note
      hasCreatedFile: false,
      currentText: '',
      currNote: {
        id: -1,
        userText: '',
        displayText: '',
        displayTitle: '',
        date: '',
        author: 'undefined',
        isOpened: false
      },
      // Array of Notes
      myNotes: []
    }
  }

  // BUG - WHEN CLICKED TWICE IN A ROW AT THE BEGINING
  // Create a new note 
  newNote = () => {

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const openedNoteID = this.state.currNote.id

    // If the user has not entered any characters
    // do not open another note
    if((this.state.currentText[0] === undefined || this.state.currentText[0] === "") && this.state.hasCreatedFile === true) {
      return alert("Cannot create a note if the current one is empty")
    } else if (this.state.hasCreatedFile === true) {
      if(this.state.currentText[0].match(/\S+/) === null){
        return alert("Cannot create a note if the current one is empty")
      }
    }

    // Before opening another file save
    // the currently working one
    if(this.state.hasCreatedFile) {
      this.saveNote()

      // Sleep is done in order to complete
      // the execution of the saveNote function
      sleep(500).then(() => {
        // Close the existing file
        var index = this.state.myNotes.findIndex(item => item.id === openedNoteID)
        var lastNoteData = {...this.state.myNotes[index]}
        lastNoteData.isOpened = false
        
        this.setState(prevState =>{
          const newNotes = prevState.myNotes.splice(index, 1, lastNoteData)
          return(
            newNotes
          )
        })
      })
      
    }  

    // Initialize the new note state
    this.setState(prevState =>{ 
      const newNote =  {
        // Generates a unique ID
        id: shortid.generate(),
        userText: '',
        displayText: '',
        displayTitle: '',
        date: '',
        author: prevState.isLoggedIn? prevState.email : '',
        // Close the file if the call came from 
        // the newNote function
        isOpened: true
      }
      return {
        hasCreatedFile: true,
        currNote: newNote,
        // Clear the text of the previous file 
        // from the writing area
        currentText: ''
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
  /* BUG WHEN SAVING A NOTE WITHOUT CREATING IT - DUHHH*/
  // Save the existing oppened note
  saveNote =  () => {
    // Matches anything other than a space, tab or newline
    // If nothing is written -> return
    if(this.state.hasCreatedFile == false) {
      return alert("Create a note first!")
    } else if(this.state.currentText[0] === undefined || this.state.currentText[0] === "" && this.state.hasCreatedFile === true) {
      return alert("Cannot save an empty note!")
    } else {
      if(this.state.currentText[0].match(/\S+/) === null){
        return alert("Cannot save an empty note!")
      }
    }

    // Save date
    let date = Date().substring(0, 24)
    // Text entered by the user
    let showTxt = this.state.currentText[0].split("\n")
    // Text that will be displayed on the side panel
    let displayTitle = showTxt[0].substring(0, 10)
    let displayText = showTxt.length <= 1? showTxt[0].substring(0, 20)+' ...' : showTxt[1].substring(0, 20)+' ...'
    let author = this.state.loggedIn? this.state.email : 'undefined'

   

    this.setState(prevState =>{
      let updatedMyNotes

      // See if this file already exists and return index if it does 
      const exists_id = prevState.myNotes.findIndex(item => item.id === prevState.currNote.id)

      // If it does not exist create new instance
      // with a unique id number
      if(exists_id === -1) {
        updatedMyNotes = {
          myNotes: prevState.myNotes.push(
            {
              id: prevState.currNote.id,
              userText: prevState.currentText,
              displayText: displayText,
              displayTitle: displayTitle,
              date: date,
              author: prevState.isLoggedIn? prevState.email : 'undefined',
              isOpened: true
            }
          )
        }
      } 
      
      else {
        // If it exists update current entry of the array
        updatedMyNotes = {
          myNotes: prevState.myNotes.splice(exists_id, 1, {
              id: prevState.currNote.id,
              userText: prevState.currentText,
              displayText: displayText,
              displayTitle: displayTitle,
              date: date,
              author: author,
              isOpened: true
          })
        }
      }
      return {
        updatedMyNotes
      }
    }) 
  }

  // Deletes the currently opened note
  deleteNote = () => {
    // If there are no notes left to delete
    if(this.state.myNotes.length < 1){
      this.setState({
        hasCreatedFile: false
      })
    }
    const exists_id = this.state.myNotes.findIndex(item => item.id === this.state.currNote.id)

    // If it exists in myNotes -> remove entry
    if(exists_id !== -1) {
      this.setState({
        updatedMyNotes: {myNotes: this.state.myNotes.splice(exists_id, 1)}
      })
    }
    // Else just clear the writing space
    this.setState({
      currentText: ''
    })
  }

  displayForm = () => {
    this.setState({
      displayPopUp: true
    })
  }

  removeForm = () => {
    this.setState({
      displayPopUp: false
    })
  }

  openToEdit = (id) => {

    // Find the note the user clicked
    const newNote_index = this.state.myNotes.findIndex(item => item.id === id)
    const newNote = {...this.state.myNotes[newNote_index]}
        
    this.setState(prevState =>{
      const newNotes = prevState.myNotes.map(item => {
        if(item.id !== id)
          item.isOpened = false
        else 
          item.isOpened = true
      })
      return(
        {
          currentText: newNote.userText,
          newNotes
        } 
      )
    })
}

  render() {
    return(
      <div className="main-container">
            <Tools
              saveNote = {this.saveNote}
              deleteNote = {this.deleteNote}
              newNote = {this.newNote}
              displayForm = {this.displayForm}
            />
            <div className='secondary-container'>
              <AllNotes
                data = {this.state}
                openToEdit = {this.openToEdit}
              />
              <WritingSpace
                updateUserText = {this.updateUserText}
                saveNote = {this.saveNote}
                currentText = {this.state.currentText}
                hasCreatedFile = {this.state.hasCreatedFile}
              />
              {this.state.displayPopUp?
              <LogInForm 
                logIn={this.logIn}
                removeForm={this.removeForm}
                updateUserText={this.updateUserText}
                password={this.state.password}
                email={this.state.email}
              />:null}
            </div>
            
      </div>
    )
    
  }
}

export default App;
