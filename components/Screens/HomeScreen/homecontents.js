import { View, ScrollView,} from 'react-native'
  import React from 'react'

import Storycontainor from './Storycontainor'
import Postfeedcontainor from './postfeedcontainor'
import Posts from './Posts'
import StatusPost from './statusPost'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'



export default function Homecontents() {
  return (
   <> 
   <ScrollView>
      <View> 

           {/* Statuspost_containor */}
               <StatusPost/>

               <View style={{borderBottomWidth: responsiveWidth(2),
              borderBottomColor: '#D7D7D7', 
              marginVertical: responsiveHeight(1)}}/>

        {/* Story_containor */}
       
             
              <Storycontainor />
             

              <View style={{borderBottomWidth: responsiveWidth(1),
              borderBottomColor: '#D7D7D7',
              marginVertical: responsiveHeight(1)}}/>


              

        {/*Post_feed_Containor */}

         
              <Postfeedcontainor />
            
          
       
      </View>

    </ScrollView>
   
   </>
  )
}