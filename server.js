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

        console.log("this is user-", username,"-");
        console.log("length",username.length);
        console.log("api is", APIs.find_member_byUsername + username);

        axios
        .get(APIs.find_member_byUsername+username)
        .then((res) => {
            console.log(" User found!" + res.data )
            // set the loginexists as true
        }) 
        .catch((res) => console.log(" Couldn't find user"+ res.data))



        var loginExists = false;
        // search for database if login exists
        // ...


        if(loginExists==true) {
            // check if this is the first time user is logging in. if so bring to createorjoinpage
            let firstTime = true; 
            if(firstTime) {
                socket.emit('firsttimeredirect');
            } else socket.emit('redirect');
            // else bring to main user page
            
        } else socket.emit('loginfail');
    })

    // user makes a new account. newUser object.
    socket.on('newAccount', (newUser) => {
        console.log(newUser.fname);
        // add user to the database

        
        const firstName = newUser.fname;
        const lastName = newUser.lname;
        const username = newUser.username;
        const email = newUser.email;
        const password = newUser.password;
        const newMember={
            firstName,
            lastName,
            username,
            email,
            password,
        }

        console.log(newMember);

        axios
        .post(APIs.create_member, newMember)
        .then((res) => {
         (" Member created !" )
        })
        .catch((res) => console.log(res.data + " Couldn't create Member"))



    //     // user object
    // const newUser = {
    //     fname: fname.value,
    //     lname: lname.value,
    //     email: email.value,
    //     user: newusername.value,
    //     pass: newpassword.value
    // };
    // socket.emit("newAccount", newUser);

    })

    // user creates a new santa group
    socket.on("newGroupCreated", (name) => {
        console.log(name);
        // generate access code for the database
        let accesscode = createID();
        // add group to the database
    })

    // user joins an existing santa group
    socket.on("groupJoined", (code) => {
        console.log(code);
        // check if the group exists
        var groupExists = false;
        if(groupExists==true) {
            // add user to the group
            // bring user to the main page of the group
        } else socket.emit("joinfail");
    })

    //get member data 
    socket.on('member-information-request', function (message){
        //  SEARCH THROUGH DATEBASE FOR USER PROFILE AND BUILD OBJECT 
        let thisMember = getMemberObject(message)
        socket.emit('member-information-reply', thisMember)
    })

    //get group data
    socket.on('group-information-request', function (message){
        //SEARCH THROUGH DATABASE AND RETUN GROUP PROFILE IN BUILT OBJECT 
        if(message==1) {
            socket.emit('group-information-reply', group);
        } else 
            socket.emit('group-information-reply', group1);
        
    })

    //update member information
    socket.on('member-information-update', function (message){
        //update returned infromation to DB
        updateMemberInfromation(message)
    })

    //update group infromation 
    socket.on('group-information-update', function (message){
        //update returned infromation to DB
    })
})

//search in database for member
function getMemberObject(memberID){
    if(memberID == 1){
        return member1
    }else{
        return member2
    }
}
function updateMemberInfromation(message){
    member1.memberID = message.memberID
    member1.groupID = message.groupID
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