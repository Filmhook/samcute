import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Image } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import privateAPI from '../../api/privateAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { error } from 'console';

export default function Postview() {
  const [userData, setUserData] = useState([]);
  const [auditionId, setAuditonId] = useState('');
  const [attendedAuditions, setAttendedAuditions] = useState([]);


  const navigation = useNavigation();
  const route = useRoute();

  const { selectedJobTitle, collect } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + jwt);
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(`https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/audition/getAuditionByCategory?auditionTitle=${selectedJobTitle}`, {
          method: 'GET',
          headers: myHeaders
        });


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setUserData(responseData.data["Audition List"]);
        console.log("post data", responseData.data);
      } catch (error) {
        console.log("error line ", error);
      }
    };
    fetchData();
  }, []);




  const Datas = ({ item }) => {
    const [attended, setAttended] = useState(false);
    const { auditionTitle, auditionExperience, auditionCategory, auditionAddress, auditionMessage, auditionExpireOn, auditionPostedBy, auditionRolesWebModels, auditionId, auditionAttendedCount } = item;

    const handleAttend = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        await privateAPI.post(`audition/auditionAcceptance`, {
          auditionAccepted: true,
          auditionAcceptanceUser: id,
          auditionRefId: auditionId
        });
        setAttended(true); // Set attended to true after successful attendance
        Alert.alert("Success");
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
    };

    const handleDeny = async () => {
      // Add logic here to handle denying attendance
      // You can reset the attended state to false
      setAttended(false);
      // Add any other logic you need
    };
    // Map auditionRoleDesc
    const roles = auditionRolesWebModels && auditionRolesWebModels.length > 0 ? auditionRolesWebModels.map(role => role.auditionRoleDesc).join(', ') : '';


    return (
      <View style={{ width: '100%' }}>
        <View style={styles.container}>
          <ImageBackground
            style={{
              width: responsiveWidth(98),
              margin: 3,
              borderRadius: responsiveWidth(2),
              backgroundColor: 'white',
            }}
            source={require('../../Assets/Audition_Icons_Fonts/auditionBg.png')}
            resizeMode='stretch'
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(2) }}>
              <Text style={styles.Text}>{auditionTitle}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/camera.jpg')} style={{ width: responsiveWidth(80), height: responsiveHeight(20), marginTop: responsiveHeight(2) }} />
            </View>
            {/* <View style={{ marginLeft: responsiveWidth(4), marginTop: responsiveHeight(3), marginBottom: responsiveHeight(1) }}>
              <Text style={styles.Text}>Experience:{auditionExperience}</Text>
              <Text style={styles.Text}>Roles: {roles}</Text>
              <Text style={styles.Text}>End Date: {auditionExpireOn}</Text>
              <Text style={styles.Text}>Address: {auditionAddress}</Text>
              <Text style={styles.Text}>Posted by: {auditionPostedBy}</Text>
              <Text style={styles.Text}>Attenders Count: {auditionAttendedCount}</Text> 
              </View>*/}
            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2), marginLeft: responsiveWidth(5) }}>
              <Text style={styles.Text}>Experience</Text>
              <Text style={styles.dot}>:</Text>
              <Text style={styles.response}>{auditionExperience}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
              <Text style={styles.Text}>Roles</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '900',
                color: '#333',
                left: responsiveWidth(19)
              }}>:</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '800',
                color: '#333',
                width: responsiveWidth(55),
                left: responsiveWidth(21.3)
              }}>{roles}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
              <Text style={styles.Text}>End Date</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '900',
                color: '#333',
                left: responsiveWidth(13.8)
              }}>:</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '800',
                color: '#333',
                width: responsiveWidth(70),
                left: responsiveWidth(16)
              }}>{auditionExpireOn}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
              <Text style={styles.Text}>Address</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '900',
                color: '#333',
                left: responsiveWidth(15)
              }}>:</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '800',
                color: '#333',
                width: responsiveWidth(55),
                left: responsiveWidth(17)
              }}>{auditionAddress}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
              <Text style={styles.Text}>Posted by</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '900',
                color: '#333',
                left: responsiveWidth(12.8)
              }}>:</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '800',
                color: '#333',
                width: responsiveWidth(65),
                left: responsiveWidth(15)
              }}>{auditionPostedBy}</Text>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
              <Text style={styles.Text}>Attenders Count</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '900',
                color: '#333',
                left: responsiveWidth(2.2)
              }}>:</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '800',
                color: '#333',
                width: responsiveWidth(65),
                left: responsiveWidth(4.5)
              }}>{auditionAttendedCount}</Text>
            </View>


            <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(4), marginBottom: (20), justifyContent: 'flex-end' }}>
              {attended ? null : (
                <TouchableOpacity onPress={handleAttend} style={{ backgroundColor: '#33333d', borderRadius: responsiveWidth(3), width: responsiveWidth(18), right: responsiveWidth(10), height: responsiveHeight(5), }}>
                  <Text style={styles.Touch}>Attend</Text>
                </TouchableOpacity>
              )}
              {attended ? (
                <TouchableOpacity onPress={handleDeny} style={{ backgroundColor: '#33333d', borderRadius: responsiveWidth(3), width: responsiveWidth(16), right: responsiveWidth(5), height: responsiveHeight(5), }}>
                  <Text style={styles.Touch2}>Deny</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={userData}
        style={{ padding: 0, margin: 0 }}
        renderItem={({ item }) => (
          <Datas item={item} />
        )}
        keyExtractor={(item) => item.auditionId.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: responsiveHeight(0.3),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: responsiveWidth(3),
    overflow: 'visible',
  },
  Text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
    // marginBottom: responsiveHeight(1),
    color: 'black'
    // width:responsiveWidth(86)
  },
  Touch: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  Touch2: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  response: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '800',
    color: '#333',
    width: responsiveWidth(70),
    left: responsiveWidth(12)
  },
  dot: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '800',
    color: '#333',
    left: responsiveWidth(10)
  }
});