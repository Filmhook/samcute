import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import PublicAPI from '../../../api/publicAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../../api/privateAPI';

export default function Professionalinfo() {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [marital, setMarital] = useState('');
  const [spouse, setSpouse] = useState('');
  const [children, setChildren] = useState([]);
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');
  const [sister, setSister] = useState([]);
  const [brother, setBrother] = useState([]);

  const [dataArray, setDataArray] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showAddSisterButton, setShowAddSisterButton] = useState(false);
  const [showAddChildrenButton, setShowAddChildrenButton] = useState(false);
  const [newBrother, setNewBrother] = useState('');
  const [newSister, setNewSister] = useState('');
  const [newChildren, setNewChildren] = useState('');


  const handleAddBrother = () => {
    if (newBrother.trim() !== '') {
      setBrother([...brother, newBrother]);
      setNewBrother('');
      setShowAddButton(false);
    }
  };
  const handleAddSister = () => {
    if (newSister.trim() !== '') {
      setSister([...sister, newSister]);
      setNewSister('');
      setShowAddSisterButton(false);
    }
  };
  const handleAddChildren = () => {
    if (newChildren.trim() !== '') {
      setDataArray([...dataArray, newChildren]);
      setNewChildren('');
      setShowAddChildrenButton(false);
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userIdString = userId.toString(); // Convert to string if needed
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await PublicAPI.get(`user/getUserByUserId?userId=${userIdString}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        console.log(userId)
        // Handle response data as needed
        console.log('User data:', response.data);

        setDataArray(response.data.data.childrenNames);
        setReligion(response.data.data.religion);
        setCaste(response.data.data.caste);
        setMarital(response.data.data.maritalStatus);
        setSpouse(response.data.data.spouseName);
        setMother(response.data.data.motherName);
        setFather(response.data.data.fatherName);
        setBrother(response.data.data.brotherNames);
        setSister(response.data.data.sisterNames);


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




  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  // const handleSave = () => {
  //   // Save the edited profile details
  //   setIsEditing(false);
  //   // You can send the updated profile details to your backend or update the state accordingly
  // };




  const handleUpdatePersonalInfo = async () => {
    //  setIsLoading(true);

    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');

    const url = 'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/updatePersonalInfo';
    const requestBody = {
      userId: userId,
      religion: religion,
      caste: caste,
      maritalStatus: marital,
      spouseName: spouse,
      childrenNames: dataArray,
      motherName: mother,
      fatherName: father,
      brotherNames: brother,
      sisterNames: sister
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
      setShowAddButton(false);
      Alert.alert('Success', 'Personal info updated successfully');
    } catch (error) {
      // setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };



  return (
    <>
      <View style={style.container}>
        <View style={style.bio_title}>
          <TouchableOpacity style={style.bio_title} onPress={toggleExpanded}>
            <Text style={style.bio_title_text}>PERSONAL INFORMATION</Text>

            <View
              style={{
                width: responsiveWidth(5),
                height: responsiveHeight(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                style={style.downArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        {expanded && (
          <View>
            {isEditing ? null : (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={style.editButton}>Edit</Text>
              </TouchableOpacity>
            )}

            {isEditing && (
              <TouchableOpacity onPress={handleUpdatePersonalInfo}>
                <Text style={style.editButton}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Religion </Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center'
                    }}
                    value={religion}
                    onChangeText={setReligion}
                    placeholder="Enter your relegion"
                  />
                ) : (

                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',


                    }}>
                    {religion}
                  </Text>
                )}
              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Caste </Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center'
                    }}
                    value={caste}
                    onChangeText={setCaste}
                    placeholder="Enter your caste"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {caste}
                  </Text>
                )}
              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Marital Status </Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center'
                    }}
                    value={marital}
                    onChangeText={setMarital}
                    placeholder="Marital status "
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {marital}
                  </Text>
                )}
              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Spouse </Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center'
                    }}
                    value={spouse}
                    onChangeText={setSpouse}
                    placeholder="your Spouse"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {spouse}
                  </Text>
                )}
              </ImageBackground>
            </View>
          </View>
        )}
        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Children </Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {dataArray.map((value, index) => (
                <ImageBackground

                  style={{
                    height: responsiveHeight(5.5),
                    width: responsiveWidth(53),
                    // borderWidth: responsiveWidth(0.3),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    key={index}
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                      // marginLeft: responsiveWidth(20), top: responsiveHeight(1)
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}
               {isEditing && !showAddChildrenButton && (
                <TouchableOpacity onPress={() => setShowAddChildrenButton(true)}>
                  <Text style={style.addButton}>Add children</Text>
                </TouchableOpacity>
              )}
              {isEditing && showAddChildrenButton && (
                <>
                  <ImageBackground
                    style={{
                      height: responsiveHeight(5.5),
                      width: responsiveWidth(53),
                      // borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <TextInput
                      style={style.textInput}
                      placeholder="Enter children's name"
                      value={newChildren}
                      onChangeText={setNewChildren}
                    />
                  </ImageBackground>

                  <TouchableOpacity onPress={handleAddChildren}>
                    <Text style={style.addButton}>Add</Text>
                  </TouchableOpacity>
                </>
              )}


            </View>
          </View>
        )}

        {/* {expanded && (
                    <View style={{ flexDirection: "column", marginTop: responsiveHeight(2), left: responsiveWidth(38) }}>
                        <View style={style.Rhs_childOne}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                                <Text style={style.Rhs_text}>Abram Khan</Text>
                            </ImageBackground>
                        </View>
                        <View style={style.Rhs_ChildTwo}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                                <Text style={style.Rhs_text}>Suhana Khan</Text>
                            </ImageBackground>
                        </View>

                    </View>

                )} */}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Mother </Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',

                      textAlign: 'center'

                    }}
                    value={mother}
                    onChangeText={setMother}
                    placeholder="your Mother Name"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {mother}
                  </Text>
                )}
              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Father </Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center'
                    }}
                    value={father}
                    onChangeText={setFather}
                    placeholder="Your Father Name"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {father}
                  </Text>
                )}
              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Brother </Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {/* <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{rowGap:responsiveHeight(1)}}> */}

              {brother.map((value, index) => (
                <ImageBackground
                  key={`brother-${index}`}
                  style={{
                    height: responsiveHeight(5.5),
                    width: responsiveWidth(53),
                    // borderWidth: responsiveWidth(0.3),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    key={index}
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}
              {isEditing && !showAddButton && (
                <TouchableOpacity onPress={() => setShowAddButton(true)}>
                  <Text style={style.addButton}>Add Brother</Text>
                </TouchableOpacity>
              )}
              {isEditing && showAddButton && (
                <>
                  <ImageBackground
                    style={{
                      height: responsiveHeight(5.5),
                      width: responsiveWidth(53),
                      // borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <TextInput
                      style={style.textInput}
                      placeholder="Enter brother's name"
                      value={newBrother}
                      onChangeText={setNewBrother}
                    />
                  </ImageBackground>

                  <TouchableOpacity onPress={handleAddBrother}>
                    <Text style={style.addButton}>Add</Text>
                  </TouchableOpacity>
                </>
              )}







            </View>
          </View>
        )}
        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Sister </Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {sister.map((value, index) => (
                <ImageBackground
                  style={{
                    height: responsiveHeight(5.5),
                    width: responsiveWidth(53),
                    // borderWidth: responsiveWidth(0.3),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    key={index}
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}
               {isEditing && !showAddSisterButton && (
                <TouchableOpacity onPress={() => setShowAddSisterButton(true)}>
                  <Text style={style.addButton}>Add Sister</Text>
                </TouchableOpacity>
              )}
              {isEditing && showAddSisterButton && (
                <>
                  <ImageBackground
                    style={{
                      height: responsiveHeight(5.5),
                      width: responsiveWidth(53),
                      // borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <TextInput
                      style={style.textInput}
                      placeholder="Enter sister's name"
                      value={newSister}
                      onChangeText={setNewSister}
                    />
                  </ImageBackground>

                  <TouchableOpacity onPress={handleAddSister}>
                    <Text style={style.addButton}>Add</Text>
                  </TouchableOpacity>
                </>
              )}



            </View>


          </View>
        )}

        {/* <View>
          <Button title="Update Personal Info" onPress={handleUpdatePersonalInfo} disabled={isLoading} />
        </View> */}
      </View>

      {/* <View style={style.hr_tag} /> */}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // height:responsiveHeight(71)
  },
  addButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  bio_title: {
    flex: responsiveWidth(0.2),
    width: '100%',
    flexDirection: 'row',
    columnGap: responsiveWidth(20),
    marginTop: responsiveHeight(1),
    // borderWidth:1
  },
  bio_title_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    marginLeft: responsiveWidth(2),
    fontFamily: 'Cochin',
    //  textDecorationLine: "underline",
    //  borderWidth:1,
    width: responsiveWidth(70),
  },
  downArrow: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(2),
    // Add styles for your down arrow icon
  },
  headder: {
    // marginTop: 20,
  },
  headder_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    color: '#323232',
    marginLeft: responsiveWidth(2),
    fontFamily: 'Times New Roman',
    textDecorationLine: 'underline',
  },
  Lhs: {
    height: responsiveHeight(5),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center',
  },

  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
    color: 'black'
  },
  Lhs_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.1),
    color: '#323232',
    marginLeft: responsiveWidth(1.5),
    fontFamily: 'Times New Roman',
  },
  Rhs: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    //borderWidth: responsiveWidth(0.3),
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '101%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Rhs_childOne: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    // borderWidth: responsiveWidth(0.3),
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Rhs_ChildTwo: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    // borderWidth: responsiveWidth(0.3),
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  Rhs_text: {
    fontSize: responsiveFontSize(2),
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Times New Roman',
    marginLeft: responsiveWidth(20),
    top: responsiveHeight(1),
  },
  hr_tag: {
    borderBottomWidth: 4,
    borderBottomColor: '#D7D7D7',
    marginVertical: responsiveHeight(1),
  },
  bio_content: {
    flex: 1,
    marginTop: responsiveHeight(1),
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
    color: 'black'
    // top: responsiveHeight(1)
  },
  textInput: {

    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    paddingHorizontal: 10,
    // marginBottom: 10,
    width: 200,
    textAlign: 'center'
  },
});
