import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, searchQuery, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

//import { styles } from "./styles";
import { useState } from 'react';
// const HomeScreen = () => {

//   const navigation = useNavigation();

//   return (
//     <View>
//       <Text style={styles.h1}>HomeScreen</Text>
//       <View style={styles.containerBtn}>
//         <TouchableOpacity 
//           onPress={() => [navigation.navigate("Contact")]}
//           style={styles.btn}
//         >
//           <Text style={styles.textBtn}>Contact Us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => [navigation.navigate("Cart")]}
//           style={styles.btn}
//         >
//           <Text style={styles.textBtn}>Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;



const Timeline = () => {

  const navigation = useNavigation();
  const [search, setSearch] = useState('')

  const jobPosts = [
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

  ];

  const JobPost = ({ profession, companyLogo }) => (
    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
      <View style={styles.inputContainer}>
        <View style={styles.logowithText}>
          <View style={styles.imageContainer}>
            <Image source={companyLogo} style={styles.photo}  resizeMode="stretch"/>
          </View>
          <Text style={styles.title}>{profession}</Text>

        </View>
      </View>
    </ImageBackground>
  );

  const [select, setSelect] = useState(jobPosts)
  const handleOnPress = (item) => {
    const newItem = select.map((value) => {
      if (item.profession == 'PRODUCER') {
        return (
          navigation.navigate("ProducerSub")
        )
      }
      else if (item.profession == 'DIRECTOR') {
        return (
          navigation.navigate("DirectorSubb")
        )
      }
      else if (item.profession == 'MAKEUP & HAIR STYLIST') {
        return (
          navigation.navigate("MakeUpArtistSub")
        )
      }
      else if (item.profession == 'PRO & CASTING') { // DOUBT FOR IS REMOVE OR NOT
        return (
          navigation.navigate("Director")
        )
      }
      else if (item.profession == 'CAMERAMAN') {
        return (
          navigation.navigate("CameramanSub")
        )
      }
      else if (item.profession == 'ACTOR') { // jUNIOR ARTIST CLASSES
        return (
          navigation.navigate("ActorSub")
        )
      }
      else if (item.profession == 'ART DEPT') {
        return (
          navigation.navigate("ArtDeptSub")
        )
      }
      else if (item.profession == 'ACTION DEPT') {
        return (
          navigation.navigate("ActionDeptSubb")
        )
      }
      else if (item.profession == 'MUSIC DEPT') {
        return (
          navigation.navigate("MusicDirSub")
        )
      }
      else if (item.profession == 'WRITER') {
        return (
          navigation.navigate("WriterSub")
        )
      }
      else if (item.profession == 'DUBBING') {
        return (
          navigation.navigate("DubbingSub")
        )
      }
      else if (item.profession == 'CHOREOGRAPHY') {
        return (
          navigation.navigate("ChoreographySub")
        )
      }
      else if (item.profession == 'EDITOR') {
        return (
          navigation.navigate("EditorSub")
        )
      }
      else if (item.profession == 'PRODUCTION DEPT') {
        return (
          navigation.navigate("ProductionDeptSub")
        )
      }
      else if (item.profession == 'PROSTHETIC') {
        return (
          navigation.navigate("ProstheticSub")
        )
      }
      else if (item.profession == 'DIGITAL CREATOR') { //Not subscreen 
        return (
          navigation.navigate("DigitalCreatorSub")
        )
      }
      else if (item.profession == 'VFX DEPT') {
        return (
          navigation.navigate("VfxSub")
        )
      }
      else if (item.profession == 'COSTUME DEPT') {
        return (
          navigation.navigate("CostumeSub")
        )
      }
      else if (item.profession == 'SOUND EFFECT ENGG') {
        return (
          navigation.navigate("SoundEffectSub")
        )
      }
      else if (item.profession == 'ANIMATOR') {
        return (
          navigation.navigate("AnimatorSub")
        )
      }
      else if (item.profession == 'STILL PHOTOGRAPHER') {
        return (
          navigation.navigate("StillPhotographSub")
        )
      }
      else if (item.profession == 'CELEBRITY MANAGER') {
        return (
          navigation.navigate("CelebrityManSub")
        )
      }
      else if (item.profession == 'DIGITAL IMAGINE DEPT') {// Doubt for Sub Screen
        return (
          navigation.navigate("DigitalImagineSub")
        )
      }
      else if (item.profession == 'MARKETING DEPT') {
        return (
          navigation.navigate("MarketingDeptSub")
        )
      }
      else if (item.profession == 'LIGHTING DEPT') {
        return (
          navigation.navigate("LightingDeptSub")
        )
      }
      else if (item.profession == 'DIGITAL ARTIST') {
        return (
          navigation.navigate("DigitalArtistSub")
        )
      }
      else if (item.profession == 'ACTORS ASSISTANT') {
        return (
          navigation.navigate("ActorAsstSub")
        )
      }
      else if (item.profession == 'TECHNICIAN') {
        return (
          navigation.navigate("TechnicianSub")
        )
      }
      else if (item.profession == 'SPECIAL EFFECTS') {
        return (
          navigation.navigate("SpecialEffectSub")
        )
      }
      else if (item.profession == 'PUBLICITY DESIGNER') {
        return (
          navigation.navigate("PublicityDesignerSub")
        )
      }
      else if (item.profession == 'CRANE OPERATOR') { // DOUBT FOR ONLY ONE SUB
        return (
          navigation.navigate("CraneOperatorSub")
        )
      }
      else if (item.profession == 'ACCOUNTS TEAM') {
        return (
          navigation.navigate("AccountTeamSub")
        )
      }
      else if (item.profession == 'OTHERS') {   // DOES'T HAVE OPTIONS
        return (
          navigation.navigate("Director")
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
      <View style={styles.flatListContainer}>


        <FlatList
          //data={select}
          data={jobPosts.filter((item) => ((item.profession).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (<TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}><JobPost {...item} />
          </TouchableOpacity>)}

        />

      </View>

    </View>
  )
};
export default Timeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'red',


    alignItems: 'center'
  },

  searchBar: {
    width: '95%',
    height: '8%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },

  textInput: {
    borderWidth: 1,
    width: '98%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(5)

  },
  imageContainer: {
    left: responsiveWidth(3),
    width: responsiveWidth(17),
    height: responsiveHeight(8),
   // backgroundColor: '#edf1ed',
    borderRadius: responsiveWidth(35),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1

  },
  flatListContainer: {
    // borderWidth: 2,
    // borderColor: 'yellow',
    width: '100%',
    height: '91%',
    alignItems: 'center',
    marginTop: '1%'

  },
  // box: {

  //   width: responsiveWidth(87.5),
  //   height: responsiveHeight(9),
  //   margin: responsiveHeight(0.3),
  //   borderRadius: responsiveWidth(5),
  //   // backgroundColor: '#fff',
  //   borderWidth: 1,
  // },

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
    margin: responsiveWidth(1)
  },
  photo: {
    // borderWidth:2,
    // borderColor:'red',
    width: responsiveWidth(15.5),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(35),
    //borderRadius: responsiveWidth(20),
    // top: responsiveHeight(0.5)
  }





  // Container: {

  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',

  //   margin: 8,
  //   width: 200,
  //   alignItems: 'center',


  // },


  // box: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   width: 380,
  //   height: 70,
  //   margin: 3,
  //   borderRadius: 20,
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: 'black',

  // },
  // logo: {
  //   width: 60,
  //   height: 60,
  //   borderWidth: 1,
  //   borderRadius: 60,
  //   right: 250,
  //   backgroundColor: '#E9E5E5',
  //   bottom: 3


  //   // left:230,
  //   // top:40,
  //   //margin:5,
  // },
  // title: {
  //   fontSize: 18.5,
  //   fontWeight: 'bold',
  //   color: 'black',
  //   left: 30,
  //   flexWrap: 'wrap',


  //   //marginLeft: 50
  // },




});
//     return (
//       <View>
//         <Text style={styles.h1}>HomeScreen</Text>
//         <View style={styles.containerBtn}>
//           <TouchableOpacity
//             onPress={() => [navigation.navigate("Contact")]}
//             style={styles.btn}
//           >
//             <Text style={styles.textBtn}>Contact Us</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => [navigation.navigate("Cart")]}
//             style={styles.btn}
//           >
//             <Text style={styles.textBtn}>Cart</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };



