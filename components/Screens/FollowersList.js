
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import privateAPI from '../api/privateAPI';

export default function FollowersList({ route }) {
    const { userId } = route.params;
    const [followersList, setFollowersList] = useState([]);

    const fetchFollowList = async () => {
        try {
            const response = await privateAPI.get(`friendRequest/getFriendRequest?userId=${userId}`);
            const data = response.data.data;
            console.log("response data", data.followersList);
            // Access the 'data' object
            setFollowersList(data.followersList); // Extract 'followersList' array from 'data' object
        } catch (error) {
            console.log("Fetching Failed", error);
        }
    };

    useEffect(() => {
        fetchFollowList();
    }, []);

    const renderProfile = ({ item }) => (
        <View style={styles.profile}>
            <TouchableOpacity style={styles.containernew}>
                <Image source={{ uri: item.userProfilePicUrl }} style={styles.profileAvatar} />
                <Text style={styles.profileName}>{item.userName}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Follower List</Text>
                </View>
                <FlatList
                    data={followersList}
                    renderItem={renderProfile}
                    keyExtractor={item => item.followersRequestId.toString()} // Use a unique key for each item
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
    profile: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
});