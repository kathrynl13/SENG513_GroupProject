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
      unique: true,
    },
    myGroups: {
      type: Array,
      required: false,
      unique: false,
    },
    birthDate: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    occupation: {
      type: String,
      required: false,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },

    buysFor: {
      type: Array,
      required: false,
      unique: false,
    },
    mySanta: {
      type: Array,
      required: false,
      unique: false,
    },
    wishDetails: {
      type: Object,
      required: false,
      unique: false,
    },
  },
  {
    timestamps: true,
  },
)

const Member = mongoose.model('Member', memberSchema)

module.exports = Member