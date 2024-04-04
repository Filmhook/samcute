import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import SignUpOne from './G_S_One';
import SignUpTwo from './G_S_Two';
import SignUpThree from './G_S_Three';
import Industry_S_Five from './I_S_Five';
import Industry_S_One from './I_S_One';
import Industry_S_Two from './I_S_Two';
import Industry_S_Three from './I_S_Three';
import Industry_S_Four from './I_S_Four';
import Industry_Ack from './Acknowledgement';
import Subscription from './Subscription';
import Terms_Conditions from './TermsAndConditions';
import ProfileRoot from '../../UserProfileScreen/ProfileMain/ProfileRoot';
import Login from '../SignIn/Login';
import Forgetpass from '../SignIn/ForgotPassword';
import General_Ack from './AcknowledgrmentGeneral';
import Terms_Conditions_Industry from './Term_Condition_Industry';
import Industry_S_Confirm from './I_S_Confirm';
import ChangePasswordScreen from '../SignIn/changePassword';

import SignUp_Login from '../SignIn/signup_login';
import SignOut_Login from '../SignIn/signout_login';

const Stack = createNativeStackNavigator();

export default function SignUpRoot() {
    return (



        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen component={SignUpOne} name="SignUpOne" options={{ headerShown: false }} />
            <Stack.Screen component={SignUpTwo} name="SignUpTwo" options={{ headerShown: false }} />
            <Stack.Screen component={SignUpThree} name="SignUpThree" options={{ headerShown: false }} />

            <Stack.Screen component={Industry_S_One} name="IndustryOne" options={{ headerShown: false }} />
            <Stack.Screen component={Industry_S_Two} name="IndustryTwo" options={{ headerShown: false }} />
            <Stack.Screen component={Industry_S_Three} name="IndustryThree" options={{ headerShown: false }} />
            <Stack.Screen component={Industry_S_Four} name="IndustryFour" options={{ headerShown: false }} />
            <Stack.Screen component={Industry_S_Five} name="IndustryFive" options={{ headerShown: false }} />
            <Stack.Screen component={Industry_Ack} name="IndustryAck" options={{ headerShown: false }} />
            <Stack.Screen component={Subscription} name="Subscription" options={{ headerShown: false }} />
            <Stack.Screen component={Terms_Conditions} name="Terms&Conditions" options={{ headerShown: false }} />
            <Stack.Screen component={ProfileRoot} name="ProfileRoot" options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login}
                options={{ headerShown: false }} />
            <Stack.Screen name='SignUpLogin' component={SignUp_Login}
                options={{ headerShown: false }} />
            <Stack.Screen name='SignOutLogin' component={SignOut_Login}
                options={{ headerShown: false }} />


            <Stack.Screen name='Forgetpass' component={Forgetpass} options={{ headerShown: false }} />

            <Stack.Screen name='changePassword' component={ChangePasswordScreen} options={{ headerShown: false }} />

            <Stack.Screen name='GeneralAck' component={General_Ack}
                options={{ headerShown: false }} />


            <Stack.Screen name='Terms_Conditions_Industry' component={Terms_Conditions_Industry}
                options={{ headerShown: false }} />

            <Stack.Screen name='Industry_S_Confirm' component={Industry_S_Confirm}
                options={{ headerShown: false }} />




        </Stack.Navigator>




    )
}

// import { View, Text } from 'react-native'
// import React from 'react'
// import Login from '../SignIn/Login'

// export default function Chatroot() {
//   return (
//     <View>
//       <Login/>
//     </View>
//   )
// }