import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground,ScrollView ,FlatList} from "react-native";
import { Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const UserData = ({ route }) => {
    const { selectedIndIds, selectedIds, selectedProfessionId, platfornId, selectedSubProfession } = route.params;

    const navigation=useNavigation();

    const [userData, setUserData] = useState([]); 

    useEffect(() => {
      const fetchData = async () => {

        try {
          const jwt = await AsyncStorage.getItem('jwt');
          const response = await fetch('http://3.27.162.120:8080/filmhook-0.0.1-SNAPSHOT/user/getFinalUserList', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}` // Include bearer token in the header
            },
            body: JSON.stringify({
              industryIds: [1, 2, 3],
              platformId: 1,
              professionIds: [1, 2, 3],
              subProfessionIds: [1, 2]
            })
          });
  
          const jsonData = await response.json();
          if (jsonData.status === 1 && jsonData.data) {
            const categories = Object.keys(jsonData.data);
            console.log('jsonData', jsonData)
            setUserData(categories.map(category => ({ category, data: jsonData.data[category] })));
          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <ScrollView style={styles.container}>
        {userData.map(({ category, data }) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <FlatList
              horizontal
              data={data}
              renderItem={({ item }) => (
                <View style={styles.userContainer}>
               
                    <TouchableOpacity onPress={() =>  navigation.navigate('UserProfileDetials', { userId: item.userId }) } style={styles.boxOne}>
  
                      <View>
                        <Image source= {{ uri: item.userProfilePic }} style={styles.images} />
  
                        <View style={styles.rating}>
  
                          <Text style={{ color: 'white' }}>9.2</Text>
                          <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-star.png")} style={{ width: '26%', height: '80%', top: responsiveHeight(1) }} />
                        </View>
  
  
                        <View style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: '#2af117', position: 'absolute', left: 81, top: 11 }}>
  
                        </View>
                      </View>
                      <View style={{ bottom: responsiveHeight(6.6) }}>
                        <Text style={styles.name}>{item.name}</Text>
                      </View>
  
                      <View style={{ bottom: responsiveHeight(6.5) }}>
                        <View style={styles.detials} >
  
                          <View style={styles.imageContainer}>
  
                            <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-Workexp_icon.png")} style={styles.image}>
                            </Image>
                          </View>
  
                          <Text style={{ fontSize: 12, fontWeight: '500',color:'black' }}>{item.experience}</Text>
                        </View>
  
                        <View style={styles.detials}>
  
                          <View style={styles.imageContainer}>
  
                            <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/movies-icon-removebg-preview.png")} style={styles.image}>
                            </Image>
                          </View>
  
                          <Text style={{ fontSize: 12, fontWeight: '500' ,color:'black'}}>{item.moviesCount} Movies</Text>
                        </View>
  
                        <View style={styles.detials}>
  
                          <View style={styles.imageContainer}>
  
                            <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/reservation-icon.jpg")} style={styles.image}>
                            </Image>
                          </View>
  
                          <Text style={{ fontSize: 12, fontWeight: '500',color:'black' }}>{item.dob}</Text>
                        </View>
  
                        <View style={styles.detials}>
  
                          <View style={styles.imageContainer}>
  
                            <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Net-worth-icon-removebg-preview.png")} style={styles.image}>
                            </Image>
                          </View>
  
                          <Text style={{ fontSize: 12, fontWeight: '500', color:'black' }}>{item.netWorth} /Movie </Text>
                        </View>
                      </View>
  
                    </TouchableOpacity>
  
  
  
  
  
                 
                  {/* Add other user data as needed */}
                </View>
              )}
              keyExtractor={(item) => item.userId.toString()}
            />
          </View>
        ))}
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
    //  height:responsiveHeight(60)
  
  
    //  flexDirection:'row',
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'black',
      marginLeft: 10,
    },
    userContainer: {
      flexDirection: 'row',
      width:responsiveWidth(40),
     // borderWidth:1,
     // alignItems: 'center',
      padding: 10,
    
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },

    boxOne: {
      height: responsiveHeight(28.5), borderRadius: responsiveWidth(5), width: responsiveWidth(34), borderWidth: 1,
  
  
  
  
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
      top: responsiveHeight(1)
  
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
      bottom: responsiveHeight(1)
  
  },
  name: {
      fontSize: responsiveFontSize(2),
      alignSelf: 'center',
      fontWeight: 'bold',
      color:'black'
  
  },
  imageContainer: {
      borderRadius: responsiveWidth(4),
      borderColor: 'black',
      borderWidth: 1.5,
      height: '100%',
      width: '22%'
  
  
  },
  image: {
      width: '85%',
      height: '95%',
      top: responsiveHeight(0.2),
      //  backgroundColor: 'cyan',
      borderWidth: 1,
      borderRadius: responsiveWidth(2),
      left: responsiveWidth(0.4)
  
  }
  });
  
  export default UserData;
  