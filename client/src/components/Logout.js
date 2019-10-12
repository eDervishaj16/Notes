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
            <DropdownMenu className = 'btnHolder'>
                <Button className = ' logout myBtns w-100'  onClick = {this.props.logout}>
                    <img alt = 'logoutIcon' src="https://img.icons8.com/ios/50/000000/logout-rounded-left.png"/>
                    Logout
                </Button>
            </DropdownMenu>
        )
    }
}

export default connect (null, { logout })(Logout)