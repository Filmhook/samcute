

// import { useNavigation } from "@react-navigation/native";
// import { Verify } from "crypto";
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image, ScrollView, Alert } from "react-native";
// import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
// import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import Modal from 'react-native-modal';
// import ImagePicker from 'react-native-image-crop-picker';
// import DocumentPicker from 'react-native-document-picker';
// import { Axios } from "axios";
// import PublicAPI from "../../../api/publicAPI";
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default function Industry_S_Two({ route }) {

//   const [story, setStory] = useState([]);
//   const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
//   const [imagePickerModalVisiblePan, setImagePickerModalVisiblePan] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([])
//   const [panAadharImg, setPanAadharImg] = useState([])

// console.log(`selectedImages ${JSON.stringify(selectedImages)}`)
// console.log(`selectedVideo ${JSON.stringify(selectedVideo)}`)
// console.log(`panAadharImg ${JSON.stringify(panAadharImg)}`)

//   const handle_storypost = () => {
//     setImagePickerModalVisible(true);
//   };

//   const handleImageOptionPan = () => {
//     setImagePickerModalVisiblePan(true);
//   };

// //  useEffect(() => {
// //  setSelectedImages([]);
// //  setSelectedVideo([]);
// //  setPanAadharImg([]);
// //  }, [])

//   const handleImageOption = async (option) => {
//     try {

//       if (option === 'camera') {
//         const image = await ImagePicker.openCamera({
//           cropping: true,
//         });
//         console.log(image)
//         //        updateStory(image);
//       } else if (option === 'gallery') {
//         const image = await DocumentPicker.pick({
//           type: [DocumentPicker.types.allFiles],

//         });

//         setSelectedImages(p => {
//           return [...p, image[0]]
//         })
//       }
//     } catch (error) {
//       console.log('Image picker operation canceled or failed:', error);
//     } finally {
//       setImagePickerModalVisible(false);
//     }
//   };

//   const handleImageOptionPanAdhar = async (option) => {
//     try {

//       if (option === 'camera') {
//         const image = await ImagePicker.openCamera({
//           cropping: true,
//         });
//         console.log(image)
//         //        updateStory(image);
//       } else if (option === 'gallery') {
//         const image = await DocumentPicker.pick({
//           type: [DocumentPicker.types.allFiles],

//         });

//         setPanAadharImg(p => {
//           return [...p, image[0]]
//         })
//       }
//     } catch (error) {
//       console.log('Image picker operation canceled or failed:', error);
//     } finally {
//       setImagePickerModalVisiblePan(false);
//     }
//   };




//   const handle_postzoom = () => {
//     console.log('clicked');
//   };





//   // for data prop
//   const nationality = route.params?.nationality
//   const selected = route.params?.selected

//   const pickVideo = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.video],
//       });
//       setSelectedVideo(v => {
//         return [...v, res[0]]
//       });

//       console.log('video', selectedVideo)
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker
//         console.log('User cancelled');
//       } else {
//         Alert.alert('Error', 'Error picking video file');
//       }
//     }
//   };



//   const uploadVideo = async () => {
//     if (selectedVideo === null) {
//       Alert.alert('Error', 'Please select a video file first');
//       return;
//     }


//   };
//   //===============================================================

//   const handlepressNav = () => {
//     if (current === '' || living === '' || profession === '' || birthcity === '') {
//       alert('CurrentLocation and NativeLocation cannot be empty.');
//     }
//     else {
//       navigation.navigate("IndustryThree", {
//         nationality,
//         selected
//       })
//     }
//   }

//   const navigation = useNavigation();
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const handleChooseMedia = () => {
//     const options = {
//       title: 'Select Media',
//       mediaType: 'mixed', // This allows both images and videos
//       quality: 0.5,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     //  ImagePicker.launchImageLibrary(options, response => {

//     ImagePicker.launchImageLibrar(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         setSelectedMedia(response);
//       }
//     });
//   };

//   const handleUploadMedia = () => {
//     // Implement your upload logic here
//     if (selectedMedia) {
//       // Upload selectedMedia to your server
//       console.log('Uploading media:', selectedMedia);
//     } else {
//       Alert.alert('Please select a media file first');
//     }
//   };


// const handleSubmit =async () => {

// try {
//       const id = await AsyncStorage.getItem('userId');

     

// console.log(`User Id from IS Confirm ${id}`)
// console.log("HITT")
// let formData = new FormData()
// formData.append("userId", id);
// [...selectedImages].forEach(img => {
// formData.append("images" , img)
// });
// //formData.append("images" , selectedImages[0]);
// [...selectedVideo].forEach(vid => {
// formData.append("videos" , vid)
// });
// //formData.append("videos", selectedVideo[0]);
// formData.append("panCard", panAadharImg[0]);
// formData.append("adharCard", panAadharImg[0]);

// console.log("Data being posted:", JSON.stringify(formData));
// const myHeaders = new Headers();
//       const jwt = await AsyncStorage.getItem("jwt");
// //      myHeaders.append("Authorization", "Bearer " + jwt);
//       // Define requestOptions with method, headers, body, and redirect options
//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: formData,
//         redirect: "follow"
//       };

//       // Make a POST request using fetch
//       fetch("https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/industryUser/saveIndustryUserFiles", requestOptions)
//         .then((response) => response.json()) // Parse response JSON
//         .then((data) => {
//           console.log("Response data:", data);
//           if (data.status === 1) {
//             // Handle successful response
//             const fileId = data.data.fileId;
//             const fileName = data.data.fileName;
//             const filePath = data.data.filePath;
//             // Use fileId, fileName, filePath, etc. as needed
//             Alert.alert('Posted Success', `File ${fileName} saved successfully.`);
//                   navigation.navigate('Tabbar');
//           } else {
//             // Handle unsuccessful response
//             Alert.alert('Posted Error', data.message);
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//           Alert.alert('Posted Error', 'Failed to post image.');
//         });

// //  Alert.alert('Success');
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }

// }


//   //=============================================

//   const Renderdata = ({ name, profession, path }) => {
//     return (
//       <>
//         <View >
//           <TouchableOpacity
//             onPress={handle_postzoom}
//             style={{ marginLeft: responsiveWidth(1), width: responsiveWidth(23), height: responsiveHeight(18), borderRadius: responsiveWidth(2), }}>
//             <View
//               style={{
//                 width: responsiveWidth(22),
//                 height: responsiveHeight(18),
//                 borderWidth: responsiveWidth(0.5),
//                 borderRadius: responsiveWidth(2),
//                 //  bottom:responsiveHeight(0.8)
//               }}>
//               <Image
//                 source={{ uri: path }}
//                 style={{ width: '100%', height: '100%', borderRadius: responsiveWidth(2) }}
//                 resizeMode="stretch"
//               />
//             </View>

//           </TouchableOpacity>

//         </View>



//       </>
//     );
//   };


//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>



//         <View style={{ height: responsiveHeight(8), width: responsiveWidth(100), flexDirection: 'row', bottom: responsiveHeight(1) }}>

//           <Image style={{
//             height: responsiveHeight(8),
//             width: responsiveWidth(15), margin: 0, padding: 0, bottom: responsiveWidth(2), right: responsiveWidth(2)
//           }} source={require("../../../Assets/Login_page/FH_logos.png")} />

//           <Image style={{ height: responsiveHeight(3.2), width: responsiveWidth(45), position: 'absolute', left: responsiveWidth(8), top: responsiveHeight(3) }} source={require('../../../Assets/Login_page/Film_hook_name.png')} />
//           <Text style={{ color: 'blue', fontWeight: 'bold', position: 'absolute', left: responsiveWidth(32), top: responsiveHeight(6) }}>Industry User</Text>


//         </View>

//         <View style={{ paddingVertical: responsiveWidth(0.1), backgroundColor: 'black', borderWidth: 1, width: responsiveWidth(100) }}></View>

//         <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2.5), color: 'black', top: responsiveHeight(0.8) }}>To get verified, clear the Steps</Text>

//         <View style={{ margin: responsiveHeight(2) }}>
//           <View style={{ flexDirection: 'row', bottom: responsiveHeight(0.8) }}>
//             <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Step 1:</Text>
//             <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black' }}>We take this information to know your the Industrialist.</Text>
//           </View>
//           <View style={{ flexDirection: 'row', columnGap: responsiveWidth(4), paddingHorizontal: responsiveWidth(18) }}>
//             <View style={{ height: responsiveHeight(8), width: responsiveWidth(40), backgroundColor: 'black', borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: 'white', lineHeight: responsiveHeight(2.5), fontSize: responsiveFontSize(1.2), fontWeight: '800' }}>Upload your 3 Working Still/{'\n'}3 Working Video/{'\n'}Valid Union Card</Text>
//             </View>
//             <TouchableOpacity onPress={handle_storypost} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(18), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(1), left: responsiveWidth(8.9), borderWidth: responsiveWidth(0.5), borderColor: 'black' }}>
//               <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(13) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>
//               <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload</Text>
//             </TouchableOpacity>




//           </View>
//           <TouchableOpacity onPress={pickVideo} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(25), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(8), left: responsiveWidth(68), borderWidth: responsiveWidth(0.5), borderColor: 'black', position: 'absolute' }}>
//             <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(20) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>
//             <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload video</Text>
//           </TouchableOpacity>

//           <View style={{
//             flexDirection: 'row', height: responsiveHeight(11), justifyContent: 'center', alignItems: 'center',
//           }}>
//             <View style={{ width: responsiveWidth(60), flexDirection: 'row', left: responsiveWidth(2), columnGap: responsiveWidth(2) }}>

//               <Image source={require('../../../Assets/Login_page/video_shooting.gif')} style={{ height: responsiveHeight(10), width: responsiveWidth(17), borderColor: 'black', borderWidth: responsiveWidth(0.4) }}></Image>
//               <Image source={require('../../../Assets/Login_page/Img_shooting_dont.jpg')} style={{ height: responsiveHeight(10), width: responsiveWidth(17), borderColor: 'black', borderWidth: responsiveWidth(0.4) }}></Image>
//               <Image source={require('../../../Assets/Login_page/FH_UnionSample.png')} style={{ height: responsiveHeight(10), width: responsiveWidth(20), borderColor: 'black', borderWidth: responsiveWidth(0.4) }}></Image>



//               <Image source={require('../../../Assets/Login_page/tickMark.png')} style={{ height: responsiveHeight(2), width: responsiveWidth(8), position: 'absolute', left: responsiveWidth(10), top: responsiveHeight(0.3) }}></Image>
//             </View>


//           </View>
//         </View>

//         <View style={{ bottom: responsiveWidth(4) }}>
//           <View style={{ flexDirection: 'row', }}>
//             <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Step 2:</Text>
//             <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black' }}>We required your Govt. ID to confim that its you or not.</Text>
//           </View>
//           <View style={{ flexDirection: 'row', columnGap: responsiveWidth(4), paddingHorizontal: responsiveWidth(18) }}>
//             <View style={{ height: responsiveHeight(7), width: responsiveWidth(40), backgroundColor: 'black', borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: 'white', lineHeight: responsiveHeight(2.5), fontSize: responsiveFontSize(1.2), fontWeight: '800' }}>Upload your Aadhar Card {'\n'}Or PAN Card</Text>
//             </View>




//             <TouchableOpacity onPress={handleImageOptionPan} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(18), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(4), left: responsiveWidth(8.9), borderWidth: responsiveWidth(0.5), borderColor: 'black' }}>
//               <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(13) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>

//               <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload</Text>

//             </TouchableOpacity>

//           </View>
//           <View style={{ flexDirection: 'row', height: responsiveHeight(11), justifyContent: 'center', alignItems: 'center' }}>
//             <View style={{ width: responsiveWidth(60), flexDirection: 'row' }}>

//               <Image source={require('../../../Assets/Login_page/AadharSample.png')} style={{ height: responsiveHeight(11), width: responsiveWidth(17) }}></Image>
//               <Text style={{ top: responsiveHeight(4) }}>or</Text>
//               <Image source={require('../../../Assets/Login_page/PanCardSample.png')} style={{ height: responsiveHeight(9), width: responsiveWidth(30), top: responsiveHeight(1.5) }}></Image>
//             </View>


//           </View>

//           {/* for modal */}
//           <Modal
//             isVisible={imagePickerModalVisible}
//             onBackdropPress={() => setImagePickerModalVisible(false)}>
//             <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>

//               <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('gallery')}>
//                 <Text>Choose from Gallery</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{ padding: 10 }} onPress={() => setImagePickerModalVisible(false)}>
//                 <Text>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </Modal>

//           <Modal
//             isVisible={imagePickerModalVisiblePan}
//             onBackdropPress={() => setImagePickerModalVisiblePan(false)}>
//             <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>

//               <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOptionPanAdhar('gallery')}>
//                 <Text>Choose from Gallery</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{ padding: 10 }} onPress={() => setImagePickerModalVisiblePan(false)}>
//                 <Text>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </Modal>



//         </View>
//         <Text style={{ bottom: responsiveWidth(5), color: 'black', fontWeight: '700' }}>NOR</Text>
//         <Text style={{ bottom: responsiveWidth(5), fontSize: responsiveFontSize(1.4), color: 'black' }}>If incase of different 'NAME' from your Govt. ID then Suggest your friends filmhook ID and ask them referal code been sent to there Notification, Enter the code and submit it.</Text>
//         <View style={{ height: responsiveHeight(3.5), flexDirection: 'row', borderWidth: 1, width: responsiveWidth(42), alignItems: 'center', bottom: responsiveWidth(5) }}>
//           <TextInput
//             placeholder="Enter your Friends filmhook ID"

//             style={{ height: responsiveHeight(5), fontSize: responsiveFontSize(1.2) }}
//           />
//           <TouchableOpacity style={{ width: responsiveWidth(4), }}>
//             <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} source={require('../../../Assets/Login_page/Send_icon.png')}></Image>
//           </TouchableOpacity>
//         </View>
//         <View style={{ height: responsiveHeight(3.5), flexDirection: 'row', borderWidth: 1, width: responsiveWidth(25), alignItems: 'center', bottom: responsiveWidth(4), right: responsiveWidth(8.3) }}>
//           <TextInput
//             placeholder="Enter Referal code"

//             style={{ height: responsiveHeight(5), fontSize: responsiveFontSize(1.2) }}
//           />
//           <View>
//             <TouchableOpacity style={{ backgroundColor: '#001adc', borderColor: 'black', opacity: 0.8, borderWidth: responsiveWidth(0.3), width: responsiveWidth(15), height: responsiveHeight(3), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', left: responsiveWidth(20.8) }}>
//               <Text style={{ color: 'white', fontSize: responsiveFontSize(1.2), fontWeight: 'bold' }}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', }}>
//           <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Step 3:</Text>
//           <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black' }}>Introduce yourself by saying I am _____, My code is 5222</Text>
//         </View>
//         <View style={{ flexDirection: 'row', columnGap: responsiveWidth(4), paddingHorizontal: responsiveWidth(18), top: responsiveHeight(1) }}>
//           <View style={{ height: responsiveHeight(3), width: responsiveWidth(40), backgroundColor: 'black', borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ color: 'white', lineHeight: responsiveHeight(2.5), fontSize: responsiveFontSize(1.2), fontWeight: '800' }}>Upload your 1 min Video</Text>
//           </View>




//           <TouchableOpacity onPress={pickVideo} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(18), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', left: responsiveWidth(8.6), borderWidth: responsiveWidth(0.5), borderColor: 'black' }}>
//             <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(13) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>

//             <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload</Text>

//           </TouchableOpacity>
//         </View>
//         <View style={{ flexDirection: 'row', left: responsiveWidth(1), top: responsiveHeight(2.8) }}>
//           <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Note:</Text>
//           <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black', width: responsiveWidth(85), fontSize: responsiveFontSize(1.7) }}>Your Profile will get verified within 24 hrs. Incase the profile doesn't match any of these, then your profile will be visible as a Public User </Text>
//         </View>

//         <TouchableOpacity onPress={handleSubmit} style={{ width: responsiveWidth(40), backgroundColor: 'blue', height: responsiveHeight(4), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(4), left: responsiveWidth(25), borderWidth: responsiveWidth(0.5), borderColor: 'black', borderRadius: responsiveWidth(2), opacity: 0.7 }} >
//           <Text style={{ color: 'white' }}>Apply for Verification</Text>
//         </TouchableOpacity>


//         {/* <View style={{ flexDirection: 'row', margin: responsiveHeight(4), columnGap: responsiveWidth(18) }}>
//           <TouchableOpacity onPress={() => navigation.navigate('IndustryOne', { nationality, selected })} style={styles.backButton}>
//             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
//             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Step 3</Text>
//           </TouchableOpacity>
//         </View> */}
//       </View>
//     </View >
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',
//     //  padding: responsiveWidth(3),
//     backgroundColor: '#f5f5f5',

//     width: '100%',
//     height: '100%'
//   },
//   formContainer: {
//     width: '100%',

//     padding: responsiveWidth(3),
//     backgroundColor: '#f5f5f5',
//     borderRadius: responsiveWidth(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     // marginTop: responsiveHeight(1),
//     // borderWidth:1
//   },
//   countryPickerContainer: {
//     height: 46,
//     borderWidth: 2,
//     borderRadius: 10,
//     marginTop: 15,
//     padding: 8,
//     width: 295

//   },

//   nextButton: {
//     backgroundColor: 'blue',
//     //  padding: responsiveWidth(2),
//     borderRadius: responsiveWidth(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: responsiveWidth(34),
//     left: responsiveWidth(42),
//     marginTop: responsiveHeight(4),
//     height: responsiveHeight(6),

//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'black'
//   },
//   buttonText: {
//     color: 'black',
//     fontWeight: 'bold',
//     textAlign: 'center',

//   },
//   input: {
//     flexDirection: 'row',
//     // justifyContent:'center',
//     alignItems: 'center',
//     marginBottom: responsiveHeight(2),

//     borderWidth: responsiveWidth(0.5),
//     paddingHorizontal: responsiveWidth(4),
//     borderRadius: responsiveWidth(2),
//     height: responsiveHeight(8.2),
//     width: responsiveWidth(86),
//     borderColor: 'black',
//     margin: responsiveWidth(1),
//     fontSize: responsiveFontSize(2)
//   },
//   backButton: {
//     backgroundColor: 'black',
//     // padding: responsiveWidth(2.5),
//     borderRadius: responsiveWidth(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//     // alignSelf: 'center',
//     height: responsiveHeight(6),
//     width: responsiveWidth(30),
//   },
//   nextButton: {
//     backgroundColor: '#616161',
//     // padding: responsiveWidth(2.5),
//     borderRadius: responsiveWidth(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//     // alignSelf: 'center',
//     height: responsiveHeight(6),
//     width: responsiveWidth(30),
//     //bottom: responsiveHeight(1.5)
//   },
//   header: {
//     fontSize: responsiveFontSize(3),
//     fontWeight: 'bold',
//     top: responsiveHeight(2),
//     marginBottom: responsiveHeight(5),
//     color: '#1e1ff5',
//     // left:70,
//     fontFamily: 'ArianaVioleta-dz2K',
//     textAlign: 'center'
//   },

//   container1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image1: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginVertical: 20,
//   },
//   button1: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText1: {
//     color: 'white',
//   },
// });

import { useNavigation } from "@react-navigation/native";
import { Verify } from "crypto";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image, ScrollView, Alert } from "react-native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import axios, { Axios } from "axios";
import PublicAPI from "../../../api/publicAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from "../../../api/privateAPI";


export default function Industry_S_Two({ route }) {

  const [story, setStory] = useState([]);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [imagePickerModalVisiblePan, setImagePickerModalVisiblePan] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [selectedImages, setSelectedImages] = useState([])
  const [panAadharImg, setPanAadharImg] = useState([])

console.log(`selectedImages ${JSON.stringify(selectedImages)}`)
console.log(`selectedVideo ${JSON.stringify(selectedVideo)}`)
console.log(`panAadharImg ${JSON.stringify(panAadharImg)}`)

  const handle_storypost = () => {
    setImagePickerModalVisible(true);
  };

  const handleImageOptionPan = () => {
    setImagePickerModalVisiblePan(true);
  };

//  useEffect(() => {
//  setSelectedImages([]);
//  setSelectedVideo([]);
//  setPanAadharImg([]);
//  }, [])

  const handleImageOption = async (option) => {
    try {

      if (option === 'camera') {
        const image = await ImagePicker.openCamera({
          cropping: true,
        });
        console.log(image)
        //        updateStory(image);
      } else if (option === 'gallery') {
        const image = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],

        });

        setSelectedImages(p => {
          return [...p, image[0]]
        })
      }
    } catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    } finally {
      setImagePickerModalVisible(false);
    }
  };

  const handleImageOptionPanAdhar = async (option) => {
    try {

      if (option === 'camera') {
        const image = await ImagePicker.openCamera({
          cropping: true,
        });
        console.log(image)
        //        updateStory(image);
      } else if (option === 'gallery') {
        const image = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],

        });

        setPanAadharImg(p => {
          return [...p, image[0]]
        })
      }
    } catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    } finally {
      setImagePickerModalVisiblePan(false);
    }
  };




  const handle_postzoom = () => {
    console.log('clicked');
  };





  // for data prop
  const nationality = route.params?.nationality
  const selected = route.params?.selected

  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      setSelectedVideo(v => {
        return [...v, res[0]]
      });

//      console.log('video', selectedVideo)
//      console.log('video', selectedVideo)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled');
      } else {
        Alert.alert('Error', 'Error picking video file');
      }
    }
  };



  const uploadVideo = async () => {
    if (selectedVideo === null) {
      Alert.alert('Error', 'Please select a video file first');
      return;
    }


  };
  //===============================================================

  const handlepressNav = () => {
    if (current === '' || living === '' || profession === '' || birthcity === '') {
      alert('CurrentLocation and NativeLocation cannot be empty.');
    }
    else {
      navigation.navigate("IndustryThree", {
        nationality,
        selected
      })
    }
  }

  const navigation = useNavigation();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const handleChooseMedia = () => {
    const options = {
      title: 'Select Media',
      mediaType: 'mixed', // This allows both images and videos
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    //  ImagePicker.launchImageLibrary(options, response => {

    ImagePicker.launchImageLibrar(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedMedia(response);
      }
    });
  };

  const handleUploadMedia = () => {
    // Implement your upload logic here
    if (selectedMedia) {
      // Upload selectedMedia to your server
      console.log('Uploading media:', selectedMedia);
    } else {
      Alert.alert('Please select a media file first');
    }
  };


const handleSubmit =async () => {

try {
      const id = await AsyncStorage.getItem('userId');
const idDemo=3;
     

console.log(`User Id from IS Confirm ${id}`)
console.log("HITT")
let formData = new FormData()
formData.append("userId", idDemo);
//formData.append("userId", '3');
[...selectedImages].forEach(img => {
formData.append("images" , img)
});
//formData.append("images" , selectedImages[0]);
[...selectedVideo].forEach(vid => {
formData.append("videos" , vid)
});
//formData.append("videos", selectedVideo[0]);
formData.append("panCard", panAadharImg[0]);
formData.append("adharCard", panAadharImg[0]);

console.log("Data being posted:", JSON.stringify(formData));
const myHeaders = new Headers();
      const jwt = await AsyncStorage.getItem("jwt");
//      myHeaders.append("Authorization", "Bearer " + jwt);
      // Define requestOptions with method, headers, body, and redirect options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      };
console.log(`Posted Data - ${JSON.stringify(formData)}`)
console.log(`Posted Data - ${JSON.stringify(formData)}`)
      // Make a POST request using fetch
      fetch("https://filmhook.annularprojects.com/filmhook-0.1/industryUser/saveIndustryUserFiles", requestOptions)
        .then((response) => response.json()) // Parse response JSON
        .then((data) => {
          console.log("Response data:", data);
          if (data.status === 1) {
            // Handle successful response
            const fileId = data.data.fileId;
            const fileName = data.data.fileName;
            const filePath = data.data.filePath;
            // Use fileId, fileName, filePath, etc. as needed
            Alert.alert('Posted Success', `File ${fileName} saved successfully.`);
                  navigation.navigate('Tabbar');
          } else {
            // Handle unsuccessful response
            Alert.alert('Posted Error', data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Posted Error', 'Failed to post image.');
        });

//  Alert.alert('Success');
    } catch (error) {
      console.error('Registration failed:', error);
    }

}

//FilmhookIdmailSend
const [filmHookCode, setFilmHookCode] = useState('');
const sendFilmHookCode = async () => {
  if (!filmHookCode.trim()) {
    Alert.alert('Error', 'Enter Filmhook code');
    return;
  }

  const url = 'industryUser/emailSendFilmHookCode';
  const payload = { filmHookCode :filmHookCode };

  try {
    const res = await privateAPI.post(url, payload, {
     
    });
    Alert.alert('Success', res.data)
   
    console.log('Response:', res.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
//VerifyOtp
const [filmHookOtp, setFilmHookOtp] = useState('');
const sendFilmHookOtpCode = async () => {
 

  if (!filmHookOtp.trim()) {
    Alert.alert('Error', 'Enter Referal Code');
    return;
  }

  const url = 'industryUser/verifyFilmHookCode';
  const payload = {
    
    filmHookOtp: filmHookOtp
  };

  try {
    const res = await privateAPI.post(url, payload, {
     
    });
  Alert.alert("Success", res.data.message)
    console.log('Response:', res.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

  //=============================================

  const Renderdata = ({ name, profession, path }) => {
    return (
      <>
        <View >
          <TouchableOpacity
            onPress={handle_postzoom}
            style={{ marginLeft: responsiveWidth(1), width: responsiveWidth(23), height: responsiveHeight(18), borderRadius: responsiveWidth(2), }}>
            <View
              style={{
                width: responsiveWidth(22),
                height: responsiveHeight(18),
                borderWidth: responsiveWidth(0.5),
                borderRadius: responsiveWidth(2),
                //  bottom:responsiveHeight(0.8)
              }}>
              <Image
                source={{ uri: path }}
                style={{ width: '100%', height: '100%', borderRadius: responsiveWidth(2) }}
                resizeMode="stretch"
              />
            </View>

          </TouchableOpacity>

        </View>



      </>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>



        <View style={{ height: responsiveHeight(8), width: responsiveWidth(100), flexDirection: 'row', bottom: responsiveHeight(1) }}>

          <Image style={{
            height: responsiveHeight(8),
            width: responsiveWidth(15), margin: 0, padding: 0, bottom: responsiveWidth(2), right: responsiveWidth(2)
          }} source={require("../../../Assets/Login_page/FH_logos.png")} />

          <Image style={{ height: responsiveHeight(3.2), width: responsiveWidth(45), position: 'absolute', left: responsiveWidth(8), top: responsiveHeight(3) }} source={require('../../../Assets/Login_page/Film_hook_name.png')} />
          <Text style={{ color: 'blue', fontWeight: 'bold', position: 'absolute', left: responsiveWidth(32), top: responsiveHeight(6) }}>Industry User</Text>


        </View>

        <View style={{ paddingVertical: responsiveWidth(0.1), backgroundColor: 'black', borderWidth: 1, width: responsiveWidth(100) }}></View>

        <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2.5), color: 'black', top: responsiveHeight(0.8) }}>To get verified, clear the Steps</Text>

        <View style={{ margin: responsiveHeight(2) }}>
          <View style={{ flexDirection: 'row', bottom: responsiveHeight(0.8) }}>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Step 1:</Text>
            <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black' }}>We take this information to know your the Industrialist.</Text>
          </View>
          <View style={{ flexDirection: 'row', columnGap: responsiveWidth(4), paddingHorizontal: responsiveWidth(18) }}>
            <View style={{ height: responsiveHeight(8), width: responsiveWidth(40), backgroundColor: 'black', borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', lineHeight: responsiveHeight(2.5), fontSize: responsiveFontSize(1.2), fontWeight: '800' }}>Upload your 3 Working Still/{'\n'}3 Working Video/{'\n'}Valid Union Card</Text>
            </View>
            <TouchableOpacity onPress={handle_storypost} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(18), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(1), left: responsiveWidth(8.9), borderWidth: responsiveWidth(0.5), borderColor: 'black' }}>
              <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(13) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload</Text>
            </TouchableOpacity>




          </View>
          <TouchableOpacity onPress={pickVideo} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(25), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(8), left: responsiveWidth(68), borderWidth: responsiveWidth(0.5), borderColor: 'black', position: 'absolute' }}>
            <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(20) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload video</Text>
          </TouchableOpacity>

          <View style={{
            flexDirection: 'row', height: responsiveHeight(11), justifyContent: 'center', alignItems: 'center',
          }}>
            <View style={{ width: responsiveWidth(60), flexDirection: 'row', left: responsiveWidth(2), columnGap: responsiveWidth(2) }}>

              <Image source={require('../../../Assets/Login_page/video_shooting.gif')} style={{ height: responsiveHeight(10), width: responsiveWidth(17), borderColor: 'black', borderWidth: responsiveWidth(0.4) }}></Image>
              <Image source={require('../../../Assets/Login_page/Img_shooting_dont.jpg')} style={{ height: responsiveHeight(10), width: responsiveWidth(17), borderColor: 'black', borderWidth: responsiveWidth(0.4) }}></Image>
              <Image source={require('../../../Assets/Login_page/FH_UnionSample.png')} style={{ height: responsiveHeight(10), width: responsiveWidth(20), borderColor: 'black', borderWidth: responsiveWidth(0.4) }}></Image>



              <Image source={require('../../../Assets/Login_page/tickMark.png')} style={{ height: responsiveHeight(2), width: responsiveWidth(8), position: 'absolute', left: responsiveWidth(10), top: responsiveHeight(0.3) }}></Image>
            </View>


          </View>
        </View>

        <View style={{ bottom: responsiveWidth(4) }}>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Step 2:</Text>
            <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black' }}>We required your Govt. ID to confim that its you or not.</Text>
          </View>
          <View style={{ flexDirection: 'row', columnGap: responsiveWidth(4), paddingHorizontal: responsiveWidth(18) }}>
            <View style={{ height: responsiveHeight(7), width: responsiveWidth(40), backgroundColor: 'black', borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', lineHeight: responsiveHeight(2.5), fontSize: responsiveFontSize(1.2), fontWeight: '800' }}>Upload your Aadhar Card {'\n'}Or PAN Card</Text>
            </View>




            <TouchableOpacity onPress={handleImageOptionPan} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(18), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(4), left: responsiveWidth(8.9), borderWidth: responsiveWidth(0.5), borderColor: 'black' }}>
              <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(13) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>

              <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload</Text>

            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', height: responsiveHeight(11), justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: responsiveWidth(60), flexDirection: 'row' }}>

              <Image source={require('../../../Assets/Login_page/AadharSample.png')} style={{ height: responsiveHeight(11), width: responsiveWidth(17) }}></Image>
              <Text style={{ top: responsiveHeight(4) }}>or</Text>
              <Image source={require('../../../Assets/Login_page/PanCardSample.png')} style={{ height: responsiveHeight(9), width: responsiveWidth(30), top: responsiveHeight(1.5) }}></Image>
            </View>


          </View>

          {/* for modal */}
          <Modal
            isVisible={imagePickerModalVisible}
            onBackdropPress={() => setImagePickerModalVisible(false)}>
            <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>

              <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('gallery')}>
                <Text>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => setImagePickerModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal
            isVisible={imagePickerModalVisiblePan}
            onBackdropPress={() => setImagePickerModalVisiblePan(false)}>
            <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>

              <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOptionPanAdhar('gallery')}>
                <Text>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => setImagePickerModalVisiblePan(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>



        </View>
        <Text style={{ bottom: responsiveWidth(5), color: 'black', fontWeight: '700' }}>NOR</Text>
        <Text style={{ bottom: responsiveWidth(5), fontSize: responsiveFontSize(1.4), color: 'black' }}>If incase of different 'NAME' from your Govt. ID then Suggest your friends filmhook ID and ask them referal code been sent to there Notification, Enter the code and submit it.</Text>
        <View style={{ height: responsiveHeight(3.5), flexDirection: 'row', borderWidth: 1, width: responsiveWidth(42), alignItems: 'center', bottom: responsiveWidth(5) }}>
          <TextInput
            placeholder="Enter your Friends filmhook ID"
            value={filmHookCode}
            onChangeText={setFilmHookCode}

            style={{ height: responsiveHeight(5), fontSize: responsiveFontSize(1.2) }}
          />
          <TouchableOpacity style={{ width: responsiveWidth(4), }} onPress={sendFilmHookCode}>
            <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} source={require('../../../Assets/Login_page/Send_icon.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ height: responsiveHeight(3.5), flexDirection: 'row', borderWidth: 1, width: responsiveWidth(25), alignItems: 'center', bottom: responsiveWidth(4), right: responsiveWidth(8.3) }}>
          <TextInput
            placeholder="Enter Referal code"
            value={filmHookOtp}
            onChangeText={setFilmHookOtp}
            keyboardType="numeric"
            style={{ height: responsiveHeight(5), fontSize: responsiveFontSize(1.2) }}
          />
          <View>
            <TouchableOpacity style={{ backgroundColor: '#001adc', borderColor: 'black', opacity: 0.8, borderWidth: responsiveWidth(0.3), width: responsiveWidth(15), height: responsiveHeight(3), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', left: responsiveWidth(20.8) }} onPress={sendFilmHookOtpCode}>
              <Text style={{ color: 'white', fontSize: responsiveFontSize(1.2), fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Step 3:</Text>
          <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black' }}>Introduce yourself by saying I am _____, My code is 5222</Text>
        </View>
        <View style={{ flexDirection: 'row', columnGap: responsiveWidth(4), paddingHorizontal: responsiveWidth(18), top: responsiveHeight(1) }}>
          <View style={{ height: responsiveHeight(3), width: responsiveWidth(40), backgroundColor: 'black', borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', lineHeight: responsiveHeight(2.5), fontSize: responsiveFontSize(1.2), fontWeight: '800' }}>Upload your 1 min Video</Text>
          </View>

          <TouchableOpacity onPress={pickVideo} style={{ backgroundColor: '#424242', height: responsiveHeight(3), width: responsiveWidth(18), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', left: responsiveWidth(8.6), borderWidth: responsiveWidth(0.5), borderColor: 'black' }}>
            <Image style={{ height: responsiveHeight(1.5), width: responsiveWidth(3.5), position: 'absolute', right: responsiveWidth(13) }} source={require('../../../Assets/Login_page/FH_Upload.png')}></Image>

            <Text style={{ color: 'white', fontWeight: '700', fontSize: responsiveFontSize(1.5), left: responsiveWidth(1) }}>Upload</Text>

          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', left: responsiveWidth(1), top: responsiveHeight(2.8) }}>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2), color: 'black' }}>Note:</Text>
          <Text style={{ top: responsiveHeight(0.3), left: responsiveWidth(0.8), color: 'black', width: responsiveWidth(85), fontSize: responsiveFontSize(1.7) }}>Your Profile will get verified within 24 hrs. Incase the profile doesn't match any of these, then your profile will be visible as a Public User </Text>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={{ width: responsiveWidth(40), backgroundColor: 'blue', height: responsiveHeight(4), justifyContent: 'center', alignItems: 'center', top: responsiveHeight(4), left: responsiveWidth(25), borderWidth: responsiveWidth(0.5), borderColor: 'black', borderRadius: responsiveWidth(2), opacity: 0.7 }} >
          <Text style={{ color: 'white' }}>Apply for Verification</Text>
        </TouchableOpacity>


        {/* <View style={{ flexDirection: 'row', margin: responsiveHeight(4), columnGap: responsiveWidth(18) }}>
          <TouchableOpacity onPress={() => navigation.navigate('IndustryOne', { nationality, selected })} style={styles.backButton}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Step 3</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    //  padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',

    width: '100%',
    height: '100%'
  },
  formContainer: {
    width: '100%',

    padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: responsiveHeight(1),
    // borderWidth:1
  },
  countryPickerContainer: {
    height: 46,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    padding: 8,
    width: 295

  },

  nextButton: {
    backgroundColor: 'blue',
    //  padding: responsiveWidth(2),
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(34),
    left: responsiveWidth(42),
    marginTop: responsiveHeight(4),
    height: responsiveHeight(6),

  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  input: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),

    borderWidth: responsiveWidth(0.5),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(8.2),
    width: responsiveWidth(86),
    borderColor: 'black',
    margin: responsiveWidth(1),
    fontSize: responsiveFontSize(2)
  },
  backButton: {
    backgroundColor: 'black',
    // padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(30),
  },
  nextButton: {
    backgroundColor: '#616161',
    // padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    //bottom: responsiveHeight(1.5)
  },
  header: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    top: responsiveHeight(2),
    marginBottom: responsiveHeight(5),
    color: '#1e1ff5',
    // left:70,
    fontFamily: 'ArianaVioleta-dz2K',
    textAlign: 'center'
  },

  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image1: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  button1: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText1: {
    color: 'white',
  },
});