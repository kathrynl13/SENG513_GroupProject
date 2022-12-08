// for createaccount
const socket = io.connect("http://localhost:5000");

// to go back to home page
backButton.addEventListener('click', function() {
    window.location.href = "index.html";
})

// when user clicks create account
createButton.addEventListener('click', function() {

    // check all fields are entered
    if (fname.value == "" ||
        lname.value == "" ||
        email.value == "" ||
        newusername.value == "" ||
        newpassword.value == "") {
            alert("Please fill in all fields!");
            return;
        }

    // user object
    const newUser = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        username: newusername.value,
        password: newpassword.value
    };
    // console.log("SDFSDF", newUser);
    socket.emit("newAccount", newUser);

    // redirect back home to log in
    alert("Your account has been created! Return to the homepage to log in.");
})
