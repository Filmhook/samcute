import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Appearance,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';
import privateAPI from '../../../api/privateAPI';
import { Picker } from '@react-native-picker/picker';
const BodyMeasurement = () => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [biceps, setBiceps] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [unit, setUnit] = useState('cms');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userIdString = userId.toString(); // Convert to string if needed


        console.log('bdym id', userId)

        const response = await privateAPI.get(`user/getUserByUserId?userId=${userIdString}`, {

        });

        // Handle response data as needed
        console.log('User data:', response.data);
        // setHeight(response.data.data.height);
        setHeight(response.data.data.height);
        setWeight(response.data.data.weight);
        setSkinTone(response.data.data.skinTone);
        setChest(response.data.data.chestSize);
        setWaist(response.data.data.waistSize);
        setBiceps(response.data.data.bicepsSize);
        setChest(response.data.data.chestSize);
        setHairColor(response.data.data.hairColor)
        // setDob(response.data.data.dob);

      } catch (error) {
        console.error('Error fetching user data:', error);
        // Log additional details
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchData();
  }, []);


  const handleUpdatePersonalInfo = async () => {


    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');

    const requestBody = {
      userId: userId,
      height: height,
      weight: weight,
      skinTone: skinTone,
      chestSize: chest,
      waistSize: waist,
      bicepsSize: biceps,

    };


    try {
      const response = await privateAPI.put(`user/updateBiologicalDetails`, requestBody, {});



      setIsEditing(false)
      Alert.alert('Success', 'Personal info updated successfully');
    } catch (error) {

      Alert.alert('Error', error.message);
    }
  };

  const styles = getStyles(theme);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.bio_title}>
          <TouchableOpacity style={styles.bio_title_touchable} onPress={toggleExpanded}>
            <Text style={styles.bio_title_text}>BODY MEASUREMENT</Text>
            <View style={styles.downArrowContainer}>
              <Image
                source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                style={styles.downArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        {expanded && (

          <View style={styles.bio_content}>
            <View style={{ alignSelf: 'flex-end' }}>
              {isEditing ? null : (
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
              )}

              {isEditing && (
                <TouchableOpacity onPress={handleUpdatePersonalInfo}>
                  <Text style={styles.editButton}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(6),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(12),
                    height: responsiveHeight(6),
                  }}>
                  <Image
                    source={require('../../../Assets/Userprofile_And_Fonts/update/Height_icon.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  {isEditing ? (
                    <View  style={{ 
                      flexDirection: 'row',
                   
                      bottom:responsiveHeight(6)
                     // alignItems: 'center',
                    }}>
                      <TextInput
                        style={{
                          fontSize: responsiveFontSize(2.8),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                       //   top: responsiveHeight(-5.2),
                          left: responsiveWidth(25), width:responsiveWidth(20),
                        
                        }}
                        placeholderTextColor={'black'}
                        value={height}
                        onChangeText={setHeight}
                        placeholder={`Your height (${height} cm)`}
                      />
                      <Picker
                        selectedValue={unit}
                        style={styles.picker}
                        onValueChange={(itemValue) => setUnit(itemValue)}
                      >
                        <Picker.Item label="cms" value="cms" />
                        <Picker.Item label="inch" value="inch" />
                        <Picker.Item label="feet" value="feet" />
                      </Picker>
                    </View>

                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-4.5),
                        left: responsiveWidth(25),
                      }}>
                      {height} Centimeter
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </View>

            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(6),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(12),
                    height: responsiveHeight(6),
                  }}>
                  <Image
                    source={require('../../../../components/Assets/Userprofile_And_Fonts/update/Weight_icon.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  {isEditing ? (
                    <TextInput
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-5.2),
                        left: responsiveWidth(25),
                      }}
                      placeholderTextColor={'black'}
                      value={weight}
                      onChangeText={setWeight}
                      placeholder="Your weight in kg"
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-4.5),
                        left: responsiveWidth(25),
                      }}>
                      {weight} Kilogram
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </View>
            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(6),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(12),
                    height: responsiveHeight(6),
                  }}>
                  <Image
                    source={require('../../../../components/Assets/Userprofile_And_Fonts/update/skin_tone_icon.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  {isEditing ? (
                    <TextInput
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-5.2),
                        left: responsiveWidth(25),
                      }}
                      placeholderTextColor={'black'}
                      value={skinTone}
                      onChangeText={setSkinTone}
                      placeholder="Enter your skinTone"
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-4.5),
                        left: responsiveWidth(25),
                      }}>
                      {skinTone}
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </View>
            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(5),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(14),
                    height: responsiveHeight(7),
                  }}>
                  <Image
                    source={require('../../../../components/Assets/Userprofile_And_Fonts/update/Hair_Colour.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  {isEditing ? (
                    <TextInput
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-5.2),
                        left: responsiveWidth(25),
                      }}
                      placeholderTextColor={'black'}
                      value={hairColor}
                      onChangeText={setHairColor}
                      placeholder="Enter your hair color"
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-4.5),
                        left: responsiveWidth(25),
                      }}>
                      {hairColor}
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </View>

            <View style={{ flexDirection: 'row', width: responsiveWidth(85), flexWrap: 'wrap', columnGap: responsiveWidth(3.5) }}>
              <View style={{ width: responsiveWidth(40), height: responsiveHeight(20) }}>
                <Image
                  source={require('../../../../components/Assets/Userprofile_And_Fonts/update/BMI_Icon.png')}
                  style={{
                    width: '100%',
                    height: '100%',

                  }}
                />


              </View>
              <View style={{ width: responsiveWidth(41), height: responsiveHeight(20), flexDirection: 'row', flexWrap: 'wrap', rowGap: responsiveHeight(1) }}>
                <View style={{ width: responsiveWidth(40), height: responsiveHeight(6) }}>
                  <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {isEditing ? (
                        <TextInput
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            color: '#000000',
                            fontWeight: '500',
                            fontFamily: 'Times New Roman',
                            textAlign: 'center'
                            //  left: responsiveWidth(10)

                          }}
                          placeholderTextColor={'black'}
                          value={chest}
                          onChangeText={setChest}
                          placeholder="Set Chest in In"
                        />
                      ) : (
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            color: '#000000',
                            fontWeight: '500',
                            fontFamily: 'Times New Roman',
                            top: responsiveHeight(1)


                          }}>
                          {chest} in
                        </Text>
                      )}
                    </View>
                  </ImageBackground>
                </View>

                <View style={{ width: responsiveWidth(40), height: responsiveHeight(6) }}>
                  <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      {isEditing ? (
                        <TextInput
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            color: '#000000',
                            fontWeight: '500',
                            fontFamily: 'Times New Roman',
                            textAlign: 'center'
                          }}
                          placeholderTextColor={'black'}
                          value={waist}
                          onChangeText={setWaist}
                          placeholder="Set waist in In"
                        />
                      ) : (
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            color: '#000000',
                            fontWeight: '500',
                            fontFamily: 'Times New Roman',
                            top: responsiveHeight(1),
                            //  left:responsiveWidth(12)

                          }}>
                          {waist} in
                        </Text>
                      )}
                    </View>
                  </ImageBackground>
                </View>

                <View style={{ width: responsiveWidth(40), height: responsiveHeight(6) }}>
                  <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      {isEditing ? (
                        <TextInput
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            color: '#000000',
                            fontWeight: '500',
                            fontFamily: 'Times New Roman',
                            textAlign: 'center'
                          }}
                          placeholderTextColor={'black'}
                          value={biceps}
                          onChangeText={setBiceps}
                          placeholder="Set biceps in In"
                        />
                      ) : (
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            color: '#000000',
                            fontWeight: '500',
                            fontFamily: 'Times New Roman',
                            top: responsiveHeight(1),
                            // left:responsiveWidth(12),
                            flexWrap: 'wrap'

                          }}>
                          {biceps} in
                        </Text>
                      )}
                    </View>


                  </ImageBackground>
                </View>

              </View>


            </View>

            {/* <View style={{ flexDirection: 'column', borderWidth: 1, width: responsiveWidth(100) }}>
              <View
                style={{
                  width: responsiveWidth(50),
                  height: responsiveHeight(20),
                  borderWidth: 1, left: responsiveWidth(6)
                }}>

                <Image
                  source={require('../../../../components/Assets/Userprofile_And_Fonts/update/BMI_Icon.png')}
                  style={{
                    width: '100%',
                    height: '100%',

                  }}
                />

              </View>

              <View
                style={{
                  width: responsiveWidth(31.8),
                  height: responsiveHeight(5.5),
                  //  borderRadius: responsiveWidth(2),
                  left: responsiveWidth(20.8),
                  top: responsiveHeight(-6),
                  borderWidth: 1

                }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {isEditing ? (
                      <TextInput
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          textAlign: 'center'
                          //  left: responsiveWidth(10)

                        }}
                        placeholderTextColor={'black'}
                        value={chest}
                        onChangeText={setChest}
                        placeholder="Set Chest in In"
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          top: responsiveHeight(1)


                        }}>
                        {chest} in
                      </Text>
                    )}
                  </View>
                </ImageBackground>
              </View>

              <View
                style={{
                  width: responsiveWidth(31.8),
                  height: responsiveHeight(5.5),
                  borderRadius: responsiveWidth(2),
                  left: responsiveWidth(20.8),
                  top: responsiveHeight(-5),
                }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {isEditing ? (
                      <TextInput
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          textAlign: 'center'
                        }}
                        placeholderTextColor={'black'}
                        value={waist}
                        onChangeText={setWaist}
                        placeholder="Set waist in In"
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          top: responsiveHeight(1),
                          //  left:responsiveWidth(12)

                        }}>
                        {waist} in
                      </Text>
                    )}
                  </View>
                </ImageBackground>
              </View>

              <View
                style={{
                  width: responsiveWidth(31.8),
                  height: responsiveHeight(5.5),
                  borderRadius: responsiveWidth(2),
                  left: responsiveWidth(20.8),
                  top: responsiveHeight(-4),
                }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {isEditing ? (
                      <TextInput
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          textAlign: 'center'
                        }}
                        placeholderTextColor={'black'}
                        value={biceps}
                        onChangeText={setBiceps}
                        placeholder="Set biceps in In"
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          top: responsiveHeight(1),
                          // left:responsiveWidth(12),
                          flexWrap: 'wrap'

                        }}>
                        {biceps} in
                      </Text>
                    )}
                  </View>

                 
                </ImageBackground>
              </View>
            </View> */}
          </View>
        )}
      </View>
    </>
  );
};

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // padding: responsiveWidth(4),

    },
    bio_title: {
      flex: responsiveWidth(0.2),
      width: '100%',
      flexDirection: 'row',
      columnGap: responsiveWidth(20),
      marginTop: responsiveHeight(1),
    },
    downArrow: {
      width: 20,
      height: 20,
      marginRight: responsiveWidth(2),
    },
    bio_title_text: {
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2.2),
      color: 'black',
      marginLeft: responsiveWidth(2),
      fontFamily: 'Cochin',
      width: responsiveWidth(70),
    },
    bio_content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',


    },
    editButton: {
      fontSize: responsiveFontSize(3),
      fontWeight: 'bold',
      marginBottom: 10,
      textDecorationLine: 'underline',
      alignSelf: 'flex-end',
      paddingRight: responsiveWidth(3),
      color: 'black'
    },
    bio_content_section: {
      flexDirection: 'row',

      width: '90%',
      height: responsiveHeight(10),
      padding: responsiveWidth(2),
      //   borderWidth:responsiveWidth(0.3),
      borderRadius: responsiveWidth(2),
      marginBottom: responsiveHeight(0.2),

    },
    inputContainer: {
      flex: 1,
      height: '100%',
    },
    text: {
      fontSize: responsiveFontSize(2),
      color: '#000000',
      fontWeight: '500',
      fontFamily: 'Times New Roman',
      top: responsiveHeight(1),
      left: responsiveWidth(4),
    },
    hr_tag: {
      borderBottomWidth: 1,
    },
    bio_title: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: '#d3d3d3', // Light gray background color
      padding: responsiveWidth(4),
      borderRadius: 8,
      marginTop: responsiveHeight(1),
    },
    bio_title_touchable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    bio_title_text: {
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2.8),
      color: 'black',
      fontFamily: 'Cochin',
      width: responsiveWidth(70),
    },
    downArrowContainer: {
      width: responsiveWidth(6),
      height: responsiveHeight(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    downArrow: {
      width: 20,
      height: 20,
    },
    picker: {
   left:responsiveWidth(60),
      height: 40,
    },
  });
};

export default BodyMeasurement;