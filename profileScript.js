var memberID = getCookie('memberid')

thisMember = {
    username: "unknown",
    firstName: "unknown",
    lastName: "unknown",
    email: "unknown",
    occupation: "unknown",
    birthDate: "MM/DD/YEAR"
}

const socket = io.connect("http://localhost:5000");

socket.emit('member-information-request', memberID)
socket.on('member-information-reply', member =>{
    document.getElementById('username').innerHTML = member.username
    thisMember.username = member.username
    document.getElementById('fname').innerHTML = member.firstName
    thisMember.firstName = member.firstName
    document.getElementById('lname').innerHTML = member.lastName
    thisMember.lastName = member.lastName
    document.getElementById('email').innerHTML = member.email
    thisMember.email = member.email
    document.getElementById('occupation').innerHTML = member.occupation
    thisMember.occupation = member.occupation
    document.getElementById('birthdate').innerHTML = member.birthDate
    thisMember.birthDate = member.birthDate
})

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
        thisMember.firstName =  fnamei.value
        thisMember.lastName = lnamei.value
        thisMember.birthDate = birthdatei.value
        thisMember.email = emaili.value
        thisMember.username = usernamei.value
        thisMember.occupation = occupationi.value

    console.log(thisMember.firstName)
    // emit to server the updated profile
    socket.emit("member-information-update", {memberObject:thisMember, id:memberID});

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