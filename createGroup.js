const socket = io.connect("http://localhost:5000");

let memberID = getCookie('memberid')


const updateButton = document.getElementById('updateButton')
const cancelButton = document.getElementById('cancelButton')
const aName = document.getElementById('Name')
const aDueDate = document.getElementById('DueDate')
const aPriceLimit = document.getElementById('PriceLimit')

updateButton.addEventListener('click', updateClicked);

cancelButton.addEventListener('click', cancelClicked);

//addRuleButton.addEventListener('click', addRuleClicked);

function updateClicked(e){
    if ((aPriceLimit.value == "") || (aName.value == "") || (aDueDate.value == "")){
        alert("Field cannot be empty");
        return;
    }

    socket.emit("GroupInfoInputted", Name.value, PriceLimit.value, DueDate.value, memberID);
    console.log(Name + " " + PriceLimit + " " + DueDate);
}

function cancelClicked(e){
    alert("Discard group?");
    window.location.href="SantaGroups.html";
}

/* function addRuleClicked(e){
    if (rulePerson1.value == "" || rulePerson2.value == ""){
        alert("Field cannot be empty");
    }

    socket.emit("rulesInputted", rulePerson1.value);
    socket.emit(rulePerson2.value);
    console.log(rulePerson1 + " " + rulePerson2);
} */

socket.on("groupCreated", (code) => {
    console.log("creatGroup.js code", code);
    alert("Your group has been successfully created. Your join code is: "+code);
    window.location.href="SantaGroups.html";
})

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