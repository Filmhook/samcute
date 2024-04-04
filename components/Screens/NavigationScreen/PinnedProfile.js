import React from 'react';
import {  SafeAreaView,
    View,
    ScrollView,Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const PinnedProfile = ({  onPress }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>PinnedProfile</Text>

          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur.
          </Text>
        </View>
        <ScrollView>
          <View style={styles.profile}>
    <TouchableOpacity onPress={onPress} style={styles.containernew}>
       <Image source={require('../../../components/Assets/app_logo/8641606.jpg')}style={styles.profileAvatar} />
      <Text style={styles.profileName}>Sharukhan</Text>
    </TouchableOpacity>
   
</View>
         
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    containernew: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:responsiveWidth(100)
  },
  profileAvatar: {
    width: responsiveWidth(15),
    height: responsiveHeight(7),
    borderRadius: responsiveHeight(5),
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
});

export default PinnedProfile;
