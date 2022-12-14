// javascript file for the index.html homepage.

const login = document.getElementById('loginButton');
const about = document.getElementById('aboutButton');
const signUp = document.getElementById('signup');

const userInput = document.getElementById('username');
const passInput = document.getElementById('password');

const backButton = document.getElementById('backButton');

const socket = io.connect("http://localhost:5000");

about.addEventListener('click', function() {
    alert("Secret Santa is a Christmas tradition. Members of a group of friends, family, or coworkers draw random names to become someone’s Secret Santa. The Secret Santa is given a wish list of gift ideas to choose from to give to their chosen giftee. After opening their present, the giftee has to guess which member of the group was their Secret Santa.");
    //from https://www.elfster.com/content/secret-santa-rules/#:~:text=Members%20of%20a%20group%20of,group%20was%20their%20Secret%20Santa.
})

// when user clicks lgn, send user and pass to server
login.addEventListener('click', function() {

    if(userInput.value==""|passInput.value=="") {
        alert("Please enter a valid username and password.");
        return;
    }
    
    socket.emit("login", userInput.value, passInput.value);
    console.log(getCookie("user"));
})


socket.on('redirect', ()=> {
    window.location.href = "wishlist.html";
})

//the redirects everytime
socket.on('firsttimeredirect', (id)=> {
    setCookie("memberid", id);
    window.location.href = "santaGroups.html";
    //window.location.href = "createorjoingroup.html";
})

socket.on('loginfail', ()=> {
    alert("Login failed. Please try again.");
})

// cookies implementation

// sets a cookie with name and value
function setCookie(cname, cvalue) {
    document.cookie = cname+"="+cvalue+";"; // ex line=[hl1,hl2];
}

// gets the value of the cookie from parameter name
// referenced from https://www.w3schools.com/js/js_cookies.asp 
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie); // decode the cookie string
    let ca = decodedCookie.split(';'); // return list of string separated by ;
    for (let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length); // if cookie name is found, return it
        }
    }
    return "";
}

// check cookie runs on load to see if a cookie was stored, and restores the gamestate
function checkCookie() {
    let user = getCookie("user");
}
