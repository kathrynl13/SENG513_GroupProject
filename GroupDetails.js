const socket = io.connect("http://localhost:5000");
var memberID = getCookie('memberid')
var groupID = getCookie('groupid')

var secretSanta = document.getElementById("SecretSanta").innerHTML,
    groupName = document.getElementById("GroupName").innerHTML,
    priceLimit = document.getElementById("PriceLimit").innerHTML;

var thisGroup;

$(document).ready(function(){
    $('input').hide();
    $('#doneEdit').hide();
    // display text according to the person logged in
});

// emit to server to get group info
console.log("groupID" + groupID)
socket.emit('group-information-request', groupID);
console.log(groupID)

changeGroupDetails.addEventListener("click", () => {
    $("input").show();
    $('#doneEdit').show();
    $("#changeGroupDetails").hide();
    $('#PriceLimit, #DueDate, #GroupName').hide();

    // pre fill the inputs
    $('#nameinput').val($('#GroupName').text());
    $('#priceinput').val($('#PriceLimit').text());
    $('#dateinput').val($('#DueDate').text());
})

doneEdit.addEventListener("click", () => {
    $("input").hide();
    $('#doneEdit').hide();
    $("#changeGroupDetails").show();
    $('#PriceLimit, #DueDate, #GroupName').show();

    // update display text
    $('#GroupName').text(nameinput.value);
    $('#DueDate').text(dateinput.value);
    $('#PriceLimit').text(priceinput.value);


    // update group object
    thisGroup.groupName = nameinput.value;
    thisGroup.priceLimit = priceinput.value;
    thisGroup.dueDate = dateinput.value;
    console.log(thisGroup);
    
    // UPDATE group TO SERVER
    socket.emit('group-information-update', {groupObject:thisGroup, id:groupID});
})


// changing the display html
socket.on('group-information-reply', group => {
    thisGroup = group;
    document.getElementById("GroupName").innerHTML = group.groupName;
    document.getElementById("PriceLimit").innerHTML = group.priceLimit;
    document.getElementById("createdOn").innerHTML = Date(group.createdAt);
    document.getElementById("joinCode").innerHTML = group.joinCode;
    document.getElementById("DueDate").innerHTML = Date(group.dueDate);
    console.log("group created by: "+group.createdBy)
    if(group.createdBy != memberID){
        document.getElementById("drawNames").style.display = 'none'
    } 
})


////////////////////IMPLEMENTING THE DRAWING NAMES/////////////////////////////////////////////
var groupMembers = []
let choosenMembers = [];     //contains members that have already been choosen for a gift 
let rulesList = {}
let memberObjectArray = []
let numberOfReplies = 0; 
let intialMember = true
let gotBuying = true

socket.on('group-information-reply', group => {
    groupMembers = group.groupMembers
    rulesList = group.groupRules
})

document.getElementById('drawNames').addEventListener('click', function(){
    initiateDraw()
})

///SETTING SECRET SANTA HTML ELEMENT 
socket.emit('member-information-request', memberID)
socket.on('member-information-reply', member =>{
    console.log('received a reply')
    if((intialMember == true) && (gotBuying == true)){
        let myGroupArray = member.myGroups
        let groupPostionNumber = 0
        for(let j = 0; j < myGroupArray.length; j++){
            if(groupID == myGroupArray[j]){
                console.log("group postion is: " + j)
                groupPostionNumber = j
            }
        }
        console.log("hello i am :" + member.firstName)
        let buyingForID = member.buysFor
        socket.emit('member-information-request', buyingForID[groupPostionNumber])
        intialMember = false
    }else if((intialMember == false) && (gotBuying == true)){
        console.log("hi im present recieve " + member.firstName)
        let buyingName = member.firstName
        document.getElementById("SecretSanta").innerHTML = buyingName
        gotBuying = false
        setMemberInformation()
    }
})


function initiateDraw(){
    choosenMembers = [];
    for(let i = 0; i < groupMembers.length; i++){
        let checker = true
        let maxCounter = 0
        while(checker){
            maxCounter++
            if(maxCounter > 100){
                break;
            }
            let choiceNumber = Math.floor(Math.random() * 100) % groupMembers.length
            let mChoosen = groupMembers[choiceNumber]
            //you cannot choose yourself
            if(mChoosen != groupMembers[i]){
                let ticker = true
                //you cannot choose someone inside your rules 
                let cannotBuy = Object.values(rulesList)[i]
                if(cannotBuy != undefined){
                    for(let j = 0; j < cannotBuy.length;j++){
                        let tempMember = Object.values(rulesList)[i]
                        if(tempMember[j] == mChoosen){
                            ticker = false
                            break;
                        }
                    }
                }
                if(ticker == true){
                    //you cannot choose someone who is already choosen 
                    let alreadyTaken = false
                    for(let j = 0; j < choosenMembers.length; j++){
                        if(mChoosen == choosenMembers[j]){
                            alreadyTaken = true
                            break
                        }
                    }
                    if(alreadyTaken == false){
                        //then this is free set member 
                        console.log(groupMembers[i] + " buys for " + mChoosen)
                        choosenMembers.push(mChoosen)
                        console.log("choose members: " + choosenMembers)
                        checker = false;
                    }
                }
            }
        }
        //then edge case we are stuck in infinate loop 
        if(maxCounter > 100){
            console.log("edge case redo!")
            initiateDraw()
            break;
        }
    }
    updateMemberInformation()
}
function setMemberInformation(){
    console.log("setting member information")
    for(let i = 0; i < groupMembers.length; i++){
        socket.emit('member-information-request', groupMembers[i])
    }
}

socket.on('member-information-reply', member =>{
    if(intialMember == false && gotBuying == false){
        for(let i = 0; i < groupMembers.length; i++){
            if(groupMembers[i] == member._id){
                memberObjectArray[i] = member
                //console.log("setting member: " + member.firstName)
                break
            }
        }
    }
})

function updateMemberInformation(){
    console.log("updating member info")
    for(let i = 0; i < groupMembers.length; i++){
        let currentMember = memberObjectArray[i]
        console.log("currentMember: " + currentMember)
        let groupArray = currentMember.myGroups
        console.log("I " + currentMember.firstName + " am in " + groupArray)
        let groupPostionNumber = 0
        for(let j = 0; j < groupArray.length; j++){
            if(groupID == groupArray[j]){
                console.log("group postion is: " + j)
                groupPostionNumber = j
            }
        }
        let currentBuyFor = currentMember.buysFor
        currentBuyFor[groupPostionNumber] = choosenMembers[i]
        console.log(currentMember._id + " buys for "+ choosenMembers[i])
        currentMember.buysFor = currentBuyFor

        let currentMySanta = currentMember.mySanta

        let tempHolder = ""
        for(let j = 0; j < groupMembers.length; j++){
            if(choosenMembers[j] == currentMember._id){
                tempHolder = groupMembers[j]
            }
        }
        currentMySanta[groupPostionNumber] = tempHolder
        currentMember.mySanta = currentMySanta

        let currentMemberID = currentMember._id
        socket.emit("member-information-update", {memberObject:currentMember, id:currentMemberID});
    }
}







///////////////////////// https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie/////////////////////////////
function getCookie(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}
  /////////////////////////end of cited code//////////////////////////////////////