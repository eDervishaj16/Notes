
import React from 'react'

class LogInForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    updateUserText = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: [value]
        })
    }
    
    render() {
        return (null)
    }
    
}
export default LogInForm