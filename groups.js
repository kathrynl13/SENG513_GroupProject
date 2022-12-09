const router = require('express').Router()
let Group = require('../models/group.model')
//                          *** Get Requests ***
// Get all Groups
router.route('/').get((req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json('Error: ' + err))
})
// Get group by id
router.route('find-group/:id').get((req, res) => {
  Group.findById(req.body.id)
    .then((group) => res.json(group))
    .catch((err) => res.status(400).json('Error: ' + err))
})
// Get Group by joinCode
router.route('/find_group_byJoinCode/:joinCode').get(function (req, res) {
  console.log('find-group get req.body:', req.body)
  console.log('find-group get req.params:', req.params)
  const joinCode = req.params.joinCode
  Group.findOne(
    {
      joinCode,
    },
    function (err, group) {
      if (!group) {
        return res.json('Group not found :(').end()
      }
      return res.json(group)
    },
  )
})
//                           *** Post Requests ***
// Create Group
router.route('/create_group').post((req, res) => {
  console.log("params",req.params,"body: ",req.body);
  const groupName = req.body.groupName
  const joinCode = req.body.joinCode
  const createdBy = req.body.createdBy
  const groupMembers = req.body.groupMembers
  const priceLimit = Number(req.body.priceLimit)
  const dueDate = req.body.date//Date.parse(req.body.date)

  const newGame = new Group({
    groupName,
    joinCode,
    createdBy,
    groupMembers,
    priceLimit,
    dueDate,
  })

  console.log("making new group", newGame);

  newGame
    .save()
    .then(() => res.json('Group added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Update group by given ID
router.route('/update_group/:id').post((req, res) => {
  Group.findById(req.body.id)
    .then((group) => {
      const groupName = req.body.groupName
      const joinCode = req.body.joinCode
      const createdBy = req.body.createdBy
      const groupMembers = req.body.groupMembers
      const priceLimit = Number(req.body.priceLimit)
      const dueDate = Date.parse(req.body.date)
      group.groupName = req.body.groupName
      group.joinCode = req.body.joinCode
      group.createdBy = req.body.createdBy
      group.groupMembers = req.body.groupMembers
      group.priceLimit = Number(req.body.priceLimit)
      group.dueDate = Date.parse(req.body.date)
      group
        .save()
        .then(() => res.json('Group updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Update Group Members
router.route('/update_members/:id').post((req, res) => {
  console.log('update_members req.body:', req.body)
  console.log('req.params:', req.params)
  let game_id = req.params.id
  console.log('game_id:', game_id)
  Group.findByIdAndUpdate(
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
        res.json('Group not found :(').end()
      } else {
        return res.json(data)
      }
    },
  )
})

//                           *** routes below may not be needed ***

// Update Group Name by given ID
router.route('/update_name/:id').post((req, res) => {
  console.log('update_name req.body:', req.body)
  console.log('req.params:', req.params)
  let game_id = req.params.id
  console.log('game_id:', game_id)
  Group.findByIdAndUpdate(
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
        res.json('Group not found :(').end()
      } else {
        return res.json(data)
      }
    },
  )
})
// Delete by given ID
router.route('/:id').delete((req, res) => {
  Group.findByIdAndDelete(req.body.id)
    .then(() => res.json('Group deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
})
// Update group members by given ID
router.route('/update_members/:id').post((req, res) => {
  console.log('update_members req.body:', req.body)
  console.log('req.params:', req.params)
  let game_id = req.params.id
  console.log('game_id:', game_id)
  Group.findByIdAndUpdate(
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
        res.json('Group not found :(').end()
      } else {
        return res.json(data)
      }
    },
  )
})
module.exports = router
