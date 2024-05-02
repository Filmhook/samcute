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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'; // Import useRoute hook



export default function VideoCallingScreen({ navigation }) {


    const route = useRoute();
    const { remoteUserId, userName, loggedUserId } = route.params;
    const appId = '49c68e633e9c4a738530b1e37818b759'
    const token = '007eJxTYEjYnj3Hd9OeIG7Rh9KR8zbJ/vE88fxX2N2o0wWf/k1o3r5BgcHEMtnMItXM2DjVMtkk0dzYwtTYIMkw1djcwtAiydzUUrxJO60hkJFB/8oXJkYGCATxWRhKUotLGBgA2OkhFg=='
    const channelName = 'test';
    const uid = loggedUserId

    const agoraEngineRef = useRef(null); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(remoteUserId); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const [timer, setTimer] = useState(0); // Timer in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [remoteUserJoined, setRemoteUserJoined] = useState(false);





    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);
        }
    };

    useEffect(() => {
        // Initialize Agora engine when the app starts
        setupVideoSDKEngine();

    });

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
            }
            join()

            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    setMessage('Successfully joined the channel ' + channelName);
                    setIsJoined(true);
                    console.log('Successfully joined the channel')
                    startTimer()
                },
                onUserJoined: (_connection, Uid) => {
                    setMessage('Remote user joined with uid ' + Uid);
                    setRemoteUid(Uid);
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
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
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


    if (isJoined && remoteUserJoined && uid) {
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.cameraView}>
                    <React.Fragment key={remoteUid}>
                        <RtcSurfaceView
                            canvas={{ uid: remoteUid }} style={styles.videoView} />
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
                    <View style={styles.VideoallConatctCircle}>
                        <AntDesign name="user" size={70} color="black" />
                    </View>
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
