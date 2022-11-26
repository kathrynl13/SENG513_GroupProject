let memberID = 1 //anne - in cookie value 
//let memberID = 2 //jake - in cookie value 
var thisMember;

const socket = io('http://localhost:5000')

socket.emit('member-information-request', memberID)