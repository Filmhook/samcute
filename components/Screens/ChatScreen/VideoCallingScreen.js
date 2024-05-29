import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native'; // Import useRoute hook
import privateAPI from '../../api/privateAPI';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG ,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import messaging from '@react-native-firebase/messaging';

export default function VideoCallingScreen({navigation}) {
  const config = {
    appId: 'e0580e01a75e494db4c54b3f3e050bf2',
    channelName: 'demoApp',
    token:
      '007eJxTYNCavHzqlrxnDBO7t5fGbjtnKS0/weSA49621olit6PeeyYpMKQamFoYpBoYJpqbpppYmqQkmSSbmiQZpxkDJQyS0owMVzunNQQyMsy9JcjEyACBID47Q0pqbr5jQQEDAwCgDCAY',
  };

  const route = useRoute();
  const {loginedUsername, remoteUserId, userName, loggedUserId, channelToken} =
    route.params;
  const appId = config.appId;
  //    const [token, setToken] = useState(channelToken);
  //    const channelName = channelNameFromNotify ? channelNameFromNotify : ( randomchannelName);
  const [token, setToken] = useState(config.token);
  const channelName = config.channelName;

  console.log(
    'VIDEO CALLING SCREEN - ',
    loginedUsername,
    remoteUserId,
    userName,
    loggedUserId,
    channelToken,
  );

  const UserName = loginedUsername ? loginedUsername : userName;

  useEffect(() => {
    if (!channelToken) {
      GetFCMTokenOfRemoteUser();
    }
  }, []);

  const GetFCMTokenOfRemoteUser = async () => {
    console.log('Remote uUser', remoteUserId);
    try {
      const res = await privateAPI.get(
        `/chat/getFirebaseTokenByuserId?userId=${parseInt(remoteUserId)}`,
      );
      console.log('FCM of Remote user', res.data.data);
      SendCalligNotifcationToRemoteUser(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const SendCalligNotifcationToRemoteUser = async FCMToken => {
    const loogedUserToken = await messaging().getToken();

    try {
      const res = await privateAPI.post('/chat/send-fcm-message', {
        token: FCMToken,
        userName: loginedUsername,
        callType: 'video',
        userId: loggedUserId.toString(),
        channelName: 'acceptType',
        channelToken: loogedUserToken.toString(),
      });
      console.log('calling notification status!', res.data);
    } catch (error) {
      console.error('FCM Sedn Error', error);
    }
  };

  if (remoteUserId) {
    return (
      <View style={styles.container}>
        <Text>call</Text>
        <ZegoUIKitPrebuiltCall
          appID={86568963}
          appSign={
            '36cdde30bd0ab6eca6af412d454b7b199b21fa52a9645fce8b9a856eef165d45'
          }
          userID={
            channelToken
              ? remoteUserId.toString() + '123'
              : loggedUserId.toString()
          } // userID can be something like a phone number or the user id on your own user system.
          userName={userName}
          callID={
            channelToken ? remoteUserId.toString() : loggedUserId.toString()
          } // callID can be any unique string.
          config={{
            // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG ,
            onOnlySelfInRoom: () => {
              navigation.goBack();
            },
            onHangUp: () => {
              navigation.goBack();
            },
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.VideoCallWaitingScreen}>
        <View
          style={[styles.VideoCallWaitinConat, {justifyContent: 'flex-start'}]}>
          <AntDesign name="videocamera" size={24} color="blue" onPress={join} />
          <Text style={styles.VideoCallText}> Video Call</Text>
        </View>
        <View
          style={[
            styles.VideoCallWaitinConat,
            {flex: 1, flexDirection: 'column'},
          ]}>
          <TouchableOpacity style={styles.VideoallConatctCircle} onPress={join}>
            <AntDesign name="user" size={70} color="black" />
          </TouchableOpacity>
          <Text style={styles.VideoallConatctText}>{userName}</Text>
          <Text style={styles.CallingText}> Callling.....</Text>
        </View>
        <View style={styles.VideoCallWaitinConat}>
          <TouchableOpacity style={styles.EndCallBTNView} onPress={leave}>
            <MaterialIcons name="call-end" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  VideoCallWaitingScreen: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  VideoCallWaitinConat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  VideoallConatctCircle: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 100,
  },
  VideoallConatctText: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  CallingText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 40,
  },
  EndCallBTNView: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 100,
  },
  VideoCallText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  main: {flex: 1, alignItems: 'center', height: '100%'},
  cameraView: {
    flex: 1,
    backgroundColor: '#ddeeff',
    width: '100%',
    height: '100%',
  },
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '100%', height: '100%'},
  BtnsFrontView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  BtnsFrontViewTop: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
  },
  StreamSTatusView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  StreamSTatutsText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  BtnsFrontViewBottom: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    height: 120,
    paddingBottom: 10,
  },
  BtnsFrontViewBottomCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  LoggedUserScreen: {
    width: '90%',
    height: 150,
    position: 'absolute',
    bottom: '1%',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  JoinBTN: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 30,
  },
  JoinBTNext: {
    color: 'black',
    fontWeight: 'bold',
  },
  LiveStartBTN: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20, color: 'black'},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
});
