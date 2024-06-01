import React, { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Image } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import privateAPI from '../../api/privateAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Postview() {
  const [userData, setUserData] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedJobId, address } = route.params;

 const fetchData = async () => {
   try {
     if (address == null) {
       const response = await privateAPI.post(`audition/getAuditionByCategory`, {
         flag: false,
         auditionCategory: selectedJobId,
       });
       const responseData = response.data;
       setUserData(responseData.data["Audition List"]);
     } else {
       const response = await privateAPI.post(`audition/getAuditionByCategory`, {
         flag: true,
         auditionCategory: selectedJobId,
         searchKey: address,
       });
       const responseData = response.data;
       setUserData(responseData.data["Audition List"]);
     }
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };


  useEffect(() => {
    fetchData();
  }, [selectedJobId]);

  const handleAttend = useCallback(async (auditionId, setAttended) => {
    try {
      const id = await AsyncStorage.getItem('userId');
      await privateAPI.post(`audition/auditionAcceptance`, {
        auditionAccepted: true,
        auditionAcceptanceUser: id,
        auditionRefId: auditionId
      });
      setAttended(true);
      Alert.alert("Success");
      fetchData();
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  }, []);

  const handleDeny = useCallback(async (auditionId) => {
    try {
      const id = await AsyncStorage.getItem('userId');
      await privateAPI.post(`audition/auditionIgnorance`, {
        isIgnoranceAccepted: true,
        auditionIgnoranceUser: id,
        auditionRefId: auditionId
      });
      Alert.alert("Success");
      fetchData();
    } catch (error) {
      console.error("Error marking ignorance:", error);
    }
  }, []);

  const renderItem = useCallback(({ item }) => (
    <DataItem
      item={item}
      onAttend={handleAttend}
      onDeny={handleDeny}
    />
  ), [handleAttend, handleDeny]);

  return (
    <FlatList
      data={userData}
      style={{ padding: 0, margin: 0 }}
      renderItem={renderItem}
      keyExtractor={(item) => item.auditionId.toString()}
      initialNumToRender={10}
      windowSize={21}
      getItemLayout={(data, index) => (
        { length: responsiveHeight(25), offset: responsiveHeight(25) * index, index }
      )}
    />
  );
}

const DataItem = React.memo(({ item, onAttend, onDeny }) => {

  const { auditionTitle, auditionExperience, auditionAddress, auditionExpireOn, auditionPostedBy, auditionRolesWebModels, auditionId, auditionAttendedCount, fileOutputWebModel } = item;
  const [attended, setAttended] = useState(false);
  const [attendCount, setAttendCount] = useState(auditionAttendedCount);

  const roles = auditionRolesWebModels && auditionRolesWebModels.length > 0 ? auditionRolesWebModels.map(role => role.auditionRoleDesc).join(', ') : '';
  const filepath = fileOutputWebModel && fileOutputWebModel.length > 0 ? fileOutputWebModel[0].filePath : '';
  const createdOn = fileOutputWebModel && fileOutputWebModel.length > 0 ? fileOutputWebModel[0].createdOn : '';
  const createdOnDateOnly = createdOn.split('T')[0]; // Extracts the date part
  console.log(createdOnDateOnly); // Outputs: 2024-05-28



  const handleAttendPress = useCallback(() => {
    onAttend(auditionId, setAttended);
    setAttendCount(prevCount => prevCount + 1);
  }, [onAttend, auditionId]);

  const handleDenyPress = useCallback(() => {
    onDeny(auditionId);
    setAttended(false);
  }, [onDeny, auditionId]);
;

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../../Assets/Audition_Icons_Fonts/auditionBg.png')}
          resizeMode='stretch'
        >
          <View style={styles.titleContainer}>
            <Text style={{ fontSize: responsiveFontSize(3),
    fontWeight: '900',
    color: 'black'}}>Looking For:{auditionTitle}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(3) }}>
            <Text style={{ fontSize: responsiveFontSize(1.5),
    fontSize:responsiveHeight(2)
    }}>Posted on: {auditionExpireOn}</Text>
            {/* <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{auditionExpireOn}</Text> */}
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
            <Text style={{ fontSize: responsiveFontSize(1.5),
    fontSize:responsiveHeight(2)
    }}>created on: {createdOnDateOnly}</Text>
            {/* <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{createdOnDateOnly}</Text> */}
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: filepath }} />
          </View>
          <View style={{ flexDirection: 'row',  marginLeft: responsiveWidth(5),bottom:responsiveHeight(7) }}>
            <Text style={{  fontSize: responsiveFontSize(2.5),
    fontWeight: '900',
    color: 'black'}}>Experience/{auditionExperience}</Text>
            {/* <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{auditionExperience}</Text> */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleAttendPress}
              style={[styles.attendButton, attended && styles.disabledButton]}
              disabled={attended}
            >
              <Text style={styles.buttonText}>Attend</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDenyPress} style={styles.denyButton}>
              <Text style={styles.buttonText}>Deny</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5),bottom:responsiveHeight(5) }}>
            <Text  style={{ 
    fontSize:responsiveHeight(2),bottom:responsiveHeight(5),left:responsiveHeight(1)
    }}>Roles:</Text>
          
            <Text style={{ 
    fontSize: responsiveFontSize(2),
   
    width:"90%",
    right:responsiveWidth(10)
   }}>{roles}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5),}}>
            <Text style={{ 
    fontSize:responsiveHeight(2),bottom:responsiveHeight(4),left:responsiveHeight(1)
    }}>Address:</Text>
           
            <Text style={{ fontSize: responsiveFontSize(2),width:"90%",
   right:responsiveWidth(14)}}>{auditionAddress}</Text>
          </View>
         
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(1) }}>
            <Text style={{  fontSize:responsiveHeight(2),}}>Posted by:</Text>

            <Text style={{fontSize:responsiveFontSize(2),color:'blue',textDecorationLine: 'underline'}}>{auditionPostedBy}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5),marginBottom:responsiveHeight(2) }}>
            <Text style={{  fontSize: responsiveFontSize(2.5),
    fontWeight: '900',
    color: 'black'}}>Attenders Count:{auditionAttendedCount}</Text>
           
          </View>
        
         
        </ImageBackground>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: responsiveHeight(0.3),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: responsiveWidth(3),
    overflow: 'visible',
  },
  imageBackground: {
    width: responsiveWidth(98),
    margin: 3,
    borderRadius: responsiveWidth(2),
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '800',
    color: '#333',
    marginBottom: responsiveHeight(1),
  },
  imageContainer: {
   left:responsiveWidth(65),
   bottom:responsiveHeight(7)
  },
  Text: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '900',
    color: 'black'
  },
  image: {
    width: responsiveWidth(20),
    height: responsiveHeight(6),
    marginTop: responsiveHeight(2),
  },
  detailsContainer: {
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: responsiveWidth(4),
    // marginBottom: responsiveHeight(2),
    justifyContent: 'flex-end',
    bottom:responsiveHeight(7)
  },
  attendButton: {
    backgroundColor: '#33333d',
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(18),
    right: responsiveWidth(10),
    height: responsiveHeight(4.5),
  },
  denyButton: {
    backgroundColor: '#33333d',
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(16),
    right: responsiveWidth(5),
    height: responsiveHeight(4.5),
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    bottom:responsiveHeight(0.2),
    height:responsiveHeight(5)
  },
  disabledButton: {
    backgroundColor: '#777777',
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