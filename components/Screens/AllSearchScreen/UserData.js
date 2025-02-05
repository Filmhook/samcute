// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground,ScrollView ,FlatList, Alert} from "react-native";
// import { Dimensions } from "react-native";
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import privateAPI from "../../api/privateAPI";

// const UserData = ({ route }) => {
//     const { selectedIndIds, selectedIds, selectedProfessionId, platfornId, selectedSubProfession } = route.params;
// console.log('selectedIndIds', selectedIndIds)
// console.log('selectedProfessionId', selectedProfessionId)
// console.log('platfornId', platfornId)
// console.log('selectedSubProfession', selectedSubProfession)

//     const navigation=useNavigation();

//     const [userData, setUserData] = useState([]); 

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const jwt = await AsyncStorage.getItem('jwt');
    
//           const response = await privateAPI.post('user/getFinalUserList', {
//             industryIds: selectedIndIds,
//             platformId: platfornId,
//             professionIds: selectedProfessionId,
//             subProfessionIds: selectedSubProfession,
//           });
    
//           const jsonData = response.data;
//           if (jsonData.status === 1 && jsonData.data) {
//             const categories = Object.keys(jsonData.data);
//             console.log('jsonData', jsonData);
//             setUserData(
//               categories.map((category) => ({
//                 category,
//                 data: jsonData.data[category],
//               }))
//             );
//           } else if (jsonData.status === -1) {
//             Alert.alert('Message', jsonData.message || 'User(s) not found for all criteria...');
//           } else {
//             console.error('Error fetching user data');
//           }
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
    
//       fetchData();
//     }, [selectedIndIds, platfornId, selectedProfessionId, selectedSubProfession]); 
  
//     return (
//       <ScrollView style={styles.container}>
//         {userData.map(({ category, data }) => (
//           <View key={category} style={styles.categoryContainer}>
//             <Text style={styles.categoryTitle}>{category}</Text>
//             <FlatList
//               horizontal
//               data={data}
//               renderItem={({ item }) => (
//                 <View style={styles.userContainer}>
               
//                     <TouchableOpacity onPress={() =>  navigation.navigate('UserProfileDetials', { userId: item.userId, userName: item.name }) } style={styles.boxOne}>
  
//                       <View>
//                         <Image source= {{ uri: item.userProfilePic }} style={styles.images} />
  
//                         <View style={styles.rating}>
  
//                           <Text style={{ color: 'white' }}>9.2</Text>
//                           <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-star.png")} style={{ width: '26%', height: '80%', top: responsiveHeight(1) }} />
//                         </View>
  
  
//                         <View style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: '#2af117', position: 'absolute', left: 81, top: 11 }}>
  
//                         </View>
//                       </View>
//                       <View style={{ bottom: responsiveHeight(6.6) }}>
//                         <Text style={styles.name}>{item.name}</Text>
//                       </View>
  
//                       <View style={{ bottom: responsiveHeight(6.5) }}>
//                         <View style={styles.detials} >
  
//                           <View style={styles.imageContainer}>
  
//                             <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-Workexp_icon.png")} style={styles.image}>
//                             </Image>
//                           </View>
  
//                           <Text style={{ fontSize: 12, fontWeight: '500',color:'black' }}>{item.experience}</Text>
//                         </View>
  
//                         <View style={styles.detials}>
  
//                           <View style={styles.imageContainer}>
  
//                             <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/movies-icon-removebg-preview.png")} style={styles.image}>
//                             </Image>
//                           </View>
  
//                           <Text style={{ fontSize: 12, fontWeight: '500' ,color:'black'}}>{item.moviesCount} Movies</Text>
//                         </View>
  
//                         <View style={styles.detials}>
  
//                           <View style={styles.imageContainer}>
  
//                             <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/reservation-icon.jpg")} style={styles.image}>
//                             </Image>
//                           </View>
  
//                           <Text style={{ fontSize: 12, fontWeight: '500',color:'black' }}>{item.dob}</Text>
//                         </View>
  
//                         <View style={styles.detials}>
  
//                           <View style={styles.imageContainer}>
  
//                             <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Net-worth-icon-removebg-preview.png")} style={styles.image}>
//                             </Image>
//                           </View>
  
//                           <Text style={{ fontSize: 12, fontWeight: '500', color:'black' }}>{item.netWorth} /Movie </Text>
//                         </View>
//                       </View>
  
//                     </TouchableOpacity>
  
  
  
  
  
                 
//                   {/* Add other user data as needed */}
//                 </View>
//               )}
//               keyExtractor={(item) => item.userId.toString()}
//             />
//           </View>
//         ))}
//       </ScrollView>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f5f5f5',
//     },
//     categoryContainer: {
//       marginBottom: 20,
//     //  height:responsiveHeight(60)
  
  
//     //  flexDirection:'row',
//     },
//     categoryTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginBottom: 10,
//       color:'black',
//       marginLeft: 10,
//     },
//     userContainer: {
//       flexDirection: 'row',
//       width:responsiveWidth(40),
//      // borderWidth:1,
//      // alignItems: 'center',
//       padding: 10,
    
//     },
//     profilePic: {
//       width: 50,
//       height: 50,
//       borderRadius: 25,
//       marginRight: 10,
//     },

//     boxOne: {
//       height: responsiveHeight(28.5), borderRadius: responsiveWidth(5), width: responsiveWidth(34), borderWidth: 1,
  
  
  
  
//   },
//   detials: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       columnGap: responsiveWidth(3),
//       alignSelf: 'flex-start',
//       marginLeft: responsiveWidth(1),
//       width: '85%',
//       height: '15%',
//       margin: responsiveWidth(0.3),
//   },
//   images: {
//       height: '50%',
//       width: '50%',
//       borderRadius: responsiveWidth(8),
//       alignSelf: 'center',
//       top: responsiveHeight(1)
  
//   },
//   rating: {
//       borderWidth: 1,
//       borderRadius: responsiveWidth(2),
  
//       height: '15%',
//       width: '35%',
//       flexDirection: 'row',
//       backgroundColor: 'black',
//       alignSelf: 'center',
//       flexWrap: 'wrap',
//       bottom: responsiveHeight(1)
  
//   },
//   name: {
//       fontSize: responsiveFontSize(2),
//       alignSelf: 'center',
//       fontWeight: 'bold',
//       color:'black'
  
//   },
//   imageContainer: {
//       borderRadius: responsiveWidth(4),
//       borderColor: 'black',
//       borderWidth: 1.5,
//       height: '100%',
//       width: '22%'
  
  
//   },
//   image: {
//       width: '85%',
//       height: '95%',
//       top: responsiveHeight(0.2),
//       //  backgroundColor: 'cyan',
//       borderWidth: 1,
//       borderRadius: responsiveWidth(2),
//       left: responsiveWidth(0.4)
  
//   }
//   });
  
//   export default UserData;
  

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import privateAPI from "../../api/privateAPI";

const UserData = ({ route }) => {
  const { selectedIndIds, selectedIds, selectedProfessionId, platfornId, selectedSubProfession } = route.params;
  console.log('selectedIndIds', selectedIndIds);
  console.log('selectedProfessionId', selectedProfessionId);
  console.log('platfornId', platfornId);
  console.log('selectedSubProfession', selectedSubProfession);

  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({}); // Track expanded state for each category

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await privateAPI.post('user/getFinalUserList', {
          industryIds: selectedIndIds,
          platformId: platfornId,
          professionIds: selectedProfessionId,
          subProfessionIds: selectedSubProfession,
        });

        const jsonData = response.data;
        if (jsonData.status === 1 && jsonData.data) {
          const categories = Object.keys(jsonData.data);
          console.log('jsonData', jsonData);
          setUserData(
            categories.map((category) => ({
              category,
              data: jsonData.data[category],
            }))
          );
        } else if (jsonData.status === -1) {
          Alert.alert('Message', jsonData.message || 'User(s) not found for all criteria...');
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedIndIds, platfornId, selectedProfessionId, selectedSubProfession]);

  const toggleExpand = (category) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {userData.map(({ category, data }) => {
        const isExpanded = expandedCategories[category] || false;
        const visibleData = isExpanded ? data : data.slice(0, 3); // Show only 3 items when not expanded

        return (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <FlatList
              horizontal
              data={visibleData}
              renderItem={({ item }) => (
                <View style={styles.userContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('UserProfileDetials', { userId: item.userId, userName: item.name })} style={styles.boxOne}>
                    <View>
                      <Image source={{ uri: item.userProfilePic }} style={styles.images} />
                      <View style={styles.rating}>
                        <Text style={{ color: 'white' }}>9.2</Text>
                        <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-star.png")} style={{ width: '26%', height: '80%', top: responsiveHeight(1) }} />
                      </View>
                      <View style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: '#2af117', position: 'absolute', left: 81, top: 11 }}></View>
                    </View>
                    <View style={{ bottom: responsiveHeight(6.6) }}>
                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={{ bottom: responsiveHeight(6.5) }}>
                      <View style={styles.detials}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-Workexp_icon.png")} style={styles.image} />
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: 'black' }}>{item.experience}</Text>
                      </View>
                      <View style={styles.detials}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/movies-icon-removebg-preview.png")} style={styles.image} />
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: 'black' }}>{item.moviesCount} Movies</Text>
                      </View>
                      <View style={styles.detials}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/reservation-icon.jpg")} style={styles.image} />
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: 'black' }}>{item.dob}</Text>
                      </View>
                      <View style={styles.detials}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Net-worth-icon-removebg-preview.png")} style={styles.image} />
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: 'black' }}>{item.netWorth} /Movie </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.userId.toString()}
            />
            {data.length > 3 && (
              <TouchableOpacity onPress={() => toggleExpand(category)} style={styles.seeMoreButton}>
                <Text style={styles.seeMoreText}>{isExpanded ? 'See Less' : 'See More'}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    marginLeft: 10,
  },
  userContainer: {
    flexDirection: 'row',
    width: responsiveWidth(40),
    padding: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  boxOne: {
    height: responsiveHeight(28.5),
    borderRadius: responsiveWidth(5),
    width: responsiveWidth(34),
    borderWidth: 1,
  },
  detials: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: responsiveWidth(3),
    alignSelf: 'flex-start',
    marginLeft: responsiveWidth(1),
    width: '85%',
    height: '15%',
    margin: responsiveWidth(0.3),
  },
  images: {
    height: '50%',
    width: '50%',
    borderRadius: responsiveWidth(8),
    alignSelf: 'center',
    top: responsiveHeight(1),
  },
  rating: {
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    height: '15%',
    width: '35%',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignSelf: 'center',
    flexWrap: 'wrap',
    bottom: responsiveHeight(1),
  },
  name: {
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  imageContainer: {
    borderRadius: responsiveWidth(4),
    borderColor: 'black',
    borderWidth: 1.5,
    height: '100%',
    width: '22%',
  },
  image: {
    width: '85%',
    height: '95%',
    top: responsiveHeight(0.2),
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    left: responsiveWidth(0.4),
  },
  seeMoreButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  seeMoreText: {
    color: 'blue',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

export default UserData;
