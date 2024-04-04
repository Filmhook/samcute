import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SampleFeed = () => {
  const navigation = useNavigation();
 
  const JobPost = () => (
    <View>
      
    <View style={styles.container}>
  
      <View style={styles.detailsContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={{display:'flex', flexDirection:'row'}}>
      <View style={{width:200, marginRight:10, marginTop:20}}>
      <Text>Date Posted: {datePosted}</Text>
        <Text>Date Expiry: {dateExpiry}</Text>
        <Text style={{fontWeight:700, fontSize:18, color: '#333', marginTop:15}}>Experience: {experience}</Text>
      </View>
      <View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Image source={companyLogo} style={styles.logo} />
        </View>
        <View style={{display:'flex', flexDirection: 'row'}}>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 70, top:0 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
            Attend
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 70, marginLeft:10 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
            Deny
          </Text>
          </TouchableOpacity>
          
        </View>
      
          </View>
      </View>
        <Text style={{marginBottom:10}}>Roles: {roles}</Text>
          <Text>Responsibilities:</Text>
          <Text>{responsibilities}</Text>
      </View>
    </View>
    </View>
  );
 return(
  <View>   
      <TouchableOpacity
        onPress={() => navigation.navigate("SearchBars")}
        style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 100, alignSelf: 'center', top:0, right:140}}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={jobPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobPost {...item} />}
        style={{margin:5}}
      />
  </View>


 )


};

export default SampleFeed;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius:20,
    overflow:'visible',

  },
  logo: {
    width: 50,
    height: 50,

    // left:23,
    // top:40,
    // margin:5,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection:'column',
    borderWidth:1,
    width:380,
    margin:5,
    borderRadius:20,
    padding:5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#333'
  },
});