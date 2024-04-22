// import { View, Text } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

// import Logout from './NavigationScreen/Logout';
// import SignUpRoot from './UsersLogState/SignUp/signUpRoot';
// import Tabbar from './tabbar';




// const Stack = createNativeStackNavigator();

// export default function Appnavigator() {
//   return (
//     <>
//     <NavigationContainer>
//           <Stack.Navigator >
//                 <Stack.Screen component={SignUpRoot}  name='SearchRoot'options={{headerShown:false}}/>
//                 <Stack.Screen  component={Tabbar} name='Tabbar' options={{headerShown:false}}/>
//                 <Stack.Screen component={Logout} name='Logout' options={{headerShown:false}}/>
//           </Stack.Navigator> 
//      </NavigationContainer>
//     </>
//   )
// }

//============================================
import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Tabbar from './tabbar';
import Logout from './NavigationScreen/Logout';
import SignUpRoot from './UsersLogState/SignUp/signUpRoot';
import PinnedProfile from './NavigationScreen/PinnedProfile';
import BlockedProfiles from './NavigationScreen/BlockProfile';
import Neartome from './NavigationScreen/NearToMe';
import HelpAndSupport from './NavigationScreen/Help_Support';
import Settings from './NavigationScreen/Settings';
import ProfileEditPage from './UserProfileScreen/ProfileEdit/EditRoot';
import BioRoot from '../BioRoot';
import ProfileRoot from './UserProfileScreen/ProfileMain/ProfileRoot';
import PersonalRoot from '../PersonalRoot';
import Profilepic_edit_page from './UserProfileScreen/ProfileEdit/ProfilePic';
import BiographyEdit from './UserProfileScreen/ProfileMain/BiographyEdit';
import ChangePasswordScreen from './NavigationScreen/ChangePasswordScreen';
import Biography from './UserProfileScreen/ProfileMain/BioGraphy';





const Stack = createNativeStackNavigator();

export default function Appnavigator() {
  return (
    <>
      <NavigationContainer>
        
        <Stack.Navigator >
          <Stack.Screen component={SignUpRoot} name='SearchRoot' options={{ headerShown: false }} />
          <Stack.Screen component={Tabbar} name='Tabbar' options={{ headerShown: false }} />
          <Stack.Screen component={Logout} name='Logout' options={{ headerShown: false }} />
          <Stack.Screen component={PinnedProfile} name='PinnedProfile' options={{ headerShown: false }} />
          <Stack.Screen component={BlockedProfiles} name='BlockedProfiles' options={{ headerShown: false }} />
          <Stack.Screen component={Neartome} name='Neartome' options={{ headerShown: false }} />
          <Stack.Screen component={HelpAndSupport} name='HelpAndSupport' options={{ headerShown: false }} />
          <Stack.Screen component={Settings} name='Settings'
            options={{ headerShown: false }} />
          <Stack.Screen component={ProfileEditPage} name='ProfileEditPage' options={{ headerShown: false }} />
          <Stack.Screen component={BioRoot} name='BioRoot' options={{ headerShown: false }} />
          <Stack.Screen component={ProfileRoot} name='ProfileRoot' options={{ headerShown: false }} />
          <Stack.Screen component={PersonalRoot} name='PersonalRoot' options={{ headerShown: false }} />
          <Stack.Screen component={Profilepic_edit_page} name='Profilepic_edit_page' options={{ headerShown: false }} />

          <Stack.Screen component={BiographyEdit} name='BiographyEdit' options={{ headerShown: false }} />

          <Stack.Screen component={ChangePasswordScreen} name='ChangePasswordScreen' options={{ headerShown: false }} />

          <Stack.Screen component={Biography} name='Biography' options={{ headerShown: false }} />








        </Stack.Navigator>
      </NavigationContainer>
       
  
    </>
  )
}