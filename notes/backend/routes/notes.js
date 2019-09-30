const router = require('express').Router()

let Note = require('../models/note.model')

// GET REQUEST
router.route('/').get((req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error' + err))
})

// POST REQUESTS
router.route('/add').post((req, res) => {
    const _id = req.body._id
    const userText = req.body.userText
    const date = Date.now()
    const author = req.body.author

    const newNote = new Note({
        _id,
        userText,
        date,
        author
    })

    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:author').get((req, res) => {
    Note.find({'author': req.params.author})
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/find/:id').get((req, res) => {
    Note.findById(req.param.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(note => res.json('Note Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.userText = req.body.userText
            date = Date.now()
            
            note.save()
                .then(()=> res.json('Note updated!'))
                .catch(err => res.status(400).json('Error' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router