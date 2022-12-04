const mongoose = require('mongoose')

const Schema = mongoose.Schema
//  memberID:1,
//     // groupIDs:1,
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
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: false,
    },
    birthDate: { type: Date, required: true },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    occupation: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },

    buysFor: {
      type: String,
      required: true,
      unique: false,
    },
    mySanta: {
      type: String,
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
