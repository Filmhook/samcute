import { View, ScrollView, } from 'react-native'
import React from 'react'

import Storycontainor from './Storycontainor'
import Postfeedcontainor from './postfeedcontainor'
import Posts from './Posts'
import StatusPost from './statusPost'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Stories from './Stories'









export default function Homecontents() {
  return (
    <>
      <ScrollView>
        <View>

          {/* Statuspost_containor */}
          <StatusPost />

          <View style={{
            borderBottomWidth: responsiveWidth(2),
            borderBottomColor: '#9d9d9e',
           bottom:responsiveHeight(0.5)
            
          }} />

        {/* Story_containor */}
       
             
              {/* <Storycontainor /> */}
              <Stories/>
             

          <View style={{
            borderBottomWidth: responsiveWidth(2),
            borderBottomColor: '#9d9d9e',
            marginVertical: responsiveHeight(1),
            bottom:responsiveHeight(2)
          }} />




          {/*Post_feed_Containor */}


          <Postfeedcontainor />



        </View>

      </ScrollView>

    </>
  )
}