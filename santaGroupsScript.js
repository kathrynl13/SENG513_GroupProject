var memberID = getCookie('memberid')
var groupID;
var groupArray
let numberOfGroups = 0
let groupCounter = 1

const socket = io('http://localhost:5000')

socket.emit('member-information-request', memberID)

socket.on('member-information-reply', (member) => {
  if (member) {
    groupArray = member.myGroups //array of group ID the member is apart of
    setCookie('groupid', groupArray[0])
    groupID = groupArray[0]
    numberOfGroups = groupArray.length
    showGroupList(numberOfGroups)
    updateNamesAndCode(groupArray)
  } else {
    console.log('Could not get member data')
  }
})

function showGroupList(numberOfGroups) {
  for (var i = 4; i > 4 - (4 - numberOfGroups); i--) {
    //set the number of boxes
    var temp = 'group' + i
    document.getElementById(temp).style.display = 'none'
  }
}

function updateNamesAndCode(myGroups) {
  for (let i = 0; i < myGroups.length; i++) {
    let groupID = myGroups[i]
    socket.emit('group-information-request', groupID)
  }
}

socket.on('group-information-reply', (group) => {
  var tempName = 'name' + groupCounter
  var tempCode = 'code' + groupCounter
  console.log('got something back: ' + group._id)
  let groupName = group.groupName
  document.getElementById(tempName).innerHTML = groupName
  let groupCode = group.joinCode
  document.getElementById(tempCode).innerHTML = groupCode
/*   let org = group.organizerID
  var tempMember = 'member' + groupCounter
  var tempEdit = 'edit' + groupCounter */
  var tempGroupID = 'groupid' + groupCounter
  document.getElementById(tempGroupID).innerHTML = group._id
  //check for coordinator - phased out
/*   if (org == memberID) {
    document.getElementById(tempEdit).style.display = 'block'
    document.getElementById(tempMember).style.display = 'none'
  } else {
    document.getElementById(tempEdit).style.display = 'none'
    document.getElementById(tempMember).style.display = 'block'
  }  */
  groupCounter = groupCounter + 1
})



document.getElementById('group1').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid1').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
  window.location.href = 'GroupDetails.html'
})
document.getElementById('group2').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid2').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
  window.location.href = 'GroupDetails.html'
})
document.getElementById('group3').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid3').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
  window.location.href = 'GroupDetails.html'
})
document.getElementById('group4').addEventListener('click', function () {
  eraseCookie('groupid')
  let selectedGroupID = document.getElementById('groupid4').innerHTML
  groupID = selectedGroupID
  setCookie('groupid', selectedGroupID, 20)
  document.getElementById('selectedAlert').style.display = 'block'
  window.location.href = 'GroupDetails.html'
})

function redirect() {
  window.location.href = 'createorjoingroup.html'
}

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