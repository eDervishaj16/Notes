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
      hasCreatedFile: 'false',
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
    let date = Date().substring(0, 24)
    let showTxt = this.state.currentText[0].split("\n")
    let displayTitle = showTxt[0].substring(0, 10)
    let displayText = this.state.currentText.length <= 1? showTxt[0].substring(0, 10) : showTxt[1].substring(0, 10)
    let author = this.state.loggedIn? this.state.email : 'undefined'

    this.setState(prevState =>{
      const newState = {
          currNote: {
            id: ++prevState.currNote.id,
            userText: prevState.currentText,
            displayText: displayText,
            displayTitle: displayTitle,
            date: date,
            author: author
          },
          myNotes: prevState.myNotes.push(
            {
              id: ++prevState.currNote.id,
              userText: prevState.currentText,
              displayText: displayText,
              displayTitle: displayTitle,
              date: date,
              author: author
            }
          )
        }
        return {
          newState
        }
      }
    ) 
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
              />
            </div>
      </div>
    )
    
  }
}

export default App;
