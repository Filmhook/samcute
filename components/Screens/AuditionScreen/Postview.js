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
  const { selectedJobId } = route.params;

  const fetchData = async () => {
    try {
      const response = await privateAPI.get(`audition/getAuditionByCategory?categoryId=${selectedJobId}`);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const responseData = response.data;
      setUserData(responseData.data["Audition List"]);
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


  const handleAttendPress = useCallback(() => {
    onAttend(auditionId, setAttended);
    setAttendCount(prevCount => prevCount + 1);
  }, [onAttend, auditionId]);

  const handleDenyPress = useCallback(() => {
    onDeny(auditionId);
    setAttended(false);
  }, [onDeny, auditionId]);

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../../Assets/Audition_Icons_Fonts/auditionBg.png')}
          resizeMode='stretch'
        >
          <View style={styles.titleContainer}>
            <Text style={styles.Text}>{auditionTitle}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: filepath }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2), marginLeft: responsiveWidth(5) }}>
            <Text style={styles.Text}>Experience</Text>
            <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{auditionExperience}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
            <Text style={styles.Text}>Roles</Text>
            <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{roles}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
            <Text style={styles.Text}>End Date</Text>
            <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{auditionExpireOn}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
            <Text style={styles.Text}>Address</Text>
            <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{auditionAddress}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
            <Text style={styles.Text}>Posted by</Text>
            <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{auditionPostedBy}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5) }}>
            <Text style={styles.Text}>Attenders Count</Text>
            <Text style={styles.dot}>:</Text>
            <Text style={styles.response}>{auditionAttendedCount}</Text>
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
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
    color: 'black'
  },
  image: {
    width: responsiveWidth(80),
    height: responsiveHeight(20),
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
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  attendButton: {
    backgroundColor: '#33333d',
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(18),
    right: responsiveWidth(10),
    height: responsiveHeight(5),
  },
  denyButton: {
    backgroundColor: '#33333d',
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(16),
    right: responsiveWidth(5),
    height: responsiveHeight(5),
  },
  buttonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    padding: 10,
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