const router = require('express').Router()
let Message = require('../models/message.model')

//                          *** Get Requests ***
// Get all Messages
router.route('/').get((req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Get messages by toMemberId
router.route('/find_toMemberId_message/:toMemberId').get((req, res) => {
  const toMemberId = req.params.toMemberId
  Message.findMany(
    {
      toMemberId,
    },
    function (err, message) {
      if (!message) {
        return res.json('Message not found :(').end()
      }
      return res.json(message)
    },
  )
})

// Get Messages by fromMemberId
router
  .route('/find_fromMemberId_message/:fromMemberId')
  .get(function (req, res) {
    // console.log('find-message get req.body:', req.body)
    // console.log('find-message get req.params:', req.params)
    const fromMemberId = req.params.fromMemberId
    Message.findMany(
      {
        fromMemberId,
      },
      function (err, message) {
        if (!message) {
          return res.json('Message not found :(').end()
        }
        return res.json(message)
      },
    )
  })

//                           *** Post Requests ***

// Create Message
router.route('/create_message').post((req, res) => {
  const fromMemberId = req.body.fromMemberId
  const toMemberId = req.body.toMemberId
  const message = req.body.message
  const date = req.body.date
  const newMessage = new Message({
    fromMemberId,
    toMemberId,
    message,
    date,
  })
  newMessage
    .save()
    .then(() => res.json('Message added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})
module.exports = router
