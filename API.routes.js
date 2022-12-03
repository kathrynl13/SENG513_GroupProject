export const host = 'http://localhost:8800'

//                          *** Members Routes ***
const membersPath = host + '/members'
export const find_all_members = membersPath + "'/messages/'"
export const find_member_byID = membersPath + '/find-member/:id'
export const find_member_bygroupIDs = membersPath + '/find-member/:groupIDs'
export const create_member = membersPath + '/create_member'
export const update_member = membersPath + '/update_member'

//                          *** Groups Routes ***
const groupsPath = host + '/groups'
export const find_all_groups = groupsPath + "'/'"
export const find_group_byID = groupsPath + '/find-group/:id'
export const find_group_byJoinCode = groupsPath + '/find-group/:joinCode'
export const create_group = groupsPath + '/create_group'
export const update_group_byId = groupsPath + '/update_group/:id'

//                          *** Messages Routes ***
const messagesPath = host + '/messages'
export const find_all_messages = host + "'/'"
export const find_toMemberId_message =
  messagesPath + '/find_toMemberId_message/:toMemberId'
export const find_fromMemberId_message =
  messagesPath + '/find_fromMemberId_message/:fromMemberId'
export const create_message = messagesPath + '/create_message/:fromMemberId'

/*                   -----  Front-End Use Example  -----
import axios from 'axios'       // Import axios
import {
  find_all_messages,
  find_toMemberId_message,
  create_message,
} from './API.routes'          // Import APIs

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
