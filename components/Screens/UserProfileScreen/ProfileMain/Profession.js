
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ActivityIndicator, TextInput, Alert, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Profession_project from './Projects'
import Profession_tv_drama_project from './Tv_Drama_Projects'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import privateAPI from '../../../api/privateAPI'
import { ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchImageLibrary } from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';




export default function Profession() {
  const [platformData, setPlatformData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  const [filmCountInput, setFilmCountInput] = useState('');
  const [netWorthInput, setNetWorthInput] = useState('');
  const [dailySalaryInput, setDailySalaryInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [editingPlatformId, setEditingPlatformId] = useState(null);
  const [isModalVisibleExp, setModalVisibleExp] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [currentSubProfessionId, setCurrentSubProfessionId] = useState(null);
  const [subProfessions, setSubProfessions] = useState([]);
  // const toggleModal = () => {
  //   setModalVisibleExp(!isModalVisibleExp);
  // };

  // const years = Array.from(new Array(124), (val, index) => 1900 + index).concat('Present');

  // const toggleEditMode = (platformId) => {

  //   setIsEditing(true)
  //   if (platformId === editingPlatformId) {
  //     // Save changes and exit edit mode
  //     handleSave();
  //     setEditingPlatformId(null);
  //   } else {
  //     // Enter edit mode for the selected platform
  //     setEditingPlatformId(platformId);
  //   }
  // };

  // // useEffect(() => {

  // //   fetchData(); // Fetch data initially when component mounts if expanded

  // // }, []);



  // const handleSave = async () => {
  //   setIsEditing(false)
  //   try {
  //     const platform = platformData.find(platform => platform.platformPermanentId === editingPlatformId);
  //     if (!platform) {
  //       console.error('Platform not found for editing.');
  //       return;
  //     }

  //     const response = await privateAPI.post(
  //       'industryUser/updateIndustryUserPermanentDetails',
  //       {
  //         platformPermanentId: editingPlatformId,
  //         filmCount: filmCountInput,
  //         netWorth: netWorthInput,
  //         dailySalary: dailySalaryInput,

  //         // subProfession: subProfessionsInput.map((sp) => ({
  //         //   subProfessionId: sp.subProfessionId,
  //         //   startingYear: sp.startYear,
  //         //   endingYear: sp.endYear,
  //         // })),
  //       },
  //     );
  //     Alert.alert('Update', `${platform.platformName} Updated`);

  //     console.log('Platform details updated successfully:', response.data);

  //     setFilmCountInput('');
  //     setNetWorthInput('');
  //     setDailySalaryInput('');
  //     setEditingPlatformId(null); // Reset editingPlatformId after saving changes
  //     // Update the state with the new values
  //     setPlatformData(prevState =>
  //       prevState.map(p => {
  //         if (p.platformPermanentId === editingPlatformId) {
  //           return {
  //             ...p,
  //             filmCount: filmCountInput,
  //             netWorth: netWorthInput,
  //             dailySalary: dailySalaryInput,
  //           };
  //         }
  //         return p;
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Error updating platform details:', error);
  //   }
  // };

  const years = Array.from(new Array(124), (val, index) => 1900 + index).concat('Present');

  const toggleModal = (subProfessionId) => {
    const subProfession = subProfessions.find((sp) => sp.subProfessionId === subProfessionId);
    if (subProfession) {
      setStartYear(subProfession.startingYear);
      setEndYear(subProfession.endingYear);
    }
    setCurrentSubProfessionId(subProfessionId);
    setModalVisibleExp(true);
  };

  const saveYearSelection = () => {
    updateSubProfessionYears(currentSubProfessionId, startYear, endYear);
    setModalVisibleExp(false);
  };

  const toggleEditMode = (platformId) => {
    setIsEditing(true);
    if (platformId === editingPlatformId) {
      handleSave();
      setEditingPlatformId(null);
    } else {
      setEditingPlatformId(platformId);
      const platform = platformData.find((platform) => platform.platformPermanentId === platformId);
      if (platform) {
        setFilmCountInput(platform.filmCount.toString());
        setNetWorthInput(platform.netWorth.toString());
        setDailySalaryInput(platform.dailySalary.toString());
        setSubProfessions(platform.professions.flatMap((profession) => profession.subProfessions));
      }
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const platform = platformData.find((platform) => platform.platformPermanentId === editingPlatformId);
      if (!platform) {
        console.error('Platform not found for editing.');
        return;
      }

      const response = await privateAPI.post('industryUser/updateIndustryUserPermanentDetails', {
        platformPermanentId: editingPlatformId,
        filmCount: filmCountInput,
        netWorth: netWorthInput,
        dailySalary: dailySalaryInput,
        subProfession: subProfessions.map((subProf) => ({
          subProfessionId: subProf.subProfessionId,
          startingYear: subProf.startingYear,
          endingYear: subProf.endingYear,
        })),
      });

      Alert.alert('Update', `${platform.platformName} Updated`);

      console.log('Platform details updated successfully:', response.data);

      setFilmCountInput('');
      setNetWorthInput('');
      setDailySalaryInput('');
      setEditingPlatformId(null);

      setPlatformData((prevState) =>
        prevState.map((p) => {
          if (p.platformPermanentId === editingPlatformId) {
            return {
              ...p,
              filmCount: filmCountInput.toString(),
              netWorth: netWorthInput.toString(),
              dailySalary: dailySalaryInput.toString(),
              professions: p.professions.map((profession) => ({
                ...profession,
                subProfessions: profession.subProfessions.map((subProf) => {
                  const updatedSubProf = subProfessions.find((sp) => sp.subProfessionId === subProf.subProfessionId);
                  return updatedSubProf || subProf;
                }),
              })),
            };
          }
          return p;
        })
      );
    } catch (error) {
      console.error('Error updating platform details:', error);
    }
  };

  const updateSubProfessionYears = (subProfessionId, startYear, endYear) => {
    setSubProfessions((prev) =>
      prev.map((subProf) =>
        subProf.subProfessionId === subProfessionId
          ? { ...subProf, startingYear: startYear, endingYear: endYear }
          : subProf
      )
    );
  };


  





  // State to track the platform being edited
  const [projectPlatformId, setProjectPlatformId] = useState(null);
  const [openingImagePicker, setOpeningImagePicker] = useState(false);

  const project = (platformId) => {
    console.log('platformId', platformId)
    if (platformId === projectPlatformId) {
      // Save changes and exit edit mode
      openImagePicker(platformId);
      setProjectPlatformId(null);
    } else {
      // Enter edit mode for the selected platform
      setProjectPlatformId(platformId);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log('check userid', userId)
        const response = await privateAPI.post(
          `industryUser/getIndustryUserPermanentDetails?userId=${userId}`,
          {},

        );
        setPlatformData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  //project

  const [description, setDescription] = useState('');
  const [platformId, setPlatformId] = useState(null);

  const openImagePicker = (id) => {
    setPlatformId(id);
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        setSelectedImage(selectedImage);
        setModalVisible(true);  // Show the modal to enter description
      }
    });
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('No description', 'Please enter a description.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('platformPermanentId', platformId); // Replace with actual platform ID
      formData.append('fileInputWebModel.description', description);

      const imageUriParts = selectedImage.uri.split('.');
      const fileType = imageUriParts[imageUriParts.length - 1];
      formData.append('fileInputWebModel.files[0]', {
        uri: selectedImage.uri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await privateAPI.post(
        'IndustryUser/project/saveProjectFiles',
        formData,
        {
          headers: {

            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 1) {
        Alert.alert('Success', 'Image uploaded successfully.');
      } else {
        Alert.alert('Upload failed', `Server returned status: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }

    // Reset state
    setSelectedImage(null);
    setDescription('');
    setModalVisible(false);
  };


  // Render JSX based on fetched data
  return (
    <View style={styles.containers}>

      <View style={styles.bio_title}>
        <TouchableOpacity style={styles.bio_title_touchable} onPress={toggleExpanded}>
          <Text style={styles.bio_title_text}>PROFESSION</Text>
          <View style={styles.downArrowContainer}>
            <Image
              source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
              style={styles.downArrow}
            />
          </View>
        </TouchableOpacity>
      </View>

      {expanded && (


        <ScrollView style={{ width: responsiveWidth(100), }}>
          {isEditing && (
            <TouchableOpacity onPress={() => navigation.navigate('IndustryUpdateOne')} style={{
              height: responsiveHeight(5.5),
              width: responsiveWidth(45.5),
              borderWidth: responsiveWidth(0.3),
              borderColor: 'black',
              borderRadius: responsiveWidth(2),
              left: responsiveWidth(51),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',marginTop:responsiveHeight(1)
            }}>
              <Text style={{
                fontSize: responsiveFontSize(2),
                color: 'white',
              }}>Add Industry</Text>
            </TouchableOpacity>
          )}
          {loading ? (
            <Text style={{ textAlign: 'center' }}>Loading...</Text>
          ) : (
            platformData.map((platform, index) => (
              <View key={index} style={styles.platformContainer}>
                <View style={{ width: responsiveWidth(96) }}>
                  {editingPlatformId === platform.platformPermanentId ? (
                    <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId, platform.platformName)}>
                      <Text style={styles.editButton}>Save</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId)}>
                      <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                  )}
                </View>


                <View style={{ flexDirection: 'row', columnGap: responsiveWidth(3), width: responsiveWidth(100), padding: responsiveWidth(1) }}>
                  <View style={{ width: responsiveHeight(19), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <ImageBackground style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                      <View style={{ width: responsiveWidth(21), height: responsiveHeight(6.5), right: responsiveWidth(2), margin: responsiveWidth(1) }}>
                        <Image source={{ uri: platform.platformImageURL }} style={{ width: '100%', height: '80%' }} resizeMode='stretch' />
                      </View>

                      <Text style={[styles.platformName, styles.border]}>{platform.platformName}</Text>
                    </ImageBackground>
                  </View>
                  <View style={{ width: responsiveWidth(58) }}>
                    {/* <View style={styles.industriesContainer}>
                      {platform.industries.map((industry, index) => (
                        <ImageBackground key={index} style={{ width: responsiveWidth(50), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                          <View style={{ width: responsiveWidth(9), height: responsiveHeight(5), right: responsiveWidth(2), }}>
                            <Image source={{ uri: industry.imageURL }} style={{ width: '90%', height: '80%', padding: 1 }} resizeMode='stretch' />
                          </View>
                          <View style={{ width: responsiveWidth(29) }}>
                            <Text style={styles.industry}>{industry.industryName}</Text>
                          </View>
                        </ImageBackground>
                      ))}
                    </View> */}
                    <View style={styles.professionsContainer}>
                      {platform.professions.map((profession, index) => (
                        <View key={index} style={styles.professionContainer}>
                          <ImageBackground style={{ width: responsiveWidth(51), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{ width: responsiveWidth(9), height: responsiveHeight(5), right: responsiveWidth(2) }}>
                              <Image source={{ uri: profession.imageURL }} style={{ width: '100%', height: '80%' }} resizeMode='stretch' />
                            </View>
                            <View style={{ width: responsiveWidth(29) }}>
                              <Text style={styles.profession}>{profession.professionName}</Text>
                            </View>
                          </ImageBackground>
                          {profession.subProfessions.map((subProfession, subIndex) => (
                            <View style={{ flexDirection: 'row', rowGap: 1, width: responsiveWidth(52), justifyContent:'center', alignItems:'center',  }}>
                              <ImageBackground key={subIndex} style={{ width: responsiveWidth(30), marginBottom: responsiveHeight(1), padding: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',height:responsiveHeight(5) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                                <Text style={styles.subProfession}>{subProfession.subProfessionName} </Text>




                              </ImageBackground>

                              {editingPlatformId === platform.platformPermanentId ? (
                                <TouchableOpacity onPress={() => toggleModal(subProfession.subProfessionId)} style={{ marginLeft: responsiveWidth(3),  width:responsiveWidth(18) }}>
                                  <Icon name="calendar" size={responsiveWidth(7)} color="blue" />
                                </TouchableOpacity>
                              ) : (

                                

                                <Text style={styles.subProfessionYear}>{subProfession.startingYear ?? 'N/A'} - {subProfession.endingYear ?? 'N/A'}</Text>
                              )}

                              {/* <Text style={styles.subProfession}>{profession.endYear}</Text> */}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                    <Modal
                      transparent={true}
                      animationType="slide"
                      visible={isModalVisibleExp}
                      onRequestClose={() => setModalVisibleExp(false)}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <Text style={styles.modalTitle}>Select Start and End Year</Text>

                          <Text style={styles.label}>Start Year:</Text>
                          <Picker
                            selectedValue={startYear}
                            style={styles.picker}
                            onValueChange={(itemValue) => setStartYear(itemValue)}
                          >
                            {years.map((year, index) => (
                              <Picker.Item key={index} label={year.toString()} value={year.toString()} />
                            ))}
                          </Picker>

                          <Text style={styles.label}>End Year:</Text>
                          <Picker
                            selectedValue={endYear}
                            style={styles.picker}
                            onValueChange={(itemValue) => setEndYear(itemValue)}
                          >
                            {years.map((year, index) => (
                              <Picker.Item key={index} label={year.toString()} value={year.toString()} />
                            ))}
                          </Picker>

                          <View style={{flexDirection:'row', columnGap:responsiveWidth(8)}}>
                          {/* <Button title="Cancel" onPress={() => setModalVisibleExp(false)} />
                          <Button title="Confirm" onPress={saveYearSelection} /> */}
                          <TouchableOpacity onPress={() => setModalVisibleExp(false)}  style={{backgroundColor:'red', width:responsiveWidth(18), justifyContent:'center', alignItems:'center', height:responsiveHeight(4), borderRadius:responsiveWidth(2), padding:responsiveWidth(1)}}><Text style={{fontSize:responsiveFontSize(2), color:'black'}}>Cancel</Text></TouchableOpacity>
                          <TouchableOpacity onPress={saveYearSelection} style={{backgroundColor:'lightblue', width:responsiveWidth(18), justifyContent:'center', alignItems:'center', height:responsiveHeight(4), borderRadius:responsiveWidth(2), padding:responsiveWidth(1)}}><Text style={{fontSize:responsiveFontSize(2), color:'black'}}>Confirm</Text></TouchableOpacity>
                         
                          </View>
                        </View>
                      </View>
                    </Modal>
                    <View style={styles.professionContainer}>
                      <ImageBackground style={{ width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        {editingPlatformId === platform.platformPermanentId ? (
                          <TextInput
                            placeholder="Film Count"
                            value={filmCountInput}
                            onChangeText={text => setFilmCountInput(text)}
                            keyboardType="numeric"
                            placeholderTextColor={'black'}
                          />
                        ) : (
                          <Text style={{ color: 'black' }}>Film Count: {platform.filmCount}</Text>
                        )}
                      </ImageBackground>
                    </View>
                    <View style={styles.professionContainer}>
                      <ImageBackground style={{ width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        {editingPlatformId === platform.platformPermanentId ? (
                          <TextInput
                            placeholder="Net Worth"
                            value={netWorthInput}
                            onChangeText={text => setNetWorthInput(text)}
                            keyboardType="numeric"
                            placeholderTextColor={'black'}
                          />
                        ) : (
                          <Text style={{ color: 'black' }}>Net Worth: {platform.netWorth}</Text>
                        )}
                      </ImageBackground>
                    </View>
                    <View style={styles.professionContainer}>
                      <ImageBackground style={{ width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        {editingPlatformId === platform.platformPermanentId ? (
                          <TextInput
                            placeholder="Daily Salary"
                            value={dailySalaryInput}
                            onChangeText={text => setDailySalaryInput(text)}
                            keyboardType="numeric"
                            placeholderTextColor={'black'}
                          />
                        ) : (
                          <Text style={{ color: 'black' }}>Daily Salary: {platform.dailySalary}</Text>
                        )}
                      </ImageBackground>
                    </View>
                  </View>
                </View>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 25, color: '#323232', fontWeight: 'bold', marginLeft: 10, textDecorationLine: 'underline' }}>Projects</Text>
                </View>
                <ScrollView horizontal contentContainerStyle={{ margin: 1 }} style={{ width: '100%', padding: responsiveWidth(1) }}>
                  <View style={{ marginRight: responsiveWidth(2) }}>
                    <TouchableOpacity onPress={() => openImagePicker(platform.platformPermanentId)} style={{ width: 130, height: 150, borderWidth: 1, backgroundColor: "#F5F5F5", }} >
                      <Image source={require('../../../Assets/Home_Icon_And_Fonts/plus_icon.png')} style={{ width: 80, height: 80, alignSelf: 'center', top: 29 }} />
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.modalView}>
                        {selectedImage && (
                          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
                        )}
                        <TextInput
                          style={styles.textInput}
                          placeholder="Enter description"
                          value={description}
                          onChangeText={setDescription}
                          placeholderTextColor={'black'}
                        />
                        <TouchableOpacity
                          style={styles.uploadButton}
                          onPress={uploadImage}
                        >
                          <Text style={styles.textStyle}>Upload Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </View>

                  {platform.outputWebModelList.map((file, index) => (       
              <View style={{ width: 130, height: 150, borderWidth: 1, backgroundColor: "#F5F5F5",marginRight:responsiveWidth(2)}} >  
              <Image key={index} source={{ uri: file.filePath }} style={{ width: '100%', height: '100%' }} resizeMode='stretch'/>
              <View style={{borderWidth:1}}>
              <Text style={styles.fileDescription}>{file.description}</Text>
              </View>
                              
              </View>
              ))} 

                </ScrollView>

                <View style={styles.horizontalLine} />
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  containers: {
    alignItems: 'center',
    justifyContent: 'center',


  },
  horizontalLine: {
    borderBottomWidth: 6,
    borderBottomColor: 'black',
    marginVertical: 5, // Adjust the vertical margin as needed
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
    top: responsiveHeight(0.5),
    color: 'black'
  },
  downArrow: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(2),
    // Add styles for your down arrow icon
  },
  bio_title_text: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.2),
    color: "black",
    marginLeft: responsiveWidth(2),
    fontFamily: 'Cochin',
    // textDecorationLine: "underline",
    //  borderWidth:1,
    width: responsiveWidth(70)
  },
  bio_title: {
    flex: responsiveWidth(0.2),
    width: '100%',
    flexDirection: 'row',
    columnGap: responsiveWidth(20),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2)
  },
  platformContainer: {
    flex: 1,

    alignItems: 'center'


  },
  bottomLine: {
    borderBottomWidth: 6,
    borderBottomColor: 'red',
    marginBottom: responsiveHeight(1)
  },
  platformName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',

    textAlign: 'center'
  },
  industriesContainer: {
    marginLeft: responsiveWidth(2),
    marginBottom: 5,

  },
  industry: {
    fontWeight: 'bold',
    color: 'black'
  },
  professionsContainer: {
    marginLeft: responsiveWidth(2),
  },
  professionContainer: {
    marginBottom: 5,
  },
  profession: {
    fontWeight: 'bold',
    color: 'black'
  },
  subProfession: {
    color: 'black',
    textAlign: 'center',
   
  },
  subProfessionYear: {
    color: 'black',
    textAlign: 'center',
    width:responsiveWidth(22),
    fontSize:responsiveFontSize(1.5),
    fontWeight:'500'
   
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    // marginVertical: 16,
  },
  textInput: {
    width: '100%',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black'
  },
  picker: {
    width: '100%',
    height: 50,
  },

});

//-------------------------------------

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, Alert, Modal, Button, ScrollView } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import privateAPI from '../../../api/privateAPI';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useNavigation } from '@react-navigation/native';
// import { Picker } from '@react-native-picker/picker';

// export default function Profession() {
//   const [platformData, setPlatformData] = useState([]);
//   const [expanded, setExpanded] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   const [filmCountInput, setFilmCountInput] = useState('');
//   const [netWorthInput, setNetWorthInput] = useState('');
//   const [dailySalaryInput, setDailySalaryInput] = useState('');
//   const [subProfessions, setSubProfessions] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentTitle, setCurrentTitle] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   const [editingPlatformId, setEditingPlatformId] = useState(null);
//   const [isModalVisibleExp, setModalVisibleExp] = useState(false);
//   const [currentSubProfessionId, setCurrentSubProfessionId] = useState(null);
//   const [startYear, setStartYear] = useState('');
//   const [endYear, setEndYear] = useState('');

//   const years = Array.from(new Array(124), (val, index) => 1900 + index).concat('Present');

//   const toggleModal = (subProfessionId) => {
//     const subProfession = subProfessions.find((sp) => sp.subProfessionId === subProfessionId);
//     if (subProfession) {
//       setStartYear(subProfession.startingYear);
//       setEndYear(subProfession.endingYear);
//     }
//     setCurrentSubProfessionId(subProfessionId);
//     setModalVisibleExp(true);
//   };

//   const saveYearSelection = () => {
//     updateSubProfessionYears(currentSubProfessionId, startYear, endYear);
//     setModalVisibleExp(false);
//   };

//   const toggleEditMode = (platformId) => {
//     setIsEditing(true);
//     if (platformId === editingPlatformId) {
//       handleSave();
//       setEditingPlatformId(null);
//     } else {
//       setEditingPlatformId(platformId);
//       const platform = platformData.find((platform) => platform.platformPermanentId === platformId);
//       if (platform) {
//         setFilmCountInput(platform.filmCount.toString());
//         setNetWorthInput(platform.netWorth.toString());
//         setDailySalaryInput(platform.dailySalary.toString());
//         setSubProfessions(platform.professions.flatMap((profession) => profession.subProfessions));
//       }
//     }
//   };

//   const handleSave = async () => {
//     setIsEditing(false);
//     try {
//       const platform = platformData.find((platform) => platform.platformPermanentId === editingPlatformId);
//       if (!platform) {
//         console.error('Platform not found for editing.');
//         return;
//       }

//       const response = await privateAPI.post('industryUser/updateIndustryUserPermanentDetails', {
//         platformPermanentId: editingPlatformId,
//         filmCount: filmCountInput,
//         netWorth: netWorthInput,
//         dailySalary: dailySalaryInput,
//         subProfession: subProfessions.map((subProf) => ({
//           subProfessionId: subProf.subProfessionId,
//           startingYear: subProf.startingYear,
//           endingYear: subProf.endingYear,
//         })),
//       });

//       Alert.alert('Update', `${platform.platformName} Updated`);

//       console.log('Platform details updated successfully:', response.data);

//       setFilmCountInput('');
//       setNetWorthInput('');
//       setDailySalaryInput('');
//       setEditingPlatformId(null);

//       setPlatformData((prevState) =>
//         prevState.map((p) => {
//           if (p.platformPermanentId === editingPlatformId) {
//             return {
//               ...p,
//               filmCount: filmCountInput,
//               netWorth: netWorthInput,
//               dailySalary: dailySalaryInput,
//               professions: p.professions.map((profession) => ({
//                 ...profession,
//                 subProfessions: profession.subProfessions.map((subProf) => {
//                   const updatedSubProf = subProfessions.find((sp) => sp.subProfessionId === subProf.subProfessionId);
//                   return updatedSubProf || subProf;
//                 }),
//               })),
//             };
//           }
//           return p;
//         })
//       );
//     } catch (error) {
//       console.error('Error updating platform details:', error);
//     }
//   };

//   const updateSubProfessionYears = (subProfessionId, startYear, endYear) => {
//     setSubProfessions((prev) =>
//       prev.map((subProf) =>
//         subProf.subProfessionId === subProfessionId
//           ? { ...subProf, startingYear: startYear, endingYear: endYear }
//           : subProf
//       )
//     );
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userId = await AsyncStorage.getItem('userId');
//         console.log('check userid', userId);
//         const response = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=${userId}`, {});

//         setPlatformData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };

//   const openImagePicker = (id) => {
//     setPlatformId(id);
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 300,
//       maxWidth: 300,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('Image picker error: ', response.errorMessage);
//       } else {
//         const selectedImage = response.assets[0];
//         setSelectedImage(selectedImage);
//         setModalVisible(true);
//       }
//     });
//   };

//   const uploadImage = async () => {
//     if (!selectedImage) {
//       Alert.alert('No image selected', 'Please select an image first.');
//       return;
//     }
//     if (!description.trim()) {
//       Alert.alert('No description', 'Please enter a description.');
//       return;
//     }

//     try {
//       const userId = await AsyncStorage.getItem('userId');
//       const jwt = await AsyncStorage.getItem('jwt');

//       const formData = new FormData();
//       formData.append('userId', userId);
//       formData.append('platformPermanentId', platformId);
//       formData.append('fileInputWebModel.description', description);

//       const imageUriParts = selectedImage.uri.split('.');
//       const fileType = imageUriParts[imageUriParts.length - 1];
//       formData.append('fileInputWebModel.files[0]', {
//         uri: selectedImage.uri,
//         name: `image.${fileType}`,
//         type: `image/${fileType}`,
//       });

//       const response = await privateAPI.post('IndustryUser/project/saveProjectFiles', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.status === 1) {
//         Alert.alert('Success', 'Image uploaded successfully.');
//       } else {
//         Alert.alert('Upload failed', `Server returned status: ${response.data.status}`);
//       }
//     } catch (error) {
//       console.error('Failed to upload image:', error);
//       Alert.alert('Error', 'Failed to upload image. Please try again.');
//     }

//     setSelectedImage(null);
//     setDescription('');
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.containers}>
//       <View style={styles.bio_title}>
//         <TouchableOpacity style={styles.bio_title_touchable} onPress={toggleExpanded}>
//           <Text style={styles.bio_title_text}>PROFESSION</Text>
//           <View style={styles.downArrowContainer}>
//             <Image source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')} style={styles.downArrow} />
//           </View>
//         </TouchableOpacity>
//       </View>

//       {expanded && (
//         <ScrollView style={{ width: responsiveWidth(100) }}>
//           {isEditing && (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('IndustryUpdateOne')}
//               style={{
//                 height: responsiveHeight(5.5),
//                 width: responsiveWidth(45.5),
//                 borderWidth: responsiveWidth(0.3),
//                 borderColor: 'black',
//                 borderRadius: responsiveWidth(2),
//                 left: responsiveWidth(51),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'blue',
//               }}
//             >
//               <Text style={{ fontSize: responsiveFontSize(2), color: 'white' }}>Add Industry</Text>
//             </TouchableOpacity>
//           )}

//           {loading ? (
//             <Text>Loading...</Text>
//           ) : (
//             platformData.map((platform) => (
//               <View key={platform.platformPermanentId} style={{ marginBottom: 20 }}>
//                 <View style={{ alignItems: 'flex-end', marginRight: responsiveWidth(5), marginTop: responsiveWidth(2), marginBottom: responsiveWidth(2) }}>
//                   {editingPlatformId === platform.platformPermanentId ? (
//                     <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId)}>
//                       <Text style={styles.editButton}>Save</Text>
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId)}>
//                       <Text style={styles.editButton}>Edit</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>

//                 <View style={styles.platformDetails}>
//                   <View style={styles.platformImageContainer}>
//                     <ImageBackground
//                       style={styles.platformImageBackground}
//                       source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                       resizeMode="stretch"
//                     >
//                       <View style={styles.platformImageWrapper}>
//                         <Image source={{ uri: platform.platformImageURL }} style={styles.platformImage} resizeMode="stretch" />
//                       </View>
//                       <Text style={[styles.platformName, styles.border]}>{platform.platformName}</Text>
//                     </ImageBackground>
//                   </View>

//                   <View style={styles.detailsContainer}>
//                     <View style={styles.industriesContainer}>
//                       {platform.industries.map((industry, index) => (
//                         <ImageBackground
//                           key={index}
//                           style={styles.industryContainer}
//                           source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                           resizeMode="stretch"
//                         >
//                           <View style={styles.industryImageWrapper}>
//                             <Image source={{ uri: industry.imageURL }} style={styles.industryImage} resizeMode="stretch" />
//                           </View>
//                           <View style={styles.industryNameWrapper}>
//                             <Text style={styles.industry}>{industry.industryName}</Text>
//                           </View>
//                         </ImageBackground>
//                       ))}
//                     </View>

//                     <View style={styles.professionsContainer}>
//                       {platform.professions.map((profession, index) => (
//                         <View key={index} style={styles.professionContainer}>
//                           <ImageBackground
//                             style={styles.professionBackground}
//                             source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                             resizeMode="stretch"
//                           >
//                             <View style={styles.professionImageWrapper}>
//                               <Image source={{ uri: profession.imageURL }} style={styles.professionImage} resizeMode="stretch" />
//                             </View>
//                             <Text style={styles.professionName}>{profession.professionName}</Text>
//                           </ImageBackground>

//                           {profession.subProfessions.map((subProfession, subIndex) => (
//                             <View key={subIndex} style={styles.subProfessionContainer}>
//                               <Text>Sub-Profession ID: {subProfession.subProfessionId}</Text>
//                               {isEditing && editingPlatformId === platform.platformPermanentId ? (
//                                 <>
//                                   <TouchableOpacity onPress={() => toggleModal(subProfession.subProfessionId)}>
//                                     <Text style={styles.editButton}>Edit Years</Text>
//                                   </TouchableOpacity>
//                                 </>
//                               ) : (
//                                 <>
//                                   <Text>Starting Year: {subProfession.startingYear}</Text>
//                                   <Text>Ending Year: {subProfession.endingYear}</Text>
//                                 </>
//                               )}
//                             </View>
//                           ))}
//                         </View>
//                       ))}
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             ))
//           )}

//           <Modal
//             visible={isModalVisibleExp}
//             transparent={true}
//             animationType="slide"
//             onRequestClose={() => setModalVisibleExp(false)}
//           >
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>Select Years</Text>
//                 <Picker
//                   selectedValue={startYear}
//                   style={styles.picker}
//                   onValueChange={(itemValue) => setStartYear(itemValue)}
//                 >
//                   {years.map((year, index) => (
//                     <Picker.Item key={index} label={year.toString()} value={year.toString()} />
//                   ))}
//                 </Picker>
//                 <Picker
//                   selectedValue={endYear}
//                   style={styles.picker}
//                   onValueChange={(itemValue) => setEndYear(itemValue)}
//                 >
//                   {years.map((year, index) => (
//                     <Picker.Item key={index} label={year.toString()} value={year.toString()} />
//                   ))}
//                 </Picker>
//                 <Button title="Save" onPress={saveYearSelection} />
//                 <Button title="Cancel" onPress={() => setModalVisibleExp(false)} />
//               </View>
//             </View>
//           </Modal>
//         </ScrollView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   containers: {
//     flex: 1,
//     padding: 10,
//   },
//   bio_title: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   bio_title_touchable: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   bio_title_text: {
//     fontSize: responsiveFontSize(2.5),
//     fontWeight: 'bold',
//   },
//   downArrowContainer: {
//     marginLeft: 10,
//   },
//   downArrow: {
//     width: 20,
//     height: 20,
//   },
//   addIndustryButton: {
//     height: responsiveHeight(5.5),
//     width: responsiveWidth(45.5),
//     borderWidth: responsiveWidth(0.3),
//     borderColor: 'black',
//     borderRadius: responsiveWidth(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'blue',
//   },
//   addIndustryButtonText: {
//     fontSize: responsiveFontSize(2),
//     color: 'white',
//   },
//   platformContainer: {
//     marginBottom: 20,
//   },
//   editButton: {
//     color: 'blue',
//     textAlign: 'right',
//   },
//   platformDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   platformImageContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   platformImageBackground: {
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   platformImageWrapper: {
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//     overflow: 'hidden',
//   },
//   platformImage: {
//     width: 60,
//     height: 60,
//   },
//   platformName: {
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
//   border: {
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 5,
//     borderRadius: 5,
//   },
//   detailsContainer: {
//     flex: 2,
//   },
//   industriesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   industryContainer: {
//     width: 50,
//     height: 50,
//     margin: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   industryImageWrapper: {
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   industryImage: {
//     width: 30,
//     height: 30,
//   },
//   industryNameWrapper: {
//     marginTop: 5,
//   },
//   industry: {
//     fontSize: responsiveFontSize(1.5),
//     textAlign: 'center',
//   },
//   professionsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   professionContainer: {
//     width: 100,
//     margin: 10,
//   },
//   professionBackground: {
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   professionImageWrapper: {
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//     overflow: 'hidden',
//   },
//   professionImage: {
//     width: 60,
//     height: 60,
//   },
//   professionName: {
//     marginTop: 10,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   subProfessionContainer: {
//     marginTop: 10,
//   },
//   picker: {
//     height: 50,
//     width: 150,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: responsiveFontSize(2.5),
//     marginBottom: 20,
//   },
// });
