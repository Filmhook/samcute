import { View, Text } from 'react-native'
import React from 'react'
import Profilephoto from './ProfilePhoto/ProfilePhoto'
import Thememode from './ThemeMode/ThemeMode'
import Activestatus from './ActiveStatus/ActiveStatus'
import Blockedchats from './BlockedChats/BlockedChats'
import Neartome from './NearToMe/NearToMe'
import Userid from './UserId/UserId'


export default function ProfileModalRoot() {
  return (
  <> 
     <View>
        <Profilephoto />
        <Thememode />
        <Activestatus />
        <Blockedchats />
        <Neartome />
        <Userid />
     </View>
  </>
  )
}