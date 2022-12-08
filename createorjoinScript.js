// for createaccount
const socket = io.connect("http://localhost:5000");

// to go back to home page
backButtonj.addEventListener('click', function() {
    window.location.href = "index.html";
})

// when user clicke create group
createGroupBtn.addEventListener('click', function() {
    // link to createGroup.html
    window.location.href = "CreateGroup.html";
})

// when user clicks join group
joinGroupBtn.addEventListener('click', function() {
    // check that input is not empty
    if(joinGroupInp.value == "") {
        alert("Please enter an access code.");
        return;
    }

    // emit code to the server
    socket.emit("groupJoined", joinGroupInp.value);

    //GOTO PAGE
})

socket.on("joinfail", ()=> {
    alert("Failed to join group. Please try again.");
})