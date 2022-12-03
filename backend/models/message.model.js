const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
  fromMemberId: {
    type: String,
    required: true,
    unique: true,
  },
  toMemberId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  date: {
    type: Date,
    required: true,
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
