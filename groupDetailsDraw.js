var groupMembers = []
let choosenMembers = [];     //contains members that have already been choosen for a gift 
let rulesList = {}
let memberObjectArray = []
let numberOfReplies = 0; 
let intialMember = true
let gotBuying = true

socket.on('group-information-reply', group => {
    groupMembers = group.groupMembers
    //setMemberInformation()
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
/*                 let cannotBuy = Object.values(rulesList)[i]
                if(cannotBuy != undefined){
                    for(let j = 0; j < cannotBuy.length;j++){
                        let tempMember = Object.values(rulesList)[i]
                        if(tempMember[j] == mChoosen){
                            ticker = false
                            break;
                        }
                    }
                } */
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





