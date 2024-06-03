import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Dimensions, ImageBackground, ScrollView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PublicAPI from '../../../api/publicAPI';
const { height: windowHeight } = Dimensions.get('window');

export default function SignUpCountry() {

  const navigation = useNavigation();

  const [countryError, setCountryError] = useState('');
  const [stateError, setStateError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [birthPlaceError, setBirthPlaceError] = useState('');
  const [livingPlaceError, setLivingPlaceError] = useState('');

  const route = useRoute();
  const {
    name,
    selectedDate,
    selectedGender,
    middleName,
    lastName,

  } = route.params;


  const [birthPlace, setBirthPlace] = useState('');
  const [livingPlace, setLivingPlace] = useState('');
  const [birthPlaceSuggestions, setBirthPlaceSuggestions] = useState([]);
  const [livingPlaceSuggestions, setLivingPlaceSuggestions] = useState([]);
  const [birthPlaceQuery, setBirthPlaceQuery] = useState('');
  const [livingPlaceQuery, setLivingPlaceQuery] = useState('');


  useEffect(() => {
    if (birthPlaceQuery.length > 0) {
      fetchSuggestions(birthPlaceQuery, setBirthPlaceSuggestions);
    } else {
      setBirthPlaceSuggestions([]);
    }
  }, [birthPlaceQuery]);

  useEffect(() => {
    if (livingPlaceQuery.length > 0) {
      fetchSuggestions(livingPlaceQuery, setLivingPlaceSuggestions);
    } else {
      setLivingPlaceSuggestions([]);
    }
  }, [livingPlaceQuery]);

  const fetchSuggestions = async (searchText, setSuggestions) => {
    try {
      const response = await PublicAPI.post('user/getAddressListOnSignUp', {});
      const filteredData = response.data.filter(item => item.address.toLowerCase().includes(searchText.toLowerCase()));
      setSuggestions(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (place, setPlace, clearQuery) => {
    setPlace(place.address);
    clearQuery('');
    setBirthPlaceSuggestions([]);
    setLivingPlaceSuggestions([]);
  };


  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);


  const handlePressNav = () => {
    let isError = false;
  
    // Validation for name, selectedDate, selectedGender, middleName, lastName
    if (!name || !selectedDate || !selectedGender || !middleName || !lastName) {
      // Handle the error, e.g., show an error message
      isError = true;
    }
  
    // Validation for birthPlace
    if (!birthPlace) {
      setBirthPlaceError('Please select a birth place.');
      isError = true;
    } else {
      setBirthPlaceError('');
    }
  
    // Validation for livingPlace
    if (!livingPlace) {
      setLivingPlaceError('Please select a living place.');
      isError = true;
    } else {
      setLivingPlaceError('');
    }
  
    // Navigate to next screen if there are no errors
    if (!isError) {
      navigation.navigate('SignUpTwo', {
        name,
        selectedDate,
        selectedGender,
        middleName,
        lastName,
        birthPlace,
        livingPlace,
      });
    }
  };
  


  console.log(name,
    selectedDate,
   
    selectedDistrict,
    middleName,
    lastName,)









  return (
    <View style={styles.container}>

      <ScrollView>
        <View style={styles.formContainer}>


          <View style={styles.headerContainer}>
            <Image style={{
              height: responsiveHeight(21),
              width: responsiveWidth(41), alignSelf: 'center'
            }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

          </View>
          {/* <View style={styles.titleContainer}> */}
          <Text style={styles.header}>Welcome to </Text>
          {/* </View> */}
          <View style={{ height: responsiveHeight(8), width: responsiveWidth(85), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center', }}>
            <Image style={{ height: responsiveHeight(7), width: responsiveWidth(85) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />

          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ width: responsiveWidth(83), }}>
              <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: 'black' }}>Your birth place?</Text>

            </View>


            <View style={styles.boxContent2}>
              <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">


                <TextInput
                  style={styles.input}
                  value={birthPlace}
                  onChangeText={(text) => {
                    setBirthPlace(text);
                    setBirthPlaceQuery(text);
                  }}
                />

              </ImageBackground>
            </View>
            {birthPlaceError ? <Text style={styles.errorMessage}>{birthPlaceError}</Text> : null}
            {birthPlaceQuery.length > 0 && (
              <FlatList
                data={birthPlaceSuggestions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item, setBirthPlace, setBirthPlaceQuery)}>
                    <Text style={styles.suggestion}>{item.address}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionContainer}
                contentContainerStyle={styles.suggestionContentContainer}
              />
            )}


            <View style={{ width: responsiveWidth(83), }}>
              <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: 'black' }}>Your Living place?</Text>

            </View>
            <View style={styles.boxContent2}>
              <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                <TextInput
                  style={styles.input}
                  value={livingPlace}
                  onChangeText={(text) => {
                    setLivingPlace(text);
                    setLivingPlaceQuery(text);
                  }}
                />
              </ImageBackground>
            </View>
            {livingPlaceError ? <Text style={styles.errorMessage}>{livingPlaceError}</Text> : null}
            {livingPlaceQuery.length > 0 && (
              <FlatList
                data={livingPlaceSuggestions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item, setLivingPlace, setLivingPlaceQuery)}>
                    <Text style={styles.suggestion}>{item.address}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionContainer}
                contentContainerStyle={styles.suggestionContentContainer}
              />
            )}



            <View style={{ flexDirection: 'row', margin: responsiveHeight(4), columnGap: responsiveWidth(23), marginTop: responsiveHeight(3) }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressNav} style={styles.nextButton}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>STEP 4 OF 4</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',

    width: '100%',
    height: '100%'


  },
  errorMessage: {
    color: 'red',
    right: responsiveWidth(20),
    bottom: responsiveHeight(1.8),

    //  marginBottom: 5,
  },
  selectContainer: {
    marginBottom: 20,
  },
  picker: {
    width: responsiveWidth(87),
    borderRadius: 8,
    height: responsiveHeight(7),
    borderCurve: responsiveWidth(2),
    color: "#333",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2)
    // backgroundColor:'red',

  },
  boxContent2: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(86),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    // borderWidth: responsiveWidth(0.3),
    color: 'black',
    margin: 1,



  },
  boxContent: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(86),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    // borderWidth: responsiveWidth(0.3),
    color: 'black',
    margin: 1,



  },
  selectListBackground: {
    width: responsiveWidth(86),
    height: responsiveHeight(8.3),
    marginTop: responsiveWidth(4),
    marginBottom: responsiveWidth(2),
    resizeMode: 'cover', // or 'contain' depending on your preference
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8.4),
    width: responsiveWidth(86.7),
    margin: responsiveWidth(1),
    color: 'black',
    resizeMode: 'contain',
    zIndex: -1

  },
  changeinputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(45),
    height: responsiveHeight(6.1),
    borderRadius: responsiveWidth(2),
    // borderWidth: responsiveWidth(0.2),
    color: "black",
    overflow: "hidden",

  },
  // selectinputContainer:{
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: responsiveWidth(85),
  //   height: responsiveHeight(8),
  //   marginTop:responsiveWidth(4),
  //   marginBottom:responsiveWidth(2),
  // },
  formContainer: {
    width: '100%',

    // padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),

  },
  headerContainer: {
    height: responsiveHeight(22),
    width: responsiveWidth(35),
    bottom: responsiveHeight(1),
    // borderWidth: 1

  },

  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(83),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(5.5),
    backgroundColor: 'transparent'


  },
  header: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: 'bold',
    // bottom: responsiveHeight(8.5),
    color: '#1e1ff5',
    fontFamily: 'ArianaVioleta-dz2K',
    textAlign: 'center',

  },
  menuTrigger: {
    fontSize: 24,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {

    height: responsiveHeight(6),
    borderColor: 'black',
    width: '90%',
    fontSize: responsiveFontSize(2),
    // right: responsiveWidth(2),
    color: 'black',
    fontWeight: '500'
  },

  datePickerButton: {

    backgroundColor: 'black',
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',

    width: responsiveWidth(35),
    width: '35%',
    //paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(6),
    borderWidth: responsiveWidth(0.6)
  },
  selectedDateContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(6),
    width: responsiveWidth(46),

    // shadowOffset: { width: 1, height: 4 }, // Shadow offset
    // shadowOpacity: 0.6, // Shadow opacity
    // shadowRadius: 2, // Shadow radius
    // elevation: 1,
    // shadowColor: 'gray',

  },
  selectedDateText: {
    fontSize: responsiveFontSize(2.1),
    color: "black"
  },

  nextButton: {
    backgroundColor: '#616161',
    // padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    borderWidth: responsiveWidth(0.6),
    borderColor: 'black'
    //bottom: responsiveHeight(1.5)
  },
  backButton: {
    backgroundColor: 'black',
    // padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    //bottom: responsiveHeight(1.5)

  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: responsiveFontSize(2)

  },
  IndustryButton: {
    width: responsiveWidth(20),
    //bottom: responsiveHeight(3.5),
    // left: responsiveWidth(55),

  },
  suggestionContainer: {
   // backgroundColor: '#d3d3d3', // Light gray color
    borderRadius: 5,
    marginVertical: 5,
    maxHeight: windowHeight * 0.4, // 40% of the window height
},
suggestionContentContainer: {
    paddingBottom: 8,
},
suggestion: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:'black'
},


})