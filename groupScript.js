//////****change with cookies */
var groupID = '638fc4515ce0ef129280d5e2'
var memberID = '638c1a592d3871b07663e547'
//////****change with cookies */

var membersInfo;    //the member object from database
var numberOfMembers = 1;

var arrayOfGroupObjects = [];

const socket = io('http://localhost:5000')

socket.emit('group-information-request', groupID)

socket.on('group-information-reply', group => {
    membersInfo = group.groupMembers //array of member ID numbers 
    console.log("memberinfo: " + membersInfo)
    numberOfMembers = membersInfo.length
    showGroupMemberList(numberOfMembers)
    getMemberInformation(numberOfMembers)
})

function showGroupMemberList(numMembers){
    for(var i = 10; i > (10-(10 - numMembers)); i--){   //set the number of boxes 
        var temp = 'memberselect' + i
        document.getElementById(temp).style.display = "none"
    }
}
function getMemberInformation(numMembers){
    for(var i = 0; i < numMembers; i++){
        socket.emit('member-information-request', membersInfo[i])
    }
}
socket.on('member-information-reply', member =>{
    console.log("id here: "+ member._id)
    for (var i = 1; i <= numberOfMembers; i++){
        if(membersInfo[i-1] == member._id){
            var temp = 'memberselect' + i
            document.getElementById(temp).textContent = member.firstName + " " + member.lastName
            var thisMember = {
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                occupation: member.email,
                birthDate: member.birthDate,
                wish_want: member.wishDetails.wish_want,
                wish_need:member.wishDetails.wish_need,
                wish_eat:member.wishDetails.wish_eat,
                wish_do:member.wishDetails.wish_do,
                wish_wear:member.wishDetails.wish_wear,
                wish_learn:member.wishDetails.wish_learn
            }
            arrayOfGroupObjects[i] = thisMember
            //console.log(thisMember)
        }
    }
})

$('#memberselect1, #memberselect2, #memberselect3, #memberselect4, #memberselect5, #memberselect6, #memberselect7, #memberselect8, #memberselect9, #memberselect10').click(function(){
    let elementID = this.id
    let elementNumber = this.id.slice(-1)
    let viewingMember = arrayOfGroupObjects[elementNumber]

    document.getElementById('group-member-name-text').innerHTML = viewingMember.firstName 
    document.getElementById('ageChange').innerHTML = "Birthdate: " + viewingMember.birthDate
    document.getElementById('occupationChange').innerHTML = "Occupation: " + viewingMember.occupation
    document.getElementById('emailChange').innerHTML = "Email: " + viewingMember.email
    document.getElementById('wishlist-want').innerHTML = viewingMember.wish_want
    document.getElementById('wishlist-need').innerHTML = viewingMember.wish_need
    document.getElementById('wishlist-wear').innerHTML = viewingMember.wish_wear
    document.getElementById('wishlist-do').innerHTML = viewingMember.wish_do
    document.getElementById('wishlist-learn').innerHTML = viewingMember.wish_learn
    document.getElementById('wishlist-eat').innerHTML = viewingMember.wish_eat
})
