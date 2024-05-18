import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, ImageBackground, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import privateAPI from "../../api/privateAPI";

const Timeline = ({route}) => {

  const {selectedIndIds, selectedIds, platfornId}= route.params;

  console.log("selectedIndIdsTimeline",selectedIndIds )
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [professions, setProfessions]= useState([]);


  

  const [data, setData] = useState([
    {
      id: 1,
      profession: 'PRODUCER',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_producer.png'),

    },
    {
      id: '2',
      profession: 'DIRECTOR',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Director.png'),

    },
    {
      id: '3',
      profession: 'PRO & CASTING',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Cameramen.png'),

    },
    { id: '4', profession: 'CAMERAMAN', companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-Screenshot_2023-11-13_093432-removebg-preview.png') },
    {
      id: '5',
      profession: 'ACTOR',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Actor.png'),

    },
    {
      id: '6',
      profession: 'MAKEUP & HAIR STYLIST',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Makup.png'),

    },
    {
      id: '7',
      profession: 'ART DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Art.png'),

    },
    {
      id: '8',
      profession: 'ACTION DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_action.png'),

    },
    {
      id: '9',
      profession: 'MUSIC DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Music.png'),

    },
    {
      id: '10',
      profession: 'WRITER',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_writer.png'),

    },
    {
      id: '11',
      profession: 'DUBBING',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_dubbing.png'),

    },
    {
      id: '12',
      profession: 'CHOREOGRAPHY',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-png-transparent-ballet-dancer-computer-icons-tap-dance-ballet-dancer-monochrome-fictional-character.png'),

    },
    {
      id: '13',
      profession: 'EDITOR',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Editor.png'),

    },
    {
      id: '14',
      profession: 'PRODUCTION DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Production.png'),

    },
    {
      id: '15',
      profession: 'PROSTHETIC',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Prosthitic.png'),

    },
    {
      id: '16',
      profession: 'DIGITAL CREATOR',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Digital_creator.png'),

    },
    {
      id: '17',
      profession: 'VFX DEPT',
      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/visual-effect-FX.png'),

    },
    {
      id: '18',
      profession: 'COSTUME DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Costume.png'),

    },
    {
      id: '19',
      profession: 'SOUND EFFECT ENGG',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Sound.png'),

    },
    {
      id: '20',
      profession: 'ANIMATOR',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Animator.png'),

    },
    {
      id: '21',
      profession: 'STILL PHOTOGRAPHER',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Photographer.png'),

    },
    {
      id: '22',
      profession: 'CELEBRITY MANAGER',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_CM.png'),

    },
    {
      id: '23',
      profession: 'DIGITAL IMAGINE DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/DID.png'),

    },
    {
      id: '24',
      profession: 'MARKETING DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/marketing_dept.png'),

    },
    {
      id: '25',
      profession: 'LIGHTING DEPT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_LightingDept.png'),

    },
    {
      id: '26',
      profession: 'DIGITAL ARTIST',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/DA.png'),

    },
    {
      id: '27',
      profession: 'ACTORS ASSISTANT',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_PA.png'),

    },
    {
      id: '28',
      profession: 'TECHNICIAN',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Technician.png'),

    },
    {
      id: '29',
      profession: 'SPECIAL EFFECTS',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-1872617-200.png'),

    },
    {
      id: '30',
      profession: 'PUBLICITY DESIGNER',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_PD.png'),

    },
    {
      id: '31',
      profession: 'CRANE OPERATOR',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/CO.png'),

    },
    {
      id: '32',
      profession: 'ACCOUNTS TEAM',
      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/AT.png'),

    },
    {
      id: '33',
      profession: 'OTHERS',

      companyLogo: require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Other.png'),

    },

  ]);



  useEffect(() => {
    fetchProfession();
  }, []);

 const fetchProfession = async () => {
  try {
    const jwt = await AsyncStorage.getItem('jwt');

    if (!jwt) {
      throw new Error('JWT token not found');
    }

    const response = await privateAPI.post(
      'user/getProfessionByPlatform',
      { platformId: platfornId }, // Ensure platformId is defined and correct
      
    );

    const responseData = response.data;
    if (responseData.status === 1) {
      setProfessions(responseData.data[0].professionList);
    } else {
      console.error('Unexpected response status:', responseData.status);
    }
  } catch (error) {
    console.error('Error fetching professions:', error);
  }
};
  const handleOnPress = (item) => {
    // Check if item is already selected
    const index = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);

    if (index === -1) {
      // If item is not selected, add it to the selected items list
      setSelectedItems([...selectedItems, item]);
    } else {
      // If item is already selected, remove it from the selected items list
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(index, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };
  const handleNext = () => {
    const selectedProfessionId=selectedItems.map(item=> item.id)
    console.log("Selected ItemsProfes:", selectedItems.map(item=> item.id));


    // Pass selected items to the next screen
    //navigation.navigate('NextScreen', { selectedItems });
    navigation.navigate('SubProfession', {selectedIndIds, selectedIds, selectedProfessionId, platfornId, })
  };

  const JobPost = ({professionName, image, isSelected }) => (
    
      <ImageBackground style={ styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
        <View style={styles.inputContainer}>
          <View style={styles.logowithText}>
            <View style={styles.imageContainer}>
              <Image source={{uri:image }} style={styles.photo} resizeMode="stretch" />
            </View>
            <Text style={styles.title}>{professionName}</Text>
          </View>
          {isSelected && (
        <Image
          source={require('../../Assets/Login_page/greenTickmark-FilmHook.png')} // Path to your checkmark icon
          style={styles.checkmark}
        />
      )}
        </View>
      </ImageBackground>
    
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor='black'
          placeholder="Search..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={professions.filter((item) => item.professionName.toLowerCase().includes(search.toLowerCase()))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}>
              <JobPost professionName={item.professionName}
                image= {item.iconFilePath}
                isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity  onPress={handleNext} disabled={selectedItems.length === 0}  style={styles.nextContainer}>
      <Text style={styles.next} >Next</Text>
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchBar: {
    width: '95%',
    height: '8%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  textInput: {
    borderWidth: 1,
    width: '98%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(5),
  
  },
  imageContainer: {
    left: responsiveWidth(3),
    width: responsiveWidth(17),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(35),
   
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  flatListContainer: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    marginTop: '1%',
  },
    nextContainer:{
    width:responsiveWidth(20), borderWidth:1,alignItems:'center', justifyContent:'center', height:responsiveHeight(4), borderRadius:responsiveWidth(3), backgroundColor:'#1c00d6',
    left:responsiveWidth(34), margin:responsiveHeight(1)
  },
  next: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize:responsiveFontSize(2)
  },
  checkmark: {
    position: 'absolute',
    top: responsiveHeight(3),
    right: responsiveWidth(6),
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  logowithText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(75),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    left: responsiveWidth(6),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(9.2),
    width: responsiveWidth(87.5),
    margin: responsiveWidth(1),
 
  },
  photo: {
    width: responsiveWidth(15.5),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(35),
    borderColor: 'black', // Example border color
  }
});


export default Timeline;