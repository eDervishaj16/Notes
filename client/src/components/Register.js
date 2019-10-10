import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'

// Bootstrap
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Alert
} from 'reactstrap'

class Register extends Component {
    state = {
        modal: false,
        name: '',
        surname: '',
        email: '',
        password: '',
        // For error handling
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props

        if(error !== prevProps.error) {
            // Check for a register error
            if(error.id = 'REGISTER_FAIL'){
                this.setState({
                    msg: error.msg.msg
                })
            }
            else {
                this.setState({
                    msg: null
                })
            }
        }

        // If successful authentication close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
        }
    }

    toggle = () => {
        // Clear previous errors
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event) => {
        // Get data from state
        const { name, surname, email, password} = this.state

        // Creating a user object

        const newUser = {
            name,
            surname,
            email,
            password
        }

        // Attempt to register the user
        this.props.register(newUser)

    }

    render() {
        return (
            <div>
                <Button className='myBtns btn-light' onClick={this.toggle}>
                    <img 
                    src="https://img.icons8.com/ios/50/000000/login-rounded-right.png"
                    alt="Log In"
                    />
                    <label>Sign Up</label>
                </Button> 

                <Modal className = 'modals' isOpen = {this.state.modal} toggle = {this.toggle}>
                    <ModalHeader className = 'modalHeader' toggle = {this.toggle}>Register Form</ModalHeader>
                    <ModalBody>
                        {this.state.msg? <Alert color = 'danger'>{this.state.msg}</Alert>: null}
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
                                <Input 
                                    type = 'text'
                                    name = 'name'
                                    id = 'name'
                                    placeholder = 'Name'
                                    className = 'mb-3 modalInput'
                                    onChange = {this.handleChange}
                                /> 

                                <Input 
                                    type = 'text'
                                    name = 'surname'
                                    id = 'surname'
                                    placeholder = 'Surname'
                                    className = 'mb-3 modalInput'
                                    onChange = {this.handleChange}
                                />   

                                <Input 
                                    type = 'email'
                                    name = 'email'
                                    id = 'email'
                                    placeholder = 'E-mail'
                                    className = 'mb-3 modalInput'
                                    onChange = {this.handleChange}
                                />    

                                <Input 
                                    type = 'password'
                                    name = 'password'
                                    id = 'password'
                                    placeholder = 'Password'
                                    className = 'mb-3 modalInput'
                                    onChange = {this.handleChange}
                                />     

                                <Button className='modalBtn btn-light' block> Register </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }


}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {register, clearErrors})(Register)