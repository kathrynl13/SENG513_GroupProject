const { Socket } = require('engine.io')

//setting up the connection
var express = require('express'),
  app = express(),
  http = require('http'),
  socketIO = require('socket.io'),
  server,
  io

app.get('/', function (req, res) {
  res.sendFile(__dirname, '/welcome.html')
})

server = http.Server(app)
server.listen(5000)

io = socketIO(server)

//defining storage objects
var group = {
  groupIDs: 1,
  groupName: 'Santa Superstars',
  dueDate: 'Decemeber 24, 2022',
  joinCode: 1234,
  priceLimit: 50,
  memberIDs: [1, 2],
  organizerID: 1,
}
var member1 = {
  memberID: 1,
  groupIDs: 1,
  firstName: 'Anne',
  lastName: 'Jones',
  age: 30,
  email: 'anne.jones@gmail.com',
  username: 'aJones',
  password: 'stupidPassword',
  occupation: 'Doctor',
  wish_want: 'Glasses',
  wish_need: 'Spoons',
  wish_eat: 'Apples',
  wish_do: 'Gym',
  wish_wear: 'Socks',
  wish_learn: 'Integrals',
  secretSanta: 2, //ID number of the person
}
var member2 = {
  memberID: 2,
  groupIDs: 1,
  firstName: 'Jake',
  lastName: 'Woods',
  age: 22,
  email: 'jake.woods@gmail.com',
  username: 'jWoods',
  password: 'stupidPassword2',
  occupation: 'Actor',
  wish_want: 'Markers',
  wish_need: 'Onions',
  wish_eat: 'Beers',
  wish_do: 'Movies',
  wish_wear: 'Headbands',
  wish_learn: 'Painting',
  secretSanta: 1, //ID number of the person
}
function createID() {
  let id = Math.random().toString(9).slice(2).substring(1, 5)
  return id
}

//socket requests and emits
io.on('connection', function (socket) {
  //get member data
  socket.on('member-information-request', function (message) {
    //  SEARCH THROUGH DATEBASE FOR USER PROFILE AND BUILD OBJECT
    let thisMember = getMemberObject(message)
    socket.emit('member-information-reply', thisMember)
  })

  //get group data
  socket.on('group-information-request', function (message) {
    //SEARCH THROUGH DATABASE AND RETUN GROUP PROFILE IN BUILT OBJECT
    socket.emit('group-information-reply', group)
  })

  //update member information
  socket.on('member-information-update', function (message) {
    //update returned infromation to DB
    updateMemberInfromation(message)
  })

  //update group infromation
  socket.on('group-information-update', function (message) {
    //update returned infromation to DB
  })
})

//search in database for member
function getMemberObject(memberID) {
  if (memberID == 1) {
    return member1
  } else {
    return member2
  }
}
function updateMemberInfromation(message) {
  member1.memberID = message.memberID
  member1.groupIDs = message.groupIDs
  member1.firstName = message.firstName
  member1.lastName = message.lastName
  member1.age = message.age
  member1.email = message.email
  member1.username = message.username
  member1.password = message.password
  member1.occupation = message.occupation
  member1.wish_want = message.wish_want
  member1.wish_need = message.wish_need
  member1.wish_eat = message.wish_eat
  member1.wish_do = message.wish_do
  member1.wish_wear = message.wish_wear
  member1.wish_learn = message.wish_learn
  member1.secretSanta = message.secretSanta
  console.log(member1)
}
