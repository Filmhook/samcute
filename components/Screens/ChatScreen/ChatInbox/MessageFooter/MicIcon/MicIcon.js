import React,{useState,useEffect} from 'react'
import { StyleSheet, TouchableOpacity,Image, View,Button} from 'react-native'
//import AudioRecorderPlayer from 'react-native-audio-recorder-player'

export default function Micicon() {
  // const [recordingStatus, setRecordingStatus] = useState('idle');

  // //Create a function to start recording:
  // const startRecording = async () => {
  //       try {
  //         const audioRecorder = new AudioRecorderPlayer();
  //         await audioRecorder.prepare();
  //         await audioRecorder.startRecording();
  //         setRecordingStatus('recording');
  //       } catch (error) {
  //         console.log(error);
  //       }
  //   }

  // //Create a function to stop recording:
  // const stopRecording = async () => {
  //         try {
  //           const audioRecorder = new AudioRecorderPlayer();
  //           await audioRecorder.stopRecording();
  //           const audioFile = await audioRecorder.getRecordedFile();
  //           setRecordingStatus('idle');
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       };
      
  // //Create a function to render the button:
  //     const renderButton = () => {
  //       if (recordingStatus === 'idle') {
  //         return <Button title="Record" onPress={startRecording}  style={style.micimage}/>;
  //       } else if (recordingStatus === 'recording') {
  //         return <Button title="Stop" onPress={stopRecording} style={style.micimage}/>;
  //       } else {
  //         return <Button title="Play" onPress={() => {}} />;
  //       }
  //     };

  return (
   <>
    <TouchableOpacity>
          <Image source={require("../../../../../../components/Assets/Chats_Icon_And_Fonts/mic_icon.png")} style={style.micimage}/>
     </TouchableOpacity>
     {/* <View>
           { renderButton() }
     </View> */}
   </>
  )
}

const style = StyleSheet.create({
      micimage:{
        width:40,
        height:40,
        marginTop:15,
        marginLeft:10
      }
  })
  