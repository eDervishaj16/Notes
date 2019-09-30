const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

require('dotenv'). config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

const uri = 'mongodb+srv://Ergi:2014ForestHillsDrive@cluster0-q6k0n.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri, {dbName: 'NoteApp'})

const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const notesRouter = require('./routes/notes')
const usersRouter = require('./routes/users')

app.use('/notes', notesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})