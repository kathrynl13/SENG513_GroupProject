const socket = io.connect("http://localhost:5000");

const updateButton = document.getElementById('updateButton'),
    cancelButton = document.getElementById('cancelButton'),
    addRuleButton = document.getElementById('addRuleButton'),
    name = document.getElementById('Name');
    
updateButton.addEventListener('click', updateClicked);

cancelButton.addEventListener('click', cancelClicked);

addRuleButton.addEventListener('click', addRuleClicked);

function updateClicked(e){
    if (PriceLimit.value == "" || Name.value == "" || DueDate.value == ""){
        alert("Field cannot be empty");
        return;
    }

    socket.emit("GroupInfoInputted", Name.value, PriceLimit.value, DueDate.value);
    console.log(Name + " " + PriceLimit + " " + DueDate);
    window.location.href="SantaGroups.html";
}

function cancelClicked(e){
    alert("Discard group?");
    window.location.href="SantaGroups.html";
}

function addRuleClicked(e){
    if (rulePerson1.value == "" || rulePerson2.value == ""){
        alert("Field cannot be empty");
    }

    socket.emit("rulesInputted", rulePerson1.value);
    socket.emit(rulePerson2.value);
    console.log(rulePerson1 + " " + rulePerson2);
}
