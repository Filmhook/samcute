// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Button } from 'react-native-paper';

// const SearchBar = () => {
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState('');
//   const [data, setData] = useState([
//     'Accounts Team',
//     'Action Dept',
//     'Actor',
//     'Actors Assistant',
//     'Animator',
//     'Art Dept',
//     'Cameraman',
//     'Casting Director',
//     'Celebrity Manager',
//     'ChoreoGraphy',
//     'Costume Dept',
//     'Crane Operator',
//     'Digital Artist',
//     'Digital Creator',
//     'Digital Imagine Dept',
//     'Director',
//     'Dubbing',
//     'Editor',
//     'Lighting Dept',
//     'Makeup & Hair Stylist',
//     'Marketing Dept',
//     'Music Dept',
//     'Other',
//     'Pro',
//     'Producer',
//     'Production Dept',
//     'Prosthetic',
//     'Sound Effect Engg',
//     'Special Effects',
//     'Still Photographer',
//     'Technicians',
//     'VFX Dept',
//     'Writter',
//     'publicity Designer',
//   ]);

//   const filteredData = data.filter(item =>
//     item.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const handleNavigation = (item) => {
//     // Add logic to navigate based on the item selected
//     switch(item) {
//       case 'Accounts Team':
//         navigation.navigate('AccountsTeamScreen'); // Replace 'AccountsTeamScreen' with your respective screen name
//         break;
//       case 'Action Dept':
//         navigation.navigate('ActionDeptScreen'); // Replace 'ActionDeptScreen' with your respective screen name
//         break;
//       // Add cases for other items as needed
//       default:
//         navigation.navigate('DefaultScreen'); // Navigate to a default screen when no specific case matches
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.open}>
//       <Button onPress={() => handleNavigation(item)}>
//         <Text style={{borderWidth:2, borderRadius:20, padding:10, width:340, textAlign:'center', fontSize:19, alignSelf:'center',}}>{item}</Text>
//       </Button>
//     </View>
//   );

//   const handleFloatingButtonPress = () => {
//     // Navigate to another screen when the button is pressed
//     navigation.navigate('ScreenOne');
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Search..."
//         onChangeText={text => setSearchText(text)}
//         value={searchText}
//         style = {{borderWidth:1,borderRadius:20,margin:5,}}
//       />
//       <FlatList
//         data={filteredData}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         style = {{height:620}}
//       />
//       {/* Floating Button */}
//       <TouchableOpacity
//         style={styles.floatingButton}
//         onPress={handleFloatingButtonPress}
//       >
//         <Image
//         source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
//         style={{ width: 35, height: 36, tintColor: 'white', alignSelf:'center'}}
//       />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   floatingButton: {
//     position: 'absolute',
//     bottom: 90,
//     right: 20,
//     backgroundColor: 'blue',
//     borderRadius: 70,
//     padding: 10,
//     width:60,
//     height:60
//   },
//   open:{
//     position:'relative',
//     display:'flex',
//   }
// });

// export default SearchBar;
//=========================================================
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, ImageBackground,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SearchBar = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  //const [selectedJobTitle, setSelectedJobTitle] = useState(''); 
  const [data, setData] = useState([
    'Accounts Team',
    'Action Dept',
    'Actor',
    'Actors Assistant',
    'Animator',
    'Art Dept',
    'Cameraman',
    'Casting Director',
    'Celebrity Manager',
    'Choreography',
    'Costume Dept',
    'Crane Operator',
    'Digital Artist',
    'Digital Creator',
    'Digital Imagine Dept',
    'Director',
    'Dubbing',
    'Editor',
    'Lighting Dept',
    'Makeup & Hair Stylist',
    'Marketing Dept',
    'Music Dept',
    'Other',
    'PRO',
    'Producer',
    'Production Dept',
    'Prosthetic',
    'Sound Effect Engg',
    'Special Effects',
    'Still Photographer',
    'Technicians',
    'VFX Dept',
    'Writter',
    'publicity Designer',
  ]);

  //for searchbar filter log
  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );
  //for searchbar filter log

  const handleNavigation = (selectedJobTitle) => {
    // const propval = e._dispatchInstances.memoizedProps.children[0].props.children
    navigation.navigate('Timeline', { selectedJobTitle });
  };

  // flatlist renderitem
  const renderItem = ({ item: JobTitle }) => (
    <View style={styles.open}>
       <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
        <View style={styles.inputContainer}>
      <TouchableOpacity onPress={() => handleNavigation(JobTitle)}  style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{  width: responsiveWidth(85),   height: responsiveHeight(8.5), textAlign: 'center',justifyContent:'center', fontSize: responsiveFontSize(2.5),  color: '#000000', fontWeight: 'bold', top:responsiveHeight(2)}}>{JobTitle}</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
  // flatlist renderitem

  //floatbuttonnavigation
  const handleFloatingButtonPress = () => {
    navigation.navigate('ScreenOne');
  };
  //floatbuttonnavigation

  //locationfunction

  const [countrytext, setCountrytext] = useState("");



  // ======================================================

  const [visible, setVisible] = useState(false)
  const handle_location = () => {
    console.log('handle_location');
    setVisible(!visible)
  }

  // country item render 
  const Countryrender = ({ item }) => {
    return (
      <ScrollView style={{ left: responsiveWidth(2), width: responsiveWidth(50), top: 0 }}>
        <TouchableOpacity style={{ width: responsiveWidth(40), height: responsiveHeight(5), top: responsiveHeight(2), alignItems: 'center', left: responsiveWidth(12) }}>
          <Text>{item.value}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const country = [
    { key: '1', value: 'valasaravakkam,chennai' },
    { key: '2', value: 'royapettah,chennai' },
    { key: '3', value: 'vadapalani,chennai' },
    { key: '4', value: 'tnagar,chennai' },
    { key: '5', value: 'gundy,chennai' },
    { key: '6', value: 'shridevikuppam,chennai' },
    { key: '7', value: 'vijayanagar,chennai' },
    { key: '8', value: 'KK nagar,chennai' },
    { key: '9', value: 'Porur,chennai' },
    { key: '10', value: 'Kesavardhini,chennai' }
  ]
  //locationfunction

  return (
    <>
    <ScrollView>
      <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:'#f5f5f5',  }}>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="Search for Jobs"
            placeholderTextColor={'black'}
            onChangeText={text => setSearchText(text)}
            
            value={searchText}
            style={{ borderRadius: responsiveWidth(5), width: '90%', textAlign: 'center', margin: responsiveHeight(0.8), backgroundColor: '#F5F5F5', color: 'black', fontSize: responsiveFontSize(2), fontWeight: '400',borderColor:'black',borderWidth:responsiveWidth(0.4)}}
          />
          {/* //////////////////////////////////////////// */}

          {/* ----------search icon----------------- */}
          <View
            style={{
              width: responsiveWidth(8), height: responsiveHeight(4), position: 'absolute', top: responsiveHeight(1.5)
              , left: responsiveWidth(4)
            }}>
            <Image source={require('../../../components/Assets/Audition_Icons_Fonts/Search_icon.png')} style={{ width: '100%', height: '100%' }} />
          </View>
          {/* ----------search icon----------------- */}
          {/* ----------loc filter icon----------------- */}
          <TouchableOpacity
            onPress={handle_location}
            style={{ width: responsiveWidth(8.3), height: responsiveHeight(4), position: 'absolute', top: responsiveHeight(1.5), right: responsiveWidth(6) }}>
            <Image source={require('../../../components/Assets/Audition_Icons_Fonts/filter_tickmark.png')} style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>

        </View>
        {/* ----------loc filter icon----------------- */}
        {/* ----------loc filter text----------------- */}
        <View
          style={{ width: responsiveWidth(55), height: (responsiveHeight(4.3)), alignSelf: 'flex-end', right: responsiveWidth(2), flexDirection: 'row' }}
        >
          <View
            style={{ width: responsiveWidth(5), height: responsiveHeight(4) }}>
            <Image source={require('../../../components/Assets/Audition_Icons_Fonts/pin_location_icon.png')} style={{ width: '100%', height: '100%' }} />
          </View>
          <View
            style={{ width: responsiveWidth(51), height: responsiveHeight(4), left: responsiveWidth(2), justifyContent: 'flex-end' }}>
            <Text
              style={{ fontSize: responsiveFontSize(2), color: '#000000', fontWeight: '400' }}>Valasaravakkam,Chennai</Text>
          </View>
        </View>
        {/* ----------loc filter text----------------- */}
        <View style={{alignItems:'center',justifyContent:'center',height:responsiveHeight(70)}}>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={{ height: '90%', width: '95%', }}
        />
        </View>

        {/* Floating Button */}

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleFloatingButtonPress}
        >
          <Image
            source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
            //   style={{ width: 35, height: 36, tintColor: 'white', alignSelf:'center'}}
            style={{ width: responsiveWidth(9), height: responsiveWidth(9),borderRadius:responsiveWidth(9),  alignSelf: 'center',  }}
          />
        </TouchableOpacity>
       
       
      </View>
      {/* Modal for location */}
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={responsiveHeight(-50)}>
        <Modal
          isVisible={visible}
          onBackdropPress={() => setVisible(!visible)}
          //  backdropTransitionInTiming={500}
          //  backdropTransitionOutTiming={0}
          backdropOpacity={0}
          animationIn={"fadeIn"}
          animationOut={'fadeOut'}
        >
          <View
            style={{ borderWidth: 1, position: 'absolute', width: responsiveWidth(70), height: responsiveHeight(40), left: responsiveWidth(20), top: responsiveWidth(28), backgroundColor: "#ffffff", borderRadius: responsiveWidth(3) }}>
            <View>
              <TextInput
                multiline
                placeholder='Search...'
                value={countrytext}
                onChangeText={text => setCountrytext(text)}
                style={{
                  width: responsiveWidth(60), height: responsiveHeight(4), borderWidth: responsiveWidth(0.2), top: responsiveWidth(3),
                  left: responsiveWidth(5), borderRadius: responsiveWidth(3),
                  fontSize: responsiveFontSize(1.2)
                }} />
              <View>
                <FlatList
                  data={country}
                  renderItem={({ item }) => <Countryrender item={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  style={{ height: responsiveHeight(33.5), top: responsiveHeight(2) }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: responsiveHeight(6),
    right: responsiveWidth(7),
    backgroundColor: '#1c00d6',
    borderRadius: responsiveWidth(12),
    //padding: '18%',
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    elevation: 10,
    opacity:0.5,
    justifyContent:'center',
    alignItems:'center'
  },
  // open: {
  //   flexDirection: 'row',
  //    justifyContent: 'center',
  //   alignItems: 'center',
  //   // marginBottom: responsiveHeight(2),

  //   borderColor: 'gray',
  //   borderWidth: responsiveWidth(0.4),
  //   //  paddingHorizontal: responsiveWidth(8),
  //    borderRadius: responsiveWidth(3),
  //   height: responsiveHeight(8.5),
  //   width: responsiveWidth(87.5),
  //   // borderColor: 'gray',
  //   margin: responsiveWidth(1)

  // },
  inputContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',this is working code
    // borderColor: 'gray',
    // height: responsiveHeight(8.6), 
    // width: responsiveWidth(85.9),
    // margin: responsiveWidth(1),

    //
      // marginBottom: responsiveHeight(2),
     // justifyContent: 'center',
      //borderWidth: responsiveWidth(0.4),
    //  paddingHorizontal: responsiveWidth(8),
    // borderRadius: responsiveWidth(1),
     // borderColor: 'gray',
   
     flexDirection: 'row',
     alignItems: 'center',
     borderColor: 'gray',
    //  height: windowHeight * 0.099,
    //  width: windowWidth * 0.890,
    //  margin: windowWidth * 0.01,
    height: windowHeight * 0.085,
    width: windowWidth * 0.895,
    margin: windowWidth * 0.01,

  },
});

export default SearchBar;