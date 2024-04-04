// Post.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Post = ({ username, profilePic, postImage, caption }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text>{username}</Text>
      </View>
      <Text>{caption}</Text>
      <View style={styles.postContent}>
        <Image source={{ uri: postImage }} style={styles.postImage} />
      </View>
      <View style={styles.postInteractions}>
        <TouchableOpacity style={styles.interactionButton}>
          <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Text>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postContent: {
    marginBottom: 10,
  
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderWidth:1
  },
  postInteractions: {
    flexDirection: 'row',
  },
  interactionButton: {
    marginRight: 10,
    padding: 5,
  },
});

export default Post;
