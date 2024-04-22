// Imports dependencies.
import React, { useEffect, useState } from 'react';
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



import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Defines the App object.

import { useRoute } from '@react-navigation/native'; // Import useRoute hook
import privateAPI from '../api/privateAPI';


//const loginedUserToken = '007eJxTYNgVsbfgs0/41lNCm7Qys3Mb/jYanPrHsO7m+pTKZVkxxdsVGCwSU81NTc2AhJGFSUpysoWBoYlFokmqmaGZiZmJuWn7XKW0hkBGhuz4b8yMDKwMjEAI4qswpKYYppoaJRvopqWaJeoaGqam6lqamSbrmpuaJBsZJptaGicaAgD4UihU';
// const Ruby = '007eJxTYHjW6TRh1r5tN37v2XDj8P9vjc/2BxZ45x3Qf5695vGuyHOHFBgsElPNTU3NgISRhUlKcrKFgaGJRaJJqpmhmYmZibnp/p+KaQ2BjAxV/DVMjAysDIxACOKrMBgZGKSYpqQZ6KYlpxjrGhqmpuomWqak6CaZGpiZpyUlJwNlAca+LSI=';

const ChatScreen = (navigation) => {
  


  const route = useRoute();
  const { data } = route.params;
  // Defines the variable.
  const title = 'chat';
  // Replaces <your appKey> with your app key.
  const appKey = '611133509#1318257';
  // Replaces <your userId> with your user ID.
  const username = data.userId// userid
  // Replaces <your agoraToken> with your Agora token.
  const [chatToken, setChatToken] = React.useState(null);
  const [targetId, setTargetId] = React.useState(3);
  const [content, setContent] = React.useState('');
  const [logText, setWarnText] = React.useState('Show log area');
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;
  const [chatMessageStatusm, setChatMessageStatus] = React.useState([]);

 // console.log(username)
  // Outputs console logs.
  useEffect(() => {

    // get chatToken from server

    logText.split('\n').forEach((value, index, array) => {
      if (index === 0) {
        console.log(value);
      }
    });

  }, [logText]);



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
    setContent('')
    try {
      const res = await privateAPI.post('/chat/saveMessage', {
        message: content,
        chatCreatedBy: 3,
        chatCreatedOn: new Date(),
        userType: "commonUser",
        timeStamp: new Date(),
        chatSenderId: 3,
        chatReceiverId: username,
        chatIsActive: true,

      });
      console.log(res.data)
      GetAllMessages()
    } catch (error) {
      console.error(error)
    }


  }
  const GetAllMessages = async () => {
    try {
        const senderId = await AsyncStorage.getItem("userId")
      const res = await privateAPI.post('/chat/getMessageByUserId', {
      chatReceiverId:username
      });
      console.log(res.data)
      console.log("fetching msg")
      setChatMessageStatus(res.data)
    } catch (error) {
    console.log("error during fetch msg")
      console.error(error)
    }

  }
  useEffect(() => {
    GetAllMessages()
    login()
    // Registers listeners for messaging.
    const setMessageListener = () => {
      let msgListener = {
        onMessagesReceived(messages) {
        console.log(messages)
          for (let index = 0; index < messages.length; index++) {

            rollLog('received msgId: ' + JSON.stringify(messages[index].body.content));

            //Save recieved messages
            const res = privateAPI.post('/chat/saveMessage', {
              message: JSON.stringify(messages[index].body.content),
              chatCreatedBy: 3,
              chatCreatedOn: new Date(),
              userType: "commonUser",
              timeStamp: new Date(),
              chatSenderId: username,
              chatReceiverId: 3,
              chatIsActive: true,

            });
            GetAllMessages()

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
      .loginWithAgoraToken(username, chatToken
      )
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
    console.log(username,
      content,)

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

  // Renders the UI.
  return (
    <View style={styles.WholeScreen}>

      <View style={styles.WholeContentView}>
        <ScrollView style={styles.ScrollView}>
          {chatMessageStatusm?.data?.userChat?.map((item,) => (
            <View key={item.chatId} style={[styles.MessageTextView, {
              justifyContent: item.chatReceiverId === username ? 'flex-end' : 'flex-start',
            }]}>

              <Text style={[styles.MessageText, {

                borderTopRightRadius: item.chatReceiverId === username ? 0 : 10,
                borderTopLeftRadius: item.chatReceiverId === username ? 10 : 0
                , backgroundColor: item.chatReceiverId === username ? '#a2a2a6' : 'lightblue'
              }]}  >{item.message}</Text>
            </View>
          ))}
        </ScrollView>


        <View style={styles.MessageEnteringView}>

          <TextInput
            multiline
            style={styles.MessageInput}
            placeholder="Message"
            placeholderTextColor={'grey'}
            onChangeText={text => setContent(text)}
            value={content}
          />
          <TouchableOpacity style={styles.SendBTN} onPress={SaveMessages}  >
            <FontAwesome name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View >

    </View >
  );
};
// Sets UI styles.
const styles = StyleSheet.create({
  WholeScreen: {
    flex: 1,
  //  borderWidth:1,
    marginTop:6
  },
  WholeContentView: {
    flex: 1,
    justifyContent: 'center'
  },
  ScrollView: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 1,

  },
  MessageEnteringView: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
   // borderWidth:1
  },
  MessageInput: {
    color: 'black',
    fontSize: 15,
    borderColor: 'gray',
    borderEndEndRadius:4,
    borderWidth: 1,
    width: '85%',
    borderRadius: 15,
    paddingLeft: 15
  },
  SendBTN: {
    backgroundColor: '#5e5ec6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 47,
    height: 47,
    flexDirection: 'row',

  },
  SendBTNText: {
    color: 'white',
    fontSize: 15
  },

  MessageTextView: {
    flexDirection: 'row',
    width: '100%',
    marginTop:1,
   
  },
  MessageText: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'lightblue',
    marginBottom: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderTopLeftRadius: 0

  }
});

export default ChatScreen;


