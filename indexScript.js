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

// when user clicks  lgn, send user and pass to server
login.addEventListener('click', function() {
    socket.emit("login", userInput.value, passInput.value);

    // find some way to check if this is the first time logging in???
})


