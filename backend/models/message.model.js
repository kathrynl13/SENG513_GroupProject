const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    fromMemberId: {
      type: String,
      required: true,
      unique: false,
    },
    toMemberId: {
      type: String,
      required: true,
      unique: false,
    },
    message: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },

    date: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  },
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
