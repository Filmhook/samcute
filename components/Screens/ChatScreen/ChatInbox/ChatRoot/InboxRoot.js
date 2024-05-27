import React from 'react';
import {View} from 'react-native';
import Messagesection from '../MessageSection/MessageSection';
import Msgfooterroot from '../MessageFooter/MessageFooterRoot/MessageFooterRoot';
import Chatinputscreenheadder from '../InboxHeader/inboxheadderroot';

export default function Chatinputscreen({route}) {
  console.log(route.params.data);

  return (
    <>
      <Chatinputscreenheadder />
      <Messagesection />
      <Msgfooterroot />
    </>
  );
}
