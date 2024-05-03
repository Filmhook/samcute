import { View, Text, Alert, SafeAreaView } from 'react-native';
//import { StoryContainer } from 'react-native-stories-view';
import {useEffect, useState, useRef} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateApi from "../../../api/privateAPI";
import {StoryContainer} from 'react-native-story-view';

const Status = ({ route, navigation }) => {
const multiStoryRef = useRef(null)
const [stories , setStories] = useState("")
const renderImage = ['https://i1.sndcdn.com/artworks-IrhmhgPltsdrwMu8-thZohQ-t500x500.jpg' , 'https://i.pinimg.com/originals/8e/27/58/8e2758477b11d7c44d8defe9bf08ffb6.jpg']

useEffect(() => {

async function fetchStory(){
try{
const userId = await AsyncStorage.getItem("userId");
const {data} = await privateApi.get(`user/stories/getUserStories?userId=${userId}`)

const splitStoryLinks = data.data.map(s => {
if(s.fileOutputWebModel && s.fileOutputWebModel?.length !== 0)
    return s.fileOutputWebModel.map(i => ({url : i.filePath, type : s.type.toLowerCase()}))
return null
})
const filteredStory = splitStoryLinks.filter(s => s).flat();
console.log(`Filter Story Links - ${JSON.stringify(filteredStory)}`)
setStories(filteredStory)
}catch(e){
console.log(`Failed Story -`, e)
}
}

fetchStory()
} , [])

    return (
      <View style={{ flex : 1 }}>
       <SafeAreaView style={ {

                                backgroundColor: 'black',
                                flex: 1,
                              }}>

{
stories && <StoryContainer visible={true} extended={true} maxVideoDuration={10} ref={multiStoryRef} stories={stories}  />
}

              </SafeAreaView>
      </View>
    );
  };

export default Status;


//                <StoryContainer
//                  visible
//                  extended
//                  images={stories}
//                  maxVideoDuration={10}
//                />