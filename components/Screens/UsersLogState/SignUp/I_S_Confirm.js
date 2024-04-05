// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView, } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { SelectList } from 'react-native-dropdown-select-list';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Industry_S_One from './I_S_One';



// export default function Industry_S_Confirm() {
//     const navigation = useNavigation();
//     // for country callingcode purpose 
//     const route = useRoute();
//     const { profession, industrySelected, professionSub, selected, checked
//     } = route.params

//     // for country callingcode purpose 
//     const [demodata, setDemoData] = useState([]);
//     const [isOpend, setIsOpend] = useState(false);

//     const [trail, setTrail] = useState([]);


//     let profSub = [];

//     for (let i = 0; i < professionSub.length; i++) {
//         const a =
//             { label: professionSub[i], value: professionSub[i] }

//         //  console.log(a)
//         profSub.push(a)



//     }

//     const [isOpenPlatform, setIsOpenPlatform] = useState(false)
//     const [platformData, setplatformData] = useState([]);
//     let platforms = [];
//     for (let i = 0; i < industrySelected.length; i++) {
//         const a =
//             { label: industrySelected[i], value: industrySelected[i] }

//         //  console.log(a)
//         platforms.push(a)



//     }

//     const [isOpenProf, setIsOpenProf] = useState(false)
//     const [profData, setProfdata] = useState([]);
//     let prof = [];
//     for (let i = 0; i < profession.length; i++) {
//         const a =
//             { label: profession[i], value: profession[i] }

//         //  console.log(a)
//         prof.push(a)

//     }


















//     const handlepressNav = () => {

//         if (!verified) {
//             // Navigate to the next screen

//             alert('Oops!! Read the T&C and Enter the OTP received to you Mail Id');
//         }
//         else {
//             navigation.navigate("IndustryTwo", {
//                 checked, profession, industrySelected, professionSub, selected,


//             })
//         }

//     }

//     const [verified, setVerify] = useState(false);
//     const handleCheckboxPress = () => {
//         setVerify(!verified);
//     };

//     //================================================

//     const { Country, State, City } = require('country-state-city');

//     // Example: Retrieving information about countries
//     const countries = Country.getAllCountries();

//     //console.log('All countries:', countries);
//   //  console.log('Country length   ' + (countries.length))

//     let country = [];
//     for (let i = 0; i < Country.length; i++) {
//         const a =
//             { label: Country[i], value: Country[i] }

//         //  console.log(a)
//         country.push(a)



//     }






//     // Example: Retrieving information about states in a specific country
//     const countryName = 'United States';
//     const statesInCountry = State.getStatesOfCountry(countryName);
//    // console.log('stateName ' + statesInCountry[0])
//     //console.log(`States in ${countryName}:`, statesInCountry);

//     // Example: Retrieving information about cities in a specific state
//     const stateName = 'California';
//     const citiesInState = City.getCitiesOfState(stateName);
//     //console.log(`Cities in ${stateName}:`, citiesInState);












//     return (

//         <ScrollView>
//             <View style={styles.container}>
//                 <View style={styles.formContainer}>
//                     <View style={{ height: responsiveHeight(14), width: responsiveWidth(89), marginBottom: responsiveHeight(3), flexDirection: 'row', position: 'relative', }}>

//                         <Image style={{
//                             height: responsiveHeight(15.2),
//                             width: responsiveWidth(30), alignSelf: 'center',
//                         }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode='stretch' />

//                         <Image style={{ height: responsiveHeight(6.2), width: responsiveWidth(65), position: 'absolute', left: responsiveWidth(15), top: responsiveHeight(8) }} source={require('../../../Assets/Login_page/Film_hook_name.png')} resizeMode='stretch'/>
//                         <Text style={{ color: 'blue', fontWeight: 'bold', position: 'absolute', left: responsiveWidth(58), top: responsiveHeight(14) }}>Industry User</Text>


//                     </View>

//                     {/* <TouchableOpacity onPress={()=>navigation.navigate('IndustryOne',{

//                     })}>
//                         <Text>Test</Text>
//                     </TouchableOpacity> */}





//                     <View style={{ width: '100%', borderWidth: responsiveWidth(0.4), borderRadius: responsiveWidth(3), padding: responsiveWidth(2), margin: responsiveWidth(1), }}>
//                         <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'red', }}>Industries:</Text>
//                         <View style={{ flexDirection: 'row', columnGap: responsiveWidth(3), left: responsiveWidth(5), marginTop: responsiveHeight(2), flexWrap: 'wrap' }}>

//                             {selected.map((industry) => (

//                                 <TouchableOpacity key={industry} style={styles.boxContent}>
//                                     <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '800', color: 'green' }}>{industry}</Text>


//                                 </TouchableOpacity>


//                             ))}
//                         </View>

//                     </View>

//                     <View style={{ width: '100%', borderWidth: responsiveWidth(0.4), borderRadius: responsiveWidth(3), padding: responsiveWidth(2), margin: responsiveWidth(1), height: responsiveHeight(30) }}>
//                         <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'red', }}>Platforms:</Text>

//                         <View style={{ height: responsiveHeight(40) }}>
//                             <DropDownPicker items={platforms} open={isOpenPlatform}
//                                 setOpen={() => setIsOpenPlatform(!isOpenPlatform)}
//                                 value={platformData}
//                                 setValue={(val) => setplatformData(val)}
//                                 maxHeight={responsiveHeight(32)}
//                                 autoScroll
//                                 placeholder="Select your platforms"
//                                 //   searchable={true}
//                                 //  searchContainerStyle={{height:responsiveHeight(4),backgroundColor:'gray'}}

//                                 searchPlaceholderTextColor="search"
//                                 placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
//                                 dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginTop: 2 }}
//                                 showTickIcon={true}
//                                 showArrowIcon={true}
//                                 dropDownDirection="BOTTOM"

//                                 theme="LIGHT"
//                                 multiple={true}
//                                 mode="BADGE"
//                                 badgeColors={['#00d4ff']}
//                                 badgeDotColors={['green', 'red', 'blue', 'yellow']}
//                                 badgeTextStyle={'black'}
//                                 style={{
//                                     marginTop: responsiveHeight(1),
//                                     marginBottom: responsiveHeight(1),
//                                     borderWidth: responsiveWidth(0.5),
//                                     paddingHorizontal: responsiveWidth(2),
//                                     borderRadius: responsiveWidth(2),
//                                     height: responsiveHeight(8),
//                                     width: responsiveWidth(86),
//                                     //  left: responsiveWidth(3),

//                                     zIndex: 1

//                                 }}

//                             />

//                         </View>











//                     </View>
//                     <View style={{ width: '100%', borderWidth: responsiveWidth(0.4), borderRadius: responsiveWidth(3), padding: responsiveWidth(2), margin: responsiveWidth(1), height: responsiveHeight(30) }}>
//                         <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'red', }}>Profession:</Text>
//                         <View style={{}}>
//                             <DropDownPicker items={prof} open={isOpenProf}
//                                 setOpen={() => setIsOpenProf(!isOpenProf)}
//                                 value={profData}
//                                 setValue={(val) => setProfdata(val)}
//                                 maxHeight={responsiveHeight(32)}
//                                 autoScroll
//                                 placeholder="Select your Professions"
//                                 //  searchable={true}
//                                 //  searchContainerStyle={{height:responsiveHeight(4),backgroundColor:'gray'}}

//                                 searchPlaceholderTextColor="search"
//                                 placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
//                                 dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginTop: 2 }}
//                                 showTickIcon={true}
//                                 showArrowIcon={true}
//                                 dropDownDirection="BOTTOM"

//                                 theme="LIGHT"
//                                 multiple={true}
//                                 mode="BADGE"
//                                 badgeColors={['#00d4ff']}
//                                 badgeDotColors={['green', 'red', 'blue', 'yellow']}
//                                 badgeTextStyle={'black'}
//                                 style={{
//                                     marginTop: responsiveHeight(1),
//                                     marginBottom: responsiveHeight(1),
//                                     borderWidth: responsiveWidth(0.5),
//                                     paddingHorizontal: responsiveWidth(2),
//                                     borderRadius: responsiveWidth(2),
//                                     height: responsiveHeight(8),
//                                     width: responsiveWidth(86),
//                                     //  left: responsiveWidth(3),

//                                     zIndex: 1

//                                 }}

//                             />
//                         </View>
//                     </View>
//                     <View style={{ width: '100%', borderWidth: responsiveWidth(0.4), borderRadius: responsiveWidth(3), padding: responsiveWidth(2), margin: responsiveWidth(1), height: responsiveHeight(30) }}>
//                         <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'red', }}>Sub Profession:</Text>
//                         <View style={{ height: responsiveHeight(32) }}>
//                             <DropDownPicker items={profSub} open={isOpend}
//                                 setOpen={() => setIsOpend(!isOpend)}
//                                 value={demodata}
//                                 setValue={(val) => setDemoData(val)}
//                                 maxHeight={responsiveHeight(30)}
//                                 autoScroll
//                                 placeholder="Select your Industries"
//                                 //  searchable={true}
//                                 //  searchContainerStyle={{height:responsiveHeight(4),backgroundColor:'gray'}}

//                                 searchPlaceholderTextColor="search"
//                                 placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
//                                 dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginTop: 2 }}
//                                 showTickIcon={true}
//                                 showArrowIcon={true}
//                                 dropDownDirection="BOTTOM"

//                                 theme="LIGHT"
//                                 multiple={true}
//                                 mode="BADGE"
//                                 badgeColors={['#00d4ff']}
//                                 badgeDotColors={['green', 'red', 'blue', 'yellow']}
//                                 badgeTextStyle={'black'}
//                                 style={{
//                                     marginTop: responsiveHeight(1),
//                                     marginBottom: responsiveHeight(1),
//                                     borderWidth: responsiveWidth(0.5),
//                                     paddingHorizontal: responsiveWidth(2),
//                                     borderRadius: responsiveWidth(2),
//                                     height: responsiveHeight(8),
//                                     width: responsiveWidth(86),
//                                     //  left: responsiveWidth(3),

//                                     zIndex: 1

//                                 }}

//                             />

//                         </View>
//                     </View>

//                     {/* <View style={{ width: '100%', borderWidth: responsiveWidth(0.4), borderRadius: responsiveWidth(3), padding: responsiveWidth(2), margin: responsiveWidth(1) }}>
//                         <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'red', }}>Profession:</Text>
//                         <View style={{ flexDirection: 'row', columnGap: responsiveWidth(3), left: responsiveWidth(5), marginTop: responsiveHeight(2), flexWrap: 'wrap' }}>
//                             {profession.map((prof) => (
//                                 <View key={prof} style={styles.boxContent}>
//                                     <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '800', color: 'green' }}>{prof}</Text>

//                                 </View>
//                             ))}
//                         </View>

//                     </View>
//                     <View style={{ width: '100%', borderWidth: responsiveWidth(0.4), borderRadius: responsiveWidth(3), padding: responsiveWidth(2), margin: responsiveWidth(1) }}>
//                         <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'red', }}>Sub Profession:</Text>
//                         <View style={{ flexDirection: 'row', columnGap: responsiveWidth(3), left: responsiveWidth(5), marginTop: responsiveHeight(2), flexWrap: 'wrap' }}>
//                             {professionSub.map((profSub) => (
//                                 <View key={profSub} style={styles.boxContent}>
//                                     <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '800', color: 'green' }}>{profSub}</Text>

//                                 </View>
//                             ))}
//                         </View>

//                     </View> */}






//                     <View style={{ flexDirection: 'row', top: responsiveHeight(3) }}>

//                         <TouchableOpacity onPress={handleCheckboxPress}>
//                             <View
//                                 style={{
//                                     width: responsiveWidth(5),
//                                     height: responsiveWidth(5),
//                                     // borderRadius: responsiveWidth(6),
//                                     borderWidth: responsiveWidth(0.5),
//                                     borderColor: 'black',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                 }}
//                             >
//                                 {verified && (<Image source={require("../../../Assets/Login_page/greenTickmark-FilmHook.png")} style={{ height: responsiveHeight(3), width: responsiveWidth(6), bottom: responsiveHeight(0.8), left: responsiveWidth(0.8) }}>

//                                 </Image>

//                                 )}
//                             </View>
//                         </TouchableOpacity>



//                         <TouchableOpacity onPress={() => navigation.navigate('Terms_Conditions_Industry', { profession, industrySelected, professionSub, selected, checked })} style={{
//                             // padding: 15,

//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             // backgroundColor: '#2d51c5',
//                             height: responsiveHeight(4),
//                             width: responsiveWidth(80),
//                             bottom: responsiveHeight(1)


//                         }}>
//                             <Text style={{
//                                 color: 'black',
//                                 fontWeight: '400',
//                                 fontSize: responsiveFontSize(1.8),
//                             }}>Accept the Terms and Conditions, Privacy Policy</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={{ flexDirection: 'row', columnGap: responsiveWidth(26), marginTop: responsiveHeight(5) }}>
//                         <TouchableOpacity onPress={() => navigation.navigate('IndustryOne', { profession, industrySelected, professionSub, selected, checked })} style={styles.backButton}>
//                             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
//                             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>  Get Verified</Text>
//                         </TouchableOpacity>
//                     </View>





//                 </View>
//             </View>
//         </ScrollView>
//     );
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: responsiveHeight(1),
//         backgroundColor: '#f5f5f5',

//         width: '100%',
//     },
//     backButton: {
//         backgroundColor: 'black',
//         // padding: responsiveWidth(2.5),
//         borderRadius: responsiveWidth(2),
//         justifyContent: 'center',
//         alignItems: 'center',
//         // alignSelf: 'center',
//         height: responsiveHeight(6),
//         width: responsiveWidth(30),
//         borderWidth: responsiveWidth(0.6),
//         borderColor: 'black'
//     },
//     boxContent: {
//         height: responsiveHeight(5),
//         width: responsiveWidth(40),
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: responsiveHeight(2),
//         borderRadius: responsiveWidth(3.2),
//         borderWidth: responsiveWidth(0.4),
//         color: 'black',



//     },
//     formContainer: {
//         width: responsiveWidth(100),
//         padding: responsiveWidth(3),
//         backgroundColor: '#f5f5f5',
//         borderRadius: responsiveWidth(4),
//         justifyContent: 'center',
//         alignItems: 'center',
//         // borderWidth: 1,


//     },
//     headerContainer: {
//         flexDirection: 'row',
//         justifyContent: "center",
//     },


//     selectedDateContainer: {


//         justifyContent: 'center',
//         alignItems: 'center',
//         //paddingBottom: 9,
//         bottom: responsiveHeight(6.3),
//         borderRadius: responsiveWidth(5),
//         borderWidth: responsiveWidth(0.4),
//         borderColor: 'black',
//         marginTop: responsiveHeight(1.2),
//         width: responsiveWidth(46),
//         height: responsiveHeight(5),
//         left: responsiveWidth(32),

//         borderRadius: responsiveWidth(5),
//     },
//     selectedDateText: {
//         fontSize: responsiveFontSize(2),
//         height: responsiveHeight(6),
//         top: responsiveHeight(1.3)

//     },
//     nextButton: {
//         backgroundColor: '#616161',
//         // padding: responsiveWidth(2.5),
//         borderRadius: responsiveWidth(2),
//         justifyContent: 'center',
//         alignItems: 'center',
//         // alignSelf: 'center',
//         height: responsiveHeight(6),
//         width: responsiveWidth(30),
//         //bottom: responsiveHeight(1.5)
//         borderWidth: responsiveWidth(0.6),
//         borderColor: 'black'
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: 'bold',

//     },

// })



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
// import axios from 'axios';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { TouchableOpacity } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';


// const IndustryPage = ({ userId }) => {




//     const [industryData, setIndustryData] = useState(null);
//     const [selectedProfessions, setSelectedProfessions] = useState([]);
//     const [selectedSubProfessions, setSelectedSubProfessions] = useState([]);



//     const toggleProfession = (profession) => {
//         if (selectedProfessions.includes(profession)) {
//             setSelectedProfessions(selectedProfessions.filter(item => item !== profession));
//         } else {
//             setSelectedProfessions([...selectedProfessions, profession]);
//         }
//     };

//     const toggleSubProfession = (subProfession) => {
//         if (selectedSubProfessions.includes(subProfession)) {
//             setSelectedSubProfessions(selectedSubProfessions.filter(item => item !== subProfession));
//         } else {
//             setSelectedSubProfessions([...selectedSubProfessions, subProfession]);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.post(`http://18.61.66.68:8080/filmhook-0.0.1/industryUser/getTemporaryDetails`,
//                     {
//                         userId: 1
//                     }
//                 );
//                 setIndustryData(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [userId]);

//     const renderIndustryData = () => {
//         if (!industryData) return null;

//         return Object.entries(industryData).map(([industryName, industry]) => (
//             <View key={industryName} style={styles.industryContainer}>
//                 <View style={styles.searchBox}>
//                     <ImageBackground
//                         style={styles.inputContainernew}
//                         source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                         resizeMode="stretch"
//                     >
//                         <Text style={styles.industryTitle}>{industryName}</Text>
//                         <TouchableOpacity
//                             style={{
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: 10,
//                                 borderWidth: 1,
//                                 borderColor: 'black',
//                                 bottom: responsiveHeight(2.5),
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 left: responsiveWidth(2)
//                             }}

//                         >

//                         </TouchableOpacity>
//                     </ImageBackground>
//                 </View>


//                 {/* {industry.platforms.map((platform, index) => (
//                     <View key={index} style={styles.platformContainer}>
//                         <View style={{ borderWidth: 1 }}>
//                             <Text style={styles.platformName}>{platform.platformName}</Text>
//                         </View>
//                         <View style={styles.professionContainer}>
//                             {platform.professions.map((profession, index) => (
//                                 <Text key={index} style={styles.profession}>{profession}</Text>
//                             ))}
//                         </View>
//                         <View style={styles.subProfessionContainer}>
//                             {platform.subProfessions.map((subProfession, index) => (
//                                 <Text key={index} style={styles.subProfession}>{subProfession}</Text>
//                             ))}
//                         </View>
//                     </View>
//                 ))} */}
//                 {industry.platforms.map((platform, index) => (
//                 <View key={index} style={styles.platformContainer}>
//                     <View style={{ borderWidth: 1 }}>
//                         <Text style={styles.platformName}>{platform.platformName}</Text>
//                     </View>
//                     <View style={styles.professionContainer}>
//                         {platform.professions.map((profession, index) => (
//                             <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <CheckBox
//                                     value={selectedProfessions.includes(profession)}
//                                     onValueChange={() => toggleProfession(profession)}
//                                 />
//                                 <Text style={styles.profession}>{profession}</Text>
//                             </View>
//                         ))}
//                     </View>
//                     <View style={styles.subProfessionContainer}>
//                         {platform.subProfessions.map((subProfession, index) => (
//                             <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <CheckBox
//                                     value={selectedSubProfessions.includes(subProfession)}
//                                     onValueChange={() => toggleSubProfession(subProfession)}
//                                 />
//                                 <Text style={styles.subProfession}>{subProfession}</Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//             ))}
//             </View>
//         ));
//     };

//     return (
//         <ScrollView style={styles.container}>


//             {renderIndustryData()}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         padding: 20,
//     },
//     industryContainer: {
//         marginBottom: 20,
//         borderWidth: 1
//     },
//     industryTitle: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     platformContainer: {
//         marginBottom: 10,
//         // borderWidth:1
//     },
//     platformName: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     professionContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 5,
//     },
//     profession: {
//         marginRight: 10,
//     },
//     subProfessionContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     subProfession: {
//         marginRight: 10,
//         color: '#666',
//     },
//     searchBox: {
//         width: '100%',
//         marginBottom: 10,
//         padding: 5,
//         position: 'relative',
//     },

//     inputContainernew: {
//         width: '100%',
//         marginBottom: 10,
//         padding: 5,
//         height: responsiveHeight(8),
//     },
//     input: {
//         // borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         top: responsiveHeight(0.6),
//         left: responsiveWidth(5)
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: responsiveWidth(5),
//         marginBottom: 10,
//         borderWidth: responsiveWidth(0.5),
//         width: responsiveWidth(44),
//     },
//     backButton: {
//         backgroundColor: 'black',
//         // padding: responsiveWidth(2.5),
//         borderRadius: responsiveWidth(2),
//         justifyContent: 'center',
//         alignItems: 'center',
//         // alignSelf: 'center',
//         height: responsiveHeight(6),
//         width: responsiveWidth(30),
//         borderWidth: responsiveWidth(0.6),
//         borderColor: 'black'
//     },
//     nextButton: {
//         backgroundColor: '#616161',
//         // padding: responsiveWidth(2.5),
//         borderRadius: responsiveWidth(2),
//         justifyContent: 'center',
//         alignItems: 'center',
//         // alignSelf: 'center',
//         height: responsiveHeight(6),
//         width: responsiveWidth(30),
//         //bottom: responsiveHeight(1.5)
//         borderWidth: responsiveWidth(0.6),
//         borderColor: 'black'
//     },
// });

// export default IndustryPage;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const IndustryPage = ({ userId }) => {
    const [industryData, setIndustryData] = useState({});
    const [verified, setVerify] = useState(false);
    const navigation = useNavigation();
    const handlepressNav = () => {

        if (!verified) {
            // Navigate to the next screen

            alert('Oops!! Read the T&C and Enter the OTP received to you Mail Id');
        }
        else {
            navigation.navigate("IndustryTwo")



        }

    }


    const handleCheckboxPress = () => {
        setVerify(!verified);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                const response = await axios.post(`http://18.61.66.68:8080/filmhook-0.0.1/industryUser/getTemporaryDetails`, {
                    userId: parseInt(id)
                });
                setIndustryData(response.data || {});


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);



    const isProfessionSelected = (industryName, platformIndex, profession) => {
        const industry = industryData[industryName];
        const platform = industry && industry.platforms && industry.platforms[platformIndex];
        return platform && platform.selectedProfessions && platform.selectedProfessions.includes(profession);
    };



    const isSubProfessionSelected = (industryName, platformIndex, subProfession) => {
        const industry = industryData[industryName];
        const platform = industry && industry.platforms && industry.platforms[platformIndex];
        return platform && platform.selectedSubProfessions && platform.selectedSubProfessions.includes(subProfession);
    };

    const toggleProfession = (industryName, platformIndex, profession) => {
        setIndustryData(prevData => {
            const updatedData = { ...prevData };
            const platform = updatedData[industryName].platforms[platformIndex];
            platform.selectedProfessions = platform.selectedProfessions || []; // Ensure selectedProfessions is initialized

            // Check if profession already exists
            const professionIndex = platform.selectedProfessions.indexOf(profession);

            if (professionIndex !== -1) {
                // If profession exists, remove it
                platform.selectedProfessions.splice(professionIndex, 1);
            } else {
                // If profession doesn't exist, add it
                platform.selectedProfessions.push(profession);
            }

            // This console.log statement logs the updated state of selected professions
            // console.log('Selected Professions :', platform.selectedProfessions);
            // console.log('Industry:', updatedData[industryName].platforms[platformIndex]);

            return updatedData;
        });
    };


    const toggleSubProfession = (industryName, platformIndex, subProfession) => {
        console.log('Sub-Profession:', subProfession); // Log subProfession
        setIndustryData(prevData => {
            const updatedData = { ...prevData };
            const platform = updatedData[industryName].platforms[platformIndex];
            platform.selectedSubProfessions = platform.selectedSubProfessions || []; // Ensure selectedSubProfessions is initialized
            const subProfessionIndex = platform.selectedSubProfessions.indexOf(subProfession);

            if (subProfessionIndex !== -1) {
                platform.selectedSubProfessions.splice(subProfessionIndex, 1);
            } else {
                platform.selectedSubProfessions.push(subProfession);
            }
            return updatedData;
        });
    };




    return (
        <ScrollView style={styles.container}>

            <View style={{ height: responsiveHeight(14), width: responsiveWidth(89), marginBottom: responsiveHeight(3), flexDirection: 'row', position: 'relative', }}>

                <Image style={{
                    height: responsiveHeight(15.2),
                    width: responsiveWidth(30), alignSelf: 'center',
                }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

                <Image style={{ height: responsiveHeight(6.2), width: responsiveWidth(65), position: 'absolute', left: responsiveWidth(15), top: responsiveHeight(8) }} source={require('../../../Assets/Login_page/Film_hook_name.png')} resizeMode="stretch" />
                <Text style={{ color: 'blue', fontWeight: 'bold', position: 'absolute', left: responsiveWidth(58), top: responsiveHeight(14) }}>Industry User</Text>


            </View>

            {Object.entries(industryData).map(([industryName, industry], index) => (

                <View key={index} style={styles.industryContainer}>
                    <View style={styles.searchBox}>
                        {/* <ImageBackground
                            style={styles.inputContainernew}
                            source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                            resizeMode="stretch"
                        > */}
                        <Text style={styles.industryTitle}>{industryName}</Text>
                        {/* </ImageBackground> */}
                    </View>

                    {industry.platforms.map((platform, platformIndex) => (
                        <View key={platformIndex} style={styles.platformContainer}>
                            <View style={styles.searchBox}>

                                <Text style={styles.platformName}>{platform.platformName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', columnGap: responsiveWidth(2) }}>
                                <View style={styles.professionContainer}>
                                    {platform.professions.map((profession, professionIndex) => (
                                        <View key={professionIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={isProfessionSelected(industryName, platformIndex, profession)}
                                                onValueChange={() => toggleProfession(industryName, platformIndex, profession)}
                                            />
                                            <Text style={styles.profession}>{profession}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.subProfessionContainer}>
                                    {platform.subProfessions.map((subProfession, subProfessionIndex) => (
                                        <View key={subProfessionIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={isSubProfessionSelected(industryName, platformIndex, subProfession)}
                                                onValueChange={() => toggleSubProfession(industryName, platformIndex, subProfession)}
                                            />
                                            <Text style={styles.subProfession}>{subProfession}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
            <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: responsiveWidth(4) }}>

                <TouchableOpacity onPress={handleCheckboxPress}>
                    <View
                        style={{
                            width: responsiveWidth(5),
                            height: responsiveWidth(5),
                            // borderRadius: responsiveWidth(6),
                            borderWidth: responsiveWidth(0.5),
                            borderColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {verified && (<Image source={require("../../../Assets/Login_page/greenTickmark-FilmHook.png")} style={{ height: responsiveHeight(3), width: responsiveWidth(6), bottom: responsiveHeight(0.8), left: responsiveWidth(0.8) }}>

                        </Image>

                        )}
                    </View>
                </TouchableOpacity>



                <TouchableOpacity onPress={() => navigation.navigate('Terms_Conditions_Industry')} style={{
                    // padding: 15,

                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: '#2d51c5',
                    height: responsiveHeight(4),
                    width: responsiveWidth(80),
                    // bottom: responsiveHeight(1)


                }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: '400',
                        fontSize: responsiveFontSize(1.8),
                    }}>Accept the Terms and Conditions, Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', columnGap: responsiveWidth(18), justifyContent: 'center', alignItems: 'center', padding: responsiveWidth(4) }}>
                <TouchableOpacity onPress={() => navigation.navigate('IndustryTwo', { checked })} style={styles.backButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(2),
    },
    industryContainer: {
        marginBottom: 20,
        //  borderWidth: 1
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
        borderWidth: responsiveWidth(0.6),
        borderColor: 'black'
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
        borderWidth: responsiveWidth(0.6),
        borderColor: 'black'
    },
    industryTitle: {
        fontSize: responsiveFontSize(2.8),
        fontWeight: 'bold',
        color: 'black'

        //   marginBottom: 10,
    },
    platformContainer: {
        marginBottom: 10,
    },
    platformName: {
        fontSize: responsiveFontSize(2.8),
        fontWeight: 'bold',
        color: 'black'
    },
    professionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: responsiveHeight(0.5),
        borderWidth: responsiveWidth(0.5),
        width: '50%',
        padding: responsiveWidth(1),
        borderRadius: responsiveWidth(3)



    },
    profession: {
        // marginRight: 10,
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: 'black',
        width: '79%',

    },
    subProfessionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: responsiveHeight(0.5),
        borderWidth: responsiveWidth(0.5),
        width: '48%',
        padding: responsiveWidth(1),
        borderRadius: responsiveWidth(3)
    },
    subProfession: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: 'black',
        width: '79%',


    },
    searchBox: {
        flexDirection: 'row',
        borderWidth: responsiveWidth(0.5),
        height: responsiveHeight(8.4),
        width: '100%',
        marginBottom: responsiveWidth(1),
        //justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(2),
        borderRadius: responsiveWidth(3)



    },
    inputContainernew: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        height: responsiveHeight(8),
    },
});

export default IndustryPage;