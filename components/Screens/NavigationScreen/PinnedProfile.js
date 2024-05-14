import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import privateAPI from '../../api/privateAPI';

const PinnedProfile = ({ onPress }) => {
  const [pinnedProfiles, setPinnedProfiles] = useState([]);

  const fetchPinnedProfile = async () => {
    try {
      const response = await privateAPI.post(`pin/getAllProfilePin`);
      console.log("response data",response.data);
      setPinnedProfiles(response.data); // Store the fetched data in state
    } catch (e) {
      console.log("Fetching Failed pinnedPost", e);
    }
  };

  useEffect(() => {
    fetchPinnedProfile();
  }, []);

  const renderProfile = ({ item }) => (
    <View style={styles.profile}>
      <TouchableOpacity onPress={onPress} style={styles.containernew}>
        <Image source={{ uri: item.profilePicUrl }} style={styles.profileAvatar} />
        <Text style={styles.profileName}>{item.userName}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>PinnedProfile</Text>
          {/* <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur.
          </Text> */}
        </View>
        <FlatList
          data={pinnedProfiles}
          renderItem={renderProfile}
          keyExtractor={item => item.toString()}
        />
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
    width: '100%'
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  header: {
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
});

export default PinnedProfile;