import { View, Text, Alert, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StoryContainer } from 'react-native-stories-view';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateApi from "../../../api/privateAPI";
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Status = ({ route, navigation }) => {
  const [stories, setStories] = useState("");

  useEffect(() => {
    async function fetchStory() {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const { data } = await privateApi.get(`user/stories/getUserStories?userId=${userId}`);
        const splitStoryLinks = data.data.map(s => {
          if (s.fileOutputWebModel && s.fileOutputWebModel?.length !== 0)
            return s.fileOutputWebModel.map(i => i.filePath);
          return null;
        });
        const filteredStory = splitStoryLinks.filter(s => s).flat();
        console.log(`Filter Story Links - ${filteredStory}`);
        setStories(filteredStory);
      } catch (e) {
        console.log(`Failed Story -`, e);
      }
    }

    fetchStory();
  }, []);

  const handleStoriesComplete = () => {
    navigation.navigate('Homecontents'); // Adjust the route name as needed
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
        <StoryContainer
          visible
          extended
          images={stories}
          maxVideoDuration={30}
          onComplete={handleStoriesComplete}
        />
      </SafeAreaView>
      <View style={{ position: 'absolute', bottom: responsiveHeight(2),  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: responsiveWidth(50),backgroundColor:'black',opacity:responsiveWidth(0.1), borderRadius:responsiveHeight(1),left:responsiveWidth(5) }}>
        <TextInput
          placeholder="Comment Post"
          placeholderTextColor="#e6ecf5"
          multiline
          style={{ borderColor: 'black', borderRadius:responsiveHeight(1), width: '100%',  paddingLeft: 20, borderWidth: 2, fontSize: 20, color: 'black', left: responsiveWidth(3.5),fontWeight:"900", }}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
          <Feather name="navigation" style={{ fontSize: 30, color: 'white', right:responsiveWidth(6)}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Status;