const router = require('express').Router()
let Member = require('../models/member.model')
//                          *** Get Requests ***
// Get all Groups
router.route('/').get((req, res) => {
  Member.find()
    .then((members) => res.json(members))
    .catch((err) => res.status(400).json('Error: ' + err))
})
// Get member by id
router.route('/find-member/:id').get((req, res) => {
  Member.findById(req.body.id)
    .then((member) => res.json(member))
    .catch((err) => res.status(400).json('Error: ' + err))
})
// Get Member by groupIDs
router.route('/find-member/:groupIDs').get(function (req, res) {
  // console.log('find-member get req.body:', req.body)
  // console.log('find-member get req.params:', req.params)
  const joinCode = req.params.joinCode
  Member.findOne(
    {
      joinCode,
    },
    function (err, member) {
      if (!member) {
        return res.json('Member not found :(').end()
      }
      return res.json(member)
    },
  )
})
//                           *** Post Requests ***
// Create Member
router.route('/create_member').post((req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const username = req.body.username
  const birthDate = Date.parse(req.body.date)
  const email = req.body.email
  const occupation = req.body.occupation
  const password = req.body.password
  const buysFor = req.body.buysFor
  const mySanta = req.body.mySanta
  const wishDetails = []

  const newMember = new Member({
    firstName,
    lastName,
    username,
    birthDate,
    email,
    occupation,
    password,
    buysFor,
    mySanta,
    wishDetails,
  })
  newMember
    .save()
    .then(() => res.json('Member added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Update Wishlist
router.route('/update_wishlist/:id').post((req, res) => {
  console.log('update_wishlist req.body:', req.body)
  console.log('req.params:', req.params)
  let member_id = req.params.id
  console.log('member_id:', member_id)
  Member.findByIdAndUpdate(
    member_id,
    {
      $push: {
        wishDetails: req.body,
      },
    },
    {
      new: true,
    },
    function (err, data) {
      if (err) {
        res.json('wishDetails not found :(').end()
      } else {
        return res.json(data)
      }
    },
  )
})

// Update member by given ID
router.route('/update_member/:id').post((req, res) => {
  Member.findById(req.body.id)
    .then((member) => {
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const username = req.body.username
      const birthDate = Date.parse(req.body.date)
      const email = req.body.email
      const occupation = req.body.occupation
      const password = req.body.password
      const buysFor = req.body.buysFor
      const mySanta = req.body.mySanta
      const wishDetails = req.body.wishDetails
      member
        .save()
        .then(() => res.json('Member updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

//                           *** routes below may not be needed ***

// Update Member Name by given ID
router.route('/update_name/:id').post((req, res) => {
  console.log('update_name req.body:', req.body)
  console.log('req.params:', req.params)
  let member_id = req.params.id
  console.log('member_id:', member_id)
  Member.findByIdAndUpdate(
    member_id,
    {
      $push: {
        name: req.body,
      },
    },
    {
      new: true,
    },
    function (err, data) {
      if (err) {
        res.json('Member not found :(').end()
      } else {
        return res.json(data)
      }
    },
  )
})
// Delete by given ID
router.route('/:id').delete((req, res) => {
  Member.findByIdAndDelete(req.body.id)
    .then(() => res.json('Member deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
})
module.exports = router
