const socket = io.connect('http://localhost:5000')
const memberID = 1 //anne - in cookie value

var cancelButton = document.getElementById('cancelButton'),
  addRuleButton = document.getElementById('addRuleButton')

updateButton.addEventListener('click', updateClicked)

cancelButton.addEventListener('click', cancelClicked)

addRuleButton.addEventListener('click', addRuleClicked)
var ruleId = 0

function rulesFilled(array) {
  var filled = true
  for (let i = 0; i < array.length; i++) {
    let buyer = array[i].children[0].value
    let boughtFor = array[i].children[2].value
    console.log(
      'buyer',
      buyer.length,
      'boughtFor',
      boughtFor.length,
      ' ',
      buyer.length == 0 || boughtFor.length == 0,
    )
    if (
      (buyer.length == 0 && boughtFor.length > 0) ||
      (buyer.length > 0 && boughtFor.length == 0)
    ) {
      console.log('buyer', buyer, 'boughtFor', boughtFor)
      filled = false
      break
    }
  }
  console.log('filled', filled)
  return filled
}

function groupDetailsFilled(name, dueDate, priceLimit) {
  var filled = name.length > 0 && dueDate.length > 0 && priceLimit.length > 0
  console.log(
    'name1 ',
    name,
    ' dueDate1 ',
    dueDate,
    ' priceLimit1',
    priceLimit,
    ' == ',
    filled,
  )
  return filled
}

function updateClicked(e) {
  // The rules <div</>
  const array = document.getElementById('rules').children

  const groupName = GroupName.value
  const priceLimit = PriceLimit.value
  const dueDate = DueDate.value

  if (
    groupDetailsFilled(groupName, dueDate, priceLimit) &&
    rulesFilled(array)
  ) {
    console.log(
      'groupName: ' +
        groupName +
        ' dueDate: ' +
        dueDate +
        ' priceLimit: ' +
        priceLimit,
    )
    socket.emit('GroupInfoInputted', groupName, dueDate, priceLimit)

    socket.on('groupCreated', (response_msg) => {
      let status = response_msg[0]
      let status_msg = response_msg[1]
      console.log(status_msg)
      if (status == 1) {
        window.location.href = 'SantaGroups.html'
      } else if (status == 0) {
        alert('Invalid input(s)')
      } else {
        console.log('Odd error')
      }
    })

    for (let i = 0; i < array.length; i++) {
      let buyer = array[i].children[0].value
      let boughtFor = array[i].children[2].value
      console.log('buyer', buyer, 'boughtFor', boughtFor)
    }

    // socket.emit('rulesInputted', array)
  } else {
    alert("Missing mandatory fields!\nPlease fill in group's details.")
    return
  }
}

function cancelClicked(e) {
  alert('Discard group?')
  window.location.href = 'SantaGroups.html'
}

function addRuleClicked(e) {
  ruleId++

  var form = document.getElementById('rules')
  var rule1 = document.createElement('div')
  rule1.style = 'block'
  form.appendChild(rule1)

  var input1 = document.createElement('input')
  input1.type = 'text'
  input1.className = 'rulePerson1'
  input1.id = 'Person' + ruleId
  input1.name = 'rules'
  rule1.appendChild(input1)

  var label = document.createElement('label')
  label.className = 'ruleLabel'
  label.id = 'rule1Label'
  label.style.color = '#F92545'
  label.textContent = 'Cannot buy gift for'
  rule1.appendChild(label)
  ruleId++
  var input2 = document.createElement('input')
  input2.type = 'text'
  input2.className = 'rulePerson2'
  input2.id = 'Person' + ruleId
  input2.name = 'rules'
  rule1.appendChild(input2)
}
