// Other
import React, { Component } from 'react'
import shortid from 'shortid'

// My Components
import AllNotes from './components/AllNotes'
import WritingSpace from './components/WritingSpace'
import Tools from './components/Tools'
import LogInForm from './components/LogInForm'


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
      currentNote: {
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
  
  // Create a new note 
  newNote = () => {
      // If the user has not entered any characters
    // do not open another note
    if((this.state.currentNote.userText === undefined || this.state.currentNote.userText === "") && this.state.hasCreatedFile === true) {
      return alert("Cannot create a note if the current one is empty")
    } else if (this.state.hasCreatedFile === true) {
      if(this.state.currentNote.userText.match(/\S+/) === null){
        return alert("Cannot create a note if the current one is empty")
      }
    }

    // Before opening another note
    // save the currently working one
    if(this.state.hasCreatedFile) {

      this.saveNote()

      // Close the existing file
      var index = this.state.myNotes.findIndex(item => item.id === this.state.currentNote.id)
      var lastNoteData = {...this.state.myNotes[index]}
      lastNoteData.isOpened = false
      
      this.setState(prevState =>{
        // Save the note 
        prevState.myNotes.splice(index, 1, lastNoteData)
        return{
          myNotes: prevState.myNotes
        }
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
        author: prevState.author,
        isOpened: true
      }
      return {
        hasCreatedFile: true,
        currentNote: newNote,
      }
    })
  }

  // Get the user inserted characters and store them on the 'userText' state variable
  updateUserText = (event) => {
    const {name, value} = event.target
    if(name === 'userText') {
      this.setState(prevState => {
        return {
          currentNote: {
            ...prevState.currentNote,
            [name]: value
          }
        }
      })
      
    }
    else {
      this.setState({
        [name]: [value]
      })
    }

  }

  // Save the existing oppened note
  saveNote =  () => {
    // Matches anything other than a space, tab or newline
    // If nothing is written -> return
    if(this.state.hasCreatedFile === false) {
      return alert("Create a note first!")
    } else if((this.state.currentNote.userText === undefined || this.state.currentNote.userText === "") && this.state.hasCreatedFile === true) {
      return alert("Cannot save empty note!")
    } else if (this.state.hasCreatedFile === true) {
      if(this.state.currentNote.userText.match(/\S+/) === null){
        return alert("Cannot save empty note!")
      }
    }


    // Save date
    let date = Date().substring(0, 24)
    // Text entered by the user
    let firstLineOfTxt = this.state.currentNote.userText.split('\n')
    // Text that will be displayed on the side panel
    let displayTitle = firstLineOfTxt[0].substring(0, 10)
    let displayText = firstLineOfTxt.length <= 1? firstLineOfTxt[0].substring(0, 20)+' ...' : firstLineOfTxt[1].substring(0, 20)+' ...'

    this.setState(prevState =>{

      // See if this file already exists and return index if it does 
      const exists_id = prevState.myNotes.findIndex(item => item.id === prevState.currentNote.id)

      // If it does not exist create new instance
      // with a unique id number
      if(exists_id === -1) {
        prevState.myNotes.push({
          id: prevState.currentNote.id,
          userText: prevState.currentNote.userText,
          displayText: displayText,
          displayTitle: displayTitle,
          date: date,
          author: prevState.author,
          isOpened: true
        })
        return {
          myNotes: prevState.myNotes
        }
      } 
      
      else {
        prevState.myNotes.splice(exists_id, 1, {
          id: prevState.currentNote.id,
          userText: prevState.currentNote.userText,
          displayText: displayText,
          displayTitle: displayTitle,
          date: date,
          author: prevState.author,
          isOpened: true
      })
        // If it exists update current entry of the array
        return {
          myNotes: prevState.myNotes
        }
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

    const exists_id = this.state.myNotes.findIndex(item => item.id === this.state.currentNote.id)

    // If it exists in myNotes -> remove entry
    if(exists_id !== -1) {
      this.setState(prevState =>{
        // Remove the element
        prevState.myNotes.splice(exists_id, 1)
        return {
          myNotes: prevState.myNotes,
          currentNote: {
            id: -1,
            userText: '',
            displayText: '',
            displayTitle: '',
            date: '',
            author: 'undefined',
            isOpened: false
          }
        }
      })
    }
  }

  openToEdit = (id) => {
    // Open the note the user clicked
    const newNote_index = this.state.myNotes.findIndex(item => item.id === id)
    const newNote = {...this.state.myNotes[newNote_index]}
        
    this.setState(prevState =>{
      prevState.myNotes.map(item => {
        if(item.id !== id)
          item.isOpened = false
        else 
          item.isOpened = true
      })
      return(
        {
          myNotes: prevState.myNotes,
          currentNote: newNote,
        } 
      )
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

  render() {
    console.log(this.state)
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
                myNotes = {this.state.myNotes}
                openToEdit = {this.openToEdit}
              />
              <WritingSpace
                updateUserText = {this.updateUserText}
                saveNote = {this.saveNote}
                userText = {this.state.currentNote.userText}
                hasCreatedFile = {this.state.hasCreatedFile}
              />
            </div>
            {
              this.state.displayPopUp?
                <LogInForm 
                  logIn={this.logIn}
                  removeForm={this.removeForm}
                  updateUserText={this.updateUserText}
                  password={this.state.password}
                  email={this.state.email}
                />
              :
                null
            }
      </div>
    )
    
  }
}

export default App;