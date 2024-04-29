
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Profession_project from './Projects'
import Profession_tv_drama_project from './Tv_Drama_Projects'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import privateAPI from '../../../api/privateAPI'
import { ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native'


export default function Profession() {
  const [platformData, setPlatformData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);


  const [filmCountInput, setFilmCountInput] = useState('');
const [netWorthInput, setNetWorthInput] = useState('');
const [dailySalaryInput, setDailySalaryInput] = useState('');

  // const toggleExpanded = () => {
  //   setExpanded(!expanded);
  //   if (!expanded) {
  //     setLoading(true)// Set loading to true when expanding
  //     fetchData(); // Fetch data when expanding
  //   }
  // };

  const [editingPlatformId, setEditingPlatformId] = useState(null); // State to track the platform being edited

// Function to toggle edit mode
const toggleEditMode = (platformId, platformName) => {
  if (platformId === editingPlatformId) {
    // Save changes and exit edit mode
    handleSave(platformId, platformName);
    setEditingPlatformId(null);
  } else {
    // Enter edit mode for the selected platform
    setEditingPlatformId(platformId);
  }
};

  useEffect(() => {

    fetchData(); // Fetch data initially when component mounts if expanded

  }, []);


  const handleSave = async (platformId, platformName) => {
    try {
      console.log('Platform:', platformId, filmCountInput, netWorthInput, dailySalaryInput);
      const response = await privateAPI.post(
        'industryUser/updateIndustryUserPermanentDetails',
        {
          platformPermanentId: platformId,
          filmCount: filmCountInput,
          netWorth: netWorthInput,
          dailySalary: dailySalaryInput,
        },
      );
      Alert.alert('Update', `${platformName} Updated`);

      console.log('Platform details updated successfully:', response.data);
  
      // Update the state with the new values
      setPlatformData(prevState =>
        prevState.map(platform => {
          if (platform.platformPermanentId === platformId) {
            return {
              ...platform,
              filmCount: filmCountInput,
              netWorth: netWorthInput,
              dailySalary: dailySalaryInput,
            };
          }
          return platform;
        })
      );
    } catch (error) {
      console.error('Error updating platform details:', error);
    }
  };
  

  
  const fetchData = async () => {
    try {

      const userId = await AsyncStorage.getItem('userId');
      const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=248`);
      const response = resp.data;
  
      const groupedPlatforms = response.reduce((accumulator, currentItem) => {
        currentItem.platformDetails.forEach(platform => {
          const platformName = platform.platformName;
          const industries = currentItem.industriesName;
          const professions = platform.professionDetails.map(profession => ({
            professionName: profession.professionName,
            subProfessions: profession.subProfessionName || [], 
            professionPermanentId: profession.professionPermanentId 
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
  
          // Add platformPermanentId to the platform object
          accumulator[platformName].platformPermanentId = platform.platformPermanentId;
        });
  
        return accumulator;
      }, {});
  
      // Convert grouped platforms object to array
      const aggregatedPlatforms = Object.values(groupedPlatforms);
  
      console.log('aggregatedPlatforms', aggregatedPlatforms)
  
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


      <ScrollView style={{ width: responsiveWidth(100), }}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          platformData.map((platform, index) => (
            <View key={index} style={styles.platformContainer}>

<View style={{ width:responsiveWidth(96)}}>
{editingPlatformId === platform.platformPermanentId ? ( // Render save button if in edit mode
              <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId, platform.platformName)}>
               <Text style={styles.editButton}>Save</Text>
              </TouchableOpacity>
            ) : ( // Render edit button if not in edit mode
              <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId)}>
               <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            )}
            </View>


                {/* <TextInput
                  placeholder="Net Worth"
                  value={netWorthInput}
                  onChangeText={text => setNetWorthInput(text)}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Daily Salary"
                  value={dailySalaryInput}
                  onChangeText={text => setDailySalaryInput(text)}
                  keyboardType="numeric"
                />
              </>
            )}
             */}
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
                {/* Add other TextInput fields for net worth and daily salary */}

                {/* Save button */}
               
              </>
            ) : (
              // Else condition when not in edit mode
              <Text>Other platform details...</Text>
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
                {/* Add other TextInput fields for net worth and daily salary */}

                {/* Save button */}
               
              </>
            ) : (
              // Else condition when not in edit mode
              <Text>Other platform details...</Text>
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
              <Text>Other platform details...</Text>
            )}
                      
                    </ImageBackground>
                  </View>


                </View>
              </View>

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

