import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, ImageBackground, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import privateAPI from "../../api/privateAPI";

const Timeline = ({route}) => {

  const {selectedIndIds, selectedIds, platfornId}= route.params;

  console.log("selectedIndIdsTimeline",selectedIndIds )
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [professions, setProfessions]= useState([]);



  useEffect(() => {
    fetchProfession();
  }, []);

 const fetchProfession = async () => {
  try {
    const jwt = await AsyncStorage.getItem('jwt');

    if (!jwt) {
      throw new Error('JWT token not found');
    }

    const response = await privateAPI.post(
      'user/getProfessionByPlatform',
      { platformId: platfornId }, // Ensure platformId is defined and correct
      
    );

    const responseData = response.data;
    if (responseData.status === 1) {
      setProfessions(responseData.data[0].professionList);
    } else {
      console.error('Unexpected response status:', responseData.status);
    }
  } catch (error) {
    console.error('Error fetching professions:', error);
  }
};
  const handleOnPress = (item) => {
    // Check if item is already selected
    const index = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);

    if (index === -1) {
      // If item is not selected, add it to the selected items list
      setSelectedItems([...selectedItems, item]);
    } else {
      // If item is already selected, remove it from the selected items list
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(index, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };
  const handleNext = () => {
    const selectedProfessionId=selectedItems.map(item=> item.id)
    console.log("Selected ItemsProfes:", selectedItems.map(item=> item.id));


    // Pass selected items to the next screen
    //navigation.navigate('NextScreen', { selectedItems });
    navigation.navigate('SubProfession', {selectedIndIds, selectedIds, selectedProfessionId, platfornId, })
  };

  const JobPost = ({professionName, image, isSelected }) => (
    
      <ImageBackground style={ styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
        <View style={styles.inputContainer}>
          <View style={styles.logowithText}>
            <View style={styles.imageContainer}>
              <Image source={{uri:image }} style={styles.photo} resizeMode="stretch" />
            </View>
            <Text style={styles.title}>{professionName}</Text>
          </View>
          {isSelected && (
        <Image
          source={require('../../Assets/Login_page/greenTickmark-FilmHook.png')} // Path to your checkmark icon
          style={styles.checkmark}
        />
      )}
        </View>
      </ImageBackground>
    
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor='black'
          placeholder="Search..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={professions.filter((item) => item.professionName.toLowerCase().includes(search.toLowerCase()))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}>
              <JobPost professionName={item.professionName}
                image= {item.iconFilePath}
                isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity  onPress={handleNext} disabled={selectedItems.length === 0}  style={styles.nextContainer}>
      <Text style={styles.next} >Next</Text>
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchBar: {
    width: '95%',
    height: '8%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  textInput: {
    borderWidth: 1,
    width: '98%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(5),
  
  },
  imageContainer: {
    left: responsiveWidth(3),
    width: responsiveWidth(17),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(35),
   
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  flatListContainer: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    marginTop: '1%',
  },
    nextContainer:{
    width:responsiveWidth(20), borderWidth:1,alignItems:'center', justifyContent:'center', height:responsiveHeight(4), borderRadius:responsiveWidth(3), backgroundColor:'#1c00d6',
    left:responsiveWidth(34), margin:responsiveHeight(1)
  },
  next: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize:responsiveFontSize(2)
  },
  checkmark: {
    position: 'absolute',
    top: responsiveHeight(3),
    right: responsiveWidth(6),
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  logowithText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(75),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    left: responsiveWidth(6),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(9.2),
    width: responsiveWidth(87.5),
    margin: responsiveWidth(1),
 
  },
  photo: {
    width: responsiveWidth(15.5),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(35),
    borderColor: 'black', // Example border color
  }
});


export default Timeline;