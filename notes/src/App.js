// Other
import React, { Component } from 'react'

// My Components
import AllNotes from './components/AllNotes'
import WritingSpace from './components/WritingSpace'
import Note from './components/Note';


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: 'false',
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
      }
    }
  }

  updateUserText = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: [value]
    })
  }

  saveNote = () => {
    if(this.state.userText === null || this.state.userText === ''){
      return ("")
    }
    let date = new Date()
    let showTxt = this.state.currentText[0].split("\n")
    let displayTitle = showTxt[0].substring(0, 10)
    let displayText = this.state.currentText.length === 1? showTxt[0].substring(0, 10) : showTxt[1].substring(0, 10)
    let author = this.state.loggedIn? this.state.email : 'undefined'

    this.setState(prevState =>{
      return {
        currNote: {
          id: prevState.currNote.id + 1,
          userText: prevState.currentText,
          displayText: displayText,
          displayTitle: displayTitle,
          date: date,
          author: author
        },
        myNotes: [...prevState.myNotes, this.currNote],
      }
    }) 
  }

  render() {
    return(
      <div className='main-container'>
            <AllNotes
              data = {this.state}
            />
            <WritingSpace
              updateUserText = {this.updateUserText}
              saveNote = {this.saveNote}
              userText = {this.state.userText}
            />
      </div>
    )
    
  }
}

export default App;
