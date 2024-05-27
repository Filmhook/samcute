
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ActivityIndicator, TextInput, Alert, Modal } from 'react-native'
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



export default function Profession() {
  const [platformData, setPlatformData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation=useNavigation();


  const [filmCountInput, setFilmCountInput] = useState('');
const [netWorthInput, setNetWorthInput] = useState('');
const [dailySalaryInput, setDailySalaryInput] = useState('');
const [selectedImage, setSelectedImage] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [currentTitle, setCurrentTitle] = useState('');
const [isEditing, setIsEditing] = useState(false);

  const [editingPlatformId, setEditingPlatformId] = useState(null); 
  const [startYears, setStartYears] = useState({});
  const [endYears, setEndYears] = useState({});


  const toggleEditMode = (platformId) => {

setIsEditing(true)
    if (platformId === editingPlatformId) {
      // Save changes and exit edit mode
      handleSave();
      setEditingPlatformId(null);
    } else {
      // Enter edit mode for the selected platform
      setEditingPlatformId(platformId);
    }
  };

  useEffect(() => {

    fetchData(); // Fetch data initially when component mounts if expanded

  }, []);


  const handleSave = async () => {
    setIsEditing(false)
  try {
    const platform = platformData.find(platform => platform.platformPermanentId === editingPlatformId);
    if (!platform) {
      console.error('Platform not found for editing.');
      return;
    }

    const response = await privateAPI.post(
      'industryUser/updateIndustryUserPermanentDetails',
      {
        platformPermanentId: editingPlatformId,
        filmCount: filmCountInput,
        netWorth: netWorthInput,
        dailySalary: dailySalaryInput,
      },
    );
    Alert.alert('Update', `${platform.platformName} Updated`);

    console.log('Platform details updated successfully:', response.data);

    setFilmCountInput('');
    setNetWorthInput('');
    setDailySalaryInput('');
    setEditingPlatformId(null); // Reset editingPlatformId after saving changes
    // Update the state with the new values
    setPlatformData(prevState =>
      prevState.map(p => {
        if (p.platformPermanentId === editingPlatformId) {
          return {
            ...p,
            filmCount: filmCountInput,
            netWorth: netWorthInput,
            dailySalary: dailySalaryInput,
          };
        }
        return p;
      })
    );
  } catch (error) {
    console.error('Error updating platform details:', error);
  }
};

  
const fetchData = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    console.log('check userid', userId)
    const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=${userId}`);
    const response = resp.data;

    const modifiedData = response.map(item => ({
      platformName: item.platformName,
      industries: item.industries.map(industry => ({
        industryName: industry.industryName,
        imageURL: `data:image/jpeg;base64,${industry.industryimage}`, // Decode base64 to image URL
      })),
      professions: item.professions.map(profession => ({
        professionName: profession.professionName,
        subProfessions: profession.subProfessionName || [],
        imageURL: `data:image/jpeg;base64,${profession.image}`, // Decode base64 to image URL
      })),
      filmCount: item.filmCount,
      netWorth: item.netWorth,
      dailySalary: item.dailySalary,
      platformPermanentId: item.platformPermanentId,
      platformImageURL: `data:image/jpeg;base64,${item.platformImage}`, // Decode base64 to image URL
      filePaths: item.outputWebModelList.map(file => ({
        filePath: file.filePath,
        description: file.description,
      })),

    }));

    setPlatformData(modifiedData);
    setLoading(false);
  } catch (error) {
    console.log("Error fetching data:", error);
    setLoading(false);
  }
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

      {expanded &&(


      <ScrollView style={{ width: responsiveWidth(100), }}>
      {isEditing && (
              <TouchableOpacity onPress={()=>navigation.navigate('IndustryOne')} style={{
                height: responsiveHeight(5.5),
                width: responsiveWidth(45.5),
                 borderWidth: responsiveWidth(0.3),
                borderColor: 'black',
                borderRadius: responsiveWidth(2),
               left:responsiveWidth(51),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'blue'
              }}>
                <Text style={{ fontSize: responsiveFontSize(2),
    color: 'white',}}>Add Industry</Text>
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


              <View style={{ flexDirection: 'row', columnGap: responsiveWidth(10), width: responsiveWidth(100), padding: responsiveWidth(1) }}>
                <View style={{ width: responsiveHeight(19), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', flexWrap:'wrap' }}>
                  <ImageBackground style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  flexWrap:'wrap'  }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                  <View style={{width:responsiveWidth(21), height:responsiveHeight(6.5), right:responsiveWidth(2), margin:responsiveWidth(1)}}>
                  <Image source={{ uri: platform.platformImageURL }} style={{  width: '100%', height: '80%'  }} resizeMode='stretch'/>
                  </View>

                    <Text style={[styles.platformName, styles.border]}>{platform.platformName}</Text>
                  </ImageBackground>
                </View>
                <View style={{ width: responsiveWidth(58) }}>
                  <View style={styles.industriesContainer}>
                    {platform.industries.map((industry, index) => (
                      <ImageBackground key={index} style={{ width: responsiveWidth(45), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap:'wrap' }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <View style={{width:responsiveWidth(9), height:responsiveHeight(5), right:responsiveWidth(2),}}>
                        <Image source={{ uri: industry.imageURL }} style={{ width: '90%', height: '80%',padding:1 }} resizeMode='stretch' />
                        </View>
                        <View style={{width:responsiveWidth(29)}}>
                        <Text style={styles.industry}>{industry.industryName}</Text>
                        </View>
                      </ImageBackground>
                    ))}
                  </View>
                  <View style={styles.professionsContainer}>
                    {platform.professions.map((profession, index) => (
                      <View key={index} style={styles.professionContainer}>
                        <ImageBackground style={{ width: responsiveWidth(45), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' ,flexWrap:'wrap'}} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <View style={{width:responsiveWidth(9), height:responsiveHeight(5), right:responsiveWidth(2)}}>
                          <Image source={{ uri: profession.imageURL }} style={{ width: '100%', height: '80%' }} resizeMode='stretch' />
                          </View>
                          <View style={{width:responsiveWidth(29)}}>
                          <Text style={styles.profession}>{profession.professionName}</Text>
                          </View>
                        </ImageBackground>
                        {profession.subProfessions.map((subProfession, subIndex) => (
                          <ImageBackground key={subIndex} style={{ width: responsiveWidth(30), marginBottom: responsiveHeight(1), padding:2,flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            
                            <Text style={styles.subProfession}>{subProfession}</Text>
                          </ImageBackground>
                        ))}
                      </View>
                    ))}
                  </View>
                  <View style={styles.professionContainer}>
                    <ImageBackground style={{ width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                      {editingPlatformId === platform.platformPermanentId ? (
                        <TextInput
                          placeholder="Film Count"
                          value={filmCountInput}
                          onChangeText={text => setFilmCountInput(text)}
                          keyboardType="numeric"
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
                              
              {platform.filePaths.map((file, index) => (       
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
    color:'black'
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
    color:'black',
   
    textAlign:'center'
  },
  industriesContainer: {
    marginLeft: responsiveWidth(2),
    marginBottom: 5,

  },
  industry: {
    fontWeight: 'bold',
    color:'black'
  },
  professionsContainer: {
    marginLeft: responsiveWidth(2),
  },
  professionContainer: {
    marginBottom: 5,
  },
  profession: {
    fontWeight: 'bold',
    color:'black'
  },
  subProfession: {
    color:'black',
     textAlign:'center'
    // marginLeft: 10,
  },
  image: {
    alignSelf:'center',
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
 
});


// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import privateAPI from '../../../api/privateAPI'

// export default function Profession() {
//   const [platformData, setPlatformData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData(); // Fetch data initially when component mounts
//   }, []);

//   const fetchData = async () => {
//     try {
//       const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=248`);
//       const response = resp.data;

//       // Update state with fetched data
//       setPlatformData(response);
//       setLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.log("Error fetching data:", error);
//       setLoading(false); // Set loading to false if an error occurs
//     }
//   };

//   const handleEdit = async (platformPermanentId, filmCount, netWorth, dailySalary) => {
//     try {
//       const token = 'YOUR_JWT_TOKEN'; // Replace 'YOUR_JWT_TOKEN' with your actual JWT token

//       // Make the API request with the updated data and platform ID
//       const response = await privateAPI.post(
//         'industryUser/updateIndustryUserPermanentDetails',
//         {
//           platformPermanentId: 2,
//           filmCount: filmCount,
//           netWorth: netWorth,
//           dailySalary: dailySalary,
//         }
//       );
      
// console.log()
//       console.log('Platform details updated successfully:', response.data);
//       // Optionally, you can handle success actions here, such as showing a success message or updating state
//     } catch (error) {
//       console.error('Error updating platform details:', error);
//       // Optionally, you can handle error actions here, such as showing an error message to the user
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         {loading ? (
//           <Text>Loading...</Text> 
//         ) : (
//           platformData.map((platform, index) => (
//             <View key={index} style={styles.platformContainer}>
//               <TouchableOpacity onPress={() => handleEdit(platform.platformPermanentId, 77,99,99)}>
//                 <Text>Edit</Text> 
//               </TouchableOpacity>
             
//             </View>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   scrollView: {
//     width: responsiveWidth(100),
//   },
//   platformContainer: {
//     width: responsiveWidth(100),
//     marginBottom: responsiveHeight(2),
//     paddingHorizontal: responsiveWidth(2),
//   },
// });