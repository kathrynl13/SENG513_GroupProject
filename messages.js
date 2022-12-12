var memberID = getCookie('memberid')

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
}/////////////////////////end of cited code//////////////////////////////////////

const socket = io.connect("http://localhost:3000");
socket.emit("load-messages", memberID);
console.log(memberID)

openChatUserButton = null;
openChatUser = null;

socket.on('known-user', userInfo => {
    const userbox = document.getElementById('users');
    const button = document.createElement('button');
    button.classList.add("btn");
    button.type = "submit";
    button.id = userInfo[0]
    button.innerHTML = userInfo[0];
    button.onclick = function() {openChat(userInfo[1], userInfo[0])};
    userbox.appendChild(button);
});

socket.on('unknown-user', userInfo => {
    const userbox = document.getElementById('users');
    const button = document.createElement('button');
    button.classList.add("btn");
    button.type = "submit";
    button.id = userInfo[0]
    button.innerHTML = userInfo[0] + " Santa";
    button.onclick = function() {openChat(userInfo[1], userInfo[0])};
    userbox.appendChild(button);
});

socket.on('message', message => {

    if (message.fromMemberId !== memberID) {
        const messagebox = document.getElementById('messageContainer');
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add("receivedMessage");
        const userProfilePicture = document.createElement('div');
        userProfilePicture.classList.add("userProfilePicture");
        const profileImage = document.createElement('img');
        profileImage.classList.add("profileImage");
        profileImage.src = "assets/bussiness-man.png";
        profileImage.alt = "profilepic";
        const receivedMessageWithProfilePicture = document.createElement('div');
        receivedMessageWithProfilePicture.classList.add("receivedMessageWithProfilePicture");
        const receivedMessageWidth = document.createElement('div');
        receivedMessageWidth.classList.add("receivedMessageWidth");
        const rMessage = document.createElement('p');
        rMessage.innerHTML = message.message;
        const rDateTime = document.createElement('span');
        tempDate = new Date(Date.parse(message.date))
        finalDate = tempDate.toLocaleString();
        rDateTime.innerHTML = finalDate;
        rDateTime.classList.add("dateTime");
        receivedMessageWidth.appendChild(rMessage);
        receivedMessageWidth.appendChild(rDateTime);
        receivedMessageWithProfilePicture.appendChild(receivedMessageWidth);
        userProfilePicture.appendChild(profileImage);
        receivedMessage.appendChild(userProfilePicture);
        receivedMessage.appendChild(receivedMessageWithProfilePicture);
        messagebox.appendChild(receivedMessage);
    }

    else {
        const messagebox = document.getElementById('messageContainer');
        const sentMessage = document.createElement('div');
        sentMessage.classList.add("sentMessage");
        const sentMessageWidth = document.createElement('div');
        sentMessageWidth.classList.add("sentMessageWidth");
        const sMessage = document.createElement('p');
        sMessage.innerHTML = message.message;
        const sDateTime = document.createElement('span');
        tempDate = new Date(Date.parse(message.date))
        finalDate = tempDate.toLocaleString();
        sDateTime.innerHTML = finalDate;
        sDateTime.classList.add("dateTime");
        sentMessageWidth.appendChild(sMessage);
        sentMessageWidth.appendChild(sDateTime);
        sentMessage.appendChild(sentMessageWidth);
        messagebox.appendChild(sentMessage);
    }
});

function sendMessage() {
    message = document.getElementById('newMessage').value;
    document.getElementById('newMessage').value = "";
    const utcDate = new Date();
    data = [utcDate, memberID, openChatUser, message];
    console.log(data)
    socket.emit("send-message", data);
}

function openChat(user, buttonID) {
    const enterMessageBox = document.getElementById("enterMessageBox");
    enterMessageBox.classList.remove('hidden');

    if (openChatUserButton != null) {
        oldButton = document.getElementById("clickedButton");
        oldButton.id = openChatUserButton;
    }

    openChatUser = user;
    openChatUserButton = buttonID;

    newButton = document.getElementById(buttonID);
    newButton.id = "clickedButton";

    const messageContainer = document.getElementById("messageContainer");
    while (messageContainer.firstChild) {
        messageContainer.removeChild(messageContainer.lastChild);
    }
    socket.emit("open-chat", [memberID, openChatUser]);
}

