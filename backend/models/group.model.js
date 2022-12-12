// var group = {
//   groupIDs: 1,
//   groupName: 'Santa Superstars',
//   dueDate: 'Decemeber 24, 2022',
//   joinCode: 1234,
//   priceLimit: 50,
//   memberIDs: [1, 2],
//   organizerID: 1,
// }
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: false,
    },
    joinCode: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      required: false,
    },
    groupMembers: {
      type: Array,
      required: false,
    },
    groupRules: {
      type: Object,
      required: false,
      unique: false,
    },
    priceLimit: {
      type: Number,
      required: false,
    },
    dueDate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)
const Group = mongoose.model('Group', groupSchema)
module.exports = Group
