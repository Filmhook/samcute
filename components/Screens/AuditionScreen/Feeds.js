import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import app from '../../../FirebaseConfig';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ImageBackground } from 'react-native';

const Timeline = ({ route }) => {
  const navigation = useNavigation();
  const { selectedJobTitle, collect } = route.params;
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const firestore = getFirestore(app);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const lowercaseTitle = selectedJobTitle.toLowerCase();
        const jobQuery = query(
          collection(firestore, 'Audition-Form'),
          where('title', '==', lowercaseTitle)
        );
        console.log(selectedJobTitle);
        const querySnapshot = await getDocs(jobQuery);
        console.log('Query Snapshot:', querySnapshot.docs)
        const data = querySnapshot.docs.map(doc => {
          const formattedTitle = capitalizeFirstLetter(doc.data().title);
          return { ...doc.data(), title: formattedTitle };
        });
        const currentDate = new Date();
        const filteredData = jobPosts.filter(post => new Date(post.endDate) >= currentDate);
        setJobPosts(filteredData);
        setJobPosts(data);
        setLoading(false);
        console.log('Data Fetched', data);
      } catch (error) {
        setLoading(false);
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedJobTitle, firestore]);

  // useEffect(() => {
  //   // Function to filter out expired posts
  //   const filterExpiredPosts = () => {
  //     const currentDate = new Date();
  //     const filteredData = jobPosts.filter(post => new Date(post.endDate) >= currentDate);
  //     setJobPosts(filteredData);
  //   };

  //   // Call the function to filter expired posts whenever jobPosts changes
  //   filterExpiredPosts();
  // }, [jobPosts]);

  const JobPost = ({ title, experience, startDate, endDate, requirements, logo }) => (
    <View style={{ width: '100' }}>
      <View style={styles.container}>


        <ImageBackground style={{
          width: responsiveWidth(98),
          margin: 3,
          borderRadius: responsiveWidth(2),
          //  padding: '3%',
          //elevation: 10,
          // opacity:0.9,
          backgroundColor: 'white',
          //  marginLeft: '1%'
        }} source={require('../../Assets/Audition_Icons_Fonts/auditionBg.png')} resizeMode='stretch'>
          <View style={{ padding: 3, marginLeft: 8 }}>
            <Text style={styles.title}>{`Looking For The Role of ${title}`}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', }}>
              <View style={{ width: 200, marginRight: 10, marginTop: 20 }}>
                <Text> Posted on: {startDate}</Text>
                <Text> Expiris on: {endDate}</Text>
                
                <Text style={{ fontWeight: 700, fontSize: responsiveFontSize(2), color: '#333', marginTop: responsiveHeight(2) }}>Freasher: {experience}</Text>
              </View>
              <View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {logo && <Image source={{ uri: logo }} style={styles.logo} />}
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/camera.jpg')} style={{width:responsiveWidth(18),height:responsiveHeight(7),position:'absolute',top:-40,right:25}} />
                  <TouchableOpacity
                    style={{ backgroundColor: '#33333d', borderRadius: responsiveWidth(3), marginTop: responsiveHeight(0.9), width: responsiveWidth(16),top:20  }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10,}}>
                      Attend
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: '#33333d', borderRadius: responsiveWidth(3), marginTop: responsiveHeight(0.9), width: responsiveWidth(16), left: responsiveWidth(2),height:responsiveHeight(5),top:20  }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
                      Deny
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <Text style={{marginBottom:10}}>Roles: {roles}</Text> */}
            <Text>Roles:</Text>
            {requirements.map((requirement, index) => (
              <Text key={requirement.id}>{`${index + 1}.${requirement.text}`}</Text>
            ))}
            <Text>Posted By:</Text>
          </View>
        </ImageBackground>


      </View>
    </View>
  );
  const handleBackButtonPress = () => {
    navigation.navigate('SearchBars');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text style={{color:'black',right:responsiveWidth(10)}}>New Jobs</Text> */}
      {/* Other content */}
      {jobPosts.length === 0 && !loading && (
        <Text>No Items to Display</Text>
      )}
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" />
        // {/* You can replace ActivityIndicator with any loading indicator component */}
      )}
      {!loading && jobPosts.length > 0 && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'black', right: responsiveWidth(36), fontWeight: 'bold', fontSize: 20 }}>New Jobs</Text>
          
          {/* <FlatList
            data={jobPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <JobPost {...item} />}
            style={{ height: '90%' }}
          /> */}

{jobPosts.map((item,index)=>(
        <obPost {...item} />
      ))}
        </View>
      )}

    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: responsiveHeight(0.3),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: responsiveWidth(3),
    overflow: 'visible',
    //  borderWidth:1,





  },
  logo: {
    width: 50,
    height: 50,
    // borderWidth:1
    // left:23,
    // top:40,
    // margin:5,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    width: '100%',
    // margin: 5,
    borderRadius: responsiveWidth(2),
    padding: '3%',
    //elevation: 10,
    // opacity:0.9,
    backgroundColor: 'white',
    marginLeft: '1%'

  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '800',
    color: '#333'
  },
});