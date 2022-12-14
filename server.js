// const { Socket } = require('engine.io');
//npm run start

const axios = require('axios');
const APIs = require('./APIs.routes.js');

//setting up the connection
var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

// app.get('/', function(req, res){
//     res.sendFile(__dirname, '/welcome.html')
// })

server = http.Server(app)
server.listen(5000)

io = socketIO(server)

app.use(express.static(__dirname));

//defining storage objects
var group = {
    groupID:1,
    groupName:"Santa Superstars",
    dueDate:"Decemeber 24, 2022",
    joinCode:1234,
    priceLimit:50,
    members:[{id:1,name:"Anne"},{id:2,name:"Jake"}],
    organizerID:1
}

var group1 = {
    groupID:2,
    groupName:"Santa Bitches",
    dueDate:"Decemeber 24, 2022",
    joinCode:7777,
    priceLimit:50,
    members:[{id:1,name:"Anne"},{id:2,name:"Jake"}],
    organizerID:2
}

var member1 = {
    memberID:1,
    groupID:[1,2],
    firstName:"Anne",
    lastName:"Jones",
    age: 30,
    email:"anne.jones@gmail.com",
    username:"aJones",
    password:"stupidPassword",
    occupation:"Doctor",
    wish_want:"Glasses",
    wish_need:"Spoons",
    wish_eat:"Apples",
    wish_do:"Gym",
    wish_wear:"Socks",
    wish_learn:"Integrals",
    secretSanta:2   //ID number of the person
}
var member2 = {
    memberID:2,
    groupID:[1],
    firstName:"Jake",
    lastName:"Woods",
    age: 22,
    email:"jake.woods@gmail.com",
    username:"jWoods",
    password:"stupidPassword2",
    occupation:"Actor",
    wish_want:"Markers",
    wish_need:"Onions",
    wish_eat:"Beers",
    wish_do:"Movies",
    wish_wear:"Headbands",
    wish_learn:"Painting",
    secretSanta:1   //ID number of the person
}

function createID(){
    let id = Math.random().toString(9).slice(2).substring(1, 5)
    return id;
}

//socket requests and emits 
io.on('connection', function (socket){
    console.log("Made socket connection"); //

    // emits from index, createAccount, createorjoin page_______________________________________________

    // user clicks login button
    socket.on('login', (username, password) => {

        // logs to the server
        console.log("this is user-", username,"-");
        console.log("length",username.length);
        console.log("api is", APIs.find_member_byUsername + username);

        // check if username exists in database
        axios
        .get(APIs.find_member_byUsername+username)
        .then((res) => {
            console.log(" User found!", res.data )

            // check if password matches
            if(password == res.data.password) {
                console.log("password match");
                // redirect to create or join page:
                socket.emit('firsttimeredirect', res.data._id);

            } else socket.emit('loginfail');

        }) 
        .catch((res) => console.log(" Couldn't find user"+ res.data))

    })

    // user makes a new account. newUser object.
    socket.on('newAccount', (newUser) => {
        // console.log(newUser.fname);
        // add user to the database
        const firstName = newUser.fname;
        const lastName = newUser.lname;
        const username = newUser.username;
        const email = newUser.email;
        const password = newUser.password;
        const occupation = "";
        const birthDate = Date();

        const newMember={
            firstName,
            lastName,
            username,
            email,
            password,
            occupation,
            birthDate
        }
       
        // post new member to database
        axios
        .post(APIs.create_member, newMember)
        .then((res) => {
         (" Member created !" )
        })
        .catch((res) => console.log(res.data + " Couldn't create Member"))

    })

    // // user creates a new santa group
    // socket.on("newGroupCreated", (name) => {
    //     console.log(name);
    //     // generate access code for the database
    //     let accesscode = createID();
    //     // add group to the database
    // })

    // user joins an existing santa group
    socket.on("groupJoined", (code, memberID) => {
        console.log(code);
        var groupCode = '';
        // check if the group exists
        // get request on join code 
        axios
        .get(APIs.find_group_byJoinCode+code)
        .then((res) => {
            console.log("group found!", res.data)
            if(res.data._id != null)  { //if group exists
                // console.log("groupID: ", res.data._id); // gotta store this somewhere?
                groupCode = res.data._id;
                // console.log("memberID", memberID);
                // console.log(res.data.groupMembers);
                
                // if member is not yet in the member list, update res.data.groupmembers to have it
                if (res.data.groupMembers.includes(memberID) == false) {
                    res.data.groupMembers.push(memberID);
                    // console.log("OK new group", res.data)
                
                    // use update group by id to update group to have this member id in groupMembers
                    axios
                    .post(APIs.update_group_byID + res.data._id, res.data)
                    .then((res) => {
                        console.log('group information updated !')
                    })
                    .catch(function (error) {console.log(error);})
                }

                // get member by id
                axios
                .get(APIs.find_member_byID + memberID) 
                .then((res) => {
                    // console.log("name: " + res.data.firstName)

                    // if the groupID is not in the member's myGroups, add it
                    if(res.data.myGroups.includes(groupCode) == false) {
                        // update mygroups to have groupid for the member, res.data
                        res.data.myGroups.push(groupCode);
                        // console.log("ok new member", res.data);


                        // post update member
                        axios
                        .post(APIs.update_member + res.data._id, res.data)
                        .then((res) => {
                            console.log('Member information updated !')
                        })
                        .catch((res) => console.log(res.data + "Couldn't update member infromation"))
                    }
                }) 
                .catch((res) => console.log(" Couldn't find user by ID"+ res.data.firstName))

                // done the my groups part

                socket.emit("redirecttosantagroups", res.data.groupName);
            } else socket.emit("joinfail");
        }) 
        .catch(function (error) {
            console.log("Error,",error);
            socket.emit("joinfail");
        })
    })


    // emits from createGroup.js
    // they create a group
    socket.on("GroupInfoInputted", (name, limit, date, memberID) => {

        const groupName = name;
        const joinCode= createID();
        const createdBy= memberID;
        var groupMembers= [memberID];
        const priceLimit= limit;
        const dueDate= date;

        //groupMembers.push(memberID); // add the member who created into the members

        const newGroup={
            groupName,
            joinCode,
            createdBy,
            groupMembers,
            priceLimit,
            dueDate
        }

        // create a group in the database. 
        axios
        .post(APIs.create_group, newGroup)
        .then((res) => {
         console.log(" GROUP created !",);
         console.log("CODE:", joinCode); 
         socket.emit("groupCreated", joinCode); // in creatGroup
        })
        .catch(function (error) {
            console.log("Error,",error);
        })

        let groupCode ='';
        console.log("group id: " + groupCode)
        // get the group we just made to get the id.
        axios
        .get(APIs.find_group_byJoinCode+joinCode)
        .then((res) => {
            //console.log("here id is: " + res.data._id)
            groupCode = res.data._id;
        })
        .catch(function (error) {
            console.log("Error,",error);
        })

        // add the group to groups array in the member
        // get member by id
        // console.log("MEMBER ID", memberID);
        console.log("group id: " + groupCode)
        axios
        .get(APIs.find_member_byID + memberID) 
        .then((res) => {
            // console.log("name: " + res.data.firstName)
            // update mygroups to have groupid for the member, res.data
            //res.data.myGroups.push(groupCode);
            console.log("ok new member", res.data);

            // post update member
            axios
            .post(APIs.update_member + res.data._id, res.data)
            .then((res) => {
                console.log('Member information updated !')
            })
            .catch((res) => console.log(res.data + "Couldn't update member infromation"))
        })
        .catch(function (error) {console.log(error);}) 
        // .catch((res) => console.log(" Couldn't find user by ID...", res.data))   

    })



    //get member data 
    socket.on('member-information-request', function (message){
        //  SEARCH THROUGH DATEBASE 
        // console.log("id: " + message)
        axios
        .get(APIs.find_member_byID + message) 
        .then((res) => {
            socket.emit('member-information-reply', res.data)
            //console.log("name: " + res.data.firstName)
        }) 
        .catch((res) => console.log(" Couldn't find user by ID"))
    })

    //get group data
    socket.on('group-information-request', function (message){
        //SEARCH THROUGH DATABASE AND RETUN GROUP PROFILE IN BUILT OBJECT 
        console.log("group id: " + message)
        axios
        .get(APIs.find_group_byID + message) 
        .then((res) => {
            socket.emit('group-information-reply', res.data)
            console.log("name: " + res.data.groupName)
            console.log("joinCode: " + res.data.joinCode)
        }) 
        .catch((res) => console.log(" Couldn't find group by ID"+ res.data))
       
    })

    //update member information
    socket.on('member-information-update', function (message){
        //update returned infromation to DB
        var memberObject = message.memberObject
        var memberID = message.id

        axios
        .post(APIs.update_member + memberID, memberObject)
        .then((res) => {
            console.log('Member information updated !')
        })
        .catch((res) => console.log(res.data + "Couldn't update member infromation"))
    })
    
    //update memeber wishlist
    socket.on('member-wishlist-update', function (message){
        var wishObject = message.wish 
        var memberID = message.id

        axios
        .post(APIs.update_wishlist + memberID, wishObject)
        .then((res) => {
            console.log('WishList updated !')
        })
        .catch((res) => console.log(res.data + "Couldn't update Wishlist"))
    
    })

    //update group infromation 
    socket.on('group-information-update', function (message){
        //update returned infromation to DB

        var groupObject = message.groupObject
        var groupID = message.id

        // console.log(groupObject, groupID);

        axios
        .post(APIs.update_group_byID + groupID, groupObject)
        .then((res) => {
            console.log('group information updated !')
        })
        .catch(function (error) {console.log(error);})
        //.catch((res) => console.log(res.data + "Couldn't update group information"))

    })


    // ----- Messages functions ------
  messages = null
  currentRoom = null
  const santas = new Set()
  const santees = new Set()

  socket.on('load-messages', (memberid) => {
    axios
      .get(APIs.find_member_byID + memberid)
      .then((res) => {
        userInformation = res.data

        userInformation.buysFor.forEach((user) => {
          axios.get(APIs.find_member_byID + user).then((res) => {
            returnedUser = res.data
            socket.emit('known-user', [
              returnedUser.firstName + ' ' + returnedUser.lastName,
              returnedUser._id,
            ])
          })
        })

        for (user in userInformation.mySanta) {
          console.log(userInformation.myGroups[user])
          axios
            .get(APIs.find_group_byID + userInformation.myGroups[user])
            .then((res) => {
              socket.emit('unknown-user', [
                res.data.groupName,
                userInformation.mySanta[user],
              ])
            })
            .catch((res) => console.log("Couldn't find group by ID " + res))
        }
      })
      .catch((res) => console.log("Couldn't find Messages " + res))
  })

  socket.on('open-chat', (data) => {
    if (currentRoom != null) {
      socket.leave(currentRoom)
    }
    // Join the socket room of yourID + personYouAreMessagingID
    currentRoom = data[0] + data[1]
    socket.join(data[0] + data[1])

    // Get all messages
    axios
    .get(APIs.find_all_messages)
    .then((res) => {
      // Store all messages
      messages = res.data
      messages.forEach((message) => {
        if (
          (message.fromMemberId == data[0] && message.toMemberId == data[1]) ||
          (message.fromMemberId == data[1] && message.toMemberId == data[0])
        ) {
          socket.emit('message', message)
        }
      })
    })
    .catch((res) => console.log("Couldn't find Messages"))
  })

  socket.on('send-message', (message) => {
    body = {
      fromMemberId: message[1],
      toMemberId: message[2],
      message: message[3],
      date: message[0],
    }
    axios
      .post(APIs.create_message, body)
      .then((res) => {})
      .catch((res) => console.log(res + "Couldn't create Message"))

    // Send message to the two people involved
    socket.broadcast.to(message[2] + message[1]).emit('message', body)
    socket.emit('message', body)
  })

  // ----- End Messages functions ------
})
