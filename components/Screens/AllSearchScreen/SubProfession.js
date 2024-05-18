import React, { useEffect } from "react";

import { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, searchQuery, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import privateAPI from "../../api/privateAPI";


const SubProfession = ({route}) => {

    const {selectedIndIds, selectedIds, selectedProfessionId, platfornId}= route.params;

  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [subProfession, setSubProfession] = useState([]);

  // const { selectedIndIds, selectedIds, selectedProfessionId, platfornId } = route.params;

  useEffect(() => {
    fetchSubProfession();
  }, []);

  const fetchSubProfession = async () => {
    try {
      const jwt = await AsyncStorage.getItem('jwt');
  
      if (!jwt) {
        throw new Error('JWT token not found');
      }
  
      const response = await privateAPI.post(
        'user/getSubProfessionByProfession',
        {
          professionIds: selectedProfessionId
        }
       
      );
  
      const responseData = response.data;
      if (responseData.status === 1) {
        console.log('Sub-professions:', responseData.data[0].subProfessionList);
        setSubProfession(responseData.data[0].subProfessionList);
      } else {
        console.error('Unexpected response status:', responseData.status);
      }
    } catch (error) {
      console.error('Error fetching sub-professions:', error);
    }
  };

  const jobPosts = [
    {
      id: 1,
      profession: 'DIRECTOR',
    },
    {
      id: '2',
      profession: 'CO-DIRECTOR',
    },
    {
      id: '3',
      profession: 'ASSISTANT DIRECTOR',
    },

    {
      id: '4',
      profession: 'ASSOCIATE DIRECTOR',
    },
    {
      id: '5',
      profession: 'SECOND UNIT DIRECTOR',
    },



  ];

  const JobPosts = ({ subProfessionName , isSelected }) => (
    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{subProfessionName}</Text>
      </View>
      {isSelected && (
        <Image
          source={require('../../Assets/Login_page/greenTickmark-FilmHook.png')} // Path to your checkmark icon
          style={styles.checkmark}
        />
      )}
    </ImageBackground>

  );

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
    // Log selected items to console
    const selectedSubProfession=selectedItems.map(item=> item.id)
    console.log("Selected Items:", selectedSubProfession);


    // Pass selected items to the next screen
    //navigation.navigate('NextScreen', { selectedItems });
    navigation.navigate('UserData', {selectedIndIds, selectedIds, selectedProfessionId, platfornId,selectedSubProfession})

  };

  const [select, setSelect] = useState(jobPosts)
  // const handleOnPress = (item) => {
  //   const newItem = select.map((value) => {
  //     if (item.profession == 'DIRECTOR') {
  //       return (
  //         navigation.navigate("Director")
  //       )
  //     }
  //     if (item.profession == 'CO-DIRECTOR') {
  //       return (
  //         navigation.navigate("Director")
  //       )
  //     }
  //     if (item.profession == 'ASSISTANT DIRECTOR') {
  //       return (
  //         navigation.navigate("Director")
  //       )
  //     }

  //     if (item.profession == 'ASSOCIATE DIRECTOR') {
  //       return (
  //         navigation.navigate("Director")
  //       )
  //     }
  //     if (item.profession == 'SECOND UNIT DIRECTOR') {
  //       return (
  //         navigation.navigate("Director")
  //       )
  //     }

  //   }
  //   )
  //   setSelect(newItem)


  // }

  return (
    <View style={styles.container}>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Search..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={subProfession.filter((item) => ((item.subProfessionName).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}

          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}>
              <JobPosts subProfessionName={item.subProfessionName}
               
               isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} />
            </TouchableOpacity>
          )}
        // style={{margin:5}}
        />


      </View>
      <TouchableOpacity onPress={handleNext} disabled={selectedItems.length === 0} style={styles.nextContainer}>
        <Text style={styles.next} >Next</Text>
      </TouchableOpacity>
    </View>

  )


};

export default SubProfession;

const styles = StyleSheet.create({

  content: {
    margin: responsiveWidth(2),
    width: responsiveWidth(75),
    height: responsiveHeight(6),
    marginTop: responsiveHeight(2)

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(9.2),
    width: responsiveWidth(87.5),
    margin: responsiveWidth(1),
    justifyContent: 'center',


  },
  searchBar: {
    width: '100%',
    height: '8%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: '95%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(5)
  },
  nextContainer: {
    width: responsiveWidth(20), borderWidth: 1, alignItems: 'center', justifyContent: 'center', height: responsiveHeight(4), borderRadius: responsiveWidth(3), backgroundColor: '#1c00d6',
    left: responsiveWidth(34), margin: responsiveHeight(1)
  },
  next: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: responsiveFontSize(2)
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  checkmark: {
    position: 'absolute',
    top: responsiveHeight(3),
    right: responsiveWidth(6),
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },

  flatListContainer: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    borderWidth:1
  },

  // box: {

  //     width: responsiveWidth(95),
  //     height: responsiveHeight(9),
  //     margin: responsiveHeight(0.3),
  //     borderRadius: responsiveWidth(5),
  //     backgroundColor: '#fff',
  //     borderWidth: 1,
  //     alignContent:'center'
  // },

  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',

  },

});

