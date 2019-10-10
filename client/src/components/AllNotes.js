// My imports
import React, { Component } from 'react'
import Note from './Note'

// Actions
import { getNotes } from '../actions/noteActions'

// Bootstrap 
import { ListGroup, ListGroupItem } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AllNotes extends Component {

    componentDidMount() {
        this.props.getNotes(localStorage.getItem('author'))
    }

    render() {
        let notes = ''
        const len = this.props.note.searchedNotes.length
        len > 0 ? notes = this.props.note.searchedNotes : notes = this.props.note.notes
        return (
            <ListGroup>
                <TransitionGroup className = "note-list">
                    {notes.map(note => {
                        return (
                            <CSSTransition key={note._id} timeout={500} classNames="fade">
                                <ListGroupItem className = "sideNote">
                                    <Note
                                        _id = {note._id}
                                        userText = {note.userText}  
                                        date = {note.date}
                                        author = {note.author}
                                        key = {note._id}
                                        // Methods
                                        openToEdit = {this.props.openToEdit}
                                    />
                                </ListGroupItem>
                            </CSSTransition>
                        )
                    })} 
                </TransitionGroup>
            </ListGroup>
        ) 
    }
}

AllNotes.propTypes = {
    getNotes: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired,
    isAuthentiaceted: PropTypes.bool
}

const mapStateToProps = (state) => ({
    note: state.note,
    isAuthentiaceted: state.auth.isAuthentiaceted,
    user: state.auth.user
})

export default connect(mapStateToProps, { getNotes })(AllNotes)