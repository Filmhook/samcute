import React from 'react'
import {View} from 'react-native'
import Messagesection from '../ChatInbox/MessageSection/MessageSection';
import Msgfooterroot from '../ChatInbox/MessageFooter/MessageFooterRoot/MessageFooterRoot';
import Chatinputscreenheadder from '../ChatInbox/InboxHeader/inboxheadderroot';


export default function Chatinputscreen({route}) {
      console.log(route.params.data);

  return (
    < >
          <Chatinputscreenheadder />
          <Messagesection />
          <Msgfooterroot />
    </>
  )
}