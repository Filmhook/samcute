import {
  SafeAreaView,
  Modal,
  StyleSheet,
  Text,
  View,
  Switch,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import { PermissionsAndroid, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../../api/privateAPI';
const appId = '49c68e633e9c4a738530b1e37818b759'

export default function GoLive() {

  const navigation = useNavigation();
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [token, setToken] = useState(null);
  const [channelName, setChannelName] = useState('');


  const [uid, setUid] = useState(null);
  const agoraEngineRef = useRef(null);
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(true); // Client role
  const [remoteUid, setRemoteUid] = useState(null); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [joinedUIDS, setJoinedUIDS] = useState([]);
  const [onLivePeople, setOnLivePeople] = useState(null);
  const [visibleJoinLiveModal, setVisibleJoinLiveModal] = useState(false);
  const [visibleJoinedUsersModal, setvisibleJoinedUsersModal] = useState(false);

  const [joiningUse, setJoinningUser] = useState(false);
  const [loginedUserId, setLoginedUserId] = useState(null);


  const GETAsuncStorage = async () => {
    const UID = await AsyncStorage.getItem('id');
    setUid(parseInt(UID))
    setLoginedUserId(parseInt(UID))
    GenerateChaanelToken(UID)
    setChannelName(UID)
  }

  useEffect(() => {
    GETAsuncStorage()
  }, [])

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
    return () => {
      leave()
    }

  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') { await getPermission() };
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      if (!agoraEngine) {
        throw new Error('Failed to initialize Agora Engine');
      } else {
        console.log("Live Streaming initilazed")
      }
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          setMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
          startTimer()
          SaveRegisterChannel()  //update to datatbase
          console.log('Successfully joined the channel')

        },
        onUserJoined: (_connection, Uid) => {
          setMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
          setJoinedUIDS(prevItems => [...prevItems, { userId: Uid, userName: "WdWdWd" }]);

        },
        onUserOffline: (_connection, Uid) => {
          setMessage('Remote user left the channel. uid: ' + Uid);
          setJoinedUIDS(prevItems => prevItems.filter(item => item.userId !== Uid));
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });

      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  const GenerateChaanelToken = async (UID) => {
    try {
      const res = await privateAPI.post('/agora/getRTCToken', {
        channelName: UID.toString(),
        userId: UID,
        expirationTimeInSeconds: 3000,
        role: 1
      });
      console.log("Chanell Token", res.data.data)
      setToken(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }


  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const join = async () => {
    console.log(uid)

    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster
        });
      } else {
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience
        });

      }

    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      stopTimer()
      GETAsuncStorage()
      navigation.navigate('homecontents')
      setMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]); // Run effect whenever isRunning changes

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimer(0)
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const SaveRegisterChannel = async () => {
    try {
      const res = await privateAPI.post('/live/saveLiveChannelDetails', {
        userId: uid,
        channelName: channelName,
        startTime: new Date(),
        token: token
      });
      console.log("save Database status", res.data);
    } catch (error) {
      console.error(error)
    }

  }



  const JoinAsRemoteUser = (item) => {
    setUid(item.userId)
    setChannelName(item.channelName)
    setToken(item.token)
    setJoinningUser(true)
    join()
    setVisibleJoinLiveModal(false)

  }

  const LeaveingRemoteUser = (item) => {
    setJoinningUser(false)
    leave()

  }


  useEffect(() => {
    const getAllLives = async () => {
      try {
        const res = await privateAPI.post('/live/getLiveDetails', {});
        let List = []
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].token) {
            List.push(res.data[i])
            setOnLivePeople(List)
          }
        }
        console.log("All Live data  ", res.data)


      } catch (error) {
        console.error(error)
      }
    }
    getAllLives()
  }, [])

  const OpenAllLivesMoodal = async () => {
    console.log("Openning All lives")
    setVisibleJoinLiveModal(true)

  }

  const [visibleCommentsModal, setVisibleCommentsModal] = useState(false);
  const [allComments, setAllComments] = useState(false);

  const OpenCommentsSession = async () => {
    try {
      const res = await privateAPI.get('/live/getLiveCommentDetails?liveChannelId=4');
      console.log("All comments data  ", res.data)
      const filteredData = res.data.filter(doc => parseInt(doc.liveStreamCommencreatedBy) === parseInt(loginedUserId))
      setAllComments(filteredData)
      setVisibleCommentsModal(true)

    } catch (error) {
      console.error(error)
    }

  }
  const [visibleAddCommentModal, setVisibleAddCommentModal] = useState(false);
  const OpenCommentKeyboard = () => {
    setVisibleAddCommentModal(true)
  }
  const [commentText, setCommentText] = useState("");

  const UploadComment = async () => {
    try {
      const res = await privateAPI.post('/live/saveLiveStreamComment', {
        userId: loginedUserId,
        liveChannelId: 4,
        liveStreamMessage: commentText,
        liveStreamCommencreatedBy: uid
      });
      console.log("Comment added ", res.data)

      setCommentText('')
      setVisibleAddCommentModal(false)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.main}>

      <View style={styles.cameraView}>

        <React.Fragment key={0}>
          <RtcSurfaceView canvas={{ uid: joiningUse ? remoteUid : 0 }} style={styles.videoView} />
          <></>
        </React.Fragment>

        {isJoined && !isHost ? (
          <>
          </>
        ) : (
          <></>
        )}


        <Text style={styles.info}>{message}</Text>
        <View style={styles.BtnsFrontView}>
          <View style={styles.BtnsFrontViewTop}>
            <View style={styles.StreamSTatusView}>
              {isHost && isJoined && (
                <>
                  <FontAwesome name="circle" size={20} color="red" />
                  <Text style={styles.StreamSTatutsText}>Live</Text>
                </>
              )}
            </View>
            {isHost && isJoined && (
              <Text style={styles.timer}>{formatTime(timer)}</Text>
            )}
            <FontAwesome6 name="rotate" size={20} color="white" onPress={() => agoraEngineRef.current.switchCamera()} />

          </View>

          <View style={styles.BtnsFrontViewBottom}>
            <TouchableOpacity style={styles.BtnsFrontViewBottomCont} onPress={() => setvisibleJoinedUsersModal(true)}>
              <AntDesign name="user" size={24} color="white" />
              <Text>Watching</Text>
              <Entypo name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <View style={[styles.BtnsFrontViewBottomCont, {

            }]}>
              {(() => {
                if (!joiningUse) {
                  if (isJoined && isHost) {
                    return (
                      <FontAwesome name="stop-circle-o" size={50} color="red" onPress={leave} />
                    )
                  } else {
                    if (uid && token && channelName) {
                      return (
                        <TouchableOpacity style={styles.LiveStartBTN} onPress={join}>
                        </TouchableOpacity>
                      )
                    }

                  }
                } else {
                  return (
                    <TouchableOpacity style={styles.AddCommentButton} onPress={OpenCommentKeyboard}>
                      <Text style={styles.AddCommentButtonText}>Comment</Text>
                    </TouchableOpacity>
                  )
                }
              })()}
            </View>
            <View style={styles.BtnsFrontViewBottomCont}>
              {(() => {
                if ((!isJoined || !isHost)) {
                  return (
                    <TouchableOpacity onPress={OpenAllLivesMoodal} style={styles.JoinBTN}>
                      <Text style={styles.JoinBTNext}>Join</Text>
                    </TouchableOpacity >
                  )
                } else {
                  if (joiningUse) {
                    return (
                      <TouchableOpacity onPress={LeaveingRemoteUser} style={[styles.JoinBTN, { backgroundColor: 'red' }]}>
                        <Text style={[styles.JoinBTNext, { color: 'white' }]}>Leave</Text>
                      </TouchableOpacity >
                    )
                  } else {
                    return (
                      <TouchableOpacity onPress={OpenCommentsSession} style={[styles.JoinBTN, { backgroundColor: 'grey' }]}>
                        <Text style={styles.JoinBTNext}>Comments</Text>
                      </TouchableOpacity >
                    )

                  }
                }
              })()}

            </View>

          </View>
          {/* <View style={styles.btnContainer}>
            <Text style={{ color: 'black' }}>Audience</Text>
            <Switch
              onValueChange={switchValue => {
                setIsHost(switchValue);
                if (isJoined) {
                  leave();
                }
              }}
              value={isHost}
            />
            <Text style={{ color: 'black' }}>Host</Text>
          </View> */}
        </View>




      </View>
      <Modal
        animationType="slide" // You can customize animationType
        transparent={true}
        visible={visibleJoinLiveModal}
      >
        <View style={styles.LivesModalView}>
          <View style={styles.ModalTopBar}>
            <AntDesign onPress={() => setVisibleJoinLiveModal(false)} name="closecircle" size={30} color="black" />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name="circle" size={20} color="red" />
              <Text style={styles.ModalTopBarText}>On Live</Text>
            </View>
          </View>

          {onLivePeople && (
            <FlatList
              data={onLivePeople}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => JoinAsRemoteUser(item)}>
                  <View style={styles.ModalOnlIveUserBar}>
                    <AntDesign name="user" size={24} color="blue" />
                    <Text style={styles.ModalOnlIveUserText}>{item.userId ? item.userId : ""}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

          )}
        </View>
      </Modal>

      <Modal
        animationType="slide" // You can customize animationType
        transparent={true}
        visible={visibleJoinedUsersModal}
      >
        <View style={styles.JoinedUserModalView}>
          <View style={styles.JoinedUserModalViewTopBar}>
            <AntDesign onPress={() => setvisibleJoinedUsersModal(false)} name="closecircle" size={30} color="black" />
            <Text>Joined People</Text>
          </View>
          <FlatList
            data={joinedUIDS}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (
              <View style={styles.JoinedUserBarView}>
                <AntDesign name="user" size={24} color="blue" />
                <Text style={styles.ModalOnlIveUserText}>{item.userName}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

      </Modal>
      <Modal
        animationType="slide" // You can customize animationType
        transparent={true}
        visible={visibleCommentsModal}
      >
        <View style={styles.CommentsWholeScreen}>
          <View style={styles.CommenctsTopBAr}>
            <AntDesign onPress={() => setVisibleCommentsModal(false)} name="closecircle" size={30} color="black" />
            <Text>All Comments</Text>
          </View>

          <FlatList
            data={allComments}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (
              <View style={styles.CommentsBar}>
                <FontAwesome name="comment" size={24} color="blue" />
                <Text style={styles.UserNameComment}>{item.liveStreamCommencreatedBy}</Text>
                <Text style={styles.CommentMessage}>{item.liveStreamMessage}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

      </Modal>

      <Modal
        animationType="slide" // You can customize animationType
        transparent={true}
        visible={visibleAddCommentModal}
      >
        <View style={styles.AddCommentModal}>
          <View style={styles.AddcommentView}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: 'blue' }}>Add Comment</Text>
            <TextInput
              placeholder="Type something..."
              autoFocus={true}
              style={styles.CommentTextInput}
              onChangeText={text => setCommentText(text)}
              value={commentText}
              multiline
            />
            <View style={styles.AddCommentBTNView}>
              <TouchableOpacity style={styles.AddCommentBTN} onPress={() => setVisibleAddCommentModal(false)}>
                <Text style={styles.AddCommentBTNText}>Canel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.AddCommentBTN, { marginLeft: 15, backgroundColor: 'lightblue' }]} onPress={UploadComment}>
                <Text style={styles.AddCommentBTNText}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  );

};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { flex: 1, alignItems: 'center', height: '100%' },
  cameraView: { flex: 1, backgroundColor: '#ddeeff', width: '100%', height: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '100%', height: '100%' },
  BtnsFrontView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between'
  },
  BtnsFrontViewTop: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'

  },
  StreamSTatusView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  StreamSTatutsText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5
  },
  BtnsFrontViewBottom: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    height: 90,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  BtnsFrontViewBottomCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  JoinBTN: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20
  },
  JoinBTNext: {
    color: 'black',
    fontWeight: 'bold'
  },
  LiveStartBTN: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20, color: 'black' },
  info: { backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff' },
  LivesModalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  ModalTopBar: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  ModalTopBarText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 5
  },
  ModalOnlIveUserBar: {
    width: '100%',
    backgroundColor: 'lightgrey',
    height: 70,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  ModalOnlIveUserText: {
    color: 'black',
    fontSize: 17,
    marginLeft: 10
  },
  JoinedUserModalView: {
    flex: 1,
    backgroundColor: 'white'
  },
  JoinedUserModalViewTopBar: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  JoinedUserBarView: {
    width: '100%',
    backgroundColor: 'lightgrey',
    height: 50,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  CommentsWholeScreen: {
    flex: 1,
    backgroundColor: 'white'
  },
  CommenctsTopBAr: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 1, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,

  },
  CommentsBar: {
    width: '100%',
    backgroundColor: 'lightblue',
    marginBottom: 10,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row'
  },
  CommentHeaderView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  CommentMessage: {
    color: 'black',
    fontSize: 17,
    marginLeft: 15
  },
  UserNameComment: {
    color: 'black',
    fontSize: 14,
    marginLeft: 5
  },
  AddCommentButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  AddCommentButtonText: {
    color: 'black'
  },
  AddCommentModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  AddcommentView: {
    backgroundColor: 'lightgrey',
    width: "80%",
    minHeight: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  AddCommentBTNView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  AddCommentBTN: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 15
  },
  AddCommentBTNText: {
    color: 'black'
  },
  CommentTextInput: {
    width: '70%',
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 5,
    color: 'black'

  }

});
