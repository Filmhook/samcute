/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

import handleincomingvideoCall from './notification';
import { navigate } from './components/NavigationService';
import notifee, { AndroidCategory, AndroidImportance, AndroidLaunchActivityFlag, AndroidVisibility, EventType, TimeUnit } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  notifee.cancelTriggerNotifications()
  handleincomingvideoCall(remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  notifee.cancelTriggerNotifications()

  if (remoteMessage.data.channelNameFromNotify === 'acceptType') {
    handleincomingvideoCall(remoteMessage)
  }
});

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => async (remoteMessage) => {

  console.log('Message handled in the background!', remoteMessage);

});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.ACTION_PRESS:

      if (detail.pressAction.id === 'answer') {
        var incomingCallData = detail.notification.data;
        const UID = await AsyncStorage.getItem('id');

        if (incomingCallData.callType === 'video') {
          navigate('Tabbar', {
            screen: 'Chat',
            params: {
              screen: 'VideoCallingScreen',
              params: {
                remoteUserId: parseInt(incomingCallData.userId),
                userName: incomingCallData.fromUser,
                loggedUserId: UID,
                channelToken: incomingCallData.channelToken,
                channelNameFromNotify: incomingCallData.channelNameFromNotify
              },
            },
          });         

        } else {
          navigate('Tabbar', {
            screen: 'Chat',
            params: {
              screen: 'VoiceCalling',
              params: {
                remoteUserId: parseInt(incomingCallData.userId),
                userName: incomingCallData.fromUser,
                loggedUserId: UID,
                channelToken: incomingCallData.channelToken,
                channelNameFromNotify: incomingCallData.channelNameFromNotify
  
              },
            },
          });       
        }
        notifee.cancelAllNotifications()
      } else if (detail.pressAction.id === 'reject') {
        var incomingCallData = detail.notification.data;
        try {
          const res = await privateAPI.post('/chat/send-fcm-message', {
            token: incomingCallData.channelToken,
            userName: "",
            callType: incomingCallData.callType,
            userId: "",
            channelName: 'rejectType',
            channelToken: ""
          });
          console.log('calling reject status!', res.data);
        } catch (error) {
          console.error('FCM Sedn Error', error);
        }
      } else if (detail.pressAction.id == "waiting") {

      }

      break;
  }
});

