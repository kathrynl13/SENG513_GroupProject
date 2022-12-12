let memberID = getCookie('memberid')

const wishDetails = {
  wish_want: 'unknown',
  wish_need: 'unknown',
  wish_eat: 'unknown',
  wish_do: 'unknown',
  wish_wear: 'unknown',
  wish_learn: 'unknown',
}

const socket = io('http://localhost:5000')

socket.emit('member-information-request', memberID)

socket.on('member-information-reply', (member) => {
  console.log('member %%%', member)
  if (member) {
    document.getElementById('wishlist-want').innerHTML =
      member.wishDetails.wish_want
    document.getElementById('wishlist-need').innerHTML =
      member.wishDetails.wish_need
    document.getElementById('wishlist-wear').innerHTML =
      member.wishDetails.wish_wear
    document.getElementById('wishlist-do').innerHTML =
      member.wishDetails.wish_do
    document.getElementById('wishlist-eat').innerHTML =
      member.wishDetails.wish_eat
    document.getElementById('wishlist-learn').innerHTML =
      member.wishDetails.wish_learn
    wishDetails.wish_want = member.wishDetails.wish_want
    wishDetails.wish_need = member.wishDetails.wish_need
    wishDetails.wish_eat = member.wishDetails.wish_eat
    wishDetails.wish_do = member.wishDetails.wish_do
    wishDetails.wish_wear = member.wishDetails.wish_wear
    wishDetails.wish_learn = member.wishDetails.wish_learn
  }
})

document
  .getElementById('edit-wishlist-button')
  .addEventListener('click', function () {
    document.getElementById('wishlist-want-input').style.display = 'block'
    document.getElementById('wishlist-need-input').style.display = 'block'
    document.getElementById('wishlist-wear-input').style.display = 'block'
    document.getElementById('wishlist-do-input').style.display = 'block'
    document.getElementById('wishlist-eat-input').style.display = 'block'
    document.getElementById('wishlist-learn-input').style.display = 'block'
    document.getElementById('wishlist-want').style.display = 'none'
    document.getElementById('wishlist-need').style.display = 'none'
    document.getElementById('wishlist-wear').style.display = 'none'
    document.getElementById('wishlist-do').style.display = 'none'
    document.getElementById('wishlist-eat').style.display = 'none'
    document.getElementById('wishlist-learn').style.display = 'none'
    document.getElementById('edit-wishlist-button').style.display = 'none'
    document.getElementById('submit-wishlist-button').style.display = 'block'
  })

document
  .getElementById('submit-wishlist-button')
  .addEventListener('click', function () {
    document.getElementById('wishlist-want-input').style.display = 'none'
    document.getElementById('wishlist-need-input').style.display = 'none'
    document.getElementById('wishlist-wear-input').style.display = 'none'
    document.getElementById('wishlist-do-input').style.display = 'none'
    document.getElementById('wishlist-eat-input').style.display = 'none'
    document.getElementById('wishlist-learn-input').style.display = 'none'
    document.getElementById('wishlist-want').style.display = 'block'
    document.getElementById('wishlist-need').style.display = 'block'
    document.getElementById('wishlist-wear').style.display = 'block'
    document.getElementById('wishlist-do').style.display = 'block'
    document.getElementById('wishlist-eat').style.display = 'block'
    document.getElementById('wishlist-learn').style.display = 'block'
    document.getElementById('edit-wishlist-button').style.display = 'block'
    document.getElementById('submit-wishlist-button').style.display = 'none'
    //get the updates
    let want = document.getElementById('wishlist-want-input').value
    if (want !== '') {
      document.getElementById('wishlist-want').innerHTML = want
      wishDetails.wish_want = want
    }
    let need = document.getElementById('wishlist-need-input').value
    if (need !== '') {
      document.getElementById('wishlist-need').innerHTML = need
      wishDetails.wish_need = need
    }
    let wear = document.getElementById('wishlist-wear-input').value
    if (wear !== '') {
      document.getElementById('wishlist-wear').innerHTML = wear
      wishDetails.wish_wear = wear
    }
    let todo = document.getElementById('wishlist-do-input').value
    if (todo !== '') {
      document.getElementById('wishlist-do').innerHTML = todo
      wishDetails.wish_do = todo
    }
    let eat = document.getElementById('wishlist-eat-input').value
    if (eat !== '') {
      document.getElementById('wishlist-eat').innerHTML = eat
      wishDetails.wish_eat = eat
    }
    let learn = document.getElementById('wishlist-learn-input').value
    if (learn !== '') {
      document.getElementById('wishlist-learn').innerHTML = learn
      wishDetails.wish_learn = learn
    }

    socket.emit('member-wishlist-update', { wish: wishDetails, id: memberID })
  })

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
}
/////////////////////////end of cited code//////////////////////////////////////
