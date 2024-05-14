import React, { useEffect, useState } from 'react';
// import { View, TextInput, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, ScrollView,Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Image } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Checkbox from '@react-native-community/checkbox';
import { title } from 'process';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import Picker from '@react-native-picker/picker';

const ShootinglocationPost2 = () => {
    const [profilepics, setProfilepics] = useState([]);
    // const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [title, setTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [terms, setTerms] = useState();
    const [locationUrl, setLocationUrl] = useState();

    const navigation = useNavigation();



    const edit_profile_pic = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: false,
                cropping: true,
            });
            if (images) {
                ImagePicker.openPicker({ cropping: true }).then(images => {
                    console.log(images)
                    let generateName = images.path.split("/")[images.path.split("/")?.length - 1]

                    setProfilepics({ uri: images.path, type: images.mime, name: generateName });
                })
            }
        } catch (error) {
            console.log('Image picker operation canceled or failed:', error);
        }
    };
    const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);

    const handleCheckboxChange = (index) => {
        setSelectedCheckboxIndex(index);
        
    };

    useEffect(() => {
        console.log("checkbox", selectedCheckboxIndex);
    }, [selectedCheckboxIndex]);





    const [selectedOption, setSelectedOption] = useState('hour');



    const [showTextInput, setShowTextInput] = useState(false);

    const handlePress = () => {
        setShowTextInput(!showTextInput);
    };
    const handlePostButton = async () => {
        try {
            // Retrieve userId from AsyncStorage
            const id = await AsyncStorage.getItem('userId');

            // Create a new Headers object and append the authorization token
            const myHeaders = new Headers();
            const jwt = await AsyncStorage.getItem("jwt");
            myHeaders.append("Authorization", "Bearer " + jwt);

            // Create a FormData object
            const formData = new FormData();

            // Check if profilepics is defined
            if (profilepics && profilepics.uri) {
                const imageUriParts = profilepics.uri.split('.');
                const fileType = imageUriParts[imageUriParts.length - 1];
                formData.append("fileInputWebModel.files[0]", {
                    uri: profilepics.uri,
                    name: `image.${fileType}`,
                    type: `image/${fileType}`
                });
            }

            formData.append("shootingLocationName", title);
            formData.append("shootingLocationDescription", productDescription);
            formData.append("termsAndCondition", terms);
            formData.append("indoorOrOutdoorLocation", selectedCheckboxIndex);
            formData.append("cost", number);
            formData.append("locationUrl", locationUrl);
            formData.append("hourMonthDay", selectedOption);
            formData.append("shootingLocationCreatedBy", id);
            formData.append("userId", id);

            // Define requestOptions with method, headers, body, and redirect options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formData,
                redirect: "follow"
            };
            console.log(`FormData : ${JSON.stringify(formData)}`)
            // Make a POST request using fetch
            const response = await fetch(`https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/marketPlace/saveShootingLocation`, requestOptions);
            const data = await response.json(); // Parse response JSON

            // Log the response data
            console.log("Response data:", data);

            if (data.statusCodeValue === 200) {
                Alert.alert("Posted");
                // setPostModalVisible(false);
                navigation.navigate('ShootingLocationPage');
            } else {
               Alert.alert("status code ")
            }
        } catch (error) {
            console.error('Error posting:', error);
            Alert.alert('Error', error.message);
        }
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
                            value={selectedCheckboxIndex === true}
                            onValueChange={() => handleCheckboxChange(true)}
                        />
                        <Text>Indoor Location</Text>
                    </View>
                    <View style={styles.checkboxContainer2}>
                        <Checkbox
                            value={selectedCheckboxIndex === false}
                            onValueChange={() => handleCheckboxChange(false)}
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
                            <TextInput placeholder='Paste Location Here' style={{ alignSelf: 'center' }} onChangeText={setLocationUrl} value={locationUrl} />
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