var groupID = 1;
var memberID = 2;
var membersInfo;    //[{id:1,name:"Anne"},{id:2,name:"Jake"}],
var numberOfMembers = 1;

console.log("hello")
const socket = io('http://localhost:5000')

socket.emit('group-information-request', groupID)

socket.on('group-information-reply', group => {
    membersInfo = group.members //array of member ID numbers 
    numberOfMembers = membersInfo.length
    showGroupMemberList(numberOfMembers)
    updateMemberNames(numberOfMembers)
})

function showGroupMemberList(numMembers){
    for(var i = 10; i > (10-(10 - numMembers)); i--){   //set the number of boxes 
        var temp = 'memberselect' + i
        document.getElementById(temp).style.display = "none"
    }
}

function updateMemberNames(numMembers){
    for(let i = 1; i <= numMembers; i++){
        var temp = 'memberselect' + i
        let theName = membersInfo[i-1].name
        document.getElementById(temp).textContent = theName
    }
}

document.getElementById('memberselect1').addEventListener('click', function(){
    let arrayID = 0
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})

document.getElementById('memberselect2').addEventListener('click', function(){
    let arrayID = 1
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect3').addEventListener('click', function(){
    let arrayID = 2
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect4').addEventListener('click', function(){
    let arrayID = 3
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect5').addEventListener('click', function(){
    let arrayID = 4
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect6').addEventListener('click', function(){
    let arrayID = 5
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect7').addEventListener('click', function(){
    let arrayID = 6
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect8').addEventListener('click', function(){
    let arrayID = 7
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect9').addEventListener('click', function(){
    let arrayID = 8
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})
document.getElementById('memberselect10').addEventListener('click', function(){
    let arrayID = 9
    socket.emit('member-information-request', membersInfo[arrayID].id)
    socket.on('member-information-reply', member =>{

        let name = member.firstName +" "+ member.lastName
        document.getElementById('group-member-name-text').innerHTML = name
        let birthdate = member.age
        document.getElementById('ageChange').innerHTML = "Birthdate: " + birthdate
        let occ = member.occupation 
        document.getElementById('occupationChange').innerHTML = "Occupation: " + occ
        let email = member.email
        document.getElementById('emailChange').innerHTML = "Email: " + email
        let wish_want = member.wish_want
        document.getElementById('wishlist-want').innerHTML = wish_want
        let wish_need = member.wish_need
        document.getElementById('wishlist-need').innerHTML = wish_need
        let wish_wear = member.wish_wear
        document.getElementById('wishlist-wear').innerHTML = wish_wear
        let wish_do = member.wish_do
        document.getElementById('wishlist-do').innerHTML = wish_do
        let wish_learn = member.wish_learn
        document.getElementById('wishlist-learn').innerHTML = wish_learn
        let wish_eat = member.wish_eat 
        document.getElementById('wishlist-eat').innerHTML = wish_eat
    }) 
})



