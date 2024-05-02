import { View, Text, Alert, SafeAreaView } from 'react-native';
import { StoryContainer } from 'react-native-stories-view';
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateApi from "../../../api/privateAPI"

const Status = ({ route, navigation }) => {
const [stories , setStories] = useState("")
const renderImage = ['https://i1.sndcdn.com/artworks-IrhmhgPltsdrwMu8-thZohQ-t500x500.jpg' , 'https://i.pinimg.com/originals/8e/27/58/8e2758477b11d7c44d8defe9bf08ffb6.jpg']

useEffect(() => {

async function fetchStory(){
try{
const userId = await AsyncStorage.getItem("userId");
const {data} = await privateApi.get(`user/stories/getUserStories?userId=${userId}`)
const splitStoryLinks = data.data.map(s => {
if(s.fileOutputWebModel && s.fileOutputWebModel?.length !== 0)
    return s.fileOutputWebModel.map(i => i.filePath)
return null
})
const filteredStory = splitStoryLinks.filter(s => s).flat();
console.log(`Filter Story Links - ${filteredStory}`)
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
                <StoryContainer
                  visible
                  extended
                  images={stories}
                  maxVideoDuration={30}
                />
              </SafeAreaView>
      </View>
    );
  };

export default Status;