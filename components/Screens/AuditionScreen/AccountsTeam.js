// import React from 'react'
// import { Text, View, TouchableOpacity } from 'react-native'
// import { useNavigation } from '@react-navigation/native';

// export default function AccountsTeamScreen() {
//     const navigation = useNavigation();
//   return (
//     <View>
//         <Text>AccountsTeamScreen</Text>
//         <TouchableOpacity
//         onPress={() => navigation.navigate("SearchBars")}
//         style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 100, alignSelf: 'center', top:30, right:140}}
//       >
//         <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>Back</Text>
//         </TouchableOpacity>
//     </View>
//   )
// }
//====================

import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function AccountsTeamScreen() {
    const navigation = useNavigation();
  return (
    <View>
        <Text>AccountsTeamScreen</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate("SearchBars")}
        style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 100, alignSelf: 'center', top:30, right:140}}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>Back</Text>
        </TouchableOpacity>
    </View>
  )
}

