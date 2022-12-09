setCookie('groupid', 1, 20)
setCookie('memberid', 1, 20)

var memberID = getCookie('memberid')
var groupID = getCookie('groupid')
var groupArray
let numberOfGroups = 0
let groupCounter = 1

const socket = io('http://localhost:5000')

socket.emit('member-information-request', memberID)

socket.on('member-information-reply', (member) => {
  groupArray = member.groupID //array of group ID the member is apart of
  numberOfGroups = groupArray.length
  showGroupList(numberOfGroups)
  updateNamesAndCode(numberOfGroups)
})

function showGroupList(numberOfGroups) {
  for (var i = 4; i > 4 - (4 - numberOfGroups); i--) {
    //set the number of boxes
    var temp = 'group' + i
    document.getElementById(temp).style.display = 'none'
  }
}

function updateNamesAndCode(numGroups) {
  for (let i = 1; i <= numGroups; i++) {
    let groupID = groupArray[i - 1]
    socket.emit('group-information-request', groupID)
  }
}

socket.on('group-information-reply', (group) => {
  var tempName = 'name' + groupCounter
  var tempCode = 'code' + groupCounter
  console.log('got something back: ' + group.groupID)
  let groupName = group.groupName
  document.getElementById(tempName).innerHTML = groupName
  let groupCode = group.joinCode
  document.getElementById(tempCode).innerHTML = groupCode
  //check for coordinator
  let org = group.organizerID
  var tempMember = 'member' + groupCounter
  var tempEdit = 'edit' + groupCounter
  var tempGroupID = 'groupid' + groupCounter
  document.getElementById(tempGroupID).innerHTML = group.groupID
  if (org == memberID) {
    document.getElementById(tempEdit).style.display = 'block'
    document.getElementById(tempMember).style.display = 'none'
  } else {
    document.getElementById(tempEdit).style.display = 'none'
    document.getElementById(tempMember).style.display = 'block'
  }
  groupCounter = groupCounter + 1
})

///////////////////////// https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie/////////////////////////////
function setCookie(name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
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
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}
/////////////////////////end of cited code//////////////////////////////////////

document.getElementById('name1').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid1').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
})
document.getElementById('name2').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid2').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
})
document.getElementById('name3').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid3').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
})
document.getElementById('name4').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid4').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
})

function redirect() {
  window.location.href = 'createorjoingroup.html'
}
