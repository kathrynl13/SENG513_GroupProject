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
// Get Member by groupId
router.route('/find-member/:groupId').get(function (req, res) {
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
  const memberName = req.body.memberName
  const joinCode = req.body.joinCode
  const createdBy = req.body.createdBy
  const groupMembers = req.body.groupMembers
  const priceLimit = Number(req.body.priceLimit)
  const dueDate = Date.parse(req.body.date)
  const newGame = new Member({
    memberName,
    joinCode,
    createdBy,
    groupMembers,
    priceLimit,
    dueDate,
  })
  newGame
    .save()
    .then(() => res.json('Member added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})
// Update Member Members
router.route('/update_members/:id').post((req, res) => {
  console.log('update_members req.body:', req.body)
  console.log('req.params:', req.params)
  let game_id = req.params.id
  console.log('game_id:', game_id)
  Member.findByIdAndUpdate(
    game_id,
    {
      $push: {
        groupMembers: req.body,
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
// Update Member Name by given ID
router.route('/update_name/:id').post((req, res) => {
  console.log('update_name req.body:', req.body)
  console.log('req.params:', req.params)
  let game_id = req.params.id
  console.log('game_id:', game_id)
  Member.findByIdAndUpdate(
    game_id,
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
// Update member members by given ID
router.route('/update_members/:id').post((req, res) => {
  console.log('update_members req.body:', req.body)
  console.log('req.params:', req.params)
  let game_id = req.params.id
  console.log('game_id:', game_id)
  Member.findByIdAndUpdate(
    game_id,
    {
      $push: {
        groupMembers: req.body,
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
// Update member by given ID
router.route('/update_member/:id').post((req, res) => {
  Member.findById(req.body.id)
    .then((member) => {
      const memberName = req.body.memberName
      const joinCode = req.body.joinCode
      const createdBy = req.body.createdBy
      const groupMembers = req.body.groupMembers
      const priceLimit = Number(req.body.priceLimit)
      const dueDate = Date.parse(req.body.date)
      member.memberName = req.body.memberName
      member.joinCode = req.body.joinCode
      member.createdBy = req.body.createdBy
      member.groupMembers = req.body.groupMembers
      member.priceLimit = Number(req.body.priceLimit)
      member.dueDate = Date.parse(req.body.date)
      member
        .save()
        .then(() => res.json('Member updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})
module.exports = router
