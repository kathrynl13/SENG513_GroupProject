const updateButton = document.getElementById('updateButton'),
    cancelButton = document.getElementById('cancelButton');

updateButton.addEventListener('click', updateClicked);

cancelButton.addEventListener('click', cancelClicked);

function cancelClicked(e){
    
}

function updateClicked(e){
    let settingsForm = document.getElementById('settingsForm');
    settingsForm.submit();
}