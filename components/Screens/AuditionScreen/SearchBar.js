import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../api/privateAPI';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchBar = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [usertype, setusertype] = useState('');
  const [countrytext, setCountrytext] = useState("");
  const [visible, setVisible] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await privateAPI.post(`audition/getAuditionDetails`, {

        }); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Get usertype from AsyncStorage
  useEffect(() => {
    const getusertype = async () => {
      try {
        const value = await AsyncStorage.getItem('usertype');
        if (value !== null) {
          setusertype(value);
        }
      } catch (e) {
        console.log(e, "usertype not get from AsyncStorage")
      }
    };
    getusertype();
  }, []);

  // Filtered data based on search text
  const filteredData = data.filter(item =>
    item.auditionDetailsName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleNavigation = (selectedJobId) => {
    navigation.navigate('Postview', { selectedJobId });
    console.log("selected job id", selectedJobId)
  };

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.open}>
      <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => handleNavigation(item.auditionDetailsId)} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ width: responsiveWidth(85), height: responsiveHeight(8.5), textAlign: 'center', justifyContent: 'center', fontSize: responsiveFontSize(2.5), color: '#000000', fontWeight: 'bold', top: responsiveHeight(2) }}>{item.auditionDetailsName}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

  const renderFloatingButton = () => {
    if (usertype === 'IndustryUser') {
      return (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleFloatingButtonPress}
        >
          <Image
            source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
            style={styles.floatingButtonIcon}
          />
        </TouchableOpacity>
      );
    }
    return null; // Return null if usertype is not 'IndustryUser'
  };

  const handleFloatingButtonPress = () => {
    if (usertype === 'IndustryUser') {
      navigation.navigate('ScreenOne');
    }
  };

  const handle_location = () => {
    setVisible(!visible);
  };

  const Countryrender = ({ item }) => {
    return (
      <ScrollView style={{ left: responsiveWidth(2), width: responsiveWidth(50), top: 0 }}>
        <TouchableOpacity style={{ width: responsiveWidth(40), height: responsiveHeight(5), top: responsiveHeight(2), alignItems: 'center', left: responsiveWidth(12) }}>
          <Text>{item.value}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const country = [
    { key: '1', value: 'valasaravakkam,chennai' },
    { key: '2', value: 'royapettah,chennai' },
    { key: '3', value: 'vadapalani,chennai' },
    { key: '4', value: 'tnagar,chennai' },
    { key: '5', value: 'gundy,chennai' },
    { key: '6', value: 'shridevikuppam,chennai' },
    { key: '7', value: 'vijayanagar,chennai' },
    { key: '8', value: 'KK nagar,chennai' },
    { key: '9', value: 'Porur,chennai' },
    { key: '10', value: 'Kesavardhini,chennai' }
  ];

  return (
    <>
      <ScrollView>
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              placeholder="Search for Jobs"
              placeholderTextColor={'black'}
              onChangeText={text => setSearchText(text)}
              value={searchText}
              style={{ borderRadius: responsiveWidth(5), width: '90%', textAlign: 'center', margin: responsiveHeight(0.8), backgroundColor: '#F5F5F5', color: 'black', fontSize: responsiveFontSize(2), fontWeight: '400', borderColor: 'black', borderWidth: responsiveWidth(0.4) }}
            />
            <View
              style={{
                width: responsiveWidth(8), height: responsiveHeight(4), position: 'absolute', top: responsiveHeight(1.5), left: responsiveWidth(4)
              }}>
              <Image source={require('../../../components/Assets/Audition_Icons_Fonts/Search_icon.png')} style={{ width: '100%', height: '100%' }} />
            </View>
            <TouchableOpacity
              onPress={handle_location}
              style={{ width: responsiveWidth(8.3), height: responsiveHeight(4), position: 'absolute', top: responsiveHeight(1.5), right: responsiveWidth(6) }}>
              <Image source={require('../../../components/Assets/Audition_Icons_Fonts/filter_tickmark.png')} style={{ width: '100%', height: '100%' }} />
            </TouchableOpacity>
          </View>
          <View
            style={{ width: responsiveWidth(55), height: (responsiveHeight(4.3)), alignSelf: 'flex-end', right: responsiveWidth(2), flexDirection: 'row' }}
          >
            <View style={{ width: responsiveWidth(5), height: responsiveHeight(4) }}>
              <Image source={require('../../../components/Assets/Audition_Icons_Fonts/pin_location_icon.png')} style={{ width: '100%', height: '100%' }} />
            </View>
            <View
              style={{ width: responsiveWidth(51), height: responsiveHeight(4), left: responsiveWidth(2), justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: responsiveFontSize(2), color: '#000000', fontWeight: '400' }}>Valasaravakkam,Chennai</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: responsiveHeight(70) }}>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.auditionDetailsId.toString()}
              renderItem={renderItem}
              style={{ height: '90%', width: '95%' }}
            />
          </View>
          {renderFloatingButton()}
        </View>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={responsiveHeight(-50)}>
          <Modal
            isVisible={visible}
            onBackdropPress={() => setVisible(!visible)}
            backdropOpacity={0}
            animationIn={"fadeIn"}
            animationOut={'fadeOut'}
          >
            <View style={{ position: 'absolute', width: responsiveWidth(70), height: responsiveHeight(40), left: responsiveWidth(20), top: responsiveWidth(28), backgroundColor: "#ffffff", borderRadius: responsiveWidth(3) }}>
              <View>
                <TextInput
                  multiline
                  placeholder='Search...'
                  value={countrytext}
                  onChangeText={text => setCountrytext(text)}
                  style={{
                    width: responsiveWidth(60), height: responsiveHeight(4), top: responsiveWidth(3),
                    left: responsiveWidth(5), borderRadius: responsiveWidth(3),
                    fontSize: responsiveFontSize(1.2)
                  }} />
                <View>
                  <FlatList
                    data={country.filter(item => item.value.toLowerCase().includes(countrytext.toLowerCase()))}
                    renderItem={Countryrender}
                    keyExtractor={item => item.key}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  open: {
    width: responsiveWidth(95),
    height: responsiveHeight(13),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',

    borderRadius: responsiveWidth(2),
    marginVertical: responsiveHeight(0.5),
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    width: responsiveWidth(15),
    height: responsiveHeight(7),
    bottom: responsiveHeight(5),
    right: responsiveWidth(5),
    backgroundColor: 'blue',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonIcon: {
    width: '50%',
    height: '50%',
    tintColor: '#fff',
  },
});

export default SearchBar;