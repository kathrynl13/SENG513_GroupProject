function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true,
  })
}
const host = 'http://localhost:8800'

//                          *** Members Routes ***
const membersPath = host + '/members'
define('find_all_members', membersPath + '/messages/')
define('find_member_byID', membersPath + '/find-member/:id')
define('find_member_byUsername', membersPath + '/find_member_byUsername/')
define('find_member_bygroupIDs', membersPath + '/find-member/:groupIDs')
define('create_member', membersPath + '/create_member')
define('update_member', membersPath + '/update_member')
define('update_wishlist', membersPath + '/update_wishlist/:id')

//                          *** Groups Routes ***
const groupsPath = host + '/groups'
define('find_all_groups', groupsPath + "'/'")
define('find_group_byID', groupsPath + '/find-group/:id')
define('find_group_byJoinCode', groupsPath + '/find_group_byJoinCode/') // make sure the anmea re right and teh slashes are right
define('create_group', groupsPath + '/create_group')
define('update_group_byId', groupsPath + '/update_group/:id')
define('update_groupRules', groupsPath + '/update_groupRules/:id')

//                          *** Messages Routes ***
const messagesPath = host + '/messages'
define('find_all_messages', host + "'/'")
define('find_toMemberId_message', messagesPath +
  '/find_toMemberId_message/:toMemberId')
define('find_fromMemberId_message', messagesPath +
  '/find_fromMemberId_message/:fromMemberId')
define('create_message', messagesPath + '/create_message/:fromMemberId')

/*                   -----  Front-End Use Example  -----
import axios from 'axios'       // or const axios = require('axios') in server.js
import {
  find_all_messages,
  find_toMemberId_message,
  create_message,
} from './API.routes'          // or const APIs = require('./APIs.routes.js') in server.js


// Call  APIs
axios
        .get(find_all_messages )
        .then((res) => console.log(" Messages list" + res.data )) 
        .catch((res) => console.log(" Couldn't find Messages"+ res.data))
axios
        .get(find_toMemberId_message + toMemberId)
        .then((res) => console.log(" toMemberId_message" + res.data )) 
        .catch((res) => console.log(" Couldn't find game"+ res.data))
axios
        .post(create_message + fromMemberId, message)
        .then((res) => {
         (" Message created !" )
        })
        .catch((res) => console.log(res.data + "Couldn't create Message"))

*/
