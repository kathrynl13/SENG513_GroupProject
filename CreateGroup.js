const updateButton = document.getElementById('updateButton'),
    cancelButton = document.getElementById('cancelButton'),
    addRuleButton = document.getElementById('addRuleButton');
    
updateButton.addEventListener('click', updateClicked);

cancelButton.addEventListener('click', cancelClicked);

addRuleButton.addEventListener('click', addRuleClicked);

function updateClicked(e){
    let groupForm = document.getElementById('createForm');
    groupForm.submit();
}

function cancelClicked(e){

}

function addRuleClicked(e){
    let rules = document.getElementById('rules');
    rules.submit();
}