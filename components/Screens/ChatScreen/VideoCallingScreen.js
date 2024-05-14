import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native'; // Import useRoute hook
import privateAPI from '../../api/privateAPI';

export default function VideoCallingScreen({ navigation }) {

    const config = {
        appId: 'e0580e01a75e494db4c54b3f3e050bf2',
        channelName: 'demoApp',
        token: '007eJxTYPC0qfiwcHWNWUZkk82tLSslY83WyFyQWK/2UyHv7PlteyQUGFINTC0MUg0ME81NU00sTVKSTJJNTZKM04yBEgZJaUa3PZzSGgIZGd4V1zEzMkAgiM/OkJKam+9YUMDAAACfNiCV'
    }

    const route = useRoute();
    const { loginedUsername, remoteUserId, userName, loggedUserId, channelToken, channelNameFromNotify, randomchannelName } = route.params;
    const appId = config.appId
    //    const [token, setToken] = useState(channelToken);
    //    const channelName = channelNameFromNotify ? channelNameFromNotify : ( randomchannelName);
    const [token, setToken] = useState(config.token);
    const channelName = config.channelName;
    const uid = parseInt(loggedUserId)

    const agoraEngineRef = useRef(null); // Agora engine instance

    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(parseInt(remoteUserId)); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const [timer, setTimer] = useState(0); // Timer in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [remoteUserJoined, setRemoteUserJoined] = useState(false);

    useEffect(() => {
        // Initialize Agora engine when the app starts
        setupVideoSDKEngine();
    }, []);

    const setupVideoSDKEngine = async () => {
        try {
            // use the helper function to get permissions
            if (Platform.OS === 'android') { await getPermission() };
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;

            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    console.log('Successfully joined the channel', channelName)
                    setMessage('Successfully joined the channel ' + channelName);

                    // join();
                    setIsJoined(true);
                    startTimer();
                },
                onUserJoined: (_connection, Uid) => {
                    console.log('Remote user joined with uid ' + Uid)

                    setMessage('Remote user joined with uid ' + Uid);
                    setRemoteUid(Uid);
                    setRemoteUserJoined(true)
                },
                onUserOffline: (_connection, Uid) => {
                    console.log('Remote user left the channel. uid: ' + Uid)

                    setMessage('Remote user left the channel. uid: ' + Uid);
                    setRemoteUid(0);
                },
            });
            agoraEngine.initialize({
                appId: appId,
                channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
            });
            agoraEngine.enableVideo();
            if (!agoraEngine) {
                throw new Error('Failed to initialize Agora Engine');
            } else {
                console.log("Video Call initilazed")
                join();
            }

        } catch (e) {
            console.log(e);
        }
    };

    const join = async () => {
        console.log('Attempt to Join', channelName, parseInt(uid), token);
        if (isJoined) {
            console.log("joined");
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, parseInt(uid), {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
            GetFCMTokenOfRemoteUser(); // Get FCM Token of Remote User
        } catch (e) {
            console.log(e);
        }
    };

    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            agoraEngineRef.current?.removeAllListeners();
            agoraEngineRef.current?.release();
            setRemoteUid(0);
            setIsJoined(false);
            stopTimer()
            setMessage('You left the channel');
            console.log("Video Call distoryed")
            navigation.goBack()
        } catch (e) {
            console.log(e);
        }
    };

    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);
        }
    };

    const GetFCMTokenOfRemoteUser = async () => {
        try {
            const res = await privateAPI.get(`/chat/getFirebaseTokenByuserId?userId=${parseInt(remoteUserId)}`);
            console.log("FCM of Remote user", res.data.data, parseInt(remoteUserId))
            SendCalligNotifcationToRemoteUser(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const SendCalligNotifcationToRemoteUser = async (FCMToken) => {
        try {
            const res = await privateAPI.post('/chat/send-fcm-message', {
                token: FCMToken,
                userName: loginedUsername,
                callType: "video",
                userId: loggedUserId.toString(),
                channelName: channelName,
                channelToken: token.toString()
            });
            console.log("calling notification status!", res.data)
            console.log("channelName", channelName)
        } catch (error) {
            console.error("FCM Sedn Error", error)
        }

    }

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

    if ((isJoined && remoteUserJoined && uid) || channelNameFromNotify) {
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.cameraView}>
                    <React.Fragment key={remoteUid}>
                        <RtcSurfaceView
                            canvas={{ uid: parseInt(remoteUid) }} style={styles.videoView} />
                        {/* <Text style={{ color: 'black' }}>Remote user uid: {remoteUid}</Text> */}
                    </React.Fragment>
                    <Text style={styles.info}>{message}</Text>
                    <View style={styles.BtnsFrontView}>
                        <View style={styles.BtnsFrontViewTop}>
                            <View style={styles.StreamSTatusView}>
                            </View>
                            <Text style={styles.timer}>{formatTime(timer)}</Text>
                        </View>
                        <View style={styles.BtnsFrontViewBottom}>
                            <View style={[styles.BtnsFrontViewBottomCont, { height: '100%' }]}>
                                <View style={styles.LoggedUserScreen}>
                                    <React.Fragment key={0}>
                                        <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoView} />
                                        <></>
                                    </React.Fragment>
                                </View>
                            </View>
                            <View style={[styles.BtnsFrontViewBottomCont, {

                            }]}>
                                <TouchableOpacity style={styles.EndCallBTNView} onPress={leave}>
                                    <MaterialIcons name="call-end" size={35} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.BtnsFrontViewBottomCont}>

                                <FontAwesome6 name="rotate" size={24} color="white" onPress={() => agoraEngineRef.current.switchCamera()} />
                            </View>

                        </View>

                    </View>

                </View>

            </SafeAreaView>
        );


    } else {
        return (
            <View style={styles.VideoCallWaitingScreen}>
                <View style={[styles.VideoCallWaitinConat, { justifyContent: 'flex-start' }]}>
                    <AntDesign name="videocamera" size={24} color="blue" onPress={join} />
                    <Text style={styles.VideoCallText}> Video Call</Text>
                </View>
                <View style={[styles.VideoCallWaitinConat, { flex: 1, flexDirection: 'column' }]}>
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

        )


    }
}

const styles = StyleSheet.create({
    VideoCallWaitingScreen: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 15
    },
    VideoCallWaitinConat: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    VideoallConatctCircle: {
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 100
    },
    VideoallConatctText: {
        color: 'blue',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    CallingText: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 40
    },
    EndCallBTNView: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 100
    },
    VideoCallText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5
    },



    main: { flex: 1, alignItems: 'center', height: '100%', },
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
        padding: 15,

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
        height: 120,
        paddingBottom: 10
    },
    BtnsFrontViewBottomCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    LoggedUserScreen: {
        width: '90%',
        height: 150,
        position: 'absolute',
        bottom: '1%',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1
    },
    JoinBTN: {
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 30
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

});

