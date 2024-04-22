import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

//import Chatinputscreen from '../../Chatinbox/inbox_root/inboxroot';


export default function Chatprofiles({ items }) {

  const navigation = useNavigation();


  // navigation.getParent()?.setOptions({tabBarStyle: {display: 'hidden'}})

  console.log(items)

  return (

    <FlatList
      style={{ marginTop: 10, marginBottom: 60 }}
      data={items}
      renderItem={({ item, }) => (
        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ChatScreen', {
          data: item
        })}>
          <View style={style.Chatprofiles}>
            <View style={style.Chatprofiles_Left}>
              <Image
                source={require("../../../../../components/Assets/Chats_Icon_And_Fonts/userprofile.png")}
                style={style.Chatprofiles_photo} />
              <View style={style.Chatprofiles_name_ProView}>
                <Text style={style.Chatprofiles_name}>{item.userId === 2 ? 'Jacky' : item.userName}</Text>
                {/* <Text style={style.Chatprofiles_profession}> {item.Profession} </Text> */}
              </View>
            </View>
            {/* <Text style={style.Chatprofiles_message}>{item.Message} </Text> */}
            {/* <Text style={style.Chatprofiles_time}>{item.Time}</Text> */}

          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />


  );
}

const style = StyleSheet.create({
  Chatprofiles: {
    height: 80,
    width: "90%",
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  Chatprofiles_Left: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  Chatprofiles_name_ProView: {
    marginLeft: 10
  },
  Chatprofiles_name: {
    fontSize: 20,
    fontWeight: "900",
    color: "black",
  },

  Chatprofiles_profession: {

    fontSize: 15,
    color: 'grey',
    fontSize: 13,

  },
  Chatprofiles_message: {

    fontSize: 21,
    color: 'grey',
    fontSize: 13,


  },
  Chatprofiles_time: {


    color: 'grey',
    fontSize: 13,


  },
  Chatprofiles_photo: {
    width: 35,
    height: 35,
    borderRadius: 40,


  }
})