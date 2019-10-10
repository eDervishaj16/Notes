import React, { Component } from 'react'

// Bootstrap
import { Alert } from 'reactstrap' 

class MyAlert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: true,
      setShow: true
    }
  }

  setShow() {
    this.setState({
      setShow: false
    })
  }

  render() {
    console.log('HEY')
    if (this.state.show) {
      return (
        <Alert variant="danger" onClose={this.setShow} dismissible>
          <Alert.Heading>{this.props.text}</Alert.Heading>
        </Alert>
      );
    }
  }
}

export default MyAlert