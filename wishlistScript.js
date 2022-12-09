let memberID = 1 //anne - in cookie value 
//let memberID = 2 //jake - in cookie value 
var thisMember;

//const socket = io.connect("http://localhost:5000");
const socket = io('http://localhost:5000')

socket.emit('member-information-request', memberID)

socket.on('member-information-reply', member =>{
        document.getElementById('wishlist-want').innerHTML = member.wish_want  
        document.getElementById('wishlist-need').innerHTML = member.wish_need
        document.getElementById('wishlist-wear').innerHTML = member.wish_wear
        document.getElementById('wishlist-do').innerHTML = member.wish_do
        document.getElementById('wishlist-eat').innerHTML = member.wish_eat
        document.getElementById('wishlist-learn').innerHTML = member.wish_learn
        thisMember = member
})

document.getElementById('edit-wishlist-button').addEventListener('click', function(){
    document.getElementById('wishlist-want-input').style.display = "block"
    document.getElementById('wishlist-need-input').style.display = "block"
    document.getElementById('wishlist-wear-input').style.display = "block"
    document.getElementById('wishlist-do-input').style.display = "block"
    document.getElementById('wishlist-eat-input').style.display = "block"
    document.getElementById('wishlist-learn-input').style.display = "block"
    document.getElementById('wishlist-want').style.display = "none"
    document.getElementById('wishlist-need').style.display = "none"
    document.getElementById('wishlist-wear').style.display = "none"
    document.getElementById('wishlist-do').style.display = "none"
    document.getElementById('wishlist-eat').style.display = "none"
    document.getElementById('wishlist-learn').style.display = "none"
    document.getElementById('edit-wishlist-button').style.display = "none"
    document.getElementById('submit-wishlist-button').style.display = "block"
})

document.getElementById('submit-wishlist-button').addEventListener('click', function(){
    document.getElementById('wishlist-want-input').style.display = "none"
    document.getElementById('wishlist-need-input').style.display = "none"
    document.getElementById('wishlist-wear-input').style.display = "none"
    document.getElementById('wishlist-do-input').style.display = "none"
    document.getElementById('wishlist-eat-input').style.display = "none"
    document.getElementById('wishlist-learn-input').style.display = "none"
    document.getElementById('wishlist-want').style.display = "block"
    document.getElementById('wishlist-need').style.display = "block"
    document.getElementById('wishlist-wear').style.display = "block"
    document.getElementById('wishlist-do').style.display = "block"
    document.getElementById('wishlist-eat').style.display = "block"
    document.getElementById('wishlist-learn').style.display = "block"
    document.getElementById('edit-wishlist-button').style.display = "block"
    document.getElementById('submit-wishlist-button').style.display = "none"
    //get the updates 
    let want = document.getElementById('wishlist-want-input').value
    if(want !== ""){
        document.getElementById('wishlist-want').innerHTML = want
        thisMember.wish_want = want
    }
    let need = document.getElementById('wishlist-need-input').value
    if(need !== ""){
        document.getElementById('wishlist-need').innerHTML = need
        thisMember.wish_need = need
    }
    let wear = document.getElementById('wishlist-wear-input').value
    if(wear !== ""){
        document.getElementById('wishlist-wear').innerHTML = wear
        thisMember.wish_wear = wear
    }
    let todo = document.getElementById('wishlist-do-input').value
    if(todo !== ""){
        document.getElementById('wishlist-do').innerHTML = todo
        thisMember.wish_todo = todo
    }
    let eat = document.getElementById('wishlist-eat-input').value
    if(eat !== ""){
        document.getElementById('wishlist-eat').innerHTML = eat
        thisMember.wish_eat = eat
    }
    let learn = document.getElementById('wishlist-learn-input').value
    if(learn !== ""){
        document.getElementById('wishlist-learn').innerHTML = learn
        thisMember.wish_learn = learn
    }
    socket.emit('member-information-update', thisMember)
})