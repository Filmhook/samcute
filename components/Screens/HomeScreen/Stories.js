import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';

import StoryContainer from './Storycontainor';
import FriendStories from './FriendStories';


const Stories = () => {
  return (
    <ScrollView
      horizontal
      style={styles.storiesContainer}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      <StoryContainer />
      <FriendStories />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
   // backgroundColor:'white',
    marginTop: 8,
    padding: 15,
  },
  contentContainerStyle: {
    paddingRight: 30,
  },
});

export default Stories;