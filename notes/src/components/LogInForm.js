import React from 'react'

function LogInForm(props) {
    return (  
        <div className='popup'>  
            <div className='popup_inner'>
                <button className='hideForm' onClick={props.removeForm}>
                    <img 
                        src="https://img.icons8.com/ios/50/000000/circled-x.png"
                        alt="Exit"
                    />
                </button>
                <form onSubmit={props.logIn}>
                    <input
                        className='logInFields'
                        placeholder='E-mail'
                        name='email'
                        type='email'
                        value={props.email}
                        onChange={props.updateUserText}
                    /><br/>
                    <input
                        className='logInFields'
                        placeholder='Password'
                        name='password'
                        type='password'
                        value={props.password}
                        onChange={props.updateUserText}
                    /><br/>
                    <button type='submit'>Log In</button>
                    <label className='signUpTxt'><button onClick={props.displaySignUp}>Don't have an account? Sign Up</button></label>
                </form>  
            </div>  
        </div>  
    )
}

export default LogInForm