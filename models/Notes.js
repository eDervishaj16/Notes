const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const NoteSchema = new Schema({
    userText: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    author: {
        type: String,
        required: false
    }
})

module.exports = Note = mongoose.model('note', NoteSchema)