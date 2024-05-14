import React, { useState } from 'react';
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

export default function SOne() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // Ensure theme object exists and has colors property
  const { colors } = theme || {};

  // If theme or colors is undefined, provide default values
  const backgroundColor = colors ? colors.background : 'white';
  const textColor = colors ? colors.text : 'black';



  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  const [inputText, setInputText] = useState('');
  const [profilepic, setProfilepic] = useState(null);
  const [title, settitle] = useState('');
  const [fresher, setfresher] = useState('');
  const [startDates, setStartDate] = useState(null);
  const navigation = useNavigation();


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
  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      profilepic !== null && // Check if company logo is selected
      fresher.trim() !== '' &&
      inputText.trim() !== '' &&
      startDates !== null  // Check if start date is selected

    );
  };

  const postContent = async () => {
    if (!isFormValid()) {
      alert('Please fill in all the required fields.');
      return;
    }

  }



  const addItem = () => {
    if (inputText.trim() !== '') {
      setItems(prevItems => [
        ...prevItems,
        { id: prevItems.length + 1, text: inputText.trim() } // Add new item to the array
      ]);
      setInputText(''); // Clear inputText after adding an item
    }
  };


  const handleItemPress = (itemId) => {
    setEditingItemId(itemId);
    setInputText(items.find((item) => item.id === itemId)?.text || '');
  };

  const handleEditItem = () => {
    const newItems = items.map((item) => {
      if (item.id === editingItemId) {
        return { ...item, text: inputText.trim() };
      }
      return item;
    }).filter((item) => item.text.trim() !== ''); // Filter out items with empty text
    setItems(newItems.map((item, index) => ({ ...item, id: index + 1 }))); // Update IDs
    setEditingItemId(null);
    setInputText('');
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item.id)}
        style={{ padding: 8, backgroundColor: editingItemId === item.id ? 'lightgrey' : 'transparent' }}
      >
        <Text>{`${item.id}: ${item.text}`}</Text>
      </TouchableOpacity>
    );
  };

  const data = [
    { key: '1', value: 'Fresher' },
    { key: '2', value: 'Experienced' },
  ];

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [endDates, setEndDate] = useState();
  // const [finalendDates, finalsetEndDate] = useState();




  const showStartDatePickers = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickers = () => {
    setShowEndDatePicker(true);
  };

  const hideStartDatePicker = () => {
    setShowStartDatePicker(false);
  };

  const hideEndDatePicker = () => {
    setShowEndDatePicker(false);
  };

  const handleStartDateSelect = (date) => {
    setStartDate(date.dateString);
    hideEndDatePicker(); // No need to explicitly hide end date picker here
  };

  const handleEndDateSelect = (date) => {
    setEndDate(date.dateString);
  };

  const [selectedLabel, setSelectedLabel] = useState('Accounts Team');
  const [address, setAddress] = useState('');
  const [Message, setMessage] = useState('');
  const labels = [
    'Accounts Team',
    'Action Dept',
    'Actor',
    'Actors Assistant',
    'Animator',
    'Art Dept',
    'Cameraman',
    'Casting Director',
    'Celebrity Manager',
    'Choreography',
    'Costume Dept',
    'Crane Operator',
    'Digital Artist',
    'Digital Creator',
    'Digital Imagine Dept',
    'Director',
    'Dubbing',
    'Editor',
    'Lighting Dept',
    'Makeup & Hair Stylist',
    'Marketing Dept',
    'Music Dept',
    'Other',
    'PRO',
    'Producer',
    'Production Dept',
    'Prosthetic',
    'Sound Effect Engg',
    'Special Effects',
    'Still Photographer',
    'Technicians',
    'VFX Dept',
    'Writter',
    'publicity Designer',
  ];


  const post = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem("jwt");

      const textValues = items.map(item => item.text).join(', ');
      console.log(textValues);


      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwt);
      myHeaders.append("Content-Type", "multipart/form-data"); // Set Content-Type header

      const formData = new FormData();
      formData.append("auditionCreatedBy", id); // Use id fetched from AsyncStorage
      formData.append("auditionTitle", selectedLabel);
      formData.append("auditionExperience", selected);
      formData.append("auditionCategory", "2");
      formData.append("auditionExpireOn", selectedDate); // Correct date format
      formData.append("auditionRoles", textValues); // Corrected
      formData.append("fileInputWebModelcategory", "Audition");
      formData.append("auditionAddress", address);
      formData.append("auditionMessage", Message);

      if (profilepic) {
        const imageUriParts = profilepic.uri.split('.');
        const fileType = imageUriParts[imageUriParts.length - 1];
        formData.append("fileInputWebModel.files[0]", {
          uri: profilepic.uri,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch('https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/audition/saveAudition', {
        method: 'POST',
        body: formData,
        headers: myHeaders
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response data
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
  const [editedDate, setEditedDate] = useState('');

  console.log('dddd', selectedDate)








  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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


  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={[styles.container, { color: backgroundColor }]} >

        <Text style={[styles.heading, { color: textColor }]}>Create Ad</Text>

        <View style={styles.formContainer}>
          <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/new.png')} style={{
            width: '112.6%',

            overflow: 'hidden',
            // backgroundColor: "lightblue",
            // borderRadius: responsiveWidth(2),
            padding: responsiveWidth(5),
            alignItems: 'center',
          }} resizeMode="stretch">

            <View style={styles.input}>
              <Picker
                selectedValue={selectedLabel}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLabel(itemValue)
                }
              >
                {labels.map((label) => (
                  <Picker.Item
                    key={label}
                    label={label}
                    value={label}
                    style={{ color: textColor }} // Set the style here to change text color
                  />
                ))}
              </Picker>
              {/* <Text> {selectedLabel}</Text> */}
            </View>

            <View style={styles.input2}>
              <TextInput
                placeholder='Address'
                placeholderTextColor={textColor}
                color='black'
                onChangeText={(text) => setAddress(text)}
                value={address}
                multiline
                style={{
                  overflow: 'scroll',
                }}
              />
            </View>
            <View style={styles.input2}>
              <TextInput

                placeholder='Messsage'
                placeholderTextColor={textColor}
                color='black'
                onChangeText={(text) => setMessage(text)}
                value={Message}
                multiline
                style={{
                  overflow: 'scroll',
                }}
              />

            </View>

            {/* <TouchableOpacity onPress={handleImageOption} style={styles.imagePickerButton}>
          <Text style={styles.buttonText}>Upload Logo</Text>
        </TouchableOpacity> */}
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
            <View>
              <SelectList
                onSelect={() => alert(`Your candidate will be ${selected}`)}
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                inputStyles={{ color: 'black', }}
                placeholder='Fresher/Experienced'
                value={fresher}
                onChangeText={setfresher}
                search={false}
                boxStyles={{ borderRadius: responsiveWidth(2), borderColor: '#004242', width: responsiveWidth(82), alignSelf: 'center', margin: 3 }}
                dropdownStyles={{ borderRadius: responsiveWidth(2), height: responsiveHeight(10), width: responsiveWidth(81.5), backgroundColor: 'white', top: responsiveHeight(-1), alignSelf: 'center', backgroundColor: textColor }}
              />
            </View>
            <View style={{}}>
              <Text style={styles.subHeading}>Roles:</Text>
            </View>
            <TextInput
              multiline
              maxLength={200}
              placeholder=" Roles & responsibilties"
              placeholderTextColor={textColor}
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              style={styles.listInput}
            />
            <TouchableOpacity onPress={addItem} style={styles.addButton}>
              <Text style={styles.buttonText}>Add </Text>
            </TouchableOpacity>
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsHeading}>Your List of Requirements</Text>
              <FlatList
                data={items}

                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
              />
              {editingItemId && (
                <TouchableOpacity onPress={handleEditItem} style={{ padding: 8, backgroundColor: 'lightblue', marginTop: 10, borderRadius: responsiveWidth(2) }}>
                  <Text>Save</Text>
                </TouchableOpacity>
              )}
            </View>

            <View>
              <Text style={{ color: textColor, fontWeight: 'bold', fontSize: responsiveWidth(4), right: responsiveWidth(19), top: responsiveHeight(-4) }}>Audition ends on</Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: responsiveWidth(4), columnGap: responsiveWidth(10), top: responsiveHeight(-8) }}>
              <TouchableOpacity onPress={showDatePicker} style={{ width: responsiveWidth(32), height: responsiveHeight(5), borderWidth: responsiveWidth(0.3), borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', columnGap: responsiveWidth(3), left: responsiveWidth(22), }} >
                {/* <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/Booking.png')} style={{ width: responsiveWidth(6), height: responsiveHeight(3) }} /> */}


                <Text style={{ color: textColor, fontSize: responsiveFontSize(1.5) }}>
                  {selectedDate ? selectedDate : 'YYYY-MM-DD'}
                </Text>


                <Image source={require('../../Assets/Userprofile_And_Fonts/calander_icon.png')} style={{ width: responsiveWidth(6), height: responsiveHeight(3), right: responsiveWidth(2) }} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                // maximumDate={maximumDate}
                // minimumDate={minimumDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              {/* {dobError? <Text style={styles.errorMessage}>{dobError}</Text> : null } */}
            </View>

            <View style={{ right: 98, }}>
              <Text style={{ fontSize: responsiveFontSize(1.5), color: textColor, fontWeight: 'bold', right: responsiveWidth(8), top: responsiveHeight(-5) }}>Posted by:</Text>
            </View>
          </ImageBackground>
        </View>

        <TouchableOpacity style={{ backgroundColor: 'grey', width: responsiveWidth(20), height: responsiveHeight(3.5), margin: 4, borderRadius: responsiveWidth(2), left: responsiveWidth(30) }} >
          <Text style={{ color: textColor, fontWeight: 'bold', fontSize: responsiveHeight(2), left: responsiveWidth(2.5), top: responsiveHeight(0.5) }} onPress={() => { post(); }} >Post Ad</Text>
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
  input: {
    width: '100%',
    height: responsiveHeight(5),
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    color: 'black',
    fontWeight: 'bold'
  },
  input2: {
    width: '100%',
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    color: 'black',
    fontWeight: 'bold'
  },
  imagePickerButton: {
    //backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '34%',
    height: responsiveHeight(4.8),
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: responsiveHeight(2),
    left: responsiveWidth(29),
    top: 70
  },
  datePickerButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: responsiveHeight(5.3),
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: responsiveHeight(2),
    left: -90
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  selectedDateContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    left: 50,
    top: -60
  },
  selectedDateText: {
    fontSize: responsiveFontSize(2),
  },
  subHeading: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
    right: responsiveWidth(37),
    color: 'black'
  },
  listInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    width: '80%',
    right: responsiveWidth(10),
    color: 'black',
    // fontWeight:'bold'
  },
  addButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: responsiveHeight(4),
    marginBottom: responsiveHeight(2),
    left: 120,
    top: responsiveHeight(-7)
  },
  requirementsContainer: {
    borderWidth: 1,
    borderColor: '#004242',
    borderRadius: responsiveWidth(2),
    width: '102%',
    marginBottom: responsiveHeight(2),
    top: responsiveHeight(-7)
  },
  requirementsHeading: {
    fontSize: responsiveFontSize(1.8),
    // fontWeight: 'bold',
    textAlign: 'center',
    padding: responsiveWidth(3),
    color: 'black',
    // fontWeight:'bold',
  },
  requirementItem: {
    padding: responsiveWidth(2),
    // borderBottomWidth: 1,
    borderBottomColor: '#004242',
    color: 'black'

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  backButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: responsiveHeight(6),
    marginRight: responsiveWidth(5),
  },
  nextButton: {
    backgroundColor: '#616161',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: responsiveHeight(6),
  },
  calendar: {
    borderWidth: 2,
    bottom: responsiveHeight(40),
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

// //---------------------------------------------------------------//