import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, Dimensions, useWindowDimensions, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { error } from 'console';
import privateAPI from '../../api/privateAPI';

const India = ({route}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const { selectedIds } = route.params;

  console.log('selected ', selectedIds)

  const [industries, setIndustries] = useState([]);

  //console.log('indusss', industries)

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const jwt =await AsyncStorage.getItem('jwt');
     

      const response = await privateAPI.post('user/getIndustryByCountry', {
        countryIds: selectedIds // Assuming 78 is the ID for the country
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` // Add your bearer token here
        }
      });
  
      if (response.data.status === 1) {
        setIndustries(response.data.data[0].industryList);
      }
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const india = [
    {
      id: '1',
      industry: 'KOLLYWOOD',

      // companyLogo: require('..//Screenshot_2023-11-13_085839-removebg-preview.png'),
      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Tamil-Nadu-PhotoRoom.png'),

      state: 'TN'


    },
    {
      id: '2',
      industry: 'BHOJIWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/bihar-PhotoRoom.png'),
      state: 'BR'

    },

    {
      id: '3',
      industry: 'CHHOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Chhattisgarh-PhotoRoom.png'),
      state: 'CH'

    },
    {
      id: '4',
      industry: 'KONKANI CINEMA',
      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Goa.png'),
      state: 'GA'
    },


    {
      id: '5',
      industry: 'DHOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-gujarat-PhotoRoom.png'),
      state: 'GJ'

    },
    // {
    //   id: '6',
    //   profession: 'MAKEUP&AIR STYLISTRODUCER',

    //   companyLogo: require('./components/images/cameraicon.png'),

    // },
    {
      id: '7',
      industry: 'HARYANVI CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Haryana-PhotoRoom.png'),
      state: 'HR'

    },
    {
      id: '8',
      industry: 'PAHARIWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-himachal-pradesh.png'),
      state: 'HP'

    },
    {
      id: '6',
      industry: 'PAHARIWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-J_K-PhotoRoom.png'),
      state: 'JK'

    },
    {
      id: '9',
      industry: 'JHOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-JH.png'),
      state: 'JH'

    },
    {
      id: '10',
      industry: 'SANDALWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-KALR-PhotoRoom.png'),
      state: 'KA'

    },
    {
      id: '11',
      industry: 'COASTALWOOD',  //Replaced name ,spell mistake on wireFrame

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Coastal-KA-PhotoRoom.png'),
      state: 'KA'

    },
    {
      id: '12',
      industry: 'KONKANI CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Coorg-KA-PhotoRoom.png'),
      state: 'KA'

    },
    {
      id: '13',
      industry: 'MOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-KL-PhotoRoom.png'),
      state: 'KL'

    },
    {
      id: '14',
      industry: 'BOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Mumbai-PhotoRoom.png'),
      state: 'MH'

    },
    {
      id: '15',
      industry: 'MOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-maharashtra-PhotoRoom.png'),
      state: 'MH'

    },
    {
      id: '16',
      industry: 'OLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-orissa-PhotoRoom.png'),
      state: 'OR'

    },
    {
      id: '17',
      industry: 'POLLYWOOD',
      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Punjab-PhotoRoom.png'),
      state: 'PB'

    },
    {
      id: '18',
      industry: 'RAJJYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-RJ-PhotoRoom.png'),
      state: 'RJ'

    },
    {
      id: '19',
      industry: 'TOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Hyderabad-PhotoRoom.png'),
      state: 'TS'

    },
    {
      id: '20',
      industry: 'TOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Andhra-Pradesh-PhotoRoom.png'),
      state: 'AP'

    },
    {
      id: '21',
      industry: 'UTHARKHAND CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-UK-PhotoRoom.png'),
      state: 'UK'

    },

    {
      id: '23',
      industry: 'BENGALI CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-WB-PhotoRoom.png'),
      state: 'WB'

    },




  ];

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
    // const selectedIndIds=[1];
    // const selectedIds=[78];
    // navigation.navigate('ScreenOne', {selectedIndIds, selectedIds})


  //  Log selected items to console
    const selectedIndIds=selectedItems.map(item=> item.id)
    console.log("Selected Items:", selectedItems.map(item=> item.id));


    // Pass selected items to the next screen
    //navigation.navigate('NextScreen', { selectedItems });
    navigation.navigate('ScreenOne', {selectedIndIds, selectedIds})

  };

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
          data={industries.filter((item) => item.industryName.toLowerCase().includes(search.toLowerCase()))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}>
              <IndustryList industryName={item.industryName}
                image= {item.iconFilePath}
                stateCode={item.stateCode} isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity onPress={handleNext} 
      disabled={selectedItems.length === 0} 
      style={styles.nextContainer}>
        <Text style={styles.next} >Next</Text>
      </TouchableOpacity>
    </View>
  );
};

console.log('image',  )

const IndustryList = ({ industryName, image, stateCode, isSelected }) => (

 
  <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
    <View style={styles.inputContainer}>
      <View style={styles.imageContainer} >
        <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Bg-IMG.png')} style={styles.imgbg} resizeMode='stretch'>
          <Image source={{ uri: image}} style={styles.photo} resizeMode='stretch' />
        </ImageBackground>
        <View style={styles.state}>
          <Text style={styles.stateText}>{stateCode}</Text>
        </View>
      </View>
      <Text style={styles.title}>{industryName}</Text>
      {isSelected && (
        <Image
          source={require('../../Assets/Login_page/greenTickmark-FilmHook.png')} // Path to your checkmark icon
          style={styles.checkmark}
        />
      )}
    </View>
  </ImageBackground>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  checkmark: {
    position: 'absolute',
    top: responsiveHeight(3),
    right: responsiveWidth(6),
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  searchBar: {
    width: '100%',
    height: '8%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'lightblue', // Change this to the desired selected background color
  },
  textInput: {
    borderWidth: 1,
    width: '95%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(5)
  },
  imageContainer: {
    left: responsiveWidth(3),
    width: responsiveWidth(16),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    paddingTop: '1%'
  },
  box: {
    // Your box styles
  },
  logo: {
    backgroundColor: '#E9E5E5',
    bottom: responsiveHeight(0.4)
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    left: responsiveWidth(6),
  },
  photo: {
    width: responsiveWidth(13),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(25),
    top: responsiveHeight(0.9),
    left: responsiveWidth(1.5),
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
  state: {
    position: 'absolute',
    borderRadius: responsiveWidth(1.5),
    height: responsiveHeight(2),
    width: responsiveWidth(7),
    backgroundColor: '#1c00d6',
    top: responsiveHeight(6),
    left: responsiveWidth(4.5),
  },
  stateText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
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
  imgbg: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
  }
});


export default India;