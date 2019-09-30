const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        required: true
    },
    userText: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: 'true'
    }
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note