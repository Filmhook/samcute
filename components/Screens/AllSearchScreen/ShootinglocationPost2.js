// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import React, { useState } from 'react';
// import { Image } from 'react-native-elements';
// import ImagePicker from 'react-native-image-crop-picker';
// const ShootinglocationPost2 = () => {

//     const [profilepic, setProfilepic] = useState(null);

//     const edit_profile_pic = async () => {
//         try {
//             const image = await ImagePicker.openPicker({
//                 cropping: true,
//             });
//             if (image) {
//                 console.log(image.path);
//                 setProfilepic(image.path);
//             }
//         } catch (error) {
//             console.log('Image picker operation canceled or failed:', error);
//         }
//     };

//     return (
//         <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(2) }}>
//             <Text style={{ color: 'black', fontWeight: '900', fontSize: responsiveWidth(4) }}>ShootinglocationPost</Text>
//             <View style={{ width: responsiveWidth(80), height: responsiveHeight(25), borderWidth: 1, margin: responsiveHeight(2),justifyContent:'center',alignItems:'center' }}>

//                 <TouchableOpacity onPress={edit_profile_pic} style={{ width: responsiveWidth(80), height: responsiveHeight(25),justifyContent:'center',alignItems:'center' }}>
//                     {profilepic ? (
//                         <Image source={{ uri: profilepic }} style={{ width: '100%', height: '100%', }} resizeMode='stretch' />
//                     ) : (
//                         <View style={{alignItems:'center'}}>
//                             <Image
//                                 source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')}
//                                 style={{ width: '20%', height: '60%', }}
//                                 resizeMode='cover'
//                             />
//                             <Text style={{ fontSize: 18, }}>Upload Image</Text>
//                         </View>

//                     )}

//                 </TouchableOpacity>
//             </View>
//         </View>

//     )
// }

// export default ShootinglocationPost2

// const styles = StyleSheet.create({})

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Image } from 'react-native-elements';
// import ImagePicker from 'react-native-image-crop-picker';

// const ShootinglocationPost2 = () => {
//     const [profilepic, setProfilepic] = useState(null);

//     const edit_profile_pic = async () => {
//         try {
//             const image = await ImagePicker.openPicker({
//                 cropping: true,
//             });
//             if (image) {
//                 console.log(image.path);
//                 setProfilepic(image.path);
//             }
//         } catch (error) {
//             console.log('Image picker operation canceled or failed:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>ShootinglocationPost</Text>
//             <View style={styles.imageContainer}>
//                 <TouchableOpacity onPress={edit_profile_pic} style={styles.imagePicker}>
//                     {profilepic ? (
//                         <Image source={{ uri: profilepic }} style={styles.image} resizeMode='stretch' />
//                     ) : (
//                         <View style={styles.uploadContainer}>
//                             <Image
//                                 source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')}
//                                 style={styles.uploadIcon}
//                                 resizeMode='cover'
//                             />
//                             <Text style={styles.uploadText}>Upload Image</Text>
//                         </View>
//                     )}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: responsiveHeight(2),
//     },
//     heading: {
//         color: 'black',
//         fontWeight: '900',
//         fontSize: responsiveWidth(4),
//     },
//     imageContainer: {
//         width: responsiveWidth(80),
//         height: responsiveHeight(25),
//         borderWidth: 1,
//         margin: responsiveHeight(2),
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imagePicker: {
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
//     uploadContainer: {
//         alignItems: 'center',
//     },
//     uploadIcon: {
//         width: '20%',
//         height: '60%',
//     },
//     uploadText: {
//         fontSize: 18,
//     },
// });

// export default ShootinglocationPost2;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Image } from 'react-native-elements';
// import ImagePicker from 'react-native-image-crop-picker';

// const ShootinglocationPost2 = () => {
//     const [profilepics, setProfilepics] = useState([]);

//     const edit_profile_pic = async () => {
//         try {
//             const images = await ImagePicker.openPicker({
//                 multiple: true,
//                 cropping: true,
//             });
//             if (images) {
//                 console.log(images.map(image => image.path));
//                 setProfilepics(images.map(image => ({ uri: image.path })));
//             }
//         } catch (error) {
//             console.log('Image picker operation canceled or failed:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>ShootinglocationPost</Text>
//             <View style={styles.imageContainer}>
//                 <TouchableOpacity onPress={edit_profile_pic} style={styles.imagePicker}>
//                     {profilepics.length > 0 ? (
//                         <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//                             {profilepics.map((profilepic, index) => (
//                                 <Image
//                                     key={index}
//                                     source={profilepic}
//                                     style={styles.image}
//                                     resizeMode='stretch'
//                                 />
//                             ))}
//                         </View>
//                     ) : (
//                         <View style={styles.uploadContainer}>
//                             <View style={{top:responsiveHeight(20),left:responsiveWidth(65)}}>
//                                 <Image
//                                     source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')}
//                                     style={styles.uploadIcon}
//                                     resizeMode='stretch'
//                                 /></View>
//                             <Text style={styles.uploadText}>Upload Image</Text>
//                         </View>
//                     )}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: responsiveHeight(2),
//     },
//     heading: {
//         color: 'black',
//         fontWeight: '900',
//         fontSize: responsiveWidth(4),
//     },
//     imageContainer: {
//         width: responsiveWidth(80),
//         // height: responsiveHeight(25),
//         borderWidth: 1,
//         margin: responsiveHeight(2),
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imagePicker: {
//         width: '100%',
//         // height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     fullimage:{
//         width: responsiveWidth(80),
//         height: responsiveHeight(25)
//     },
//     image: {
//         width: responsiveWidth(20), // Adjust the width of each image as needed
//         height: responsiveHeight(10), // Adjust the height of each image as needed
//         margin: responsiveHeight(1), // Adjust the margin between images as needed
//     },
//     uploadContainer: {
//         // alignItems: 'center',
//         width: responsiveWidth(80),
//         height: responsiveHeight(25)
//     },
//     uploadIcon: {
//         width: '20%',
//         height: '60%',
//         //  position:'absolute',

//         //   top:responsiveHeight(7),
//         // left:responsiveWidth(20),
//         // borderWidth:responsiveWidth(1),

//     },
//     uploadText: {
//         fontSize: responsiveWidth(5),
//         bottom:responsiveHeight(5),
//         left:responsiveWidth(23)
//     },
// });

// export default ShootinglocationPost2;




// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Image } from 'react-native-elements';
// import ImagePicker from 'react-native-image-crop-picker';
// import Checkbox from '@react-native-community/checkbox';
// import Picker from '@react-native-picker/picker';
// const ShootinglocationPost2 = () => {
//     const [profilepics, setProfilepics] = useState([]);
//     const [name, setName] = useState('');
//     const [number, setNumber] = useState('');


//     const edit_profile_pic = async () => {
//         try {
//             const images = await ImagePicker.openPicker({
//                 multiple: true,
//                 cropping: true,
//             });
//             if (images) {
//                 console.log(images.map(image => image.path));
//                 setProfilepics(images.map(image => ({ uri: image.path })));
//             }
//         } catch (error) {
//             console.log('Image picker operation canceled or failed:', error);
//         }
//     };
//     const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);

//     const handleCheckboxChange = (index) => {
//         setSelectedCheckboxIndex(index);
//     };
//     const [selectedOption, setSelectedOption] = useState('');

//     return (
//         <View style={styles.container}>
//         <Text style={styles.heading}>ShootinglocationPost</Text>
//             <View style={styles.imageContainer}>
//             <TouchableOpacity onPress={edit_profile_pic} style={styles.imagePicker}>
//                 {profilepics.length > 0 ? (
//                     <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//                         {profilepics.map((profilepic, index) => (
//                             <Image
//                                 key={index}
//                                 source={profilepic}
//                                 style={profilepics.length === 1 ? styles.fullimage : styles.image}
//                                 resizeMode='stretch'
//                             />
//                         ))}
//                     </View>
//                 ) : (
//                     <View style={styles.uploadContainer}>
//                         <View style={{ top: responsiveHeight(18), left: responsiveWidth(60) }}>
//                             <Image
//                                 source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')}
//                                 style={styles.uploadIcon}
//                                 resizeMode='stretch'
//                             />
//                         </View>
//                         <Text style={styles.uploadText}>Upload Image</Text>
//                     </View>
//                 )}
//             </TouchableOpacity>
//         </View>
//         <View style={styles.checkboxContainer}>
//             <Checkbox
//                 value={selectedCheckboxIndex === 0}
//                 onValueChange={() => handleCheckboxChange(0)}
//             />
//             <Text>indoor location</Text>
//         </View>
//         <View style={styles.checkboxContainer2}>
//             <Checkbox
//                 value={selectedCheckboxIndex === 1}
//                 onValueChange={() => handleCheckboxChange(1)}
//             />
//             <Text>outdoor location</Text>
//         </View>
//         <View style={styles.boxContent}>
//             <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
//                 <TextInput
//                     placeholder="INR"
//                     value={name}
//                     onChangeText={setName}
//                     style={styles.input}
//                 />
//             </ImageBackground>
//         </View>
//         <View style={styles.inputContainerPhn}>
//             <ImageBackground style={styles.changenumber} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
//                 <TextInput
//                     placeholder="Price"
//                     value={number}
//                     placeholderTextColor={'black'}
//                     onChangeText={(text) => {
//                         // Filter out non-numeric characters
//                         const numericText = text.replace(/[^0-9]/g, '');
//                         setNumber(numericText);
//                     }}
//                     keyboardType={'phone-pad'}
//                     style={{
//                         height: responsiveHeight(6.5),
//                         width: responsiveWidth(40),
//                         fontSize: responsiveFontSize(2),
//                         right: -5
//                     }}
//                 />
//             </ImageBackground>
//         </View>
//         <View style={styles.boxContent2}>
//       <ImageBackground style={styles.inputContainer2} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>

//           <Picker
//             selectedValue={selectedOption}
//             onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
//             style={{ height: 50, width: 150 }}
//           >
//             <Picker.Item label="hour" value="hour"/>
//             <Picker.Item label="day" value="day" />
//             <Picker.Item label="month" value="month" />
//             <Picker.Item label="year" value="year" />
//           </Picker>
//         </View>
//       </ImageBackground>
//     </View>
//     </View>
// );
// };

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: responsiveHeight(2),
//     },
//     heading: {
//         color: 'black',
//         fontWeight: '900',
//         fontSize: responsiveWidth(4),
//     },
//     imageContainer: {
//         width: responsiveWidth(80),
//         // height: responsiveHeight(25),
//         borderWidth: 1,
//         margin: responsiveHeight(2),
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imagePicker: {
//         width: '100%',
//         // height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     fullimage: {
//         width: responsiveWidth(80),
//         height: responsiveHeight(25)
//     },
//     image: {
//         width: responsiveWidth(20), // Adjust the width of each image as needed
//         height: responsiveHeight(10), // Adjust the height of each image as needed
//         margin: responsiveHeight(1), // Adjust the margin between images as needed
//     },
//     uploadContainer: {
//         // alignItems: 'center',
//         width: responsiveWidth(80),
//         height: responsiveHeight(25)
//     },
//     uploadIcon: {
//         width: '20%',
//         height: '63%',
//         //  position:'absolute',

//         //   top:responsiveHeight(7),
//         // left:responsiveWidth(20),
//         // borderWidth:responsiveWidth(1),

//     },
//     uploadText: {
//         fontSize: responsiveWidth(5),
//         bottom: responsiveHeight(5),
//         left: responsiveWidth(23)
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         right: responsiveWidth(23)
//     },
//     checkboxContainer2: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         left: responsiveWidth(13),
//         bottom: responsiveHeight(3.5)
//     },
//     boxContent: {
//         height: responsiveHeight(8.3),
//         width: responsiveWidth(86),
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: responsiveHeight(2),
//         borderRadius: responsiveWidth(3.2),
//         // borderWidth: responsiveWidth(0.3),
//         color: 'black',
//         marginTop: responsiveHeight(2)
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: responsiveHeight(6.5),
//         width: responsiveWidth(15),
//         // margin: responsiveWidth(1),
//         color: 'black',
//         right: responsiveWidth(31),
//         resizeMode: 'stretch',
//         zIndex: -1,
//         marginTop: responsiveHeight(-6)
//     },
//     input: {

//         height: responsiveHeight(6),
//         borderColor: 'black',
//         width: '90%',
//         fontSize: responsiveFontSize(1.5),
//         left: responsiveWidth(2),
//         // color: 'black',
//         // fontWeight: '500'
//     },
//     inputContainerPhn: {

//         // justifyContent:'center',
//         alignItems: 'center',

//         // borderWidth: responsiveWidth(0.4),
//         // paddingHorizontal: responsiveWidth(8),
//         borderRadius: responsiveWidth(2),
//         height: responsiveHeight(7),
//         width: responsiveWidth(30),
//         bottom: responsiveHeight(12.5)
//         // shadowOffset: { width: 1, height: 4 }, // Shadow offset
//         // shadowOpacity: 0.6, // Shadow opacity
//         // shadowRadius: 2, // Shadow radius
//         // elevation: 1,
//         // shadowColor: 'gray',

//         // borderColor: 'black',



//     },
//     changenumber: {
//         marginTop: "auto",
//         marginBottom: 'auto',
//         height: responsiveHeight(7),
//         width: responsiveWidth(30),
//         borderRadius: responsiveWidth(2),
//         overflow: 'hidden'
//     },
//     boxContent2: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       inputContainer2: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 50,
//         width: 200,
//         margin: 10,
//         borderWidth: 1,
//         borderColor: 'black',
//       },


// });

// export default ShootinglocationPost2;

import React, { useState } from 'react';
// import { View, TextInput, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, ScrollView,Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Image } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Checkbox from '@react-native-community/checkbox';
import { title } from 'process';
// import Picker from '@react-native-picker/picker';

const ShootinglocationPost2 = () => {
    const [profilepics, setProfilepics] = useState([]);
    // const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [title, setTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [terms, setTerms] = useState();


    const edit_profile_pic = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                cropping: true,
            });
            if (images) {
                console.log(images.map(image => image.path));
                setProfilepics(images.map(image => ({ uri: image.path })));
            }
        } catch (error) {
            console.log('Image picker operation canceled or failed:', error);
        }
    };
    const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);

    const handleCheckboxChange = (index) => {
        setSelectedCheckboxIndex(index);
    };
    const [selectedOption, setSelectedOption] = useState('hour');



    const [showTextInput, setShowTextInput] = useState(false);

    const handlePress = () => {
        setShowTextInput(!showTextInput);
    };
    const handlePostButton = () => {
        Alert.alert(
            'Confirm Post',
            'Are you sure you want to post?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Post cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Perform post action here
                        console.log('Post confirmed');
                        // Navigate to other page
                    }
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.heading}>ShootinglocationPost</Text>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={edit_profile_pic} style={styles.imagePicker}>
                        {profilepics.length > 0 ? (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {profilepics.map((profilepic, index) => (
                                    <Image
                                        key={index}
                                        source={profilepic}
                                        style={profilepics.length === 1 ? styles.fullimage : styles.image}
                                        resizeMode='stretch'
                                    />
                                ))}
                            </View>
                        ) : (
                            <View style={styles.uploadContainer}>
                                <View style={{ top: responsiveHeight(18), left: responsiveWidth(60) }}>
                                    <Image
                                        source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')}
                                        style={styles.uploadIcon}
                                        resizeMode='stretch'
                                    />
                                </View>
                                <Text style={styles.uploadText}>Upload Image</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={selectedCheckboxIndex === 0}
                            onValueChange={() => handleCheckboxChange(0)}
                        />
                        <Text>Indoor Location</Text>
                    </View>
                    <View style={styles.checkboxContainer2}>
                        <Checkbox
                            value={selectedCheckboxIndex === 1}
                            onValueChange={() => handleCheckboxChange(1)}
                        />
                        <Text>Outdoor Location</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: responsiveWidth(86.7), margin: responsiveHeight(2) }}>
                    <View style={styles.boxContent}>
                        <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                            {/* <TextInput
                        placeholder="INR"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    /> */}
                            <Text>INR-₹</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.inputContainerPhn}>
                        <ImageBackground style={styles.changenumber} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                            <TextInput
                                placeholder="Price"
                                value={number}
                                // placeholderTextColor={'black'}
                                onChangeText={(text) => {
                                    // Filter out non-numeric characters
                                    const numericText = text.replace(/[^0-9]/g, '');
                                    setNumber(numericText);
                                }}
                                keyboardType={'phone-pad'}
                                style={{
                                    height: responsiveHeight(6.5),
                                    width: responsiveWidth(15),
                                    fontSize: responsiveFontSize(2),
                                    // right: -5
                                    // bottom: responsiveHeight(1)
                                    alignSelf: 'center'
                                }}
                            />
                        </ImageBackground>
                    </View>
                    <View style={styles.boxContentnew}>
                        <ImageBackground style={styles.inputContainernew} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                            <View style={{}}>
                                {/* <TextInput
            placeholder="Enter a value"
            value={selectedOption}
            onChangeText={(text) => setSelectedOption(text)}
            style={styles.input}
          /> */}
                                <Picker
                                    selectedValue={selectedOption}
                                    onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
                                    style={{
                                        height: responsiveHeight(4),
                                        width: responsiveWidth(35), fontSize: 1
                                    }}
                                >
                                    <Picker.Item label="hour" value="hour" />
                                    <Picker.Item label="day" value="day" />
                                    <Picker.Item label="month" value="month" />
                                    {/* <Picker.Item label="year" value="year" style={{width:responsiveHeight(15),height:responsiveWidth(5)}} /> */}
                                </Picker>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.boxContentchange}>

                    <ImageBackground style={styles.inputContainerchange} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                        <TextInput
                            placeholder="Location Name"
                            // placeholderTextColor="black"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />
                    </ImageBackground>
                </View>
                <View style={styles.boxContentchange2}>

                    <ImageBackground style={styles.inputContainerchange1} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                        <TextInput
                            placeholder='Location Description'
                            multiline
                            value={productDescription}
                            onChangeText={setProductDescription}
                            // style={{
                            //   marginTop: responsiveHeight(1),
                            //   borderWidth: responsiveWidth(0.4),
                            //   //  borderColor: '#004242',
                            //   borderRadius: responsiveWidth(2),
                            //   padding: responsiveWidth(2),
                            //   overflow: 'scroll',
                            //   width: responsiveWidth(70), alignSelf: 'center'
                            // }} 
                            style={{
                                overflow: 'scroll',
                            }}
                        />
                    </ImageBackground>
                </View>
                <View style={styles.boxContentchange2}>

                    <ImageBackground style={styles.inputContainerchange1} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                        <TextInput placeholder='Terms&Condition' multiline
                            value={terms} onChangeText={setTerms}
                        // style={{
                        //   marginTop: responsiveHeight(1),
                        //   borderWidth: responsiveWidth(0.4),
                        //   padding: responsiveWidth(2),
                        //   overflow: 'scroll', width: responsiveWidth(70),
                        //   alignSelf: 'center',
                        // }} 
                        />
                    </ImageBackground>
                </View>
                <View style={styles.link}>
                    <TouchableOpacity onPress={handlePress}>
                        <ImageBackground style={styles.linklogo} source={require('../../Assets/Home_Icon_And_Fonts/link_icon.png')} />
                    </TouchableOpacity>
                    {showTextInput && (
                        <ImageBackground style={styles.background} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                            <TextInput placeholder='Paste Location Here' style={{ alignSelf: 'center' }} />
                        </ImageBackground>
                    )}
                </View>
                <View style={{width:responsiveWidth(20),left:responsiveWidth(25),bottom:responsiveHeight(2)}}>
             <TouchableOpacity onPress={handlePostButton} style={{width:responsiveWidth(20),height:responsiveHeight(5),backgroundColor:'black',borderRadius:responsiveHeight(2)}}>
             <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: 'white', padding: responsiveWidth(2),alignSelf:'center' }}>Post</Text>
             </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        // borderWidth:responsiveWidth(1),
       
    },
    heading: {
        color: 'black',
        fontWeight: '900',
        fontSize: responsiveWidth(4),
    },
    imageContainer: {
        width: responsiveWidth(80),
        // height: responsiveHeight(25),
        borderWidth: 1,
        margin: responsiveHeight(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePicker: {
        width: '100%',
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    fullimage: {
        width: responsiveWidth(80),
        height: responsiveHeight(25)
    },
    image: {
        width: responsiveWidth(20), // Adjust the width of each image as needed
        height: responsiveHeight(10), // Adjust the height of each image as needed
        margin: responsiveHeight(1), // Adjust the margin between images as needed
    },
    uploadContainer: {
        // alignItems: 'center',
        width: responsiveWidth(80),
        height: responsiveHeight(25)
    },
    uploadIcon: {
        width: '20%',
        height: '63%',
        //  position:'absolute',

        //   top:responsiveHeight(7),
        // left:responsiveWidth(20),
        // borderWidth:responsiveWidth(1),

    },
    uploadText: {
        fontSize: responsiveWidth(5),
        bottom: responsiveHeight(5),
        left: responsiveWidth(23)
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // right: responsiveWidth(23)
    },
    checkboxContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        // left: responsiveWidth(13),
        // bottom: responsiveHeight(3.5)
    },
    boxContent: {
        height: responsiveHeight(8.3),
        width: responsiveWidth(18),
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginBottom: responsiveHeight(2),
        borderRadius: responsiveWidth(3.2),
        // borderWidth: responsiveWidth(0.3),
        color: 'black',
        // marginTop: responsiveHeight(2),
        // left: responsiveHeight(10)

    },
    inputContainer: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(6),
        width: responsiveWidth(15),
        // margin: responsiveWidth(1),
        color: 'black',
        // right: responsiveWidth(60),
        resizeMode: 'stretch',
        // zIndex: -1,
        // bottom: responsiveHeight(5),
        // right: responsiveWidth(13)
        // left:responsiveWidth(50)
    },
    input: {

        height: responsiveHeight(6),
        borderColor: 'black',
        width: '90%',
        fontSize: responsiveFontSize(1.5),
        // left: responsiveWidth(2),
        // color: 'black',
        // fontWeight: '500'
    },
    inputContainerPhn: {

        // justifyContent: 'center',
        // alignItems: 'center',

        // borderWidth: responsiveWidth(0.4),
        // paddingHorizontal: responsiveWidth(8),
        // borderRadius: responsiveWidth(2),
        height: responsiveHeight(8.3),
        width: responsiveWidth(35),

        // bottom: responsiveHeight(12.5),
        // shadowOffset: { width: 1, height: 4 }, // Shadow offset
        // shadowOpacity: 0.6, // Shadow opacity
        // shadowRadius: 2, // Shadow radius
        // elevation: 1,
        // shadowColor: 'gray',

        // borderColor: 'black',

        // right: responsiveWidth(20)

    },
    changenumber: {
        // marginTop: "auto",
        // marginBottom: 'auto',
        // bottom: responsiveHeight(0.5),
        height: responsiveHeight(6),
        width: responsiveWidth(30),
        // borderRadius: responsiveWidth(2),
        // overflow: 'hidden',
        // left: responsiveWidth(17)
    },
    boxContent2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 200,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    boxContentnew: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    inputContainernew: {
        // flexDirection: 'row',
        alignSelf: 'center',
        height: responsiveHeight(6),
        width: responsiveWidth(33),
        // margin: 10,
        // borderWidth: 1,
        borderColor: 'black',
        // bottom: responsiveHeight(17.9),
        // left: responsiveWidth(26)

    },
    //   input: {
    //     flex: 1,
    //     height: 50,
    //     paddingHorizontal: 10,
    //     fontSize: 16,
    //   },
    boxContentchange: {
        height: responsiveHeight(8.3),
        width: responsiveWidth(86),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        borderRadius: responsiveWidth(3.2),
        // borderWidth: responsiveWidth(0.3),
        color: 'black',
        marginTop: responsiveHeight(2),
        bottom: responsiveHeight(3.5)

    },
    inputContainerchange: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(8.4),
        width: responsiveWidth(86.7),
        margin: responsiveWidth(1),
        color: 'black',
        resizeMode: 'stretch',
        zIndex: -1,
    },
    boxContentchange2: {
        width: responsiveWidth(86),
        justifyContent: 'center',
        alignItems: 'center',
        bottom: responsiveHeight(5)
    },
    inputContainerchange1: {
        width: responsiveWidth(86.7),
        marginTop: responsiveHeight(1),
        alignSelf: 'center',
        borderRadius: responsiveHeight(1),
        padding: 10
    },
    link: {
        flexDirection: 'row',
        width: responsiveWidth(50),
        height: responsiveHeight(6),
        marginTop: responsiveHeight(1),
        bottom: responsiveHeight(5)
    },
    background: {
        width: responsiveWidth(50),
        height: responsiveHeight(6),
           right:responsiveWidth(6)

    },
    linklogo: {
        width: responsiveWidth(10),
        height: responsiveHeight(5),
        borderWidth: responsiveWidth(0.5),
        borderRadius: responsiveHeight(2),
        overflow: 'hidden',
        right: responsiveHeight(8),
        top:responsiveHeight(0.5)
    }
};

export default ShootinglocationPost2;


// import React, { useState } from 'react';
// import { View, ImageBackground, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// const LinkComponent = () => {
//     const [showTextInput, setShowTextInput] = useState(false);

//     const handlePress = () => {
//         setShowTextInput(!showTextInput);
//     };

//     return (
//         <View style={styles.link}>
//             <TouchableOpacity onPress={handlePress}>
//                 <ImageBackground style={styles.linklogo} source={require('../../Assets/Home_Icon_And_Fonts/link_icon.png')} />
//             </TouchableOpacity>
//             {showTextInput && (
//                 <ImageBackground style={styles.background} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
//                     <TextInput placeholder='paste location here' style={{ alignSelf: 'center' }} />
//                 </ImageBackground>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     link: {
//         flexDirection: 'row',
//         width: responsiveWidth(50),
//         height: responsiveHeight(6),
//         marginTop: responsiveHeight(1)
//     },
//     background: {
//         width: responsiveWidth(50),
//         height: responsiveHeight(6),
//         right: responsiveWidth(17)
//     },
//     linklogo: {
//         width: responsiveWidth(10),
//         height: responsiveHeight(5),
//         borderWidth: responsiveWidth(0.5),
//         borderRadius: responsiveHeight(2),
//         overflow: 'hidden'
//     }
// });

// export default LinkComponent;
