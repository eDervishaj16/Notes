import React, { Component } from 'react'
import { updateNoteText } from '../actions/noteActions' 
// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class WritingSpace extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            openedNote: {}
        }
    }

    handleChange = (event) => {

        const { name, value } = event.target
        
        this.setState(prevState => {
            return {
              openedNote: {
                ...prevState.openedNote,
                [name]: value
              }
            }
        }, () => {this.updateProp(this.state.openedNote.userText)})

    }

    updateProp(text) {
        this.props.updateNoteText(text)   
    }

    componentDidUpdate(prevProps){
        if(prevProps.note.openedNote[0]._id === undefined && this.props.note.openedNote[0]._id !== undefined) {
            this.setState((state, props) => {
                return {openedNote: props.note.openedNote[0]};
            });
        }
        else if (this.props.note.openedNote[0]._id !== prevProps.note.openedNote[0]._id) {
            this.setState((state, props) => {
                return {openedNote: props.note.openedNote[0]};
            });
        }
    }

    render() {
        if(this.props.hasActiveNote){
            return(
                <textarea 
                    name='userText'
                    onChange = {this.handleChange}
                    value = {this.state.openedNote.userText}
                >
                </textarea>  
            )
        } 
        else {
            return(
                <textarea 
                    className='fillerTxt' 
                    value = 'Press the "New Note" button above to get started'
                    readOnly>
                </textarea>
            )
        }
    }
}


WritingSpace.propTypes = {
    updateNoteText: PropTypes.func,
    note: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    note: state.note,
    hasActiveNote: state.note.hasActiveNote
})

export default connect(mapStateToProps, { updateNoteText })(WritingSpace)