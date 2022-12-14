const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const groupsRouter = require('./routes/groups')
const membersRouter = require('./routes/members')
const messagesRouter = require('./routes/messages')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 8800

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use(express.json())
app.use('/groups', groupsRouter)
app.use('/members', membersRouter)
app.use('/messages', messagesRouter)
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
// Mongo db connection
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
  },
  function (err, client) {
    if (err) {
      console.log('MongoDB database connection has failed')
      throw err
    }
    console.log('MongoDB database connection established successfully')
  },
)
