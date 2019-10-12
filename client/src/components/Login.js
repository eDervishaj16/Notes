import React, { Component } from 'react'
import Register from './Register'

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import { getNotes } from '../actions/noteActions'

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

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            msg: null,
            email: '',
            password: '',
            registerModal: false
        }
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props

        if(error !== prevProps.error) {
            // Check for a register error
            if(error.id === 'LOGIN_FAIL'){
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

    displayRegister = () => {
        this.props.clearErrors()
        this.setState({
            registerModal: !this.state.registerModal
        })
    }

    toggle = () => {
        // Clear previous errors
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    registerToggle = () => {
        
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        // Get user credentials
        const { email, password } = this.state

        const user = {
            email,
            password
        }

        // Attempt to login user
        this.props.login(user)
        
        this.props.getNotes(localStorage.getItem('author'))


    }

 render() {
        return (
            <div>
                <Button className='myBtns btn-light' onClick={this.toggle}>
                    <img 
                    src="https://img.icons8.com/ios/50/000000/login-rounded-right.png"
                    alt="Log In"
                    />
                    <label>Login</label>
                </Button> 

                <Register
                    modal = {this.state.registerModal}
                    toggle = {this.displayRegister}
                />

                <Modal className = 'modals' isOpen = {this.state.modal} toggle = {this.toggle}>
                    <ModalHeader className = 'modalHeader' toggle = {this.toggle}>Login Form</ModalHeader>
                    <ModalBody>
                        {this.state.msg? <Alert color = 'danger'>{this.state.msg}</Alert>: null}
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
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

                                <Button className='modalBtn btn-light' block> Login </Button>
                            </FormGroup>
                            <Button color = 'link' onClick = {this.displayRegister}>Don't have an account? Sing Up</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {login, clearErrors, getNotes})(Login)
