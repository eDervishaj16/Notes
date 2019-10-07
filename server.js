const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const notes = require('./routes/api/notes')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const app = express()

// BodyParser Middleware
app.use(bodyParser.json())


// MongoDB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db, {dbName: 'NoteApp'})
    .then(() => console.log('MongoDB Connected ...'))
    .catch(err => console.log(err))

// User Routes
app.use('/api/notes', notes)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Listening Port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))