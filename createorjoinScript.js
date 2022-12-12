//TEMP VALUE FOR COOKY
let memberID = getCookie('memberid')

// for createaccount
const socket = io.connect('http://localhost:5000')

// to go back to home page
backButtonj.addEventListener('click', function () {
  window.location.href = 'index.html'
})

// when user clicks create group
createGroupBtn.addEventListener('click', function () {
  // link to createGroup.html
  window.location.href = 'CreateGroup.html'
})

// when user clicks join group
joinGroupBtn.addEventListener('click', function () {
  // check that input is not empty
  if (joinGroupInp.value == '') {
    alert('Please enter an access code.')
    return
  }

  // emit code to the server
  socket.emit('groupJoined', joinGroupInp.value, memberID)
})

socket.on('joinfail', () => {
  alert('Failed to join group. Please try again.')
})

socket.on('redirecttosantagroups', (groupname) => {
  alert('You have succcessfully joined the group: ' + groupname)
  window.location.href = 'santagroups.html'
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
