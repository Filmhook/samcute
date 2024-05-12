import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, ImageBackground, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CountryPage = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchData = async () => {
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      const response = await axios.get('http://3.27.162.120:8080/filmhook-0.0.1-SNAPSHOT/masterData/getAllCountry', {
        headers: {
          Authorization: `Bearer ${jwt}`
        } 
      });
      const extractedData = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        filePath: item.filePath
      }));
      setCountries(extractedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const navigateToNextScreen = () => {
    // Extracting only the ids from selectedItems array
    const selectedIds = selectedItems.map(item => item.id);
    console.log('contry id', selectedIds)
    // Navigate to the next screen and pass selectedIds as a parameter
    navigation.navigate('Industry', { selectedIds });
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

  const Country = ({ id, name, description, filePath ,isSelected}) => (

    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
      <View style={styles.inputContainer}>
        <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Bg-IMG.png')} style={{
          left: responsiveWidth(3), width: responsiveWidth(17),
          height: responsiveHeight(8), justifyContent: 'center',
          borderRadius: responsiveWidth(25), alignItems: 'center',
        }} resizeMode='stretch'>
          <View >
            <Image source={{ uri: filePath }} style={{ height: responsiveHeight(6.5), width: responsiveWidth(12), borderRadius: responsiveWidth(30), bottom: responsiveHeight(0.2) }} resizeMode='stretch' />
          </View>
        </ImageBackground>
        <Text style={styles.title}>{description}</Text>
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
          style={styles.searchText}
          placeholder="Search..."
          placeholderTextColor='black'
          value={search}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <View style={{ paddingTop: '1%', width: '100%', height: '83%', alignItems: 'center', marginTop: '1%',}}>
        <FlatList
          data={countries.filter(item => item.description.toLowerCase().includes(search.toLowerCase()))}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}>
              <Country {...item} isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} />
            </TouchableOpacity>
          ) }
        />
      </View>
      <TouchableOpacity onPress={navigateToNextScreen} disabled={selectedItems.length === 0} style={styles.nextContainer}>
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
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
  checkmark: {
    position: 'absolute',
    top: responsiveHeight(3),
    right: responsiveWidth(6),
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  searchText: {
    borderWidth: 1,
    height: responsiveHeight(6),
    width: '100%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(3),
    color: 'black'
  },
  searchBar: {
    width: '95%',
    height: '8%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(9.2),
    width: responsiveWidth(87.5),
    margin: responsiveWidth(1)
  },
  title: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
    color: 'black',
    left: responsiveWidth(6),
  },
  button: {
    marginTop: responsiveHeight(1),
    backgroundColor: 'blue',
    padding: 2,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CountryPage;
