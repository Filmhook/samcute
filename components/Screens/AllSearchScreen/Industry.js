import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, Dimensions, useWindowDimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';




const India = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  //   const navigation = useNavigation();
  //   const [searchText, setSearchText] = useState('');
  //   const [data, setData] = useState([
  //     'TOLLYWOOD',
  //     'BHOJIWOOD',
  //     'CHHOLLYWOOD',
  //     'KONKANI CINEMA',
  //     'DHOLLYWOOD',
  //     'HARYANVI CINEMA',
  //     'PAHARIWOOD',
  //     'PAHARIWOOD',
  //     'JHOLLYWOOD',
  //     'SANDALWOOD',
  //     'COSTALWOOD',
  //     'KONKANI CINEMA',
  //     'MOLLYWOOD',
  //     'BOLLYWOOD',
  //     'MOLLYWOOD',
  //     'OLLYWOOD',
  //     'POLLYWOOD',
  //     'RAJJYWOOD',
  //     'KOLLYWOOD',
  //     'TOLLYWOOD',
  //     'UTHARKHAND CINEMA',
  //     'BENGALI CINEMA',
  //   ]);

  //   const filteredData = data.filter(item =>
  //     item.toLowerCase().includes(searchText.toLowerCase())
  //   );

  //   const renderItem = ({ item }) => (
  //     <View style ={styles.open}>
  //         <Button onPress={() => navigation.navigate("Tollywood")}>
  //     <Text style={{borderWidth:2, borderRadius:20, padding:10, width:340, textAlign:'center', fontSize:19, alignSelf:'center',}}>{item}</Text>
  //     </Button>
  //     </View>
  //   );

  //   return (
  //     <View style ={{backgroundColor:'white'}}>
  //         <View style={{height:100}}>
  //         <TouchableOpacity
  //         onPress={() => navigation.navigate("CountryPage")}
  //         style={{ backgroundColor: 'white', borderRadius: 30, marginTop: 10, width: 55,height: 55, alignSelf: 'center', top:7, right:170}}
  //       >
  //        <Image
  //         source={require('./components/images/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png')}
  //         style={{ width: 40, height: 40, alignSelf:'center', bottom:1}}
  //       />
  //         </TouchableOpacity>
  //       <TextInput
  //         placeholder="Search..."
  //         onChangeText={text => setSearchText(text)}
  //         value={searchText}
  //         style = {{borderWidth:1,borderRadius:20,margin:3, width:300, left:80,bottom:50}}
  //       />
  //       </View>
  //       <FlatList
  //         data={filteredData}
  //         keyExtractor={(item, index) => index.toString()}
  //         renderItem={renderItem}
  //         style = {{height:600}}
  //       />
  //       {/* Floating Button */}
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   open:{
  //     position:'relative',
  //     display:'flex',
  //   }
  // });

  const navigation = useNavigation();
  const [search, setSearch] = useState('')

  const india = [
    {
      id: '1',
      industry: 'KOLLYWOOD',

      // companyLogo: require('..//Screenshot_2023-11-13_085839-removebg-preview.png'),
      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Tamil-Nadu-PhotoRoom.png'),

      state: 'TN'


    },
    {
      id: '2',
      industry: 'BHOJIWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/bihar-PhotoRoom.png'),
      state: 'BR'

    },

    {
      id: '3',
      industry: 'CHHOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Chhattisgarh-PhotoRoom.png'),
      state: 'CH'

    },
    {
      id: '4',
      industry: 'KONKANI CINEMA',
      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Goa.png'),
      state: 'GA'
    },


    {
      id: '5',
      industry: 'DHOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-gujarat-PhotoRoom.png'),
      state: 'GJ'

    },
    // {
    //   id: '6',
    //   profession: 'MAKEUP&AIR STYLISTRODUCER',

    //   companyLogo: require('./components/images/cameraicon.png'),

    // },
    {
      id: '7',
      industry: 'HARYANVI CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Haryana-PhotoRoom.png'),
      state: 'HR'

    },
    {
      id: '8',
      industry: 'PAHARIWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-himachal-pradesh.png'),
      state: 'HP'

    },
    {
      id: '6',
      industry: 'PAHARIWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-J_K-PhotoRoom.png'),
      state: 'JK'

    },
    {
      id: '9',
      industry: 'JHOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-JH.png'),
      state: 'JH'

    },
    {
      id: '10',
      industry: 'SANDALWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-KALR-PhotoRoom.png'),
      state: 'KA'

    },
    {
      id: '11',
      industry: 'COASTALWOOD',  //Replaced name ,spell mistake on wireFrame

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Coastal-KA-PhotoRoom.png'),
      state: 'KA'

    },
    {
      id: '12',
      industry: 'KONKANI CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Coorg-KA-PhotoRoom.png'),
      state: 'KA'

    },
    {
      id: '13',
      industry: 'MOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-KL-PhotoRoom.png'),
      state: 'KL'

    },
    {
      id: '14',
      industry: 'BOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Mumbai-PhotoRoom.png'),
      state: 'MH'

    },
    {
      id: '15',
      industry: 'MOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-maharashtra-PhotoRoom.png'),
      state: 'MH'

    },
    {
      id: '16',
      industry: 'OLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-orissa-PhotoRoom.png'),
      state: 'OR'

    },
    {
      id: '17',
      industry: 'POLLYWOOD',
      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Punjab-PhotoRoom.png'),
      state: 'PB'

    },
    {
      id: '18',
      industry: 'RAJJYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-RJ-PhotoRoom.png'),
      state: 'RJ'

    },
    {
      id: '19',
      industry: 'TOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Hyderabad-PhotoRoom.png'),
      state: 'TS'

    },
    {
      id: '20',
      industry: 'TOLLYWOOD',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-Andhra-Pradesh-PhotoRoom.png'),
      state: 'AP'

    },
    {
      id: '21',
      industry: 'UTHARKHAND CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-UK-PhotoRoom.png'),
      state: 'UK'

    },

    {
      id: '23',
      industry: 'BENGALI CINEMA',

      logo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Filmhook-WB-PhotoRoom.png'),
      state: 'WB'

    },




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
      <View style={styles.inputContainer}>
        <View style={styles.imageContainer} >

          <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Bg-IMG.png')} style={styles.imgbg} resizeMode='stretch'>
            <Image source={logo} style={styles.photo} resizeMode='stretch'/>
          </ImageBackground>
          <View style={styles.state}>
            <Text style={styles.stateText}>{state}</Text>
          </View>
        </View>
        <Text style={styles.title}>{industry}</Text>

      </View>
    </ImageBackground>
  );

  const [select, setSelect] = useState(india)
  const handleOnPress = (item) => {
    const newItem = select.map((value) => {
      if (item.industry == 'KOLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'BHOJIWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      // else if(item.profession=='DIRECTOR'){
      //   return(
      //     navigation.navigate("Cart")
      //   )
      // }
      else if (item.industry == 'CHHOLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'KONKANI CINEMA') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'DHOLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'HARYANVI CINEMA') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'PAHARIWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'JHOLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'SANDALWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'COASTALWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'KONKANI CINEMA') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'MOLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'BOLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'OLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'POLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'RAJJYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'TOLLYWOOD') {
        return (
          navigation.navigate("ScreenOne")
        )
      }

      else if (item.industry == 'UTHARKHAND CINEMA') {
        return (
          navigation.navigate("ScreenOne")
        )
      }
      else if (item.industry == 'BENGALI CINEMA') {
        return (
          navigation.navigate("ScreenOne")
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

          data={india.filter((item) => ((item.industry).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}
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
export default India;

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
    paddingTop: '1%'

  },
  box: {

    // width: responsiveWidth(87.5),
    // height: responsiveHeight(9),
    //margin: responsiveHeight(0.3),
    // borderRadius: responsiveWidth(5),

  },

  // logowithText: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignItems: 'center',
  //   margin: responsiveWidth(1),
  //   width: responsiveWidth(70),
  //   height: responsiveHeight(5),
  // },
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
  photo: {
    width: responsiveWidth(13),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(25),
    top: responsiveHeight(0.9),
    left: responsiveWidth(1.5),



  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(9.2),
    width: responsiveWidth(87.5),
    margin: responsiveWidth(1)
  },
  state: {
    position: 'absolute',
    borderRadius: responsiveWidth(1.5),
    height: responsiveHeight(2),
    width: responsiveWidth(7),
    backgroundColor: '#1c00d6',
    top: responsiveHeight(6),
    left: responsiveWidth(4.5),
    //opacity:2
  },
  stateText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  imgbg: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),

  }




});