import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, Image, StyleSheet, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default function ScreenTwo() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute()
  const { TitleText, selected, startDate, endDate } = route.params

  // const Next = () => {
  //   if (items.length === 0) {
  //     console.log('No items in the list');
  //     return;
  //   }

  //   // // Reset the state
  //   // setInputText('');
  //   // setItems([]);

  //   // Navigate to ScreenThree
  //   navigation.navigate('ScreenThree',);
  // };
  const addItem = () => {
    if (inputText.trim() !== '') {
      setItems((prevItems) => [
        ...prevItems,
        { id: prevItems.length + 1, text: inputText.trim() }, // Trim the input text
      ]);
      setInputText(''); // Clear inputText after adding an item
    }
    console.log(TitleText, selected, startDate, endDate, inputText);
    // console.log(items)
  };

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>

      <View style={{ borderRadius: responsiveWidth(5), margin: responsiveWidth(1), backgroundColor: '#e0e3e6', overflow: 'scroll', paddingBottom: responsiveHeight(2), width: responsiveWidth(90), alignSelf: 'center' }}>
        <View style={style.headerContainer}>
          <Image style={{
            height: responsiveHeight(12),
            width: responsiveWidth(25), alignSelf: 'center'
          }} source={require("../../Assets/Login_page/FH_logos.png")} />
          {/* <Text style={styles.header}>Login</Text> */}
        </View>

        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', color: 'black' }}>A Little More</Text>
        <View style={{ borderRadius: responsiveWidth(5), margin: responsiveWidth(1), marginTop: responsiveHeight(1.5) }}>
          <TextInput
            multiline
            maxLength={200}
            placeholder="Type your list of requirements one by one..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            style={{
              borderWidth: 1,
              borderColor: '#004242',
              borderRadius: responsiveWidth(2),
              padding: responsiveHeight(1),
              overflow: 'scroll',
              color: 'black',

              paddingHorizontal: responsiveWidth(5),
              width: responsiveWidth(82), alignSelf: 'center'
            }}
          />

        </View>
        <TouchableOpacity
          onPress={addItem}
          style={{ backgroundColor: '#001adc', borderColor: 'black', opacity: 0.8, borderWidth: responsiveWidth(0.3), width: responsiveWidth(25), height: responsiveHeight(4), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 1 }}>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(1.9), fontWeight: 'bold' }}>
            Add to List
          </Text>
        </TouchableOpacity>
        <View style={{ borderWidth: 1, borderRadius: responsiveWidth(2), margin: responsiveWidth(2), borderColor: '#004242', width: responsiveWidth(82), alignSelf: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', padding: responsiveWidth(3), fontSize: responsiveFontSize(2), color: 'black' }}>
            Your List Of Requirements
          </Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ left: responsiveWidth(2), marginBottom: responsiveHeight(2) }}>
                <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9), color: 'black' }}>{`${item.id}: ${item.text}`}</Text>
              </View>
            )}
            style={{ height: responsiveHeight(15) }}
          />
        </View>
        <View style={{ flexDirection: 'row', columnGap: responsiveWidth(20), marginTop: responsiveHeight(5), marginLeft: responsiveWidth(8) }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ScreenOne", { TitleText, selected, startDate, endDate })}

            style={{
              borderRadius: responsiveWidth(2),
              justifyContent: 'center',

              alignItems: 'center',

              borderWidth: responsiveWidth(0.4),
              backgroundColor: 'black',
              height: responsiveHeight(6),
              width: responsiveWidth(30),
            }}
          >
            {/* <Image
              source={require('../../Assets/Audition_Icons_Fonts/back.png')}
              style={{ width: responsiveWidth(10), height: responsiveHeight(5) }}
            /> */}
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center', fontSize: responsiveFontSize(2), height: responsiveHeight(3)
            }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ScreenThree", { TitleText, selected, startDate, endDate, items, inputText })}

            style={{
              backgroundColor: '#616161',
              // padding: responsiveWidth(2.5),
              borderRadius: responsiveWidth(2),
              justifyContent: 'center',
              alignItems: 'center',
              // alignSelf: 'center',
              height: responsiveHeight(6),
              width: responsiveWidth(30),
              // bottom: responsiveHeight(1.5)
            }}
          >
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center', fontSize: responsiveFontSize(2), height: responsiveHeight(3)
            }}>Next</Text>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  headerContainer: {
    // flexDirection: 'row',
    // alignSelf: 'center',
    marginTop: responsiveHeight(1),
    //bottom:responsiveHeight(5),
    // top:responsiveHeight(5),
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    left: responsiveWidth(30)
    //bottom: responsiveHeight(1)


  },

})