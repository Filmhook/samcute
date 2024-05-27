import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, FlatList, TextInput, Image, Alert, useColorScheme, } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-crop-picker';

import RazorpayCheckout from 'react-native-razorpay';
import { SelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../api/privateAPI';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { DefaultTheme, DarkTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { color } from 'react-native-elements/dist/helpers';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function SOne() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // Ensure theme object exists and has colors property
  const { colors } = theme || {};

  // If theme or colors is undefined, provide default values
  const backgroundColor = colors ? colors.background : 'white';
  const textColor = colors ? colors.text : 'black';




  const [selected, setSelected] = useState('');

  const [profilepic, setProfilepic] = useState(null);

  const navigation = useNavigation();

  const [auditionDetails, setAuditionDetails] = useState([]);
  const [selectedAuditionTitle, setSelectedAuditionTitle] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);// State variable to hold audition details

  useEffect(() => {
    // Fetch audition details from the API when component mounts
    fetchAuditionDetails();
  }, []);

  const fetchAuditionDetails = async () => {
    try {
      const response = await privateAPI.post('audition/getAuditionDetails', {

      }); // Replace 'your_api_url_here' with your actual API endpoint
      setAuditionDetails(response.data); // Update state with fetched audition details
    } catch (error) {
      console.error('Error fetching audition details:', error);
    }
  };


  const edit_profile_pic = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const profilepic = response.assets[0]; // Access the first element of the assets array
        if (profilepic) {
          setProfilepic({ uri: profilepic.uri, type: profilepic.type, name: profilepic.fileName });
        }
      }
    });
  };

  const [selectedLabel, setSelectedLabel] = useState('Accounts Team');
  const [address, setAddress] = useState('');
  // const [Roles,setRoles]=useState('');
  const [items, setItems] = useState('');

  const [Message, setMessage] = useState(null);



  console.log(selectedAuditionTitle, selectedExperience, address, items, subProfessionSearchValue, selectedDate)
  const post = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem("jwt");
      const FhCode = await AsyncStorage.getItem('FhCode');



      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwt);

      const formData = new FormData();
      formData.append("auditionCreatedBy", id);
      formData.append("auditionPostedBy", FhCode);
      formData.append("auditionTitle", selectedAuditionTitle);
      formData.append("auditionExperience", selectedExperience);
      // formData.append("auditionCategory", selectedGender);
      formData.append("auditionExpireOn", selectedDate);
      formData.append("fileInputWebModelcategory", "Audition");
      formData.append("auditionAddress", address);
      formData.append("auditionMessage", Message);
      formData.append('auditionRoles', items);
      formData.append('auditionLocation', subProfessionSearchValue);


      if (profilepic) {
        const imageUriParts = profilepic.uri.split('.');
        const fileType = imageUriParts[imageUriParts.length - 1];
        formData.append("fileInputWebModel.files[0]", {
          uri: profilepic.uri,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch('https://filmhook.annularprojects.com/filmhook-0.1/audition/saveAudition', {
        method: 'POST',
        body: formData,
        headers: myHeaders
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('posted', responseData);
        Alert.alert('Posted successfully');
        makePayment();
        navigation.navigate('SearchBars');
      } else {
        console.log('Response Error:', response.status);
        Alert.alert('Posted unsuccessfully');
      }
    } catch (error) {
      console.log('Error response', error);
      Alert.alert('Posted unsuccessfully');

      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
        console.log('Headers:', error.response.headers);
      }
    }
  };



  const makePayment = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_DN4L6WbNtUJb5f',
      amount: '100',
      method: {
        netbanking: true,
        card: true,
        upi: true
      },
      name: 'Filmhookapps',
      // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: { color: 'blue' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      console.log(error)
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [subProfessionData, setSubProfessionData] = useState('');
  const [subProfessionSearchValue, setSubProfessionSearchValue] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredSubProfessionData, setFilteredSubProfessionData] = useState([]);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await privateAPI.post(`audition/getAuditionDetails`, {

        }); // Replace with your API endpoint
        setSubProfessionData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);








  const handleSearchText = (text) => {
    const filteredData = subProfessionData.filter((item) =>
      item.auditionDetailsName && item.auditionDetailsName.toLowerCase().includes(text.toLowerCase())
    );

    setShowSearchBox(text !== '');
    setFilteredSubProfessionData(filteredData);
    setSubProfessionSearchValue(text);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setSubProfessionSearchValue(item.auditionDetailsName);
    setShowSearchBox(false);
  };
  console.log("selected item", subProfessionSearchValue)


  const handleRemove = () => {
    setSelectedItem(null);
    setSubProfessionSearchValue('');
  };





  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={[styles.container, { color: backgroundColor }]} >

        <Text style={[styles.heading, { color: textColor }]}>Create Ad</Text>

        <View style={styles.formContainer}>









          <View style={{ width: responsiveWidth(50), height: responsiveHeight(15), right: responsiveWidth(14.5), justifyContent: 'center', alignItems: 'center', borderWidth: 1, margin: responsiveHeight(1), top: responsiveHeight(-1), left: responsiveWidth(0.5) }}>
            <View style={{ width: responsiveWidth(10), height: responsiveHeight(5), }}>
              <TouchableOpacity onPress={edit_profile_pic} style={{ width: '500%', height: '300%', borderRadius: 5, right: responsiveWidth(20), top: responsiveHeight(-5) }}>
                {profilepic ? (
                  <Image source={{ uri: profilepic.uri }} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
                ) : (
                  <View style={{ alignItems: 'center', top: responsiveHeight(4.5), color: backgroundColor }}>
                    <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')} style={{ width: '20%', height: '50%', top: responsiveHeight(5.4), left: responsiveWidth(20), color: backgroundColor, }} resizeMode='stretch' />
                    <Text style={{ top: responsiveHeight(-3), fontSize: 18, color: textColor }}>Upload Logo</Text>
                  </View>
                )}
              </TouchableOpacity>

            </View>
          </View>

          <View style={styles.boxContent2}>
            <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
              <View style={styles.selectContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedAuditionTitle}
                  onValueChange={(itemValue) => setSelectedAuditionTitle(itemValue)}>
                  <Picker.Item label="Select Audition Title" value={null} />
                  {auditionDetails.map((detail) => (
                    <Picker.Item key={detail.auditionDetailsId} label={detail.auditionDetailsName} value={detail.auditionDetailsId} />
                  ))}
                </Picker>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.boxContent2}>
            <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
              <TextInput

                placeholder='Address'
                placeholderTextColor={textColor}
                color='black'
                onChangeText={(text) => setAddress(text)}
                value={address}
                multiline
                style={{
                  overflow: 'scroll',
                  right: responsiveWidth(32)
                }}
              />
            </ImageBackground>
          </View>

          <View style={styles.boxContent2}>
            <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
              <View style={styles.selectContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedExperience}
                  onValueChange={(itemValue) => setSelectedExperience(itemValue)}>
                  <Picker.Item label="Fresher/Experienced" value={null} />
                  <Picker.Item label="Fresher" value="Fresher" />
                  <Picker.Item label="Experienced" value="Experienced" />
                </Picker>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.boxContent2}>
            <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
              <TextInput
                placeholder='Roles & responsibilties'
                placeholderTextColor={textColor}
                color='black'
                onChangeText={(text) => setItems(text)}
                value={items}
                multiline
                style={{
                  overflow: 'scroll',
                  right: responsiveWidth(22)
                }}
              />
            </ImageBackground>
          </View>

          <View style={styles.boxContent2}>
            <ImageBackground
              style={styles.inputContainer}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch"
            >
              <TextInput
                onChangeText={handleSearchText}
                value={subProfessionSearchValue}
                placeholder='Search Your Location'
                placeholderTextColor='black'
                style={styles.input22}
              />
              {selectedItem && (
                <TouchableOpacity style={styles.clearButton} onPress={handleRemove}>
                  <Text style={styles.clearButtonText}>X</Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>
          {showSearchBox && (
            <View style={styles.dataBox}>
              <FlatList
                data={filteredSubProfessionData}
                keyExtractor={(item) => item.auditionDetailsId.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      selectedItem && selectedItem.id === item.auditionDetailsId && styles.selected,
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text>{item.auditionDetailsName}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}



          <View>
            <Text style={{ color: textColor, fontWeight: 'bold', fontSize: responsiveWidth(4), right: responsiveWidth(19), }}>Audition ends on</Text>
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: responsiveWidth(4), columnGap: responsiveWidth(10), bottom: responsiveHeight(3) }}>
            <TouchableOpacity onPress={showDatePicker} style={{ width: responsiveWidth(32), height: responsiveHeight(5), borderWidth: responsiveWidth(0.3), borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', columnGap: responsiveWidth(3), left: responsiveWidth(22), }} >



              <Text style={{ color: textColor, fontSize: responsiveFontSize(1.5) }}>
                {selectedDate ? selectedDate : 'YYYY-MM-DD'}
              </Text>


              <Image source={require('../../Assets/Userprofile_And_Fonts/calander_icon.png')} style={{ width: responsiveWidth(6), height: responsiveHeight(3), right: responsiveWidth(2) }} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={currentDate}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />


          </View>
        </View>

        <TouchableOpacity style={{ backgroundColor: 'black', width: responsiveWidth(25), height: responsiveHeight(4), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', left: responsiveWidth(23), bottom: responsiveHeight(4) }} >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveHeight(2), }} onPress={() => { post(); }} >Post Ad</Text>
        </TouchableOpacity>

      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    color: 'black'
  },
  formContainer: {
    width: '90%',
    flex: 1,
    // backgroundColor: "lightblue",
    // borderRadius: responsiveWidth(5),
    padding: responsiveWidth(5),

    alignItems: 'center',
    // borderWidth:responsiveWidth(0.5)
  },
  boxContent2: {
    height: responsiveHeight(7),
    width: responsiveWidth(86),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
    borderRadius: responsiveWidth(3.2),
    borderWidth: responsiveWidth(0.3),
    color: 'black',
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
    zIndex: -1,


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

  input22: {
    // borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    right: responsiveWidth(23),
    color: 'black'
  },

  dataBox: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    maxHeight: 200,
    overflow: 'scroll',
    marginBottom: responsiveHeight(3),
    color: 'black'
  },
  selectedItem: {
    backgroundColor: 'lightblue',
    padding: 5,
    margin: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',

  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selected: {
    backgroundColor: 'lightgray',
  },

});

// //---------------------------------------------------------------//