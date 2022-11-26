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
    }
    let need = document.getElementById('wishlist-need-input').value
    if(need !== ""){
        document.getElementById('wishlist-need').innerHTML = need
    }
    let wear = document.getElementById('wishlist-wear-input').value
    if(wear !== ""){
        document.getElementById('wishlist-wear').innerHTML = wear
    }
    let todo = document.getElementById('wishlist-do-input').value
    if(todo !== ""){
        document.getElementById('wishlist-do').innerHTML = todo
    }
    let eat = document.getElementById('wishlist-eat-input').value
    if(eat !== ""){
        document.getElementById('wishlist-eat').innerHTML = eat
    }
    let learn = document.getElementById('wishlist-learn-input').value
    if(learn !== ""){
        document.getElementById('wishlist-learn').innerHTML = learn
    }
})