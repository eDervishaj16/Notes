const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// User Model
const User = require('../../models/Users')

// @route POST api/auth
// @desc Authenticate User
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body

    // Check if the fields are all completed
    if(!email || !password) {
        return res.status(404).json({msg: 'Please enter all the required fields!'})
    }

    // Check for existing user
    User.findOne({email})
        .then(user => {
            // If no user exists return error
            if(!user) return res.status(404).json({msg: 'User does not exist!'})
            
            // Validating password
            bcrypt.compare(password, user.password)
                .then(isTheSame => {
                    if(!isTheSame) return res.status(400).json({msg: 'Invalid credentials'})

                    // Sending the token and user
                    jwt.sign(
                        // Payload
                        { id: user.id },
                        // Secret
                        config.get('jwtSecret'),
                        // Expiration
                        { expiresIn: 3600 },
                        // Callback
                        (err, token) => {
                            if(err) throw err
                            // Sending response
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    surname: user.surname,
                                    email: user.email 
                                }
                            })
                        }
                    )
                })
        })
})

// @route GET api/auth/user
// @desc Get User Data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router