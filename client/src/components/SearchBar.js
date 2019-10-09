import React from 'react'

// Actions
import { searchNote } from '../actions/noteActions'

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class SearchBar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            userQuery: ''
        }
    }

    handleChange = (event) => {
        const {name, value}  = event.target
        this.setState({
            [name] : [value]
        }, () => {this.search(this.state.userQuery)})
    }

    search(query) {
        this.props.searchNote(query)
    }

    render() {
        return(
            <label className="searchLabel">
                <input 
                onChange = {this.handleChange}
                value = {this.state.userQuery}
                name="userQuery"
                type="text"
                placeholder="Search"
                /><img alt = "search-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"/>
            </label>
        )
    }
    
}


SearchBar.propTypes = {
    searchNote: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    note: state.note
})

export default connect(mapStateToProps, { searchNote })(SearchBar)
