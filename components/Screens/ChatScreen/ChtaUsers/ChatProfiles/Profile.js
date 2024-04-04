import { useNavigation } from '@react-navigation/native';
import React,{useEffect} from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList, Image, ScrollView } from 'react-native';

//import Chatinputscreen from '../../Chatinbox/inbox_root/inboxroot';


export default function Chatprofiles({ items }) {
   
  const navigation = useNavigation();

  
    // navigation.getParent()?.setOptions({tabBarStyle: {display: 'hidden'}})
    
     
   
  return (
        <>  
      <FlatList
      style={{marginTop:10,marginBottom:60}}
        data={items}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={()=>navigation.navigate('chatinbox',{
            data:items
            })}>
            <View style={style.Chatprofiles}>
              <Text style={style.Chatprofiles_name}>{item.name}</Text>
              <Text style={style.Chatprofiles_profession}> {item.Profession} </Text>
              <Text style={style.Chatprofiles_message}>{item.Message} </Text>
              <Text style={style.Chatprofiles_time}>{item.Time}</Text>
              <Image source={require("../../../../../components/Assets/Chats_Icon_And_Fonts/userprofile.png")} style={style.Chatprofiles_photo} />
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id}
      />
       
    </>
  );
}

const style = StyleSheet.create({
    Chatprofiles:{
        height:100,
        width:"90%",
        borderRadius:20,
        marginBottom:10,
        marginLeft:20,
        borderWidth:1,
        borderColor:"black",
    },
    Chatprofiles_name:{
        marginLeft:100,
        marginTop:10,
        fontSize:20,
        fontWeight:"900",
        color:"black"
    },
    Chatprofiles_profession:{
        marginLeft:95,
        fontSize:15
    },
    Chatprofiles_message:{
        marginLeft:100, 
        fontSize:21
    },
    Chatprofiles_time:{
         marginTop:-80,
         marginLeft:300
    },
    Chatprofiles_photo:{
        width:60,
        height:60,
        borderWidth:1,
        borderRadius:40,
        marginLeft:15,
        marginTop:-15
    }
})