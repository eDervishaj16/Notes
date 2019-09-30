const router = require('express').Router()

let User = require('../models/user.model')

// GET REQUEST
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err))
})

// POST REQUESTS
router.route('/add').post((req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const newUser = new User({
        name,
        surname,
        username,
        email,
        password
    })

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router