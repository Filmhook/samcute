import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidCategory, AndroidImportance, AndroidLaunchActivityFlag, AndroidVisibility, EventType, TimeUnit } from '@notifee/react-native';

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState(false);
  const navigation = useNavigation();





  const toggleSwitch = () => {
    setTheme(!theme)
  }
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const [userType, setuserType] = useState('');
  useEffect(() => {
    const getusertype = async () => {
      try {
        const value = await AsyncStorage.getItem('usertype')
        if (value !== null) {
          const user = value.charAt(0).toUpperCase() + value.slice(1);
          setuserType(user);
        
        }
      } catch (error) {
        console.log(error, "usertype not get from AsyncStorage")
      }
    }
    getusertype();
  }, [])

  const style = StyleSheet.create({
    View: {
      height: 600,
      width: 300,
      marginTop: -100,
      borderRadius: 30,
    },
    arrowdiv: {
      width: 85,
      height: 50,
      borderRadius: 10,
      backgroundColor: "#3B3B3C",
      marginLeft: 300,
      marginTop: -600
      //  borderWidth:1,
      //  borderBlockColor:"white"
    },
    arrowicon: {
      width: "60%",
      marginLeft: 15,
    },
    topBar: {
      backgroundColor: 'white',
      height: responsiveHeight(7.8),
      flexDirection: 'row',
      columnGap: responsiveWidth(14),
      
    },
    // container: {
    //   flex: 1,
    // },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalBackground: {
     height:responsiveHeight(90),
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // justifyContent: 'center',
      alignItems: 'center',
      borderRadius: responsiveWidth(2),
      width: responsiveWidth(90)
    },
    popupContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    popupTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: 'blue',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
      height: responsiveHeight(40),
      width: responsiveWidth(65),
      borderRadius: 3,
      // borderWidth:1,
      // backgroundColor: "#3B3B3C",
      // bottom: 250,
      left: 30
    },
    imgdiv: {
      height: 200,
      width: 190,
      borderRadius: 20,
      marginLeft: 45,
      marginTop: 20,
      backgroundColor: "white",
    },
    containerOne: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 40,
      backgroundColor: "#3B3B3C",
    },
    containerTwo: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerThree: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerFour: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerFive: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    text: {
      color: "white",
      fontSize: 20,
      marginLeft: 20,
      marginTop: 20
    },
    containerSix: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerSeven: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    CallIncomingMdalView: {
      flex: 1,
      marginTop: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '25%'
    },
    CallIncomingMdalTop: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    CallIncomeingHeaderView: {
      width: '100%',
      justifyContent: 'center',
      paddingLeft: 10
    },
    CallIncomeingHeader: {
      color: 'black',
      fontSize: 16
    },
    UserImageView: {
      padding: 10,
      backgroundColor: 'lightgrey',
      borderRadius: 90,
      marginTop: '40%'
    },
    UserNameText: {
      color: 'blue',
      fontSize: 19,
      fontWeight: 'bold',
      marginTop: 15
    },
    CallIncomingMdalBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 50
    },
    EndCallBTNView: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 100
    },
  })


  /// Incoming Calling Modall

  const [visibleCallIncoming, setVisibleCallIncoming] = useState(false)
  const [incomingCallData, setIncomingCallData] = useState(null);

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log("Logined use rFCM ", token)
  }

  const [loginedUserId, setLoginedUserId] = useState(false);

  const GETAsuncStorage = async () => {
    const UID = await AsyncStorage.getItem('id');
    setLoginedUserId(parseInt(UID))
  }



  useEffect(() => {
    async function requestUserPermission() {
      // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      // const authStatus = await messaging().requestPermission();
      // const enabled =
      //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      // if (enabled) {
      //   console.log('Authorization status:', authStatus);
      //   getFCMToken()

      // } else {
      //   console.log('Permission denied');
      // }
    }
    requestUserPermission()
    GETAsuncStorage()
  }, [])



  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.data.channelNameFromNotify === 'acceptType') {
        setIncomingCallData(JSON.parse(JSON.stringify(remoteMessage)).data)
        setVisibleCallIncoming(true)
      } else {
        alert("Caller Left the calling...")
        navigation.goBack()
      }
    });




    const unsubscribe2 = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      notifee.cancelTriggerNotifications()

      if (remoteMessage.data.channelNameFromNotify === 'acceptType') {
        handleincomingvideoCall(remoteMessage)
      } else {
        navigation.goBack()
      }
    });



    notifee.onBackgroundEvent(async ({ type, detail }) => {
      switch (type) {
        case EventType.ACTION_PRESS:

          if (detail.pressAction.id === 'answer') {
            var incomingCallData = detail.notification.data;

            if (incomingCallData.callType === 'video') {
              navigation.navigate('Chat', {
                screen: "VideoCallingScreen", params: {
                  remoteUserId: parseInt(incomingCallData.userId),
                  userName: incomingCallData.fromUser,
                  loggedUserId: loginedUserId,
                  channelToken: incomingCallData.channelToken,
                  channelNameFromNotify: incomingCallData.channelNameFromNotify
                }
              })
            } else {
              navigation.navigate('Chat', {
                screen: "VoiceCalling", params: {
                  remoteUserId: parseInt(incomingCallData.userId),
                  userName: incomingCallData.fromUser,
                  loggedUserId: loginedUserId,
                  channelToken: incomingCallData.channelToken,
                  channelNameFromNotify: incomingCallData.channelNameFromNotify

                }
              })
            }
            NotifeecancelAllNotification()
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


    return (unsubscribe2, unsubscribe);
  }, []);

  const AttendCall = () => {
    setVisibleCallIncoming(false)
    if (incomingCallData.callType === 'video') {

      navigation.navigate('Chat', {
        screen: "VideoCallingScreen", params: {
          remoteUserId: parseInt(incomingCallData.userId),
          userName: incomingCallData.fromUser,
          loggedUserId: loginedUserId,
          channelToken: incomingCallData.channelToken,
          channelNameFromNotify: incomingCallData.channelNameFromNotify
        }
      })
    } else {

      navigation.navigate('Chat', {
        screen: "VoiceCalling", params: {
          remoteUserId: parseInt(incomingCallData.userId),
          userName: incomingCallData.fromUser,
          loggedUserId: loginedUserId,
          channelToken: incomingCallData.channelToken,
          channelNameFromNotify: incomingCallData.channelNameFromNotify

        }
      })
    }

  }
  const CancelCall = async () => {
    setVisibleCallIncoming(false)
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
  }


  return (
    //TopBar Style
    <View style={style.topBar}>

      
      <View
        style={{
          height: responsiveHeight(7),
          width: responsiveWidth(60),
          marginBottom: responsiveHeight(3), 
          flexDirection: 'row',
          position: 'relative',

        }}>
        <Image
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(16),
            alignSelf: 'center',
          }}
          source={require('../Assets/Login_page/FH_logos.png')}
          resizeMode="stretch"
        />

        <Image
          style={{
            height: responsiveHeight(5),
            width: responsiveWidth(48),
            position: 'absolute',
            left: responsiveWidth(12),
            top: responsiveHeight(1.8),
          }}
          source={require('../Assets/Login_page/Film_hook_name.png')}
          resizeMode="stretch"
        />

        <Text
          style={{
            color: 'blue',
            fontWeight: 'bold',
            position: 'absolute',
            left: responsiveWidth(42),
            top: responsiveHeight(5.8),
          }}>
         {userType}
        </Text>
      </View>

      {/* Plus Icon */}

      <View style={{ width: responsiveWidth(25), height: responsiveHeight(7), flexDirection: 'row', columnGap: responsiveWidth(5), justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ width: responsiveWidth(9), height: responsiveWidth(9), borderRadius: responsiveWidth(9), elevation: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
          <Image source={require('../Assets/UserProfile_Icons_Fonts/211694_bell_icon.png')} style={{ width: responsiveWidth(8), height: responsiveHeight(4), }} resizeMode='stretch' />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleModal} style={{ width: responsiveWidth(9), height: responsiveWidth(9), borderRadius: responsiveWidth(9), elevation: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../Assets/Home_Icon_And_Fonts/plus_icon.png')} style={{ width: responsiveWidth(8), height: responsiveHeight(4), }} resizeMode='stretch' />
        </TouchableOpacity>
        <Modal
           visible={isVisible}
           transparent={true}
           animationType="fade"
           onRequestClose={toggleModal}

        >

          <TouchableOpacity style={style.modalBackground} activeOpacity={1} onPress={toggleModal}>
            <View style={style.container}>
              <ProfileModalRoot />
            </View>
          </TouchableOpacity>

        </Modal>

        <Modal visible={visibleCallIncoming}>
          <View style={style.CallIncomingMdalView}>
            <View style={style.CallIncomingMdalTop}>
              <View style={style.CallIncomeingHeaderView}>
                <Text style={style.CallIncomeingHeader}>Incoming Call....</Text>
              </View>
              <View style={style.UserImageView}>
                <AntDesign name="user" size={70} color="black" />
              </View>
              <Text style={style.UserNameText}>{incomingCallData ? incomingCallData.fromUser : ''}</Text>
            </View>
            <View style={style.CallIncomingMdalBottom}>
              <TouchableOpacity style={style.EndCallBTNView} onPress={AttendCall} >
                <Ionicons name="call-sharp" size={35} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={CancelCall} style={[style.EndCallBTNView, { backgroundColor: "red" }]} >
                <MaterialIcons name="call-end" size={35} color="white" />
              </TouchableOpacity>
            </View>

          </View>
        </Modal>


      </View>
    </View>
  );
};

// bottom bar =======


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import ChatRoot from './ChatScreen/ChatRoot/ChatRoot';
import SearchRoot from './AllSearchScreen/SearchRoot';
import AuditionRoot from './AuditionScreen/AuditionRoot';
import ProfileRoot from './UserProfileScreen/ProfileMain/ProfileRoot';
import HomeRoot from './HomeScreen/HomeRoot';
import ProfileModalRoot from './NavigationScreen/PlusModel';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { getToken } from 'firebase/installations';
import handleincomingvideoCall, { NotifeecancelAllNotification } from '../../notification';
import privateAPI from '../api/privateAPI';


const Tab = createMaterialBottomTabNavigator();

function BottomBar() {
  return (

    <Tab.Navigator
    initialRouteName='Home'
    activeColor='blue'
    inactiveColor='black'
    barStyle={{ backgroundColor: 'white', height: responsiveHeight(8) }}
    backBehavior='order'
    style={{height:5}}
    tabBarOptions={{ showLabel: false }}
  >
    <Tab.Screen
      name="Home"
      component={HomeRoot}
      options={{
        tabBarLabel: false,
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <Image
              style={styles.tabIcon}
              source={require('../Assets/Home_Icon_And_Fonts/Home.png')}
              resizeMode='stretch'
            />
            {focused && <View style={styles.underline} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatRoot}
      options={{
        tabBarLabel: false,
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <Image
              style={styles.tabIcon}
              source={require('../Assets/Chats_Icon_And_Fonts/Filmhook_chat.png')}
              resizeMode='stretch'
            />
            {focused && <View style={styles.underline} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchRoot}
      options={{
        tabBarLabel: false,
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <Image
              style={styles.tabIcon}
              source={require('../Assets/app_logo/all_search.png')}
              resizeMode='stretch'
            />
            {focused && <View style={styles.underline} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Audition"
      component={AuditionRoot}
      options={{
        tabBarLabel: false,
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <Image
              style={styles.tabIcon}
              source={require('../Assets/Audition_Icons_Fonts/Filmhook_Audition.png')}
              resizeMode='stretch'
            />
            {focused && <View style={styles.underline} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="User Profile"
      component={ProfileRoot}
      options={{
        tabBarLabel: false,
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <Image
              style={[styles.tabIcon, { bottom: 4, top: 0, padding: 5 }]}
              source={require('../Assets/UserProfile_Icons_Fonts/Filmhook_UserProfile.png')}
              resizeMode='stretch'
            />
            {focused && <View style={styles.underline} />}
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);


  
  
}
const styles = StyleSheet.create({
  tabIconContainer: {
    width: responsiveWidth(9),
    height: responsiveHeight(5),
    alignItems: 'center',
  },
  tabIcon: {
    width: responsiveWidth(9),
    height: responsiveHeight(5),
    bottom: 1,
  },
  underline: {
    width: responsiveWidth(9),
    height: 2, // Adjust the height of the underline
    backgroundColor: 'blue', // Adjust the color of the underline
    position: 'absolute',
    bottom: 0,
  },
});


export default function Tabbar() {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       // Optionally, show an alert to the user
  //       Alert.alert(
  //         "Exit App",
  //         "Do you want to exit the app?",
  //         [
  //           { text: "No", style: "cancel" },
  //           { text: "Yes", onPress: () => BackHandler.exitApp() }
  //         ],
  //         { cancelable: false }
  //       );
  //       return true; // Prevent default behavior
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //     };
  //   }, [])
  // );

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    content: {
      flex: 1
    }
  })

  return (
    <>
      {/* <View style={style.container}> */}
      <TopBar />
      <View></View>
      <BottomBar />
      {/* </View> */}
    </>
  )
}
