const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// User Model
const User = require('../../models/Users')

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, surname, email, password } = req.body

    // Check if the fields are all completed
    if(!name || !surname || !email || !password) {
        return res.status(404).json({msg: 'Please enter all the required fields!'})
    }

    // Check for existing user
    User.findOne({email})
        .then(user => {
            // If exists exit
            if(user) return res.status(404).json({msg: 'User already exists!'})

            // Create new user
            const newUser = new User ({ 
                name, 
                surname,
                email,
                password
            })
            
            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    // Replace the plain password with the hashed passowrd
                    newUser.password = hash
                    // Save the new user
                    newUser.save()
                        // Generate Token
                        .then(user => {
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    surname: user.surname,
                                    email: user.email 
                                }
                            })
                        })
                })
            })
        })


})

module.exports = router