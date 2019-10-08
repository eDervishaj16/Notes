const express = require('express')
const router = express.Router()

// Note Model
const Note = require('../../models/Notes')

// @route GET api/notes/:author
// @desc Get User Notes
// @access Public
router.get('/:author', (req, res) => {
    Note.find({'author': req.params.author})
        .sort({date: -1})
        .then(notes => res.json(notes))
})

// @route POST api/notes
// @desc Create A Note
// @access Private
router.post('/', (req, res) => {
    const newNote = new Note({
        userText: req.body.userText,
        author: req.body.author,
    })

    newNote.save()
        .then(note => res.json(note))
        .catch(err => res.json(err))
})

// @route POST api/update/:id
// @desc Update A Note
// @access Private
router.post('/update/:id', (req, res) => {
    Note.findByIdAndUpdate({_id: req.params.id}, {userText: req.body.userText})
        .then(note => res.json(note))
        .catch(err => res.json(err))
})

// @route DELETE api/notes/:id
// @desc Delete A Note
// @access Private
router.delete('/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => note.remove().then(()=> res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
})

module.exports = router