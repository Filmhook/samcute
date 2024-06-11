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
        const userIdString = userId.toString();
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await privateAPI.get(`user/getUserByUserId?userId=${userIdString}`, {

        });

        setDataArray(response.data.data.childrenNames || []);
        setReligion(response.data.data.religion || 'N/A');
        setCaste(response.data.data.caste || 'N/A');
        setMarital(response.data.data.maritalStatus || 'N/A');
        setSpouse(response.data.data.spouseName || 'N/A');
        setMother(response.data.data.motherName || 'N/A');
        setFather(response.data.data.fatherName || 'N/A');
        setBrother(response.data.data.brotherNames || []);
        setSister(response.data.data.sisterNames || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
    try {
      const userId = await AsyncStorage.getItem('userId');

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

      const response = await privateAPI.put(`user/updatePersonalInfo`, requestBody, {

      });

      setIsEditing(false);
      setShowAddButton(false);
      Alert.alert('Success', 'Personal info updated successfully');
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.message : error.message);
    }
  };



  return (
    <>
      <View style={style.container}>
        {/* <View style={style.bio_title}>
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
        </View> */}
        <View style={style.bio_title}>
          <TouchableOpacity style={style.bio_title_touchable} onPress={toggleExpanded}>
            <Text style={style.bio_title_text}>PERSONAL INFORMATION</Text>
            <View style={style.downArrowContainer}>
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
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) ,width:responsiveWidth(100), flexWrap:'wrap'}}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Religion :</Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
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
                    value={religion}
                    onChangeText={setReligion}
                    placeholder="Enter your relegion"
                  />
                ) : (

                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.8),
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
        {/* {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2),  width:responsiveWidth(100), flexWrap:'wrap'}}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Caste :</Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
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
        )} */}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) ,width:responsiveWidth(100), flexWrap:'wrap'}}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Marital Status :</Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
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
                    value={marital}
                    onChangeText={setMarital}
                    placeholder="Marital status "
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.8),
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
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2), width:responsiveWidth(100), flexWrap:'wrap' }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Spouse :</Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
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
                    value={spouse}
                    onChangeText={setSpouse}
                    placeholder="your Spouse"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.8),
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
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) ,width:responsiveWidth(100), flexWrap:'wrap'}}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Children :</Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {dataArray && dataArray.length > 0 && dataArray.map((value, index) => (
                <ImageBackground
                  key={index}
                  style={{
                    height: responsiveHeight(9),
                    width: responsiveWidth(90),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
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

              {isEditing && !showAddChildrenButton && (
                <TouchableOpacity onPress={() => setShowAddChildrenButton(true)} style={{
                  height: responsiveHeight(5.5), left:responsiveWidth(36),
                  width: responsiveWidth(53),
                  borderWidth: responsiveWidth(0.3),
                  borderColor: 'black',
                  borderRadius: responsiveWidth(2),
                  marginLeft: responsiveWidth(5.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'blue'
                }}>
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
                      left:responsiveWidth(36)
                    }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <TextInput
                      style={style.textInput}
                      placeholder="Enter children's name"
                      value={newChildren}
                      onChangeText={setNewChildren}
                      placeholderTextColor={'black'}
                    />
                  </ImageBackground>


                  {newChildren.trim() !== '' ? (
                    <TouchableOpacity onPress={handleAddChildren} style={{
                      height: responsiveHeight(5.5), left:responsiveWidth(36),
                      width: responsiveWidth(53),
                      borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'blue'
                    }}>
                      <Text style={style.addButton}>Add</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowAddChildrenButton(false)} style={{
                      height: responsiveHeight(5.5),left:responsiveWidth(36),
                      width: responsiveWidth(53),
                      borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'blue'
                    }}>
                      <Text style={style.addButton}>Cancel</Text>
                    </TouchableOpacity>
                  )}
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
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2),width:responsiveWidth(100), flexWrap:'wrap' }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Mother :</Text>
            </View>

            <View style={style.Rhs}>
              <ImageBackground
                style={style.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
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
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2),width:responsiveWidth(100), flexWrap:'wrap' }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Father :</Text>
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
                    placeholderTextColor={'black'}
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
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2),width:responsiveWidth(100), flexWrap:'wrap' }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Brother :</Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {brother && brother.length > 0 ? (
                brother.map((value, index) => (
                  <ImageBackground
                    key={`brother-${index}`}
                    style={{
                      height: responsiveHeight(8),
                      width: responsiveWidth(90),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <Text
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
                ))
              ) : (
                <Text style={{ marginLeft: responsiveWidth(5.5) }}>N/A</Text>
              )}

              {isEditing && !showAddButton && (
                <TouchableOpacity onPress={() => setShowAddButton(true)} style={{
                  height: responsiveHeight(5.5), left: responsiveWidth(36),
                  width: responsiveWidth(53),
                  borderWidth: responsiveWidth(0.3),
                  borderColor: 'black',
                  borderRadius: responsiveWidth(2),
                  marginLeft: responsiveWidth(5.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'blue'
                }}>
                  <Text style={style.addButton}>Add Brother</Text>
                </TouchableOpacity>
              )}
              {isEditing && showAddButton && (
                <>
                  <ImageBackground
                    style={{
                      height: responsiveHeight(5.5),left: responsiveWidth(36),
                      width: responsiveWidth(53),
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
                      placeholderTextColor={'black'}
                    />
                  </ImageBackground>
                  {newBrother.trim() !== '' ? (
                    <TouchableOpacity onPress={handleAddBrother} style={{
                      height: responsiveHeight(5.5),left: responsiveWidth(36),
                      width: responsiveWidth(53),
                      borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'blue'
                    }}>
                      <Text style={style.addButton}>Add</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowAddButton(false)} style={{
                      height: responsiveHeight(5.5),left: responsiveWidth(36),
                      width: responsiveWidth(53),
                      borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'blue'
                    }}>
                      <Text style={style.addButton}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
        )}



        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2),width:responsiveWidth(100), flexWrap:'wrap' }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Sister : </Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {sister && sister.length > 0 && sister.map((value, index) => (
                <ImageBackground
                  key={`sister-${index}`}
                  style={{
                    height: responsiveHeight(8),
                    width: responsiveWidth(90),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
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
                <TouchableOpacity onPress={() => setShowAddSisterButton(true)} style={{
                  height: responsiveHeight(5.5), left:responsiveWidth(36),
                  width: responsiveWidth(53),
                  borderWidth: responsiveWidth(0.3),
                  borderColor: 'black',
                  borderRadius: responsiveWidth(2),
                  marginLeft: responsiveWidth(5.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'blue'
                }}>
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
                      placeholderTextColor={'black'}
                    />
                  </ImageBackground>


                  {newSister.trim() !== '' ? (
                    <TouchableOpacity onPress={handleAddSister} style={{
                      height: responsiveHeight(5.5), left:responsiveWidth(36),
                      width: responsiveWidth(53),
                      borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'blue'
                    }}>
                      <Text style={style.addButton}>Add</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowAddSisterButton(false)} style={{
                      height: responsiveHeight(5.5), left:responsiveWidth(36),
                      width: responsiveWidth(53),
                      borderWidth: responsiveWidth(0.3),
                      borderColor: 'black',
                      borderRadius: responsiveWidth(2),
                      marginLeft: responsiveWidth(5.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'blue'
                    }}>
                      <Text style={style.addButton}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}



            </View>


          </View>
        )}

      </View>

      {/* <View style={style.hr_tag} /> */}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,

  },
  addButton: {
    fontSize: responsiveFontSize(2),
    color: 'white',

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
    width: responsiveWidth(50),
    marginLeft:responsiveWidth(2)
    
   
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
    fontSize: responsiveFontSize(2.8),
    color: '#323232',
   // marginLeft: responsiveWidth(1.5),
    fontFamily: 'Times New Roman',
  },
  Rhs: {
    height: responsiveHeight(8),
    width: responsiveWidth(88),
   
    //borderWidth: responsiveWidth(0.3),
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.7),
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
    fontSize: responsiveFontSize(2.2),
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
    fontSize: responsiveFontSize(2.2),
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
});