import React, { Component } from 'react'

// Bootstrap
import { Alert } from 'reactstrap'

class MyAlert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisible: this.props.isVisible,
            text: this.props.text
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isVisible !== this.props.isVisible) {
            this.setState({
                isVisible: this.props.isVisible,
                text: this.props.text
            })
        }
    }

    render(){
        if(this.props.isVisible === undefined) return (null)
        else {
            return(
                <Alert color = 'dark' isOpen = {this.state.isVisible} toggle = {this.onDismis}>
                    {this.state.text}
                </Alert>
            )
        }
    }
}


export default MyAlert