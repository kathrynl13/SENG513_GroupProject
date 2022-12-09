const socket = io.connect("http://localhost:5000");

const secretSanta = document.getElementById("SecretSanta").innerHTML,
    groupName = document.getElementById("GroupName").innerHTML,
    priceLimit = document.getElementById("PriceLimit").innerHTML;

// emit to server to get group info