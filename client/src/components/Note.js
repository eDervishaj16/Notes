
import React, { Component } from 'react'

// Actions
import { editNote } from '../actions/noteActions'

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Note extends Component {

    openToEdit = (_id) => {
        this.props.editNote(_id)
    }

    render() {
        let displayDate = this.props.date.toString()
        // Text entered by the user
        let firstLineOfTxt = this.props.userText.split('\n')
        // Text that will be displayed on the side panel
        let displayTitle = firstLineOfTxt[0].substring(0, 10)
        let displayText = firstLineOfTxt.length <= 1? firstLineOfTxt[0].substring(0, 20)+' ...' : firstLineOfTxt[1].substring(0, 20)+' ...'

        return(
            <div className='display' onClick = {() => this.openToEdit(this.props._id)}>
                <label className='noteTitle'>{displayTitle}</label><br/>
                <label className='restOfFile'>{displayText}</label><br/>
                <label className='timeOfSave'>{displayDate}</label>
            </div>
        )
    }

}


Note.propTypes = {
    editNote: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    note: state.note
})

export default connect(mapStateToProps, { editNote })(Note)