import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import PublicAPI from '../../../api/publicAPI';

export default function Professionalinfo() {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [religion, setReligion] = useState('131');
  const [caste, setCaste] = useState('131');
  const [marital, setMarital] = useState('131');
  const [spouse, setSpouse] = useState('131');
  const [children, setChildren] = useState('131');
  const [mother, setMother] = useState('131');
  const [father, setFather] = useState('131');
  const [sister, setSister] = useState([]);
  const [brother, setBrother] = useState(['N/A']);

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve JWT token from AsyncStorage
        const jwt =
          'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6ImpvaG5zLmRvZUBvZXhvYW1wbGUuY29tIiwidXNlclR5cGUiOiJjb21tb25Vc2VyIiwiaWF0IjoxNzExMzcyOTAzLCJleHAiOjE3MTEzNzQxMDN9.F5tWmh1XKBX0kejfT4Dg0IfgANNWMKo-EulAp9f7EkA7U4f_RFxpkfCBBbzdj4-iPRI9AIHSDrhJX8jA74RcdQ';
        if (jwt) {
          // Retrieve user ID from AsyncStorage or any other source
          // const StoredId = await AsyncStorage.getItem('id');
          // const userId = parseInt(StoredId);

          // If JWT and user ID exist, send them in the request headers and as parameters
          const response = await PublicAPI.get(
            `/user/getUserByUserId?userId=1`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            },
          );
          // Handle response as needed
          console.log('Data retrieved:', response.data);
          //  console.log(userId)

          setDataArray(response.data.data.childrenNames);
          setReligion(response.data.data.religion);
          setCaste(response.data.data.caste);
          setMarital(response.data.data.maritalStatus);
          setSpouse(response.data.data.spouseName);
          setMother(response.data.data.motherName);
          setFather(response.data.data.fatherName);
        } else {
          // If JWT does not exist, handle the case accordingly (e.g., redirect to login)
          console.log('JWT token not found');
          // Handle the scenario where JWT token is not found
        }
      } catch (error) {
        console.error('Error fetching data:', error);

        console.log(userId);
        // Handle error as needed
      }
    };

    fetchData(); // Call the function to fetch data when component mounts
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleSave = () => {
    // Save the edited profile details
    setIsEditing(false);
    // You can send the updated profile details to your backend or update the state accordingly
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
              <TouchableOpacity onPress={() => setIsEditing(true)} style={{}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                    alignSelf: 'flex-end',
                    paddingRight: responsiveWidth(3),
                    top: responsiveHeight(0.5),
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}

            {isEditing && (
              <TouchableOpacity style={{}} onPress={handleSave}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                    alignSelf: 'flex-end',
                    paddingRight: responsiveWidth(3),
                    top: responsiveHeight(0.5),
                  }}>
                  Save
                </Text>
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
                      marginLeft: responsiveWidth(20),
                      //  top: responsiveHeight(1)
                    }}
                    value={religion}
                    onChangeText={setReligion}
                    placeholder="Enter your dob"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      marginLeft: responsiveWidth(20),
                      top: responsiveHeight(1),
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
                      marginLeft: responsiveWidth(20),
                      //  top: responsiveHeight(1)
                    }}
                    value={caste}
                    onChangeText={setCaste}
                    placeholder="Enter your dob"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      marginLeft: responsiveWidth(20),
                      top: responsiveHeight(1),
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
                      marginLeft: responsiveWidth(20),
                      // top: responsiveHeight(1)
                    }}
                    value={marital}
                    onChangeText={setMarital}
                    placeholder="Enter your dob"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      marginLeft: responsiveWidth(20),
                      top: responsiveHeight(1),
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
                      marginLeft: responsiveWidth(20),
                      // top: responsiveHeight(1)
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
                      marginLeft: responsiveWidth(20),
                      top: responsiveHeight(1),
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
                      // marginLeft: responsiveWidth(20), top: responsiveHeight(1)
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}
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
                      marginLeft: responsiveWidth(20),
                      // top: responsiveHeight(1)
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
                      marginLeft: responsiveWidth(20),
                      top: responsiveHeight(1),
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
                      marginLeft: responsiveWidth(20),
                      //  top: responsiveHeight(1)
                    }}
                    value={father}
                    onChangeText={setFather}
                    placeholder="your Father Name"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      marginLeft: responsiveWidth(20),
                      top: responsiveHeight(1),
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
                      // marginLeft: responsiveWidth(20), top: responsiveHeight(1)
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}

              {/* </View>
                            </ImageBackground> */}
            </View>
          </View>
        )}
        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={style.Lhs}>
              <Text style={style.Lhs_text}> Sister </Text>
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
                      marginLeft: responsiveWidth(20),
                      //  top: responsiveHeight(1)
                    }}
                    value={sister}
                    onChangeText={setSister}
                    placeholder="your Sister Name"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      marginLeft: responsiveWidth(20),
                      top: responsiveHeight(1),
                    }}>
                    {sister}
                  </Text>
                )}
              </ImageBackground>
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
    // height:responsiveHeight(71)
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
    // top: responsiveHeight(1)
  },
});