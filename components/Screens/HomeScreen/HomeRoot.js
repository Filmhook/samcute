import { View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Homecontents from './homecontents';
import Posts from './Posts';
import ProfileRoot from '../UserProfileScreen/ProfileMain/ProfileRoot';

import Link from './homepage_functions/Link';
import PromoteEdit from './homepage_functions/PromoteEdit'
import Promote from './homepage_functions/Promote';
import Postfeedcontainor from './postfeedcontainor';
import GoLive from './homepage_functions/GoLive';
import Status from './homepage_functions/Status';
import UserProfile from '../UserProfile';


// import { ScrollView } from 'react-native-gesture-handler';




export default function HomeRoot() {
  const Stack = createNativeStackNavigator();
  
  return (
   <> 
           <Stack.Navigator  >
                <Stack.Screen name='homecontents' component={Homecontents} options={{headerShown:false}}/>
                <Stack.Screen  name='Posts' component={Posts}  options={{headerShown:false}}/>
                <Stack.Screen name='profilepage' component={ProfileRoot} options={{headerShown:false}} />
                <Stack.Screen name='GoLive' component={GoLive} options={{headerShown:false}}/>
                <Stack.Screen name='PromoteEdit' component={PromoteEdit} options={{headerShown:false}} />
                <Stack.Screen name='Promote' component={Promote} options={{headerShown:false}} />
                <Stack.Screen name='Link' component={Link} options={{headerShown:false}}/>
                <Stack.Screen name='Homecontents' component={Homecontents} options={{headerShown:false}}/>
                {/* <ScrollView>
                  <View> */}
                <Stack.Screen name="Status" component={Status} />
                <Stack.Screen component={UserProfile} name='UserProfile' options={{ headerShown: false }} />
               
                {/* </View>
                </ScrollView> */}
           </Stack.Navigator>
                    
   </>
  )
}

// import { View, Text } from 'react-native'
// import React from 'react'
// import MainScreen from './m'

// export default function HomeRoot() {
//   return (
//     <View>
//       <Text>hi</Text>
//     </View>
//   )   
// }