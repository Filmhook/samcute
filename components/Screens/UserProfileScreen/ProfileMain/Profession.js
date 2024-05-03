
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



export default function Profession() {
  const [platformData, setPlatformData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);


  const [filmCountInput, setFilmCountInput] = useState('');
const [netWorthInput, setNetWorthInput] = useState('');
const [dailySalaryInput, setDailySalaryInput] = useState('');
const [selectedImage, setSelectedImage] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [currentTitle, setCurrentTitle] = useState('');


  const [editingPlatformId, setEditingPlatformId] = useState(null); 


  const toggleEditMode = (platformId) => {
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
      
      const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=269`);
      const response = resp.data;

      const modifiedData = response.map(item => ({
        platformName: item.platformName,
        industries: item.industryNames,
        professions: item.professions.map(profession => ({
          professionName: profession.professionName,
          subProfessions: profession.subProfessionNames || [],
        })),
        filmCount: item.filmCount,
        netWorth: item.netWorth,
        dailySalary: item.dailySalary,
        platformPermanentId: item.platformPermanentId,
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
}

const openImagePicker = (platformId) => {
  setOpeningImagePicker(true);
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 300,
    maxWidth: 300,
  };

  launchImageLibrary(options, async (response) => {
    setOpeningImagePicker(false);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      const selectedImage = response.assets[0];
      setSelectedImage(selectedImage);
      try {
        await addImageWithTitle(platformId);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  });
};

const addImageWithTitle = async (platformId) => {
  if (!selectedImage) {
    throw new Error('No image selected.');
  }
  
  const jwt = await AsyncStorage.getItem('jwt');
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + jwt);

  const formData = new FormData();
  const userId = 248;
  formData.append('userId', userId);
  formData.append('platformPermanentId', platformId);

  const imageUriParts = selectedImage.uri.split('.');
  const fileType = imageUriParts[imageUriParts.length - 1];
  formData.append(`fileInputWebModel.files[0]`, {
    uri: selectedImage.uri,
    name: `image.${fileType}`,
    type: `image/${fileType}`,
  });

  const response = await fetch('https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/IndustryUser/project/saveProjectFiles', {
    method: 'POST',
    body: formData,
    headers: myHeaders
  });

  if (!response.ok) {
    throw new Error('Failed to upload image. HTTP Error: ' + response.status);
  }

  const data = await response.json();
  if (data.status !== 1) {
    throw new Error('Failed to upload image. Server returned status: ' + data.status);
  }

  Alert.alert('Posted');
};


  // Render JSX based on fetched data
  return (
    <View style={styles.containers}>
      <TouchableOpacity style={styles.bio_title} >
        <Text style={styles.bio_title_text}>PROFESSION</Text>

        <View style={{ width: responsiveWidth(5), height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require("../../../Assets/Userprofile_And_Fonts/update/down-arrow.png")}
            style={styles.downArrow}
          />
        </View>

      </TouchableOpacity>
 
      <ScrollView style={{ width: responsiveWidth(100), }}>
        {loading ? (

          <Text style={{textAlign:'center'}}>Loading...</Text>
        ) : (
          platformData.map((platform, index) => (
            <View key={index} style={styles.platformContainer}>

                    <View style={{ width:responsiveWidth(96)}}>
                    {editingPlatformId === platform.platformPermanentId ? ( 
              <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId, platform.platformName)}>
               <Text style={styles.editButton}>Save</Text>
              </TouchableOpacity>
            ) : ( // Render edit button if not in edit mode
              <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId)}>
               <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            )}
            </View>


             
              <View style={{
                flexDirection: 'row', columnGap: responsiveWidth(10),
                width: responsiveWidth(100), padding: responsiveWidth(1)
              }}>
                <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', }}>
                  <ImageBackground style={{
                    width: '102%',
                    height: '102%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                  }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={[styles.platformName, styles.border]}>{platform.platformName}</Text>
                  </ImageBackground>
                </View>
                <View style={{ width: responsiveWidth(58) }}>
                  <View style={styles.industriesContainer}>
                    {platform.industries.map((industry, index) => (
                      <ImageBackground key={index} style={{ width: responsiveWidth(45), marginBottom: responsiveHeight(1), height: responsiveHeight(5.5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text style={styles.industry}>{industry}</Text>
                      </ImageBackground>
                    ))}
                  </View>
                  <View style={styles.professionsContainer}>
                    {platform.professions.map((profession, index) => (
                      <View key={index} style={styles.professionContainer}>
                        <ImageBackground style={{
                          width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                        }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                          <Text style={styles.profession}>{profession.professionName}</Text>
                        </ImageBackground>
                        {profession.subProfessions.map((subProfession, subIndex) => (
                          <ImageBackground key={subIndex} style={{ width: responsiveWidth(30), marginBottom: responsiveHeight(1), height: responsiveHeight(5.5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <Text style={styles.subProfession}>{subProfession}</Text>
                          </ImageBackground>
                        ))}
                      </View>


                    ))}
                  </View>
                  <View style={styles.professionContainer}>
                    
                    <ImageBackground style={{
                      width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2),
                    }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

             {editingPlatformId === platform.platformPermanentId ? (
  <>
    <TextInput
      placeholder="Film Count"
      value={filmCountInput}
      onChangeText={text => setFilmCountInput(text)}
      keyboardType="numeric"
    />
  </>
) : (
  <>
    <Text style={{color:'black'}}>Film Count: {platform.filmCount}</Text>
    {/* Additional platform details here if needed */}
  </>
)}
                      
                    </ImageBackground>
                  </View>
                  <View style={styles.professionContainer}>
                    
                    <ImageBackground style={{
                      width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2),
                    }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

              {editingPlatformId === platform.platformPermanentId ? (
              <>
                <TextInput
                  placeholder="Net Worth"
                  value={netWorthInput}
                  onChangeText={text => setNetWorthInput(text)}
                  keyboardType="numeric"
                />
 
              </>
            ) : (
              // Else condition when not in edit mode
              <Text style={{color:'black'}}>Networth: {platform.netWorth}</Text>
            )}
                      
                    </ImageBackground>
                  </View>
                  <View style={styles.professionContainer}>
                    
                    <ImageBackground style={{
                      width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2),
                    }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

              {editingPlatformId === platform.platformPermanentId ? (
              <>
                <TextInput
                  placeholder="Daily Salary"
                  value={dailySalaryInput}
                  onChangeText={text => setDailySalaryInput(text)}
                  keyboardType="numeric"
                />
                {/* Add other TextInput fields for net worth and daily salary */}

                {/* Save button */}
               
              </>
            ) : (
              // Else condition when not in edit mode
              <Text style={{color:'black'}}>Daily Salery: {platform.dailySalary}</Text>
            )}

         
                      
                    </ImageBackground>
                  </View>

                </View>
              </View>
              <View style={{width:'100%'}}>
              <Text style={{ fontSize: 25, color: '#323232', fontWeight: 'bold', marginLeft: 10, textDecorationLine: 'underline' }}>Projects</Text>
              </View>
              <ScrollView horizontal contentContainerStyle={{margin:1}} style={{width:'100%', padding:responsiveWidth(1)}}>
             
                <View style={{marginRight:responsiveWidth(2)}}>
                              <TouchableOpacity onPress={() => project(platform.platformPermanentId)} style={{ width: 130, height: 150, borderWidth: 1, backgroundColor: "#F5F5F5",}} >
                  <Image source={require('../../../Assets/Home_Icon_And_Fonts/plus_icon.png')}
                      style={{width:80,height:80,alignSelf:'center',top:29}}/>
              </TouchableOpacity>
              </View>
              {/* {platform.fileUrls.map((url, index) => (       
<View style={{ width: 130, height: 150, borderWidth: 1, backgroundColor: "#F5F5F5",marginRight:responsiveWidth(2)}} >  
<Image key={index} source={{ uri: url }} style={{ width: '100%', height: '100%' }} resizeMode='stretch'/>
                 
                      </View>
))}  */}
              </ScrollView>
             

            </View>
          ))
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  containers: {
    alignItems: 'center',
    justifyContent: 'center',


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
    color:'black'
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
    color:'black'
    // marginLeft: 10,
  },
  border: {

    borderColor: 'black',
   
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



