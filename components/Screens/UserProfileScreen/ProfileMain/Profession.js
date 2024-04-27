// import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import Profession_project from './Projects'
// import Profession_tv_drama_project from './Tv_Drama_Projects'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'





// export default function Profession() {

//   const [expanded, setExpanded] = useState(false);



//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };


//   return (
//     <>


//       <View style={style.bio_title}>
//         <TouchableOpacity style={style.bio_title} onPress={toggleExpanded}>
//           <Text style={style.bio_title_text}>PROFESSION</Text>

//           <View style={{ width: responsiveWidth(5), height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center' }}>
//             <Image
//               source={require("../../../Assets/Userprofile_And_Fonts/update/down-arrow.png")}
//               style={style.downArrow}
//             />
//           </View>
//         </TouchableOpacity>
//       </View>

//       {expanded && (

//         <View style={style.container}>
//           <View style={{ flex: 0.8 }}>

//             <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', }}>
//               <ImageBackground style={{
//                 width: '102%',
//                 height: '102%', right: -10
//               }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")} style={{ width: responsiveHeight(8.5), height: responsiveHeight(10), right: -28, top: 4 }} />
//               </ImageBackground>
//             </View>

//           </View>
//           <View style={style.bio_content}>
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.8),
//                   left: responsiveWidth(12)
//                 }}>
//                   Actor
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section_Hero}>
//               {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.7),
//                   left: responsiveWidth(7),
//                 }}>
//                   Hero
//                 </Text>
//               </ImageBackground>
//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(1.5),
//                 left: responsiveWidth(3),
//               }}>
//                 1993 - present
//               </Text>
//             </View>

//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/producer_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.8),
//                   left: responsiveWidth(12)
//                 }}>
//                   Producer
//                 </Text>
//               </ImageBackground>
//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(8),
//                 left: responsiveWidth(-24),
//               }}>
//                 2013 - 2023
//               </Text>
//             </View>
//             <View style={style.bio_content_section_Producer}>
//               {/* <Image source={require("../../../Assets/  Userprofile_And_Fonts/producer_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.8),
//                   left: responsiveWidth(3)
//                 }}>
//                   Producer
//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>

//               <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1), }}>

//                 <ImageBackground style={{ width: "270%", height: "119%", right: 9, marginTop: responsiveHeight(-1) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                   <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")}
//                     style={{ width: responsiveWidth(6.5), height: responsiveHeight(4), }} />
//                 </ImageBackground>
//               </View>

//               <Text style={{
//                 fontSize: responsiveFontSize(2),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(0.7),
//                 left: responsiveWidth(12)
//               }}>
//                 105 Films
//               </Text>
//             </View>
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/Cash_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(12)
//                 }}>
//                   Rs.1.75Cr/Day

//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ///////////////////////////////////////////////*/}
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/Net_worth_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(12)
//                 }}>
//                   Rs.6281 Cr
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require(".../../../components/Assets/AllSearch_Icon_And_Fonts/country/Filmhook-maharashtra-PhotoRoom.png")}
//                   style={{
//                     width: responsiveWidth(7.8), height: responsiveHeight(4),
//                     marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1),
//                     backgroundColor: '#B1B4C7',
//                     borderRadius: responsiveWidth(4)
//                   }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(13)
//                 }}>
//                   BOLLYWOOD
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("..../../../components/Assets/AllSearch_Icon_And_Fonts/country/FH_TN.png")}
//                   style={{
//                     width: responsiveWidth(7.8), height: responsiveHeight(4),
//                     marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1),
//                     backgroundColor: '#B1B4C7',
//                     borderRadius: responsiveWidth(4)
//                   }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(11)
//                 }}>
//                   KOLLYWOOD
//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ///////////////////////////////////////////////*/}
//           </View>
//         </View>
//       )}
//       {/* ////////////////////////////////////////////*/}
//       {/* <View  style={style.hr_tag}/> */}
//       {expanded && (
//         <View>
//           <Profession_project />
//         </View>
//       )}

//       <View style={{ width: responsiveWidth(100), borderWidth: responsiveWidth(0.1), marginBottom: responsiveHeight(1) }} />

//       <View style={style.container}>
//         {expanded && (
//           <View style={{ flex: 0.8 }}>
//             <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), marginLeft: 10, justifyContent: 'center', alignItems: 'center', }}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/AllSearch_Icon_And_Fonts/Update/FH_tv_drama.png")} style={{ width: responsiveHeight(8.5), height: responsiveHeight(10), right: -28, top: 4 }} />
//               </ImageBackground>
//             </View>
//           </View>
//         )}

//         {expanded && (

//           <View style={style.bio_content}>
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.7),
//                   left: responsiveWidth(12)
//                 }}>
//                   Actor
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section_Hero}>
//               {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={{ width: "90%", height: "88%", top: 1, right: -5 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.7),
//                   left: responsiveWidth(3),

//                   //  width:responsiveWidth(15)
//                 }}>
//                   Music

//                 </Text>
//               </ImageBackground>

//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(1.5),
//                 left: responsiveWidth(4),

//               }}>
//                 1998 - present
//               </Text>
//             </View>

//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/producer_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3),
//                   left: responsiveWidth(12),

//                 }}>
//                   Producer
//                 </Text>
//               </ImageBackground>
//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(8),
//                 left: responsiveWidth(-25),
//               }}>
//                 2013 - 2023
//               </Text>
//             </View>
//             <View style={style.bio_content_section_Producer}>
//               {/* <Image source={require("../../../Assets/  Userprofile_And_Fonts/producer_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={{ width: "93%", height: "88%", top: 1, right: -5 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.6),
//                   left: responsiveWidth(3),
//                   // borderWidth:1
//                 }}>
//                   Producer
//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>

//               <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1), }}>
//                 <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")}
//                   style={{ width: responsiveWidth(6.5), height: responsiveHeight(4), }} />
//               </View>
//               <ImageBackground style={{ width: "100%", height: "100%", right: 34 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.7),
//                   left: responsiveWidth(12)
//                 }}>
//                   105 Films
//                 </Text>
//               </ImageBackground>
//             </View>

//             {/* ///////////////////////////////////////////////*/}

//             {/* ///////////////////////////////////////////////*/}
//           </View>
//         )}
//       </View>
//       {expanded && (
//         <Profession_project />
//       )}
//       {/* <View style={style.hr_tag} /> */}

//       {/* <Profession_tv_drama_project /> */}

//     </>
//   )
// }

// const style = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//    // borderWidth:1
//     // marginTop:20,
//   },
//   bio_title: {
//     flex: responsiveWidth(0.2),
//     width: '100%',
//     flexDirection: 'row',
//     columnGap: responsiveWidth(20),
//     marginTop: responsiveHeight(1),
//     marginBottom: responsiveHeight(2)

//   },

//   downArrow: {
//     width: 20,
//     height: 20,
//     marginRight: responsiveWidth(2),
//     // Add styles for your down arrow icon
//   },
//   bio_title_text: {
//     fontWeight: "bold",
//     fontSize: responsiveFontSize(2.2),
//     color: "black",
//     marginLeft: responsiveWidth(2),
//     fontFamily: 'Cochin',
//     // textDecorationLine: "underline",
//     //  borderWidth:1,
//     width: responsiveWidth(70)

//   },
//   bio_content: {
//     flex: 1,
//   },
//   inputContainer: {


//     width: '101%',
//     height: '100%',
//   },

//   bio_content_section: {
//     flexDirection: "row",
//     width: responsiveWidth(52),
//     height: responsiveHeight(5.5),
//     // borderWidth: responsiveWidth(0.3),
//     borderRadius: responsiveWidth(2),
//     marginBottom: responsiveHeight(1),
//   },
//   hr_tag: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#D7D7D7',
//     marginVertical: 5,
//   },
//   bio_content_section_Hero: {
//     flexDirection: "row",
//     width: responsiveWidth(25),
//     height: responsiveHeight(5.5),
//     // borderWidth: responsiveWidth(0.3),
//     borderRadius: responsiveWidth(2),
//     marginBottom: responsiveHeight(1.5),
//   },
//   bio_content_section_Producer: {
//     flexDirection: "row",
//     width: responsiveWidth(25),
//     height: responsiveHeight(5.5),
//     // borderWidth: responsiveWidth(0.3),
//     borderRadius: responsiveWidth(2),
//     marginBottom: responsiveHeight(1.5),
//   },
// })
//=================================================================================

// import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Profession_project from './Projects'
// import Profession_tv_drama_project from './Tv_Drama_Projects'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import privateAPI from '../../../api/privateAPI'



// export default function Profession() {

//   const [expanded, setExpanded] = useState(false);
//   const [platformName, setPlatformName] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [industriesName, setIndustriesName] = useState(null);
//   const [professionName, setProfessionName] = useState(null);
//   const [platformIcon, setPlatformIcon] = useState(null);

//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=167`);
//         const response = resp.data;
//         console.log(response);

//         // Extract platform names from platformDetails array
//         const platformNames = response.map((item) => item.platformDetails.map((platform) => platform.platformName));
//         const platforIcons = response.map((item) => item.platformDetails.map((platform) => platform.image));
//         console.log(platforIcons)

//         const industriesNames = response.map(item => item.industriesName);
//         const professions = response.map(item =>
//           item.platformDetails.flatMap(platform =>
//             platform.professionDetails.map(profession => profession.professionName)
//           )
//         );
//         console.log(platformNames);
//         // console.log("professionNames",professionNames)

//         // Update platformName state with fetched platform names
//         setPlatformName(platformNames);
//         setIndustriesName(industriesNames);
//         setProfessionName(professions);
//         setPlatformIcon(platforIcons);
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (error) {
//         console.log(" error profession line 34 ", error);
//         setLoading(false); // Set loading to false if an error occurs
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <>


//       <View style={style.bio_title}>
//         <TouchableOpacity style={style.bio_title} onPress={toggleExpanded}>
//           <Text style={style.bio_title_text}>PROFESSION</Text>

//           <View style={{ width: responsiveWidth(5), height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center' }}>
//             <Image
//               source={require("../../../Assets/Userprofile_And_Fonts/update/down-arrow.png")}
//               style={style.downArrow}
//             />
//           </View>
//         </TouchableOpacity>
//       </View>

//       {expanded && (

//         <View style={style.container}>
//           <View style={{ flex: 0.8 }}>

//             <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', }}>
//               <ImageBackground style={{
//                 width: '102%',
//                 height: '102%', right: -10
//               }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 {/* <Image source={{ uri: platformIcon }}
//                   style={{ width: responsiveHeight(8.5), height: responsiveHeight(10), right: -28, top: 4 }} /> */}
//               </ImageBackground>
//             </View>

//           </View>
//           <View style={style.bio_content}>
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.8),
//                   left: responsiveWidth(12)
//                 }}>
//                   Actor
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section_Hero}>
//               {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.7),
//                   left: responsiveWidth(7),
//                 }}>
//                   Hero
//                 </Text>
//               </ImageBackground>
//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(1.5),
//                 left: responsiveWidth(3),
//               }}>
//                 1993 - present
//               </Text>
//             </View>

//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/producer_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.8),
//                   left: responsiveWidth(12)
//                 }}>
//                   {platformName}
//                 </Text>
//               </ImageBackground>
//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(8),
//                 left: responsiveWidth(-24),
//               }}>
//                 2013 - 2023
//               </Text>
//             </View>
//             <View style={style.bio_content_section_Producer}>
//               {/* <Image source={require("../../../Assets/  Userprofile_And_Fonts/producer_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.8),
//                   left: responsiveWidth(3)
//                 }}>
//                   {professionName}
//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>

//               <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1), }}>

//                 <ImageBackground style={{ width: "270%", height: "119%", right: 9, marginTop: responsiveHeight(-1) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                   <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")}
//                     style={{ width: responsiveWidth(6.5), height: responsiveHeight(4), }} />
//                 </ImageBackground>
//               </View>

//               <Text style={{
//                 fontSize: responsiveFontSize(2),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(0.7),
//                 left: responsiveWidth(12)
//               }}>
//                 105 Films
//               </Text>
//             </View>
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/Cash_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(12)
//                 }}>
//                   Rs.1.75Cr/Day

//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ///////////////////////////////////////////////*/}
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/Net_worth_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(12)
//                 }}>
//                   Rs.6281 Cr
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require(".../../../components/Assets/AllSearch_Icon_And_Fonts/country/Filmhook-maharashtra-PhotoRoom.png")}
//                   style={{
//                     width: responsiveWidth(7.8), height: responsiveHeight(4),
//                     marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1),
//                     backgroundColor: '#B1B4C7',
//                     borderRadius: responsiveWidth(4)
//                   }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(13)
//                 }}>
//                   BOLLYWOOD
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("..../../../components/Assets/AllSearch_Icon_And_Fonts/country/FH_TN.png")}
//                   style={{
//                     width: responsiveWidth(7.8), height: responsiveHeight(4),
//                     marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1),
//                     backgroundColor: '#B1B4C7',
//                     borderRadius: responsiveWidth(4)
//                   }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.6),
//                   left: responsiveWidth(11)
//                 }}>
//                   {industriesName}
//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ///////////////////////////////////////////////*/}
//           </View>
//         </View>
//       )}
//       {/* ////////////////////////////////////////////*/}
//       {/* <View  style={style.hr_tag}/> */}
//       {expanded && (
//         <View>
//           <Profession_project />
//         </View>
//       )}

//       <View style={{ width: responsiveWidth(100), borderWidth: responsiveWidth(0.1), marginBottom: responsiveHeight(1) }} />

//       <View style={style.container}>
//         {expanded && (
//           <View style={{ flex: 0.8 }}>
//             <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), marginLeft: 10, justifyContent: 'center', alignItems: 'center', }}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/AllSearch_Icon_And_Fonts/Update/FH_tv_drama.png")} style={{ width: responsiveHeight(8.5), height: responsiveHeight(10), right: -28, top: 4 }} />
//               </ImageBackground>
//             </View>
//           </View>
//         )}

//         {expanded && (

//           <View style={style.bio_content}>
//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3.7),
//                   left: responsiveWidth(12)
//                 }}>
//                   Actor
//                 </Text>
//               </ImageBackground>
//             </View>
//             <View style={style.bio_content_section_Hero}>
//               {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={{ width: "90%", height: "88%", top: 1, right: -5 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.7),
//                   left: responsiveWidth(3),

//                   //  width:responsiveWidth(15)
//                 }}>
//                   Music

//                 </Text>
//               </ImageBackground>

//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(1.5),
//                 left: responsiveWidth(4),

//               }}>
//                 1998 - present
//               </Text>
//             </View>

//             {/* ///////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>
//               <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Image source={require("../../../Assets/Userprofile_And_Fonts/producer_icon.png")}
//                   style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(-3),
//                   left: responsiveWidth(12),

//                 }}>
//                   Producer
//                 </Text>
//               </ImageBackground>
//               <Text style={{
//                 fontSize: responsiveFontSize(1.55),
//                 color: '#000000',
//                 fontWeight: '500',
//                 fontFamily: "Times New Roman",
//                 top: responsiveHeight(8),
//                 left: responsiveWidth(-25),
//               }}>
//                 2013 - 2023
//               </Text>
//             </View>
//             <View style={style.bio_content_section_Producer}>
//               {/* <Image source={require("../../../Assets/  Userprofile_And_Fonts/producer_icon.png")} 
//                style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
//               <ImageBackground style={{ width: "93%", height: "88%", top: 1, right: -5 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.6),
//                   left: responsiveWidth(3),
//                   // borderWidth:1
//                 }}>
//                   Producer
//                 </Text>
//               </ImageBackground>
//             </View>
//             {/* ////////////////////////////////////////////*/}
//             <View style={style.bio_content_section}>

//               <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1), }}>
//                 <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")}
//                   style={{ width: responsiveWidth(6.5), height: responsiveHeight(4), }} />
//               </View>
//               <ImageBackground style={{ width: "100%", height: "100%", right: 34 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                 <Text style={{
//                   fontSize: responsiveFontSize(2),
//                   color: '#000000',
//                   fontWeight: '500',
//                   fontFamily: "Times New Roman",
//                   top: responsiveHeight(0.7),
//                   left: responsiveWidth(12)
//                 }}>
//                   105 Films
//                 </Text>
//               </ImageBackground>
//             </View>

//             {/* ///////////////////////////////////////////////*/}

//             {/* ///////////////////////////////////////////////*/}
//           </View>
//         )}
//       </View>
//       {expanded && (
//         <Profession_project />
//       )}
//       {/* <View style={style.hr_tag} /> */}

//       {/* <Profession_tv_drama_project /> */}

//     </>
//   )
// }

// const style = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     // marginTop:20,
//   },
//   bio_title: {
//     flex: responsiveWidth(0.2),
//     width: '100%',
//     flexDirection: 'row',
//     columnGap: responsiveWidth(20),
//     marginTop: responsiveHeight(1),
//     marginBottom: responsiveHeight(2)

//   },

//   downArrow: {
//     width: 20,
//     height: 20,
//     marginRight: responsiveWidth(2),
//     // Add styles for your down arrow icon
//   },
//   bio_title_text: {
//     fontWeight: "bold",
//     fontSize: responsiveFontSize(2.2),
//     color: "black",
//     marginLeft: responsiveWidth(2),
//     fontFamily: 'Cochin',
//     // textDecorationLine: "underline",
//     //  borderWidth:1,
//     width: responsiveWidth(70)

//   },
//   bio_content: {
//     flex: 1,
//   },
//   inputContainer: {


//     width: '101%',
//     height: '100%',
//   },

//   bio_content_section: {
//     flexDirection: "row",
//     width: responsiveWidth(52),
//     height: responsiveHeight(5.5),
//     // borderWidth: responsiveWidth(0.3),
//     borderRadius: responsiveWidth(2),
//     marginBottom: responsiveHeight(1),
//   },
//   hr_tag: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#D7D7D7',
//     marginVertical: 5,
//   },
//   bio_content_section_Hero: {
//     flexDirection: "row",
//     width: responsiveWidth(25),
//     height: responsiveHeight(5.5),
//     // borderWidth: responsiveWidth(0.3),
//     borderRadius: responsiveWidth(2),
//     marginBottom: responsiveHeight(1.5),
//   },
//   bio_content_section_Producer: {
//     flexDirection: "row",
//     width: responsiveWidth(25),
//     height: responsiveHeight(5.5),
//     // borderWidth: responsiveWidth(0.3),
//     borderRadius: responsiveWidth(2),
//     marginBottom: responsiveHeight(1.5),
//   },
// })

//===================================================
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Profession_project from './Projects'
import Profession_tv_drama_project from './Tv_Drama_Projects'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import privateAPI from '../../../api/privateAPI'
import { ScrollView } from "react-native";


export default function Profession() {
  const [platformData, setPlatformData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  // const toggleExpanded = () => {
  //   setExpanded(!expanded);
  //   if (!expanded) {
  //     setLoading(true)// Set loading to true when expanding
  //     fetchData(); // Fetch data when expanding
  //   }
  // };

  useEffect(() => {
   
      fetchData(); // Fetch data initially when component mounts if expanded
    
  }, []);

  const fetchData = async () => {
    try {
      const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=248`);
      const response = resp.data;

      // Group platforms by name and aggregate their industries, professions, and sub-professions
      const groupedPlatforms = response.reduce((accumulator, currentItem) => {
        currentItem.platformDetails.forEach(platform => {
          const platformName = platform.platformName;
          const industries = currentItem.industriesName;
          const professions = platform.professionDetails.map(profession => ({
            professionName: profession.professionName,
            subProfessions: profession.subProfessionName || [] // Include sub-professions or an empty array
          }));

          if (!accumulator[platformName]) {
            accumulator[platformName] = {
              platformName: platformName,
              industries: [],
              professions: []
            };
          }

          // Add industries and professions to the grouped platform
          accumulator[platformName].industries.push(industries);
          accumulator[platformName].professions.push(...professions);
        });

        return accumulator;
      }, {});

      // Convert grouped platforms object to array
      const aggregatedPlatforms = Object.values(groupedPlatforms);

      // Update state with fetched data
      setPlatformData(aggregatedPlatforms);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false); // Set loading to false if an error occurs
    }
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
     
     
        <ScrollView style={{width:responsiveWidth(100),}}> 
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            platformData.map((platform, index) => (
              <View key={index} style={styles.platformContainer}>
                <View style={{
                  flexDirection: 'row', columnGap: responsiveWidth(7),
                  borderWidth:2, borderColor:'green', width:responsiveWidth(100),padding:responsiveWidth(1)
                }}>
                  <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', borderWidth:1 }}>
                    <ImageBackground style={{
                      width: '102%',
                      height: '102%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                      <Text style={[styles.platformName, styles.border]}>{platform.platformName}</Text>
                    </ImageBackground>
                  </View>
                  <View style={{  width: responsiveWidth(54) ,borderWidth:2}}>
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
                  </View>
                </View>
                <View style={styles.bottomLine}></View>
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
   borderWidth:1,
   borderColor:'red',
   
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
   
    alignItems:'center'
    
    
  },
  bottomLine: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    marginBottom:responsiveHeight(1)
  },
  platformName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  industriesContainer: {
    marginLeft: responsiveWidth(2),
    marginBottom: 5,
  
  },
  industry: {
    fontWeight: 'bold',
  },
  professionsContainer: {
    marginLeft: responsiveWidth(2),
  },
  professionContainer: {
    marginBottom: 5,
  },
  profession: {
    fontWeight: 'bold',
  },
  subProfession: {
   // marginLeft: 10,
  },
  border: {
   
    borderColor: 'black',
    // padding: 5,
   // marginVertical: 5,
  },
});
