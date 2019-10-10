import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'

// Actions
import  { logout } from '../actions/authActions'

// Bootstrap
import { DropdownMenu, Button } from 'reactstrap'

class Logout extends Component {
    render () {
        return (
            <DropdownMenu>
                <Button onClick = {this.props.logout}>Logout</Button>
            </DropdownMenu>
        )
    }
}

export default connect (null, { logout })(Logout)