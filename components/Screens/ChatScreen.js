// Imports dependencies.
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
} from 'react-native-agora-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Defines the App object.

import { useRoute } from '@react-navigation/native'; // Import useRoute hook
import privateAPI from '../api/privateAPI';
import Entypo from 'react-native-vector-icons/Entypo';
import EmojiPicker from 'rn-emoji-keyboard';

const loginedUserToken =
  '007eJxTYNgVsbfgs0/41lNCm7Qys3Mb/jYanPrHsO7m+pTKZVkxxdsVGCwSU81NTc2AhJGFSUpysoWBoYlFokmqmaGZiZmJuWn7XKW0hkBGhuz4b8yMDKwMjEAI4qswpKYYppoaJRvopqWaJeoaGqam6lqamSbrmpuaJBsZJptaGicaAgD4UihU';
// const Ruby = '007eJxTYHjW6TRh1r5tN37v2XDj8P9vjc/2BxZ45x3Qf5695vGuyHOHFBgsElPNTU3NgISRhUlKcrKFgaGJRaJJqpmhmYmZibnp/p+KaQ2BjAxV/DVMjAysDIxACOKrMBgZGKSYpqQZ6KYlpxjrGhqmpuomWqak6CaZGpiZpyUlJwNlAca+LSI=';

const ChatScreen = ({ navigation }) => {

  const scrollViewRef = useRef(null);

  const route = useRoute();
  const { data } = route.params;
  console.log('datachat' , data)
  // Defines the variable.
  const title = 'chat';
  // Replaces <your appKey> with your app key.
  const appKey = '611133509#1318257';
  // Replaces <your userId> with your user ID.
  const username = data.userId; // userid
  // Replaces <your agoraToken> with your Agora token.
  const [chatToken, setChatToken] = React.useState(loginedUserToken);
  const [targetId, setTargetId] = React.useState(3);
  const [content, setContent] = React.useState('');
  const [logText, setWarnText] = React.useState('Show log area');
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;
  const [chatMessageStatusm, setChatMessageStatus] = React.useState([]);

  const [loginedUsername, setLoginedUsername] = useState('');

  useEffect(() => {
    // Function to scroll to the bottom of the chat ScrollView
    const scrollToBottom = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };

    // Scroll to bottom whenever chatMessageStatusm is updated
    scrollToBottom();

  }, [chatMessageStatusm]);

  // Outputs console logs.
  useEffect(() => {
    // get chatToken from server

    logText.split('\n').forEach((value, index, array) => {
      if (index === 0) {
        console.log(value);
      }
    });
  }, [logText]);

  const [uid, setUid] = useState(null);

  const GETAsuncStorage = async () => {
    const UID = await AsyncStorage.getItem('id');
    const username = await AsyncStorage.getItem('username');
    setUid(parseInt(UID));
    setLoginedUsername(username);
  };

  // Outputs UI logs.
  const rollLog = text => {
    setWarnText(preLogText => {
      let newLogText = text;
      preLogText
        .split('\n')
        .filter((value, index, array) => {
          if (index > 8) {
            return false;
          }
          return true;
        })
        .forEach((value, index, array) => {
          newLogText += '\n' + value;
        });
      return newLogText;
    });
  };

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SaveMessages = async () => {
    setContent('');
    try {
      const res = await privateAPI.post('/chat/saveMessage', {
        message: content,
        chatReceiverId: username,
      });
      GetAllMessages();
    } catch (error) {
      console.error(error);
    }
  };
  const GetAllMessages = async () => {
    try {
      const res = await privateAPI.post('/chat/getMessageByUserId', {
        chatReceiverId: username,
      });
      console.log(`fetching msg - ${JSON.stringify(res.data.data.userChat)}`);
      setChatMessageStatus(res.data.data.userChat);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GETAsuncStorage();
    GetAllMessages();
    login();
    // Registers listeners for messaging.
    const setMessageListener = () => {
      let msgListener = {
        onMessagesReceived(messages) {
          for (let index = 0; index < messages.length; index++) {
            rollLog(
              'received msgId: ' + JSON.stringify(messages[index].body.content),
            );

            //Save recieved messages
            const res = privateAPI.post('/chat/saveMessage', {
              message: JSON.stringify(messages[index].body.content),
              chatReceiverId: 3,
            });
            GetAllMessages();
          }
        },
        onCmdMessagesReceived: messages => { },
        onMessagesRead: messages => { },
        onGroupMessageRead: groupMessageAcks => { },
        onMessagesDelivered: messages => { },
        onMessagesRecalled: messages => { },
        onConversationsUpdate: () => { },
        onConversationRead: (from, to) => { },
      };
      chatManager.removeAllMessageListener();
      chatManager.addMessageListener(msgListener);
    };

    // Initializes the SDK.
    // Initializes any interface before calling it.
    const init = () => {
      let o = new ChatOptions({
        autoLogin: false,
        appKey: appKey,
      });
      chatClient.removeAllConnectionListener();
      chatClient
        .init(o)
        .then(() => {
          rollLog('init success');
          this.isInitialized = true;
          let listener = {
            onTokenWillExpire() {
              rollLog('token expire.');
            },
            onTokenDidExpire() {
              rollLog('token did expire');
            },
            onConnected() {
              rollLog('onConnected');
            },
            onDisconnected(errorCode) {
              rollLog('onDisconnected:' + errorCode);
            },
          };
          chatClient.addConnectionListener(listener);
        })
        .catch(error => {
          rollLog(
            'init fail: ' +
            (error instanceof Object ? JSON.stringify(error) : error),
          );
        });
    };
    init();
  }, [chatClient, chatManager, appKey]);

  // Logs in with an account ID and a token.
  const login = () => {
    if (this.isInitialized === false || this.isInitialized === undefined) {
      rollLog('Perform initialization first.');
      return;
    }
    rollLog('start login ...');
    chatClient
      .loginWithAgoraToken(username, chatToken)
      .then(() => {
        rollLog('login operation success.');
      })
      .catch(reason => {
        rollLog('login fail: ' + JSON.stringify(reason));
      });
  };
  // Logs out from server.
  const logout = () => {
    if (this.isInitialized === false || this.isInitialized === undefined) {
      rollLog('Perform initialization first.');
      return;
    }
    rollLog('start logout ...');
    chatClient
      .logout()
      .then(() => {
        rollLog('logout success.');
      })
      .catch(reason => {
        rollLog('logout fail:' + JSON.stringify(reason));
      });
  };
  // Sends a text message to somebody.
  const sendMessageByagora = () => {
    if (this.isInitialized === false || this.isInitialized === undefined) {
      rollLog('Perform initialization first.');
      return;
    }

    let msg = ChatMessage.createTextMessage(
      targetId,
      content,
      ChatMessageChatType.PeerChat,
    );
    const callback = new (class {
      onProgress(locaMsgId, progress) {
        rollLog(`send message process: ${locaMsgId}, ${progress}`);
      }
      onError(locaMsgId, error) {
        rollLog(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
      }
      onSuccess(message) {
        rollLog('send message success: ' + message.localMsgId);
      }
    })();
    rollLog('start send message ...');
    chatClient.chatManager
      .sendMessageByagora(msg, callback)
      .then(() => {
        rollLog('send message: ' + msg.localMsgId);
      })
      .catch(reason => {
        rollLog('send fail: ' + JSON.stringify(reason));
      });
  };

  const GetchannelToken = async type => {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // let randomText = '';

    // for (let i = 0; i < 5; i++) {
    //   const randomIndex = Math.floor(Math.random() * characters.length);
    //   randomText += characters.charAt(randomIndex);
    // }
    // const channelName = uid.toString() + data.userId.toString() + randomText;

    try {
      // const res = await privateAPI.post('/agora/getRTCToken', {
      //   userId: uid.toString(),
      //   channelName: channelName,
      //   role: 2,
      //   expirationTimeInSeconds: 3600
      // });

      const tempChannelNmae = 'testdemo'; ///mannual generation
      const tempChannelToken =
        '007eJxTYHBbwfzmxLdY7oQlG9n7YnL7xKqC+BXtzrreuch8b4YWS6MCg4llsplFqpmxcaplskmiubGFqbFBkmGqsbmFoUWSuamlyW7XtIZARobePj5mRgYIBPE5GEpSi0tSUnPzGRgADxAeEA==';

      if (type === 'video') {
        navigation.navigate('VideoCallingScreen', {
          loginedUsername,
          remoteUserId: data.userId,
          userName: data.userName,
          loggedUserId: uid,
          channelToken: tempChannelToken,
          randomchannelName: tempChannelNmae,
        });
      } else {
        navigation.navigate('VoiceCalling', {
          loginedUsername,
          remoteUserId: data.userId,
          userName: data.userName,
          loggedUserId: uid,
          channelToken: tempChannelToken,
          randomchannelName: tempChannelNmae,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [openEmojiKeyboard, setOpenEmojiKeyboard] = useState(false);

  const handleEmojiSelect = emoji => {
    setContent(content + emoji.emoji);
  };

  const handleCloseEmojiPicker = () => {
    setOpenEmojiKeyboard(false);
  };

  if (uid) {
    return (
      <View style={styles.WholeScreen}>
        <View style={styles.WholeContentView}>
          <View style={styles.TopBar}>
            <Text style={styles.UsernameText}>{data.userName}</Text>
            <View style={styles.TopBarRightIcons}>
              <Ionicons
                name="call-outline"
                size={27}
                style={{ marginRight: 15 }}
                color="blue"
                onPress={() => GetchannelToken('voice')}
              />
              <AntDesign
                name="videocamera"
                size={27}
                color="blue"
                onPress={() => GetchannelToken('video')}
              />
            </View>
          </View>
          <ScrollView
            ref={scrollViewRef}
            style={styles.ScrollView}>
            {Object.values(chatMessageStatusm).map(item => (
              <View
                key={item.chatId}
                style={[
                  styles.MessageTextView,
                  {
                    justifyContent:
                      item.chatReceiverId === username
                        ? 'flex-end'
                        : 'flex-start',
                  },
                ]}>
                <Text
                  style={[
                    styles.MessageText,
                    {
                      borderTopRightRadius:
                        item.chatReceiverId === username ? 0 : 10,
                      borderTopLeftRadius:
                        item.chatReceiverId === username ? 10 : 0,
                      backgroundColor:
                        item.chatReceiverId === username
                          ? 'lightgrey'
                          : 'lightblue',
                    },
                  ]}>
                  {item.message}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.MessageEnteringView}>
            <Entypo
              name="emoji-flirt"
              size={30}
              color="blue"
              onPress={() => setOpenEmojiKeyboard(true)}
            />
            <TextInput
              multiline
              style={styles.MessageInput}
              placeholder="Message"
              placeholderTextColor={'grey'}
              onChangeText={text => setContent(text)}
              value={content}
              keyboardType="emoji"
            />

            {openEmojiKeyboard && (
              <EmojiPicker
                onEmojiSelected={handleEmojiSelect}
                open={openEmojiKeyboard}
                onClose={handleCloseEmojiPicker}
              />
            )}

            <TouchableOpacity style={styles.SendBTN} onPress={SaveMessages}>
              <FontAwesome name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};
// Sets UI styles.
const styles = StyleSheet.create({
  WholeScreen: {
    flex: 1,
  },
  WholeContentView: {
    flex: 1,
    justifyContent: 'center',
  },
  TopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    paddingVertical: 10,
    marginTop: 5,
  },
  TopBarRightIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  UsernameText: {
    color: 'black',
    fontSize: 15,
  },
  ScrollView: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 1,
  },
  MessageEnteringView: {
    width: '98%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  MessageInput: {
    color: 'black',
    fontSize: 17,
    borderColor: 'blue',
    borderWidth: 1,
    width: '75%',
    borderRadius: 5,
    paddingLeft: 15,
  },
  SendBTN: {
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 47,
    height: 47,
    flexDirection: 'row',
  },
  SendBTNText: {
    color: 'white',
    fontSize: 15,
  },

  MessageTextView: {
    flexDirection: 'row',
    width: '100%',
  },
  MessageText: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'lightblue',
    marginBottom: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
});

export default ChatScreen;
