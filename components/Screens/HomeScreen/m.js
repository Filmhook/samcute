
// Your main component or screen

import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Post from './p';
import PostImage from 'C:\Users\prith\Downloads\joshua-hanson-e616t35Vbeg-unsplash.jpg'

const MainScreen = () => {
  // Dummy data for posts
  const posts = [
    {
      id: 1,
      username: 'JohnDoe',
      profilePic: 'profile_picture_url',
      postImage: PostImage,
      caption: 'This is an awesome post!',
    },
    // Add more posts as needed
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            profilePic={post.profilePic}
            postImage={post.postImage}
            caption={post.caption}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
