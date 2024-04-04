// // import React, { useState } from "react";
// // import { View, Text, ScrollView } from "react-native";
// // import DropDownPicker from "react-native-dropdown-picker";
// // import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

// // export default function IndustryTwo({ route }) {
// //     const { selectedIndustries } = route.params;
// //     const [selectedPlatforms, setSelectedPlatforms] = useState({});
// //     const [selectedProfessions, setSelectedProfessions] = useState({});
// //     const [selectedSubProfessions, setSelectedSubProfessions] = useState({});

// //     const handlePlatformSelection = (industry, items) => {
// //         setSelectedPlatforms(prevState => ({
// //             ...prevState,
// //             [industry.value]: items
// //         }));
// //     };

// //     const [isOpenProfSub, setIsOpenProfSub] = useState(false);
// //     const [isOpenPlatform, setIsOpenPlatform] = useState(false);
// //     const [isOpenProf, setIsOpenProf] = useState(false);

// //     const handleProfessionSelection = (industry, items) => {
// //         setSelectedProfessions(prevState => ({
// //             ...prevState,
// //             [industry.value]: items
// //         }));
// //     };

// //     const handleSubProfessionSelection = (industry, items) => {
// //         setSelectedSubProfessions(prevState => ({
// //             ...prevState,
// //             [industry.value]: items
// //         }));
// //     };

// //     return (
// //         <ScrollView>
// //             {selectedIndustries.map((industry, index) => (
// //                 <View key={index}>
// //                     <Text style={{ color: 'red' }}>{industry}</Text>
// //                     {/* <DropDownPicker
// //                         items={[
// //                             { label: 'Option 1', value: 'option1' },
// //                             { label: 'Option 2', value: 'option2' },
// //                             // Add more options as needed
// //                         ]}
// //                         multiple={true}
// //                         placeholder="Choose your Platforms"
// //                         onChangeItem={items => handlePlatformSelection(industry, items)}
// //                         open={selectedPlatforms[industry.value] !== undefined}
// //                         value={selectedPlatforms[industry.value]}
// //                         setOpen={() => { }}
// //                         setValue={() => { }}
// //                     /> */}
// //                     <View style={{ margin: 40 }}>
// //                         <DropDownPicker items={[
// //                             { label: 'Option 1', value: 'option1' },
// //                             { label: 'Option 2', value: 'option2' },
// //                             // Add more options as needed
// //                         ]} open={isOpenPlatform} setOpen={() => setIsOpenPlatform(!isOpenPlatform)} value={selectedPlatforms}
// //                             setValue={(val) => setSelectedPlatforms(val)}
// //                             maxHeight={responsiveHeight(20)}
// //                             // autoScroll
// //                             placeholder="List is your platform"
// //                             placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
// //                             showTickIcon={true}
// //                             showArrowIcon={true}
// //                             onChangeItem={items => handlePlatformSelection(industry, items)}
// //                             dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginBottom: responsiveHeight(3) }}
// //                             dropDownDirection="TOP"
// //                             searchable={true}
// //                             searchPlaceholderTextColor="search"
// //                             theme="LIGHT"
// //                             multiple={true}
// //                             mode="BADGE"
// //                             badgeColors={['#00d4ff']}
// //                             badgeDotColors={['green', 'red', 'blue', 'yellow']}
// //                             badgeTextStyle={'black'}
// //                             style={{
// //                                 marginTop: responsiveHeight(2),
// //                                 marginBottom: responsiveHeight(3),
// //                                 borderWidth: responsiveWidth(0.5),
// //                                 paddingHorizontal: responsiveWidth(2),
// //                                 borderRadius: responsiveWidth(2),
// //                                 height: responsiveHeight(8),
// //                                 width: responsiveWidth(86),
// //                                 //left: responsiveWidth(3),


// //                                 zIndex: 2
// //                             }}

// //                         />
// //                     </View>

// //                     {/* <DropDownPicker
// //                         items={[
// //                             { label: 'Option A', value: 'optionA' },
// //                             { label: 'Option B', value: 'optionB' },
// //                             // Add more options as needed
// //                         ]}
// //                         multiple={true}
// //                         placeholder="What is your Profession?"
// //                         onChangeItem={items => handleProfessionSelection(industry, items)}
// //                         open={selectedProfessions[industry.value] !== undefined}
// //                         value={selectedProfessions[industry.value]}
// //                         setOpen={() => { }}
// //                         setValue={() => { }}
// //                     /> */}
// //                     <View style={{}}>
// //                         <DropDownPicker items={[
// //                             { label: 'Option A', value: 'optionA' },
// //                             { label: 'Option B', value: 'optionB' },
// //                             // Add more options as needed
// //                         ]} open={isOpenProf} setOpen={() => setIsOpenProf(!isOpenProf)} value={selectedProfessions}
// //                             setValue={(val) => setSelectedProfessions(val)}
// //                             maxHeight={responsiveHeight(20)}
// //                             // autoScroll
// //                             placeholder="List is your Profession"
// //                             placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
// //                             showTickIcon={true}
// //                             showArrowIcon={true}
// //                             onChangeItem={items => handleProfessionSelection(industry, items)}
// //                             dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginBottom: responsiveHeight(3) }}
// //                             dropDownDirection="TOP"
// //                             searchable={true}
// //                             searchPlaceholderTextColor="search"
// //                             theme="LIGHT"
// //                             multiple={true}
// //                             mode="BADGE"
// //                             badgeColors={['#00d4ff']}
// //                             badgeDotColors={['green', 'red', 'blue', 'yellow']}
// //                             badgeTextStyle={'black'}
// //                             style={{
// //                                 marginTop: responsiveHeight(2),
// //                                 marginBottom: responsiveHeight(3),
// //                                 borderWidth: responsiveWidth(0.5),
// //                                 paddingHorizontal: responsiveWidth(2),
// //                                 borderRadius: responsiveWidth(2),
// //                                 height: responsiveHeight(8),
// //                                 width: responsiveWidth(86),
// //                                 //left: responsiveWidth(3),


// //                                 zIndex: 2
// //                             }}

// //                         />
// //                     </View>
// //                     {/* <DropDownPicker
// //                         items={[
// //                             { label: 'Sub Option X', value: 'subOptionX' },
// //                             { label: 'Sub Option Y', value: 'subOptionY' },
// //                             // Add more options as needed
// //                         ]}
// //                         multiple={true}
// //                         placeholder="List is your Sub Profession"
// //                         onChangeItem={items => handleSubProfessionSelection(industry, items)}
// //                         open={selectedSubProfessions[industry.value] !== undefined}
// //                         value={selectedSubProfessions[industry.value]}
// //                         setOpen={() => { }}
// //                         setValue={() => { }}
// //                     /> */}
// //                     <View style={{}}>
// //                         <DropDownPicker items={[
// //                             { label: 'Sub Option X', value: 'subOptionX' },
// //                             { label: 'Sub Option Y', value: 'subOptionY' },
// //                             // Add more options as needed
// //                         ]} open={isOpenProfSub} setOpen={() => setIsOpenProfSub(!isOpenProfSub)} value={selectedSubProfessions}
// //                             setValue={(val) => setSelectedSubProfessions(val)}
// //                             maxHeight={responsiveHeight(20)}
// //                             // autoScroll
// //                             placeholder="List is your Sub Profession"
// //                             placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
// //                             showTickIcon={true}
// //                             showArrowIcon={true}
// //                             dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginBottom: responsiveHeight(3) }}
// //                             dropDownDirection="TOP"
// //                             searchable={true}
// //                             searchPlaceholderTextColor="search"
// //                             theme="LIGHT"
// //                             onChangeItem={items => handleSubProfessionSelection(industry, items)}
// //                             multiple={true}
// //                             mode="BADGE"
// //                             badgeColors={['#00d4ff']}
// //                             badgeDotColors={['green', 'red', 'blue', 'yellow']}
// //                             badgeTextStyle={'black'}
// //                             style={{
// //                                 marginTop: responsiveHeight(2),
// //                                 marginBottom: responsiveHeight(3),
// //                                 borderWidth: responsiveWidth(0.5),
// //                                 paddingHorizontal: responsiveWidth(2),
// //                                 borderRadius: responsiveWidth(2),
// //                                 height: responsiveHeight(8),
// //                                 width: responsiveWidth(86),
// //                                 //left: responsiveWidth(3),


// //                                 zIndex: 2
// //                             }}

// //                         />
// //                     </View>
// //                 </View>
// //             ))}
// //         </ScrollView>
// //     );
// // }
// import React, { useState } from "react";
// import { View, Text, ScrollView } from "react-native";
// import CheckBox from "@react-native-community/checkbox";

// export default function IndustryTwo({ route }) {
//   const { selectedIndustries } = route.params;
//   const [selectedPlatforms, setSelectedPlatforms] = useState({});
//   const [selectedProfessions, setSelectedProfessions] = useState({});
//   const [selectedSubProfessions, setSelectedSubProfessions] = useState({});

//   const handlePlatformSelection = (industry, value) => {
//     setSelectedPlatforms(prevState => ({
//       ...prevState,
//       [industry.value]: value
//     }));
//   };

//   const handleProfessionSelection = (industry, value) => {
//     setSelectedProfessions(prevState => ({
//       ...prevState,
//       [industry.value]: value
//     }));
//   };

//   const handleSubProfessionSelection = (industry, value) => {
//     setSelectedSubProfessions(prevState => ({
//       ...prevState,
//       [industry.value]: value
//     }));
//   };

//   return (
//     <ScrollView>
//       {selectedIndustries.map((industry, index) => (
//         <View key={index}>
//           <Text>{industry.label}</Text>

//           {/* Platform Selection */}
//           <Text>Platforms:</Text>
//           {["Platform 1", "Platform 2", "Platform 3"].map((platform, platformIndex) => (
//             <View key={platformIndex}>
//               <CheckBox
//                 value={selectedPlatforms[industry.value] && selectedPlatforms[industry.value].includes(platform)}
//                 onValueChange={(newValue) => {
//                   const selectedValues = selectedPlatforms[industry.value] || [];
//                   if (newValue) {
//                     handlePlatformSelection(industry, [...selectedValues, platform]);
//                   } else {
//                     handlePlatformSelection(industry, selectedValues.filter(value => value !== platform));
//                   }
//                 }}
//               />
//               <Text>{platform}</Text>
//             </View>
//           ))}

//           {/* Profession Selection */}
//           <Text>Professions:</Text>
//           {["Profession A", "Profession B", "Profession C"].map((profession, professionIndex) => (
//             <View key={professionIndex}>
//               <CheckBox
//                 value={selectedProfessions[industry.value] && selectedProfessions[industry.value].includes(profession)}
//                 onValueChange={(newValue) => {
//                   const selectedValues = selectedProfessions[industry.value] || [];
//                   if (newValue) {
//                     handleProfessionSelection(industry, [...selectedValues, profession]);
//                   } else {
//                     handleProfessionSelection(industry, selectedValues.filter(value => value !== profession));
//                   }
//                 }}
//               />
//               <Text>{profession}</Text>
//             </View>
//           ))}

//           {/* Sub-Profession Selection */}
//           <Text>Sub-Professions:</Text>
//           {["Sub-Profession X", "Sub-Profession Y", "Sub-Profession Z"].map((subProfession, subProfessionIndex) => (
//             <View key={subProfessionIndex}>
//               <CheckBox
//                 value={selectedSubProfessions[industry.value] && selectedSubProfessions[industry.value].includes(subProfession)}
//                 onValueChange={(newValue) => {
//                   const selectedValues = selectedSubProfessions[industry.value] || [];
//                   if (newValue) {
//                     handleSubProfessionSelection(industry, [...selectedValues, subProfession]);
//                   } else {
//                     handleSubProfessionSelection(industry, selectedValues.filter(value => value !== subProfession));
//                   }
//                 }}
//               />
//               <Text>{subProfession}</Text>
//             </View>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// import { ImageBackground, StyleSheet, TextInput } from 'react-native';
// import { useNavigation, useRoute } from "@react-navigation/native";
// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Checkbox } from 'react-native-paper';

// const Industry_S_Confirm = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const [isChecked, setIsChecked] = useState(false);
// const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);

// const handleCheckboxChange = (index) => {
//     setSelectedCheckboxIndex(index);
// };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <View style={styles.searchBox}>
//                 <ImageBackground
//                     style={styles.inputContainernew}
//                     source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                     resizeMode="stretch"
//                 >
//                     <TextInput
//                         placeholder='Search Your Industries...'
//                         style={styles.input}
//                     />
//                 </ImageBackground>
//                 <Checkbox
//                     status={isChecked ? 'checked' : 'unchecked'}
//                     onPress={() => setIsChecked(!isChecked)}
//                 />
//             </View>

//             {isChecked && (
//                 <View style={styles.searchBox}>
//                     <ImageBackground
//                         style={styles.inputContainernew}
//                         source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                         resizeMode="stretch"
//                     >
//                         <TextInput
//                             placeholder='Second Search Your Industries...'
//                             style={styles.input}
//                         />
//                     </ImageBackground>
//                     <Checkbox
//                         status={isChecked ? 'checked' : 'unchecked'}
//                         onPress={() => setIsChecked(!isChecked)}
//                     />
//                 </View>
//             )}

//             <View style={{ flexDirection: 'row' }}>
//                 <View style={styles.checkboxContainer}>
//                     <Checkbox
//                         status={selectedCheckboxIndex === 0 ? 'checked' : 'unchecked'}
//                         onPress={() => handleCheckboxChange(0)}
//                     />
//                     <Text>Indoor Location</Text>
//                 </View>
//                 <View style={styles.checkboxContainer}>
//                     <Checkbox
//                         status={selectedCheckboxIndex === 1 ? 'checked' : 'unchecked'}
//                         onPress={() => handleCheckboxChange(1)}
//                     />
//                     <Text>Outdoor Location</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default Industry_S_Confirm;

// const styles = StyleSheet.create({
//     searchBox: {
//         width: '100%',
//         marginBottom: 10,
//         padding: 5,
//         position: 'relative',
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     inputContainernew: {
//         flex: 1,
//         height: responsiveHeight(8),
//         marginRight: 10,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//     },
//     input: {
//         flex: 1,
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 20,
//     },
// });

// import { ImageBackground, StyleSheet, TextInput } from 'react-native'
// import { useNavigation, useRoute } from "@react-navigation/native";
// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Checkbox } from 'react-native-paper';

// const Industry_S_Confirm = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const [isChecked, setIsChecked] = useState(false);
//     const [isChecked1, setIsChecked1] = useState(false);
//     const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState('');

//     const handleCheckboxChange = (index) => {
//         setSelectedCheckboxIndex(index);
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <View style={styles.searchBox}>
//                 <ImageBackground
//                     style={styles.inputContainernew}
//                     source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                     resizeMode="stretch"
//                 >
//                     <Text style={styles.input}>Search Your Industries...</Text>
//                     <TouchableOpacity
//                         style={{
//                             width: 20,
//                             height: 20,
//                             borderRadius: 10,
//                             borderWidth: 1,
//                             borderColor: 'black',
//                             bottom: responsiveHeight(2.5),
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             left: responsiveWidth(2)
//                         }}
//                         onPress={() => setIsChecked(!isChecked)}
//                     >
//                         {isChecked && (
//                             <View
//                                 style={{
//                                     width: 10,
//                                     height: 10,
//                                     borderRadius: 5,
//                                     backgroundColor: 'black',
//                                 }}
//                             />
//                         )}
//                     </TouchableOpacity>
//                 </ImageBackground>
//             </View>

//             {isChecked && (
//                 <View style={styles.searchBox}>
//                     <ImageBackground
//                         style={styles.inputContainernew}
//                         source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                         resizeMode="stretch"
//                     >
//                         <Text style={styles.input}>Search Your Platform ...</Text>
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
//                             onPress={() => setIsChecked1(!isChecked1)}
//                         >
//                             {isChecked1 && (
//                                 <View
//                                     style={{
//                                         width: 10,
//                                         height: 10,
//                                         borderRadius: 5,
//                                         backgroundColor: 'black',
//                                     }}
//                                 />
//                             )}
//                         </TouchableOpacity>
//                     </ImageBackground>
//                 </View>
//             )}
//             {isChecked1 && (
//                 <View style={{ flexDirection: 'column' }}>
//                     <View style={styles.checkboxContainer}>
//                         <Checkbox
//                             status={selectedCheckboxIndex === 'indoor' ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('indoor')}
//                         />
//                         <Text>ACTOR</Text>
//                     </View>
//                     <View style={styles.checkboxContainer2}>
//                         <Checkbox
//                             status={selectedCheckboxIndex === 'outdoor' ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('outdoor')}
//                         />
//                         <Text>CASTING DIRECTOR</Text>
//                         <Checkbox
//                             status={selectedCheckboxIndex === 'indoor' ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('indoor')}
//                         />
//                         <Text> WRITTER</Text>
//                     </View>
//                     <View style={styles.checkboxContainer2}>
//                         <Checkbox
//                             status={selectedCheckboxIndex === 'outdoor' ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('outdoor')}
//                         />
//                         <Text>ANIMATOR</Text>
//                     </View>
//                 </View>
//             )}
//         </View>
//     );
// };

// export default Industry_S_Confirm;

// const styles = StyleSheet.create({
//     searchBox: {
//         width: '100%',
//         marginBottom: 10,
//         padding: 5,
//         position: 'relative',
//     },

//     inputContainernew:{
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
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     checkboxContainer2: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: 20,
//     },
// });

//this working code
// import { ImageBackground, StyleSheet, TextInput } from 'react-native'
// import { useNavigation, useRoute } from "@react-navigation/native";
// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Checkbox } from 'react-native-paper';

// const Industry_S_Confirm = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const [isChecked, setIsChecked] = useState(false);
//     const [isChecked1, setIsChecked1] = useState(false);
//     const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

//     const handleCheckboxChange = (index) => {
//         if (selectedCheckboxes.includes(index)) {
//             setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== index));
//         } else {
//             setSelectedCheckboxes([...selectedCheckboxes, index]);
//         }
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <View style={styles.searchBox}>
//                 <ImageBackground
//                     style={styles.inputContainernew}
//                     source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                     resizeMode="stretch"
//                 >
//                     <Text style={styles.input}>TOLLYWOOD</Text>
//                     <TouchableOpacity
//                         style={{
//                             width: 20,
//                             height: 20,
//                             borderRadius: 10,
//                             borderWidth: 1,
//                             borderColor: 'black',
//                             bottom: responsiveHeight(2.5),
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             left: responsiveWidth(2)
//                         }}
//                         onPress={() => setIsChecked(!isChecked)}
//                     >
//                         {isChecked && (
//                             <View
//                                 style={{
//                                     width: 10,
//                                     height: 10,
//                                     borderRadius: 5,
//                                     backgroundColor: 'black',
//                                 }}
//                             />
//                         )}
//                     </TouchableOpacity>
//                 </ImageBackground>
//             </View>

//             {isChecked && (
//                 <View style={styles.searchBox}>
//                     <ImageBackground
//                         style={styles.inputContainernew}
//                         source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                         resizeMode="stretch"
//                     >
//                         <Text style={styles.input}>MOVIES</Text>
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
//                             onPress={() => setIsChecked1(!isChecked1)}
//                         >
//                             {isChecked1 && (
//                                 <View
//                                     style={{
//                                         width: 10,
//                                         height: 10,
//                                         borderRadius: 5,
//                                         backgroundColor: 'black',
//                                     }}
//                                 />
//                             )}
//                         </TouchableOpacity>
//                     </ImageBackground>
//                 </View>
//             )}

//             {isChecked1 && (
//                 <View style={{flexDirection:"row",flexWrap:'wrap'}}>
//                     <View style={styles.checkboxContainer}>
//                         <Checkbox
//                             status={selectedCheckboxes.includes('PRODUCER') ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('PRODUCER')}
//                         />
//                         <Text>PRODUCER</Text>
//                     </View>
//                     <View style={styles.checkboxContainer}>
//                         <Checkbox
//                             status={selectedCheckboxes.includes('DIRECTOR') ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('DIRECTOR')}
//                         />
//                         <Text>DIRECTOR</Text>
//                     </View>
//                     <View style={styles.checkboxContainer}>
//                         <Checkbox
//                             status={selectedCheckboxes.includes('CAMERAMAN') ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('CAMERAMAN')}
//                         />
//                         <Text>CAMERAMAN</Text>
//                     </View>
//                     <View style={styles.checkboxContainer}>
//                         <Checkbox
//                             status={selectedCheckboxes.includes('ACTOR') ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('ACTOR')}
//                         />
//                         <Text>ACTOR</Text>
//                     </View>
//                     <View style={styles.checkboxContainer}>
//                         <Checkbox
//                             status={selectedCheckboxes.includes('COACTOR') ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('COACTOR')}
//                         />
//                         <Text>COACTOR</Text>
//                     </View>
//                     <View style={styles.checkboxContainer}>
//                         <Checkbox
//                             status={selectedCheckboxes.includes('ASSISTANT-DIRECTOR') ? 'checked' : 'unchecked'}
//                             onPress={() => handleCheckboxChange('ASSISTANT-DIRECTOR')}
//                         />
//                         <Text>ASSISTANT-DIRECTOR</Text>
//                     </View>
//                 </View>
//             )}

// <View style={styles.searchBox}>
//                 <ImageBackground
//                     style={styles.inputContainernew}
//                     source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                     resizeMode="stretch"
//                 >
//                     <Text style={styles.input}>BHOJIWOOD</Text>
//                     <TouchableOpacity
//                         style={{
//                             width: 20,
//                             height: 20,
//                             borderRadius: 10,
//                             borderWidth: 1,
//                             borderColor: 'black',
//                             bottom: responsiveHeight(2.5),
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             left: responsiveWidth(2)
//                         }}
//                         onPress={() => setIsChecked(!isChecked)}
//                     >
//                         {isChecked && (
//                             <View
//                                 style={{
//                                     width: 10,
//                                     height: 10,
//                                     borderRadius: 5,
//                                     backgroundColor: 'black',
//                                 }}
//                             />
//                         )}
//                     </TouchableOpacity>
//                 </ImageBackground>
//             </View>

//             {isChecked && (
//                 <View style={styles.searchBox}>
//                     <ImageBackground
//                         style={styles.inputContainernew}
//                         source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
//                         resizeMode="stretch"
//                     >
//                         <Text style={styles.input}>MOVIES</Text>
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
//                             onPress={() => setIsChecked1(!isChecked1)}
//                         >
//                             {isChecked1 && (
//                                 <View
//                                     style={{
//                                         width: 10,
//                                         height: 10,
//                                         borderRadius: 5,
//                                         backgroundColor: 'black',
//                                     }}
//                                 />
//                             )}
//                         </TouchableOpacity>
//                     </ImageBackground>
//                 </View>
//             )}

//             {isChecked1 && (
//                 <View style={{flexDirection:"row",flexWrap:'wrap'}}>
// <View style={styles.checkboxContainer}>
//     <Checkbox
//         status={selectedCheckboxes.includes('PRODUCER') ? 'checked' : 'unchecked'}
//         onPress={() => handleCheckboxChange('PRODUCER')}
//     />
//     <Text>PRODUCER</Text>
// </View>
// <View style={styles.checkboxContainer}>
//     <Checkbox
//         status={selectedCheckboxes.includes('DIRECTOR') ? 'checked' : 'unchecked'}
//         onPress={() => handleCheckboxChange('DIRECTOR')}
//     />
//     <Text>DIRECTOR</Text>
// </View>
// <View style={styles.checkboxContainer}>
//     <Checkbox
//         status={selectedCheckboxes.includes('CAMERAMAN') ? 'checked' : 'unchecked'}
//         onPress={() => handleCheckboxChange('CAMERAMAN')}
//     />
//     <Text>CAMERAMAN</Text>
// </View>
// <View style={styles.checkboxContainer}>
//     <Checkbox
//         status={selectedCheckboxes.includes('ACTOR') ? 'checked' : 'unchecked'}
//         onPress={() => handleCheckboxChange('ACTOR')}
//     />
//     <Text>ACTOR</Text>
// </View>
// <View style={styles.checkboxContainer}>
//     <Checkbox
//         status={selectedCheckboxes.includes('COACTOR') ? 'checked' : 'unchecked'}
//         onPress={() => handleCheckboxChange('COACTOR')}
//     />
//     <Text>COACTOR</Text>
// </View>
// <View style={styles.checkboxContainer}>
//     <Checkbox
//         status={selectedCheckboxes.includes('ASSISTANT-DIRECTOR') ? 'checked' : 'unchecked'}
//         onPress={() => handleCheckboxChange('ASSISTANT-DIRECTOR')}
//     />
//     <Text>ASSISTANT-DIRECTOR</Text>
// </View>
//                 </View>
//             )}
//         </View>
//     );
// };

// export default Industry_S_Confirm;

// const styles = StyleSheet.create({
//     searchBox: {
//         width: '100%',
//         marginBottom: 10,
//         padding: 5,
//         position: 'relative',
//     },

//     inputContainernew:{
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
//         borderWidth:responsiveWidth(0.5),
//         width: responsiveWidth(44),
//     },
// });


import { ImageBackground, StyleSheet, TextInput } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Checkbox } from 'react-native-paper';

const Industry_S_Confirm = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const { checked } = route.params;
  const [isCheckedTollywood, setIsCheckedTollywood] = useState(false);
  const [isCheckedMovies, setIsCheckedMovies] = useState(false);
  const [isCheckedBhojiwood, setIsCheckedBhojiwood] = useState(false);
  const [isCheckedWebSeries, setIsCheckedWebSeries] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedCheckboxessecond, setSelectedCheckboxessecond] = useState([]);
  const [selectedCheckboxesTV, setSelectedCheckboxesTV] = useState([]);
  const [isCheckedMoviesTV, setIsCheckedMoviesTV] = useState(false);
  const [isCheckedCHHOLLYWOOD, setIsCheckedCHHOLLYWOOD] = useState(false);
  const [isCheckedDOCUMENTARIES, setIsCheckedDOCUMENTARIES] = useState(false);
  const [selectedCheckboxesDocument, setSelectedCheckboxesDocument] = useState([]);
  const [isCheckedMOLLYWOOD, setIsCheckedMOLLYWOOD] = useState(false);
  const [isCheckedMOLLYWOODSub, setIsCheckedMOLLYWOODSub] = useState(false);
  const [selectedCheckboxesMOLLYWOOD, setSelectedCheckboxesMOLLYWOOD] = useState([]);

  const handleCheckboxChange = (index) => {
    if (selectedCheckboxes.includes(index)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== index));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, index]);
    }
  };

  const handleCheckboxChangesecond = (index) => {
    if (selectedCheckboxessecond.includes(index)) {
      setSelectedCheckboxessecond(selectedCheckboxessecond.filter((item) => item !== index));
    } else {
      setSelectedCheckboxessecond([...selectedCheckboxessecond, index]);
    }
  };

  const handleCheckboxChangeTV = (index) => {
    if (selectedCheckboxesTV.includes(index)) {
      setSelectedCheckboxesTV(selectedCheckboxesTV.filter((item) => item !== index));
    } else {
      setSelectedCheckboxesTV([...selectedCheckboxesTV, index]);
    }
  };

  const handleCheckboxChangeDocument = (index) => {
    if (selectedCheckboxesDocument.includes(index)) {
      setSelectedCheckboxesDocument(selectedCheckboxesDocument.filter((item) => item !== index));
    } else {
      setSelectedCheckboxesDocument([...selectedCheckboxesDocument, index]);
    }
  };

  const handleCheckboxChangeMOLLYWOOD = (index) => {
    if (selectedCheckboxesMOLLYWOOD.includes(index)) {
      setSelectedCheckboxesMOLLYWOOD(selectedCheckboxesMOLLYWOOD.filter((item) => item !== index));
    } else {
      setSelectedCheckboxesMOLLYWOOD([...selectedCheckboxesMOLLYWOOD, index]);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(6) }}>

        <View style={{ height: responsiveHeight(14), width: responsiveWidth(89), marginBottom: responsiveHeight(2), flexDirection: 'row', position: 'relative', }}>

          <Image style={{
            height: responsiveHeight(15.2),
            width: responsiveWidth(30), alignSelf: 'center',
          }} source={require("../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

          <Image style={{ height: responsiveHeight(6.2), width: responsiveWidth(65), position: 'absolute', left: responsiveWidth(15), top: responsiveHeight(8) }} source={require('../../Assets/Login_page/Film_hook_name.png')} resizeMode="stretch" />
          <Text style={{ color: 'blue', fontWeight: 'bold', position: 'absolute', left: responsiveWidth(60), top: responsiveHeight(14) }}> Industry User</Text>


        </View>
        <View style={styles.searchBox}>
          <ImageBackground
            style={styles.inputContainernew}
            source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
            resizeMode="stretch"
          >
            <Text style={styles.input}>TOLLYWOOD</Text>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                bottom: responsiveHeight(2.5),
                justifyContent: 'center',
                alignItems: 'center',
                left: responsiveWidth(2)
              }}
              onPress={() => setIsCheckedTollywood(!isCheckedTollywood)}
            >
              {isCheckedTollywood && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black',
                  }}
                />
              )}
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {isCheckedTollywood && (
          <View style={styles.searchBox}>
            <ImageBackground
              style={styles.inputContainernew}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch"
            >
              <Text style={styles.input}>MOVIES</Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                  bottom: responsiveHeight(2.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: responsiveWidth(2)
                }}
                onPress={() => setIsCheckedMovies(!isCheckedMovies)}
              >
                {isCheckedMovies && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}


        {isCheckedMovies && (
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxes.includes('PRODUCER') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('PRODUCER')}
              />
              <Text>PRODUCER</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxes.includes('DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('DIRECTOR')}
              />
              <Text>DIRECTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxes.includes('CAMERAMAN') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('CAMERAMAN')}
              />
              <Text>CAMERAMAN</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxes.includes('ACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('ACTOR')}
              />
              <Text>ACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxes.includes('COACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('COACTOR')}
              />
              <Text>COACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxes.includes('ASSISTANT-DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('ASSISTANT-DIRECTOR')}
              />
              <Text>ASSISTANT-DIRECTOR</Text>
            </View>
          </View>
        )}
        {isCheckedTollywood && (
          <View style={styles.searchBox}>
            <ImageBackground
              style={styles.inputContainernew}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch"
            >
              <Text style={styles.input}>TV DRAMA SHOWS</Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                  bottom: responsiveHeight(2.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: responsiveWidth(2)
                }}
                onPress={() => setIsCheckedMoviesTV(!isCheckedMoviesTV)}
              >
                {isCheckedMoviesTV && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        {isCheckedMoviesTV && (
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesTV.includes('PRODUCER') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeTV('PRODUCER')}
              />
              <Text>PRODUCER</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesTV.includes('DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeTV('DIRECTOR')}
              />
              <Text>DIRECTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesTV.includes('CAMERAMAN') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeTV('CAMERAMAN')}
              />
              <Text>CAMERAMAN</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesTV.includes('ACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeTV('ACTOR')}
              />
              <Text>ACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesTV.includes('COACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeTV('COACTOR')}
              />
              <Text>COACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesTV.includes('ASSISTANT-DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeTV('ASSISTANT-DIRECTOR')}
              />
              <Text>ASSISTANT-DIRECTOR</Text>
            </View>
          </View>
        )}

        <View style={styles.searchBox}>
          <ImageBackground
            style={styles.inputContainernew}
            source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
            resizeMode="stretch"
          >
            <Text style={styles.input}>BHOJIWOOD</Text>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                bottom: responsiveHeight(2.5),
                justifyContent: 'center',
                alignItems: 'center',
                left: responsiveWidth(2)
              }}
              onPress={() => setIsCheckedBhojiwood(!isCheckedBhojiwood)}
            >
              {isCheckedBhojiwood && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black',
                  }}
                />
              )}
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {isCheckedBhojiwood && (
          <View style={styles.searchBox}>
            <ImageBackground
              style={styles.inputContainernew}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch"
            >
              <Text style={styles.input}>WEB SERIES</Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                  bottom: responsiveHeight(2.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: responsiveWidth(2)
                }}
                onPress={() => setIsCheckedWebSeries(!isCheckedWebSeries)}
              >
                {isCheckedWebSeries && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        {isCheckedWebSeries && (
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxessecond.includes('PRODUCER') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangesecond('PRODUCER')}
              />
              <Text>PRODUCER</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxessecond.includes('DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangesecond('DIRECTOR')}
              />
              <Text>DIRECTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxessecond.includes('CAMERAMAN') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangesecond('CAMERAMAN')}
              />
              <Text>CAMERAMAN</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxessecond.includes('ACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangesecond('ACTOR')}
              />
              <Text>ACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxessecond.includes('COACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangesecond('COACTOR')}
              />
              <Text>COACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxessecond.includes('ASSISTANT-DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangesecond('ASSISTANT-DIRECTOR')}
              />
              <Text>ASSISTANT-DIRECTOR</Text>
            </View>
          </View>
        )}

        <View style={styles.searchBox}>
          <ImageBackground
            style={styles.inputContainernew}
            source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
            resizeMode="stretch"
          >
            <Text style={styles.input}>CHHOLLYWOOD</Text>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                bottom: responsiveHeight(2.5),
                justifyContent: 'center',
                alignItems: 'center',
                left: responsiveWidth(2)
              }}
              onPress={() => setIsCheckedCHHOLLYWOOD(!isCheckedCHHOLLYWOOD)}
            >
              {isCheckedCHHOLLYWOOD && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black',
                  }}
                />
              )}
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {isCheckedCHHOLLYWOOD && (
          <View style={styles.searchBox}>
            <ImageBackground
              style={styles.inputContainernew}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch"
            >
              <Text style={styles.input}>DOCUMENTARIES</Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                  bottom: responsiveHeight(2.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: responsiveWidth(2)
                }}
                onPress={() => setIsCheckedDOCUMENTARIES(!isCheckedDOCUMENTARIES)}
              >
                {isCheckedDOCUMENTARIES && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        {isCheckedDOCUMENTARIES && (
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesDocument.includes('PRODUCER') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeDocument('PRODUCER')}
              />
              <Text>PRODUCER</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesDocument.includes('DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeDocument('DIRECTOR')}
              />
              <Text>DIRECTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesDocument.includes('CAMERAMAN') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeDocument('CAMERAMAN')}
              />
              <Text>CAMERAMAN</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesDocument.includes('ACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeDocument('ACTOR')}
              />
              <Text>ACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesDocument.includes('COACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeDocument('COACTOR')}
              />
              <Text>COACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesDocument.includes('ASSISTANT-DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeDocument('ASSISTANT-DIRECTOR')}
              />
              <Text>ASSISTANT-DIRECTOR</Text>
            </View>
          </View>
        )}

        <View style={styles.searchBox}>
          <ImageBackground
            style={styles.inputContainernew}
            source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
            resizeMode="stretch"
          >
            <Text style={styles.input}>MH-MOLLYWOOD</Text>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                bottom: responsiveHeight(2.5),
                justifyContent: 'center',
                alignItems: 'center',
                left: responsiveWidth(2)
              }}
              onPress={() => setIsCheckedMOLLYWOOD(!isCheckedMOLLYWOOD)}
            >
              {isCheckedMOLLYWOOD && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black',
                  }}
                />
              )}
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {isCheckedMOLLYWOOD && (
          <View style={styles.searchBox}>
            <ImageBackground
              style={styles.inputContainernew}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch"
            >
              <Text style={styles.input}>DOCUMENTARIES</Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                  bottom: responsiveHeight(2.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: responsiveWidth(2)
                }}
                onPress={() => setIsCheckedMOLLYWOODSub(!isCheckedMOLLYWOODSub)}
              >
                {isCheckedMOLLYWOODSub && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        {isCheckedMOLLYWOODSub && (
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesMOLLYWOOD.includes('PRODUCER') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeMOLLYWOOD('PRODUCER')}
              />
              <Text>PRODUCER</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesMOLLYWOOD.includes('DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeMOLLYWOOD('DIRECTOR')}
              />
              <Text>DIRECTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesMOLLYWOOD.includes('CAMERAMAN') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeMOLLYWOOD('CAMERAMAN')}
              />
              <Text>CAMERAMAN</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesMOLLYWOOD.includes('ACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeMOLLYWOOD('ACTOR')}
              />
              <Text>ACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesMOLLYWOOD.includes('COACTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeMOLLYWOOD('COACTOR')}
              />
              <Text>COACTOR</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCheckboxesMOLLYWOOD.includes('ASSISTANT-DIRECTOR') ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangeMOLLYWOOD('ASSISTANT-DIRECTOR')}
              />
              <Text>ASSISTANT-DIRECTOR</Text>
            </View>
          </View>
        )}

        <View style={{ flexDirection: 'row', columnGap: responsiveWidth(18), }}>
          <TouchableOpacity onPress={() => navigation.navigate('IndustryOne', { checked })} style={styles.backButton}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Confirm</Text>
          </TouchableOpacity>
        </View>
        {/* onPress={() => navigation.navigate("Industry_S_Confirm", { checked } )} */}

      </View>
    </ScrollView>
  );
};

export default Industry_S_Confirm;

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    marginBottom: 10,
    padding: 5,
    position: 'relative',
  },

  inputContainernew: {
    width: '100%',
    marginBottom: 10,
    padding: 5,
    height: responsiveHeight(8),
  },
  input: {
    // borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    top: responsiveHeight(0.6),
    left: responsiveWidth(5)
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(5),
    marginBottom: 10,
    borderWidth: responsiveWidth(0.5),
    width: responsiveWidth(44),
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
});
