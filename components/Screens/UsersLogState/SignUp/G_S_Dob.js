import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Dimensions, ImageBackground, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { SelectList } from 'react-native-dropdown-select-list';
import CountryPicker from 'react-native-country-picker-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Calendar } from 'react-native-calendars';

import { Picker } from '@react-native-picker/picker';


export default function SignUpDob() {

    const [dob, setDob] = useState(new Date());

    const navigation = useNavigation();

    const [selectedGender, setSelectedGender] = useState(null);


    const [dobError, setDobError] = useState('');
    const [genderError, setGenderError] = useState('');

    const route = useRoute();
    const {
        name,
        middleName,
        lastName,

    } = route.params;



    const handlePressNav = () => {
        let isError = false;

        // Validation for name


        // Validation for date of birth
        if (selectedDate === null) {
            setDobError('Date of Birth cannot be empty.');
            isError = true;
        } else {
            setDobError('');
        }

        // Validation for gender
        if (selectedGender === null) {
            setGenderError('Please select a gender.');
            isError = true;
        } else {
            setGenderError('');
        }



        // Navigate to next screen if there are no errors
        if (!isError) {
            navigation.navigate('SignUpCountry', {
                name,
                selectedDate,
                selectedGender,
                middleName,
                lastName,

            });
        }
    };



    const [selectedDate, setSelectedDate] = useState(null);
    const [editedDate, setEditedDate] = useState('');

console.log('dddd', selectedDate)








    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    const maximumDate = new Date(); // Today's date
    const minimumDate = new Date('1900-01-01'); // Min

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.formContainer}>


                    <View style={styles.headerContainer}>
                        <Image style={{
                            height: responsiveHeight(21),
                            width: responsiveWidth(41), alignSelf: 'center'
                        }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

                    </View>
                    {/* <View style={styles.titleContainer}> */}
                    <Text style={styles.header}>Welcome to </Text>
                    {/* </View> */}
                    <View style={{ height: responsiveHeight(8), width: responsiveWidth(85), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: responsiveHeight(7), width: responsiveWidth(85) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: responsiveWidth(83), marginBottom: responsiveHeight(1) }}>
                            <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: 'black' }}>May know your Birthday?</Text>

                        </View>

                        <TouchableOpacity onPress={showDatePicker} style={styles.dateContainer}>
                        <ImageBackground style={styles.inputContainerCalander} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                           
                            <Text style={styles.dateText}>{selectedDate ? selectedDate : 'YYYY-MM-DD'}</Text>

                            <Image source={require('../../../Assets/Userprofile_And_Fonts/calander_icon.png')} style={styles.calendarIcon} /></ImageBackground>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            maximumDate={maximumDate}
                            minimumDate={minimumDate}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                        {dobError? <Text style={styles.errorMessage}>{dobError}</Text> : null }





                        <View style={{ width: responsiveWidth(83), marginBottom: responsiveHeight(1.5) }}>
                            <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: 'black' }}>What is Sex?</Text>

                        </View>


                        <View style={styles.boxContent2}>
                            <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                            <View style={styles.selectContainer}>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={selectedGender}
                                    onValueChange={(itemValue) => setSelectedGender(itemValue)}>
                                    <Picker.Item label="SELECT GENDER" value={null} />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />

                                    <Picker.Item label="Others" value="others" />
                                </Picker>
                            </View>
                            </ImageBackground>
                        </View>
                        {genderError ? <Text style={styles.errorMessage}>{genderError}</Text> : null}





                        <View style={{ flexDirection: 'row', margin: responsiveHeight(4), columnGap: responsiveWidth(23), marginTop: responsiveHeight(3) }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUpOne')} style={styles.backButton}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePressNav} style={styles.nextButton}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>STEP 3 OF 4</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // padding: responsiveWidth(3),
        backgroundColor: '#F0F0F0',

        width: '100%',
        height: '100%'


    },
    dateContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // borderWidth:1,
        // width: responsiveWidth(87),
        // borderRadius: 8,
        // height: responsiveHeight(7),
        // borderRadius: responsiveWidth(3.2),
        // borderWidth: responsiveWidth(0.3),
        // marginBottom:responsiveHeight(2),
        // columnGap:responsiveWidth(37)
      },
      calendarIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
      dateText: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
       
      },
    errorMessage: {
        color: 'red',
        right: responsiveWidth(20),
        bottom: responsiveHeight(1.8),

        //  marginBottom: 5,
    },
    selectContainer: {
        marginBottom: 20,
    },
    picker: {
        width: responsiveWidth(87),
        borderRadius: 8,
        height: responsiveHeight(7),
        borderCurve: responsiveWidth(2),
        color: "#333",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(2)
        // backgroundColor:'red',

    },
    boxContent2: {
        height: responsiveHeight(7),
        width: responsiveWidth(86),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        borderRadius: responsiveWidth(3.2),
        borderWidth: responsiveWidth(0.3),
        color: 'black',
       



    },
    boxContent: {
        height: responsiveHeight(8.3),
        width: responsiveWidth(86),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        borderRadius: responsiveWidth(3.2),
        borderWidth: responsiveWidth(0.3),
        color: 'black',
        margin: 1,



    },
    selectListBackground: {
        width: responsiveWidth(86),
        height: responsiveHeight(8.3),
        marginTop: responsiveWidth(4),
        marginBottom: responsiveWidth(2),
        resizeMode: 'cover', // or 'contain' depending on your preference
    },
    inputContainerCalander:{
        flexDirection: 'row',
        alignItems: 'center',
        height: responsiveHeight(8.4),
        width: responsiveWidth(86.7),
        margin: responsiveWidth(1),
        color: 'black',
        resizeMode: 'contain',
        columnGap:responsiveWidth(37),
        marginBottom:responsiveHeight(3)
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(8.4),
        width: responsiveWidth(86.7),
        margin: responsiveWidth(1),
        color: 'black',
        resizeMode: 'contain',
        zIndex: -1

    },
    changeinputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(45),
        height: responsiveHeight(6.1),
        borderRadius: responsiveWidth(2),
        // borderWidth: responsiveWidth(0.2),
        color: "black",
        overflow: "hidden",

    },
    // selectinputContainer:{
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   width: responsiveWidth(85),
    //   height: responsiveHeight(8),
    //   marginTop:responsiveWidth(4),
    //   marginBottom:responsiveWidth(2),
    // },
    formContainer: {
        width: '100%',

        // padding: responsiveWidth(3),
        backgroundColor: '#F0F0F0',
        borderRadius: responsiveWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(3),

    },
    headerContainer: {
        height: responsiveHeight(22),
        width: responsiveWidth(35),
        bottom: responsiveHeight(1),
        // borderWidth: 1

    },

    countryPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(83),
        paddingHorizontal: responsiveWidth(4),
        borderRadius: responsiveWidth(2),
        height: responsiveHeight(5.5),
        backgroundColor: 'transparent'


    },
    header: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 'bold',
        // bottom: responsiveHeight(8.5),
        color: '#1e1ff5',
        fontFamily: 'ArianaVioleta-dz2K',
        textAlign: 'center',

    },
    menuTrigger: {
        fontSize: 24,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {

        height: responsiveHeight(6),
        borderColor: 'black',
        width: '90%',
        fontSize: responsiveFontSize(2),
        // right: responsiveWidth(2),
        color: 'black',
        fontWeight: '500'
    },

    // inputBirth: {
    //   flexDirection: 'row',
    //   // justifyContent:'center',
    //   alignItems: 'center',
    //   marginBottom: responsiveHeight(2),

    //   borderWidth: responsiveWidth(0.5),
    //   paddingHorizontal: responsiveWidth(4),
    //   borderRadius: responsiveWidth(2.6),
    //   height: responsiveHeight(8.1),
    //   width: responsiveWidth(86.7),
    //   borderColor: 'black',
    //   margin: responsiveWidth(1),
    //   fontSize: responsiveFontSize(2),
    //   fontWeight: '500'
    // },
    datePickerButton: {

        backgroundColor: 'black',
        borderRadius: responsiveWidth(4),
        justifyContent: 'center',
        alignItems: 'center',

        width: responsiveWidth(35),
        width: '35%',
        //paddingHorizontal: responsiveWidth(4),
        borderRadius: responsiveWidth(2),
        height: responsiveHeight(6),
        borderWidth: responsiveWidth(0.6)
    },
    selectedDateContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: responsiveWidth(0.3),
        borderRadius: responsiveWidth(3.2),
        height: responsiveHeight(6),
        width: responsiveWidth(43),

        // shadowOffset: { width: 1, height: 4 }, // Shadow offset
        // shadowOpacity: 0.6, // Shadow opacity
        // shadowRadius: 2, // Shadow radius
        // elevation: 1,
        // shadowColor: 'gray',

    },
    selectedDateText: {
        fontSize: responsiveFontSize(2.1),
        color: "black",

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
        borderWidth: responsiveWidth(0.6),
        borderColor: 'black'
        //bottom: responsiveHeight(1.5)
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
        //bottom: responsiveHeight(1.5)

    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: responsiveFontSize(2)

    },
    IndustryButton: {
        width: responsiveWidth(20),
        //bottom: responsiveHeight(3.5),
        // left: responsiveWidth(55),

    }

})