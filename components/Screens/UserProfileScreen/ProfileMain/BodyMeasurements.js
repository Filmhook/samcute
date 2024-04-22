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
const BodyMeasurement = () => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [biceps, setBiceps] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());

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
        const jwt = await AsyncStorage.getItem('jwt');

        console.log('bdym id', userId)

        const response = await PublicAPI.get(`user/getUserByUserId?userId=${userIdString}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
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


  // const handleSave = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem('userId');
  //     const userIdString = userId.toString();
  //     const jwt = await AsyncStorage.getItem('jwt');


  //     const response = await PublicAPI.put(
  //       `/user/updateBiologicalDetails`,
  //       {
  //         userId: userIdString,
  //         height: height,
  //         weight: weight,
  //         skinTone: skinTone,
  //         chestSize: chest,
  //         waistSize: waist,
  //         bicepsSize: biceps,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //       },
  //     );
  //     console.log('data saved successfully', response.data);

  //     setIsEditing(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUpdatePersonalInfo = async () => {


    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');

    const url = 'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/updateBiologicalDetails';
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
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update personal info');
      }


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
          <TouchableOpacity style={styles.bio_title} onPress={toggleExpanded}>
            <Text style={styles.bio_title_text}>BODY MEASUREMENT</Text>
            <View
              style={{
                width: responsiveWidth(6),
                height: responsiveHeight(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                style={styles.downArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        {expanded && (
          <View style={styles.bio_content}>
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
            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(0.2),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(7.2),
                    height: responsiveHeight(4),
                  }}>
                  <Image
                    source={require('../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  {isEditing ? (
                    <TextInput
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-4.5),
                        left: responsiveWidth(15),
                      }}
                      value={height}
                      onChangeText={setHeight}
                      placeholder={`Your height (${height} cm)`}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-3.5),
                        left: responsiveWidth(15),
                      }}>
                      {height} cm
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
                    marginLeft: responsiveWidth(0.2),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(7.2),
                    height: responsiveHeight(4),
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
                        fontSize: responsiveFontSize(2),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-4.5),
                        left: responsiveWidth(15),
                      }}
                      value={weight}
                      onChangeText={setWeight}
                      placeholder="Your weight in kg"
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-3.5),
                        left: responsiveWidth(15),
                      }}>
                      {weight} kg
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
                    marginLeft: responsiveWidth(0.2),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(7.2),
                    height: responsiveHeight(4),
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
                        fontSize: responsiveFontSize(2),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-4.5),
                        left: responsiveWidth(15),
                      }}
                      value={skinTone}
                      onChangeText={setSkinTone}
                      placeholder="Enter your skinTone"
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        top: responsiveHeight(-3.5),
                        left: responsiveWidth(15),
                      }}>
                      {skinTone}
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </View>

            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View
                style={{
                  width: responsiveWidth(19),
                  height: responsiveHeight(6),
                  borderRadius: responsiveWidth(2.5),
                }}>
                <ImageBackground
                  style={{ width: '99.5%', height: '98.7%' }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Image
                    source={require('../../../../components/Assets/Userprofile_And_Fonts/update/BMI_Icon.png')}
                    style={{
                      width: responsiveWidth(10),
                      height: responsiveHeight(5),
                      marginLeft: responsiveWidth(3),
                    }}
                  />
                </ImageBackground>
              </View>

              <View
                style={{
                  width: responsiveWidth(31.8),
                  height: responsiveHeight(5.5),
                  //  borderRadius: responsiveWidth(2),
                  left: responsiveWidth(20.8),
                  top: responsiveHeight(-6),


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
                          textAlign:'center'
                        //  left: responsiveWidth(10)

                        }}
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
                        {chest} Inch
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
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    {isEditing ? (
                      <TextInput
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          textAlign:'center'
                        }}
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
                        {waist} Inch
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
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    {isEditing ? (
                      <TextInput
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000000',
                          fontWeight: '500',
                          fontFamily: 'Times New Roman',
                          textAlign:'center'
                        }}
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
                          flexWrap:'wrap'

                        }}>
                        {biceps} Inch
                      </Text>
                    )}
                  </View>

                  {/* <Text style={{ fontWeight: "500", fontSize: responsiveFontSize(1.8), color: "#323232", textAlign: "center", fontFamily: "Times New Roman", letterSpacing: 1 }}>
                                        Biceps{"\n"}40in
                                    </Text> */}
                </ImageBackground>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: responsiveHeight(0.2),
      flex: 1,
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
      marginTop: responsiveHeight(6),
    },
    editButton: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textDecorationLine: 'underline',
      alignSelf: 'flex-end',
      paddingRight: responsiveWidth(3),
      color:'black'
    },
    bio_content_section: {
      flexDirection: 'row',
      height: responsiveHeight(5.5),
      width: responsiveWidth(53),
      borderColor: 'black',
      borderRadius: responsiveWidth(2),
      marginBottom: responsiveHeight(1.5),
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
  });
};

export default BodyMeasurement;
