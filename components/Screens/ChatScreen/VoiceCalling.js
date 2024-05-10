import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    Modal,
    StyleSheet,
    Text,
    View,
    Switch,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import privateAPI from '../../api/privateAPI';


export default function VoiceCalling({ navigation }) {

    const route = useRoute();
    const { loginedUsername, remoteUserId, userName, loggedUserId, channelToken, channelNameFromNotify, randomchannelName } = route.params;
    const appId = '49c68e633e9c4a738530b1e37818b759'
    const [token, setToken] = useState(channelToken);
    const channelName = channelNameFromNotify ? channelNameFromNotify : ( randomchannelName);
    const uid = parseInt(loggedUserId)

    const agoraEngineRef = useRef(null); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(parseInt(remoteUserId)); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const [timer, setTimer] = useState(0); // Timer in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [remoteUserJoined, setRemoteUserJoined] = useState(false);
    const [FcmTokenOfRemoteUser, setFCMTokenOfRemoteUser] = useState(null);


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
            console.log("FCM of Remote user", res.data.data)
            SendCalligNotifcationToRemoteUser(res.data.data)
            setFCMTokenOfRemoteUser(null)
            setFCMTokenOfRemoteUser(res.data.data)


        } catch (error) {
            console.error(error)
        }
    }




    useEffect(() => {
        setupVideoSDKEngine();
    }, []);




    const SendCalligNotifcationToRemoteUser = async (FCMToken) => {

        try {
            const res = await privateAPI.post('/chat/send-fcm-message', {
                token: FCMToken,
                userName: loginedUsername,
                callType: "voice",
                userId: loggedUserId.toString(),
                channelName: channelName,
                channelToken: token.toString()
            });
            console.log("calling notification status!", res.data)
        } catch (error) {
            console.error("FCM Sedn Error", error)
        }

    }

    const setupVideoSDKEngine = async () => {
        try {
            // use the helper function to get permissions
            if (Platform.OS === 'android') { await getPermission() };
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            if (!agoraEngine) {
                throw new Error('Failed to initialize Agora Engine');
            } else {
                console.log("Video Call initilazed")
                join()
            }

            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    setMessage('Successfully joined the channel ' + channelName);
                    setIsJoined(true);
                    console.log('Successfully joined the channel')
                    startTimer()
                    GetFCMTokenOfRemoteUser()

                },
                onUserJoined: (_connection, Uid) => {
                    setMessage('Remote user joined with uid ' + Uid);
                    setRemoteUid(parseInt(Uid));
                    setRemoteUserJoined(true)
                    console.log('Remote user joined with uid ' + Uid)

                },
                onUserOffline: (_connection, Uid) => {
                    setMessage('Remote user left the channel. uid: ' + Uid);
                    setRemoteUid(null);
                    console.log('Remote user left the channel. uid: ' + Uid)

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


    const join = async () => {
        console.log('Attempt to JOin', channelName, token, uid)

        if (isJoined) {
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
            setMessage('You left the channel');
            console.log("Video Call distoryed")
            navigation.goBack()
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


    if (uid) {

        return (
            <View style={styles.VideoCallWaitingScreen}>
                <View style={[styles.VideoCallWaitinConat, { justifyContent: 'flex-start' }]}>
                    <Ionicons name="call-outline" size={24} color="blue" />
                    <Text style={styles.VideoCallText}> Voice Call</Text>
                </View>
                <View style={[styles.VideoCallWaitinConat, { flex: 1, flexDirection: 'column' }]}>
                    <View style={styles.VideoallConatctCircle}>
                        <AntDesign name="user" size={70} color="black" />
                    </View>
                    <Text style={styles.VideoallConatctText}> {userName}</Text>
                    {(() => {
                        if ((isJoined && remoteUserJoined && uid) || channelNameFromNotify) {
                            return (
                                <Text style={styles.timer}>{formatTime(timer)}</Text>

                            )
                        }
                        else {
                            return (
                                <Text style={styles.CallingText}> Callling.....</Text>
                            )
                        }
                    })()}

                </View>
                <View style={[styles.VideoCallWaitinConat, { justifyContent: ((isJoined && remoteUserJoined && uid) || channelNameFromNotify) ? 'space-between' : 'center' }]}>
                    {((isJoined && remoteUserJoined && uid) || channelNameFromNotify) && (
                        <MaterialIcons name={audioEnable ? "volume-up" : "volume-off"} size={24} color="black" onPress={EnableDisEnbaudio} />
                    )}
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
    timer: {
        color: 'black',
        marginTop: 40
    },


    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 5,
    },
    main: { flex: 1, alignItems: 'center' },
    scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
    scrollContainer: { alignItems: 'center' },
    videoView: { width: '90%', height: 200 },
    btnContainer: { flexDirection: 'row', justifyContent: 'center' },
    head: { fontSize: 20, color: 'black' },
});

