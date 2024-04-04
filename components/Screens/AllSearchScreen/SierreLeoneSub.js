import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, Dimensions, useWindowDimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';




const SierreLeoneSub = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  
  const navigation = useNavigation();
  const [search, setSearch] = useState('')

  const SierreLeone = [
    {
      id: '1',
      industry: 'SOLLYWOOD',

      // companyLogo: require('..//Screenshot_2023-11-13_085839-removebg-preview.png'),
    //  logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Tamil-Nadu-PhotoRoom.png'),

     // state:'TN'


    },
    // {
    //   id: '2',
    //   industry: 'LOLLYWOOD',

    // //  logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_PK_LH.png'),
    //   //state:'BR'

    // },

  


  ];
  //-------------------------------------------------------------
  // const IndustryList = ({ industry, logo }) => (
  //   <View style={styles.logowithText}>
  //     <View style={{ display: 'flex', left: responsiveWidth(2), flexWrap: 'wrap' }}>
  //       <Image source={logo} style={styles.logo} />
  //     </View>
  //     <Text style={styles.title}>{industry}</Text>

  //   </View>
  //----------------------------------------------------------------


  const IndustryList = ({ industry, logo, state }) => (
    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
    <View style={styles.logowithText}>
  
      <View style={styles.imageContainer} >
      <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Bg-IMG.png')} style={styles.imgbg}>
        <Image source={logo} style={styles.photo} />
        </ImageBackground>
        {/* <View style={styles.state}>
        <Text style={styles.stateText}>{state}</Text>
      </View> */}
      </View>
      <Text style={styles.title}>{industry}</Text>

    </View>
    </ImageBackground>
  );

  const [select, setSelect] = useState(SierreLeone)
  const handleOnPress = (item) => {
    const newItem = select.map((value) => {
      if (item.industry == 'SOLLYWOOD') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
    


    }
    )
    setSelect(newItem)


  }

  return (

    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput style={styles.textInput}
          placeholder="Search..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <View style={styles.flatListContainer} >

        <FlatList

          data={SierreLeone.filter((item) => ((item.industry).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}><IndustryList {...item} />
            </TouchableOpacity>
          )}
        />

      </View>

    </View>
  )
};
export default SierreLeoneSub;

const styles = StyleSheet.create({


  container: {
    flex: 1,
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'red',


    alignItems: 'center'
  },

  searchBar: {
    width: '100%',
    height: '8%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
   //borderWidth: 1
  },

  textInput: {
    borderWidth: 1,
    width: '95%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(5)

  },
  imageContainer: {
    left: responsiveWidth(3),
    width: responsiveWidth(16),
    height: responsiveHeight(8),
   // backgroundColor: '#edf1ed',
    borderRadius: responsiveWidth(35),
    alignItems: 'center',
    justifyContent: 'center',
    
   
  

  },
  flatListContainer: {
    // borderWidth: 2,
    // borderColor: 'yellow',
    width: '100%',
    height: '90%',
    alignItems: 'center',
    paddingTop:'1%'

  },
  // box: {

  //   width: responsiveWidth(95),
  //   height: responsiveHeight(9),
  //   margin: responsiveHeight(0.3),
  //   borderRadius: responsiveWidth(5),
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(9.2),
    width: responsiveWidth(87.5),
    margin: responsiveWidth(1),
    justifyContent:'center',
    

},
  logowithText: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
   
  },
  logo: {

    backgroundColor: '#E9E5E5',
    bottom: responsiveHeight(0.4)
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    left: responsiveWidth(6),
  },
  photo:{
    width: responsiveWidth(13),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(25),
    top:responsiveHeight(0.9),
    left:responsiveWidth(1.5),
    


  },
  state:{
    position:'absolute',
    borderRadius:responsiveWidth(1.5),
    height:responsiveHeight(2),
    width:responsiveWidth(7),
    backgroundColor:'#1c00d6',
    top:responsiveHeight(6),
    left:responsiveWidth(4.5),
    //opacity:2
  },
  stateText:{
    textAlign:'center',
    fontWeight:'bold',
    color:'white'
  },
  imgbg:{
    width: responsiveWidth(16),
    height: responsiveHeight(8),

  }




});