import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Login from './Login'
import Logout from './Logout'

// Actions
import { deleteNote, saveNote, createNote } from '../actions/noteActions'

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Bootstrap
import 
{
    Button, 
    Row, 
    Col,
    Dropdown,
    DropdownToggle,
} from 'reactstrap'

class Tools extends Component {

    // For the dropdown
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    createNote = () => {
        this.props.createNote(localStorage.getItem('author'))
    }

    deleteNote = () => {
        this.props.deleteNote(this.props.openedNote._id)
    }

    saveNote = () => {
        if(this.props.hasActiveNote === false) {
            return (null)
        } else if(this.props.openedNote.userText === undefined && this.props.hasActiveNote === true) {
            return (null)
        } else if (this.props.hasActiveNote === true) {
            if(this.props.openedNote.userText.match(/\S+/) === null){
                return (null)
            }
        }
        
        const exists_id = this.props.note.notes.findIndex(item => item._id === this.props.note.openedNote[0]._id)

        this.props.saveNote({
            note: this.props.note.openedNote[0],
            index: exists_id
        })
    }

    render() {
        return(
            <Row className = "tools-row">
                <Col className = "col-3 my-col">
                    <SearchBar/>
                </Col>
                <Col className = "col-md-7">
                    <Button className = "myBtns btn-light" onClick={this.createNote}>
                        <img 
                            src="https://img.icons8.com/ios/50/000000/add-file.png"
                            alt="New File"
                        /><label>New Note</label>
                    </Button>
                    <Button className = "myBtns btn-light" onClick={this.saveNote}>
                        <img 
                            src="https://img.icons8.com/ios/50/000000/save.png"
                            alt="Save"
                        /><label>Save</label>
                    </Button>
                    <Button className = "myBtns btn-light" onClick={this.deleteNote}>
                        <img 
                            src="https://img.icons8.com/ios/50/000000/trash.png"
                            alt="Delete"
                        /><label>Delete</label>
                    </Button>
                </Col>
                <Col className = " col-md-2 my-col">  
                    {localStorage.getItem('isAuthenticated')? 
                        <Dropdown style = {{marginTop: '5px', paddingBotton: '10px'}} isOpen = {this.state.dropdownOpen} size = 'sm' toggle = {this.toggle}>
                            <DropdownToggle tag = 'button' style = {{paddingBottom: '5px'}} className = 'myBtns' caret>
                            <img alt = 'userIcon' src="https://img.icons8.com/ios-filled/50/000000/user.png"/>{localStorage.getItem('author')}
                            </DropdownToggle>
                            <Logout/>
                        </Dropdown>    
                        : 
                        <Login/>
                    }
                </Col>
            </Row>
        )
    }
    
}

Tools.propTypes = {
    note: PropTypes.object.isRequired,
    deleteNote: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    note: state.note,
    openedNote: state.note.openedNote[0],
    hasActiveNote: state.note.hasActiveNote,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { deleteNote, saveNote, createNote })(Tools)