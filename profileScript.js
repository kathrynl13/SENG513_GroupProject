const socket = io.connect("http://localhost:5000");

$(document).ready(function(){
    $('input').hide();
    $('#doneEdit').hide();

    // display text according to the person logged in
});

editProfile.addEventListener("click", () => {
    $('.inputDisplays').hide();
    $('input').show();
    $('#editProfile').hide();
    $('#doneEdit').show();

    // pre fill the inputs
    $('#usernamei').val($('#username').text());
    $('#fnamei').val($('#fname').text());
    $('#lnamei').val($('#lname').text());
    $('#emaili').val($('#email').text());
    $('#occupationi').val($('#occupation').text());
    $('#birthdatei').val($('#birthdate').text());  
})

doneEdit.addEventListener("click", ()=> {
    $('.inputDisplays').show();
    $('input').hide();
    $('#editProfile').show();
    $('#doneEdit').hide();

    // update the values
    $('#username').text(usernamei.value);
    $('#fname').text(fnamei.value);
    $('#lname').text(lnamei.value);
    $('#emaili').text(emaili.value);
    $('#occupation').text(occupationi.value);
    $('#birthdate').text(birthdatei.value);

    // create member object. error: there are some undefined
    var member = {
        firstName: fnamei.value,
        lastName: lnamei.value,
        age: birthdatei.value,
        email:emaili.value,
        username:usernamei.value,
        occupation:occupationi.value,
    }

    // emit to server the updated profile
    socket.emit("member-information-update", member);

})
