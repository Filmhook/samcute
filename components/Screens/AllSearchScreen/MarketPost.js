import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, FlatList, TextInput, Image, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-crop-picker';
import RazorpayCheckout from 'react-native-razorpay';
import CheckBox from '@react-native-community/checkbox';
import privateApi from "../../api/privateAPI"
import privateAPI from '../../api/privateAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from '@react-native-community/checkbox';


export default function MarketPost() {

    const [CompanyName, setCompanyName] = useState('');
    const [ProductName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productType, setProductType] = useState('');

    // const navigation = useNavigation()
    const [priceValue, setPriceValue] = useState('');
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [inputText, setInputText] = useState('');
    const [profilepics, setProfilePics] = useState([]);
    const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);

    const handleCheckboxChange = (index) => {
        setSelectedCheckboxIndex(index);

    };

    useEffect(() => {
        console.log("checkbox", selectedCheckboxIndex);
    }, [selectedCheckboxIndex]);

    const edit_profile_pic = async (option) => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: false,
                cropping: true,
            });
            if (images) {
                ImagePicker.openPicker({ cropping: true }).then(images => {
                    console.log(images)
                    let generateName = images.path.split("/")[images.path.split("/")?.length - 1]

                    setProfilePics({ uri: images.path, type: images.mime, name: generateName });
                })
            }
        } catch (error) {
            console.log('Image picker operation canceled or failed:', error);
        }
    };
    const [selectedItem, setSelectedItem] = useState(null);


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

            formData.append("companyName", CompanyName);
            formData.append("productName", ProductName);
            formData.append("productDescription", productDescription);
            formData.append("count", "2");
            formData.append("cost", priceValue);
            formData.append("newProduct", productType);
            formData.append("rentalOrsale", selectedItem);
            formData.append("createdBy", id);
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
            const response = await fetch(`https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/marketPlace/marketPlace`, requestOptions);
            const data = await response.json(); // Parse response JSON

            // Log the response data
            console.log("Response data:", data);

            if (data.status === 1) {
                Alert.alert("Posted");
                setPostModalVisible(false);
            } else {
                // Handle unsuccessful response
                // ...
            }
        } catch (error) {
            console.error('Error posting:', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.formContainer}>
                {/* <ImageBackground source={require('../../Assets/Audition_Icons_Fonts/auditionBg.png')} resizeMode='stretch' style={{ padding: responsiveWidth(5), alignItems: 'center', }}> */}
                <Text style={styles.heading}>Post </Text>

                {/* <TextInput style={styles.input} placeholder="your Company Name" value={title} onChangeText={settitle} /> */}

                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={edit_profile_pic} style={styles.imagePicker}>
                        {profilepics.length > 0 ? (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {profilepics.map((profilepic, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: profilepic }}
                                        style={profilepics.length === 1 ? styles.fullimage : styles.image}
                                        resizeMode='stretch'
                                    />
                                ))}
                            </View>
                        ) : (
                            <View style={styles.uploadContainer}>
                                <View style={{ top: responsiveHeight(17), left: responsiveWidth(65) }}>
                                    <Image
                                        source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')}
                                        style={styles.uploadIcon}
                                        resizeMode='stretch'
                                    /></View>
                                <Text style={styles.uploadText}>Upload Image</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <ImageBackground style={styles.inputContainerPName} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                    <TextInput
                        placeholder='Your Product Name'
                        value={ProductName}
                        placeholderTextColor='black'

                        onChangeText={setProductName}
                        style={{

                            borderRadius: responsiveWidth(2),
                            paddingHorizontal: responsiveWidth(5),
                            overflow: 'scroll',
                            height: responsiveWidth(10),
                            width: responsiveWidth(78), alignSelf: 'center'
                        }} />
                </ImageBackground>
                <View style={styles.boxContent}>
                    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                        <TextInput
                            placeholder='Your Company Name'
                            placeholderTextColor='black'
                            value={CompanyName}
                            onChangeText={setCompanyName}
                            style={{
                                //marginTop: responsiveHeight(1),
                                //  borderWidth: responsiveWidth(0.4),
                                //  borderColor: '#004242',
                                borderRadius: responsiveWidth(2),
                                paddingHorizontal: responsiveWidth(5),
                                overflow: 'scroll',
                                height: responsiveWidth(10),
                                width: responsiveWidth(78), alignSelf: 'center'
                            }}
                        />
                    </ImageBackground>
                </View>
                <View style={styles.boxContent}>
                    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                        <TextInput
                            placeholder='Your Product Description'
                            multiline
                            placeholderTextColor='black'
                            value={productDescription}
                            onChangeText={setProductDescription}
                            style={{
                                //  marginTop: responsiveHeight(1),
                                //  borderWidth: responsiveWidth(0.4),
                                //  borderColor: '#004242',
                                borderRadius: responsiveWidth(2),
                                paddingHorizontal: responsiveWidth(5),
                                overflow: 'scroll',
                                width: responsiveWidth(78), alignSelf: 'center', height: responsiveWidth(13),
                            }} />
                    </ImageBackground>
                </View>

                <View style={styles.boxContent}>
                    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                        <TextInput
                            placeholder='Used Product or New Product'
                            multiline
                            placeholderTextColor='black'                            value={productType}
                            onChangeText={setProductType}
                            style={{
                                paddingHorizontal: responsiveWidth(5),
                                borderRadius: responsiveWidth(2),
                                padding: responsiveWidth(2),
                                overflow: 'scroll',
                                width: responsiveWidth(78), alignSelf: 'center', height: responsiveWidth(13),
                            }} />
                    </ImageBackground>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={selectedCheckboxIndex === true}
                            onValueChange={() => handleCheckboxChange(true)}
                            color='black'
                            borderColor='black'
                        />
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Rental</Text>
                    </View>
                    <View style={styles.checkboxContainer2}>
                        <Checkbox
                            value={selectedCheckboxIndex === false}
                            onValueChange={() => handleCheckboxChange(false)}
                            color='black'
                            borderColor='black'
                        />
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Sale</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row', marginTop: 10,
                    width: 320, alignSelf: 'center', columnGap: responsiveWidth(8)
                }}>

                    <View style={{ width: responsiveWidth(13), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(2), height: responsiveHeight(5.2), }}>
                        <ImageBackground style={{ height: responsiveHeight(5.2), width: responsiveWidth(13), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(2) }} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                            <Text style={{ color: 'black', fontWeight: '600' }}>INR ₹</Text>
                        </ImageBackground>
                    </View>

                    <ImageBackground style={{
                        height: responsiveHeight(5.2),
                        width: responsiveWidth(35),
                    }} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                        <TextInput
                            placeholder="Price per quantity"
                            value={priceValue}
                            placeholderTextColor='black'
                            onChangeText={setPriceValue}
                            keyboardType='numeric'
                            style={{
                                // borderWidth: responsiveWidth(0.4),
                                //  / borderColor: '#004242',
                                borderRadius: 10,
                                padding: responsiveWidth(1),
                                overflow: 'scroll',
                                height: responsiveHeight(5.2),
                                width: responsiveWidth(35),
                                paddingHorizontal: responsiveWidth(2)
                            }}
                        />
                    </ImageBackground>

                </View>


            </View>
            <View style={{ width: responsiveWidth(90), marginTop: responsiveHeight(5), padding: responsiveWidth(3) }}>

                <TouchableOpacity onPress={handlePostButton} style={{ borderWidth: 1, width: responsiveWidth(20), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(4), left: responsiveWidth(65), backgroundColor: 'black' }}>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: 'white', padding: responsiveWidth(1) }}>Post</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: responsiveHeight(2),
    },
    heading: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(2),
        color: 'black'
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(6.5),
        width: responsiveWidth(78),
        //   bottom:responsiveHeight(1),
        margin: responsiveHeight(1),
        //   margin: responsiveWidth(1),
        color: 'black',
        // resizeMode: 'cover',

    },
    boxContent: {
        height: responsiveHeight(6),
        width: responsiveWidth(78),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        borderRadius: responsiveWidth(3.2),
        borderWidth: responsiveWidth(0.3),
        color: 'black',
        // backgroundColor: 'rgba(162, 161, 151, 0.05)',
        // //shadowOffset: {width: 1, height: 4}, // Shadow offset
        // shadowOpacity: 1, // Shadow opacity
        // shadowRadius: 2, // Shadow radius
        // elevation: 0.2,
        // shadowColor: 'gray',


    },
    imageContainer: {
        width: responsiveWidth(78),
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
        width: responsiveWidth(77),
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'black',
        borderColor:'black'
        // right: responsiveWidth(23)
    },
    checkboxContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'black',
        borderColor: 'black'

        // left: responsiveWidth(13),
        // bottom: responsiveHeight(3.5)
    },
    uploadText: {
        fontSize: responsiveWidth(5),
        bottom: responsiveHeight(5),
        left: responsiveWidth(23),
        color: 'black'
    },
    inputContainerPName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(6.5),
        width: responsiveWidth(78),
        //   bottom:responsiveHeight(1),
        margin: responsiveHeight(1),
        //   margin: responsiveWidth(1),
        color: 'black',
        // resizeMode: 'cover',
    },
    formContainer: {
        width: '90%',
        //flex: 1,
        // backgroundColor: "lightblue",
        // borderRadius: responsiveWidth(5),
        padding: responsiveWidth(2),

        alignItems: 'center',
        marginTop: responsiveHeight(2),
        borderWidth: responsiveWidth(0.5)
    },
    input: {
        width: responsiveWidth(80),
        height: responsiveHeight(7),
        borderWidth: 1,
        borderRadius: responsiveWidth(2),
        // marginBottom: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(2),
        color: 'black',
        fontWeight: 'bold'
    },
    imagePickerButton: {
        //backgroundColor: 'black',
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        width: '34%',
        height: responsiveHeight(4.8),
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: responsiveHeight(2),
        left: responsiveWidth(29),
        top: 70
    },
    datePickerButton: {
        backgroundColor: 'black',
        borderRadius: responsiveWidth(4),
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        height: responsiveHeight(5.3),
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: responsiveHeight(2),
        left: -90
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.8),
    },
    buttonText1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
    },
    selectedDateContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: responsiveWidth(2),
        padding: responsiveWidth(2),
        marginBottom: responsiveHeight(2),
        left: 50,
        top: -60
    },
    selectedDateText: {
        fontSize: responsiveFontSize(2),
    },
    subHeading: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(1),
        right: responsiveWidth(37),
        color: 'black'
    },
    listInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: responsiveWidth(2),
        padding: responsiveWidth(2),
        marginBottom: responsiveHeight(2),
        width: '80%',
        right: responsiveWidth(10),
        color: 'black',
        // fontWeight:'bold'
    },
    addButton: {
        backgroundColor: 'black',
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        height: responsiveHeight(4),
        marginBottom: responsiveHeight(2),
        left: 135,
        top: responsiveHeight(-7)
    },
    requirementsContainer: {
        borderWidth: 1,
        borderColor: '#004242',
        borderRadius: responsiveWidth(2),
        width: '102%',
        marginBottom: responsiveHeight(2),
        top: responsiveHeight(-7)
    },
    requirementsHeading: {
        fontSize: responsiveFontSize(1.8),
        // fontWeight: 'bold',
        textAlign: 'center',
        padding: responsiveWidth(3),
        color: 'black',
        // fontWeight:'bold',
    },
    requirementItem: {
        padding: responsiveWidth(2),
        // borderBottomWidth: 1,
        borderBottomColor: '#004242',

    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
    },
    backButton: {
        backgroundColor: 'black',
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        height: responsiveHeight(6),
        marginRight: responsiveWidth(5),
    },
    nextButton: {
        backgroundColor: '#616161',
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        height: responsiveHeight(6),
    },
    calendar: {
        borderWidth: 2,
        bottom: responsiveHeight(40),
        borderColor: '#ccc',
        borderRadius: 5,
    },
});