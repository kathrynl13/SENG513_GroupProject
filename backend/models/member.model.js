const mongoose = require('mongoose')

const Schema = mongoose.Schema
//  memberID:1,
//     // groupID:1,
//     // firstName:"Anne",
//     // lastName:"Jones",
//     // age: 30,
//     // email:"anne.jones@gmail.com",
//     // username:"aJones",
//     // password:"stupidPassword",
//     // occupation:"Doctor",
//     wish_want:"Glasses",
//     wish_need:"Spoons",
//     wish_eat:"Apples",
//     wish_do:"Gym",
//     wish_wear:"Socks",
//     wish_learn:"Integrals",
//     secretSanta:2   //ID number of the person
const memberSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: { type: Date, required: true },
    email: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    buysFor: {
      type: Number,
      required: true,
      unique: false,
    },
    mySanta: {
      type: Number,
      required: true,
      unique: false,
    },
    wishDetails: {
      type: Object,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  },
)

const Member = mongoose.model('Member', memberSchema)

module.exports = Member
