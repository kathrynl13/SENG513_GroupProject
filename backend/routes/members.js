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
  console.log('find-member id: ' + req.params.id)
  Member.findById(req.params.id, function (err, data) {
    if (err) {
      console.log('find-member ERROR ' + err)
    } else {
      res.json(data)
    }
  })
})

// Get Member by username
router.route('/find_member_byUsername/:username').get(function (req, res) {
  console.log('find-member get req.body:', req.body)
  console.log('find-member get req.params:', req.params)
  const username = req.params.username
  Member.findOne(
    {
      username,
    },
    function (err, member) {
      if (!member) {
        return res.json('Member not found :(').end()
      }
      return res.json(member)
    },
  )
})

// Get Member by groupIDs
router.route('/find-member/:groupIDs').get(function (req, res) {
  console.log('find-member get req.body:', req.body)
  console.log('find-member get req.params:', req.params)
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
  console.log('create_member params', req.params, 'body: ', req.body)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const username = req.body.username
  const email = req.body.email
  const myGroups = req.body.myGroups
  const password = req.body.password
  const birthDate = ''
  const occupation = ''
  const buysFor = []
  const mySanta = []
  const wishDetails = {
    wish_want: '',
    wish_need: '',
    wish_eat: '',
    wish_do: '',
    wish_wear: '',
    wish_learn: '',
  }

  const newMember = new Member({
    firstName,
    lastName,
    username,
    email,
    myGroups,
    password,
    birthDate,
    occupation,
    buysFor,
    mySanta,
    wishDetails,
  })
  console.log('making new member', newMember)

  newMember
    .save()
    .then(() => res.json('Member added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Update Wishlist
router.route('/update_wishlist/:id').post((req, res) => {
  console.log('update_wishlist req.body:', req.body)
  console.log('update_wishlist req.params:', req.params)
  let member_id = req.params.id
  console.log('update_wishlist member_id:', member_id)
  Member.findByIdAndUpdate(member_id, { wishDetails: req.body }, function (
    err,
    data,
  ) {
    if (err) {
      res.json('wishDetails not found :(').end()
    } else {
      return res.json(data)
    }
  })
})

// Update member by given ID
router.route('/update_member/:id').post((req, res) => {
  console.log('update_member memberID: ' + req.params.id)
  Member.findByIdAndUpdate(
    { _id: req.params.id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      myGroups: req.body.myGroups,
      occupation: req.body.occupation,
      birthDate: req.body.birthDate,
      password: req.body.password,
      buysFor: req.body.buysFor,
      mySanta: req.body.mySanta,
    },
    function (err, result) {
      if (err) {
        res.status(400).json('Error: ' + err)
      } else {
        res.send(result)
      }
    },
  )
})
// Update Member's  groups by his given ID
router.route('/update_member_myGroups/:id').post((req, res) => {
  console.log(
    '\nupdate_member_myGroups req.body:',
    req.body,
    '| req.params:',
    req.params,
  )

  let member_id = req.params.id
  console.log('updating myGroups of member_id:', member_id)
  Member.findByIdAndUpdate(
    member_id,
    {
      $push: {
        myGroups: req.body.groupID,
      },
    },
    {
      new: true,
    },
    function (err, data) {
      if (err) {
        console.log('update_member_myGroups Member not found')
        res.json('Member not found :(').end()
      } else {
        console.log('update_member_myGroups ' + data)

        return res.json(data)
      }
    },
  )
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
