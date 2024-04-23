import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Profession_project from './Projects'
import Profession_tv_drama_project from './Tv_Drama_Projects'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'



export default function Profession() {

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <>


      <View style={style.bio_title}>
        <TouchableOpacity style={style.bio_title} onPress={toggleExpanded}>
          <Text style={style.bio_title_text}>PROFESSION</Text>

          <View style={{ width: responsiveWidth(5), height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require("../../../Assets/Userprofile_And_Fonts/update/down-arrow.png")}
              style={style.downArrow}
            />
          </View>
        </TouchableOpacity>
      </View>

      {expanded && (

        <View style={style.container}>
          <View style={{ flex: 0.8 }}>

            <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', }}>
              <ImageBackground style={{
                width: '102%',
                height: '102%', right: -10
              }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")} style={{ width: responsiveHeight(8.5), height: responsiveHeight(10), right: -28, top: 4 }} />
              </ImageBackground>
            </View>

          </View>
          <View style={style.bio_content}>
            {/* ///////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")}
                  style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3.8),
                  left: responsiveWidth(12)
                }}>
                  Actor
                </Text>
              </ImageBackground>
            </View>
            <View style={style.bio_content_section_Hero}>
              {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")} 
               style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(0.7),
                  left: responsiveWidth(7),
                }}>
                  Hero
                </Text>
              </ImageBackground>
              <Text style={{
                fontSize: responsiveFontSize(1.55),
                color: '#000000',
                fontWeight: '500',
                fontFamily: "Times New Roman",
                top: responsiveHeight(1.5),
                left: responsiveWidth(3),
              }}>
                1993 - present
              </Text>
            </View>

            {/* ///////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets/Userprofile_And_Fonts/producer_icon.png")}
                  style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3.8),
                  left: responsiveWidth(12)
                }}>
                  Producer
                </Text>
              </ImageBackground>
              <Text style={{
                fontSize: responsiveFontSize(1.55),
                color: '#000000',
                fontWeight: '500',
                fontFamily: "Times New Roman",
                top: responsiveHeight(8),
                left: responsiveWidth(-24),
              }}>
                2013 - 2023
              </Text>
            </View>
            <View style={style.bio_content_section_Producer}>
              {/* <Image source={require("../../../Assets/  Userprofile_And_Fonts/producer_icon.png")} 
               style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(0.8),
                  left: responsiveWidth(3)
                }}>
                  Producer
                </Text>
              </ImageBackground>
            </View>
            {/* ////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>

              <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1), }}>

                <ImageBackground style={{ width: "270%", height: "119%", right: 9, marginTop: responsiveHeight(-1) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                  <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")}
                    style={{ width: responsiveWidth(6.5), height: responsiveHeight(4), }} />
                </ImageBackground>
              </View>

              <Text style={{
                fontSize: responsiveFontSize(2),
                color: '#000000',
                fontWeight: '500',
                fontFamily: "Times New Roman",
                top: responsiveHeight(0.7),
                left: responsiveWidth(12)
              }}>
                105 Films
              </Text>
            </View>
            {/* ///////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets/Userprofile_And_Fonts/Cash_icon.png")}
                  style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3.6),
                  left: responsiveWidth(12)
                }}>
                  Rs.1.75Cr/Day

                </Text>
              </ImageBackground>
            </View>
            {/* ///////////////////////////////////////////////*/}
            {/* ///////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets/Userprofile_And_Fonts/Net_worth_icon.png")}
                  style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3.6),
                  left: responsiveWidth(12)
                }}>
                  Rs.6281 Cr
                </Text>
              </ImageBackground>
            </View>
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require(".../../../components/Assets/AllSearch_Icon_And_Fonts/country/Filmhook-maharashtra-PhotoRoom.png")}
                  style={{
                    width: responsiveWidth(7.8), height: responsiveHeight(4),
                    marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1),
                    backgroundColor: '#B1B4C7',
                    borderRadius: responsiveWidth(4)
                  }} />
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3.6),
                  left: responsiveWidth(13)
                }}>
                  BOLLYWOOD
                </Text>
              </ImageBackground>
            </View>
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("..../../../components/Assets/AllSearch_Icon_And_Fonts/country/FH_TN.png")}
                  style={{
                    width: responsiveWidth(7.8), height: responsiveHeight(4),
                    marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1),
                    backgroundColor: '#B1B4C7',
                    borderRadius: responsiveWidth(4)
                  }} />
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3.6),
                  left: responsiveWidth(11)
                }}>
                  KOLLYWOOD
                </Text>
              </ImageBackground>
            </View>
            {/* ///////////////////////////////////////////////*/}
          </View>
        </View>
      )}
      {/* ////////////////////////////////////////////*/}
      {/* <View  style={style.hr_tag}/> */}
      {expanded && (
        <View>
          <Profession_project />
        </View>
      )}

      <View style={{ width: responsiveWidth(100), borderWidth: responsiveWidth(0.1), marginBottom: responsiveHeight(1) }} />

      <View style={style.container}>
        {expanded && (
          <View style={{ flex: 0.8 }}>
            <View style={{ width: responsiveHeight(17), height: responsiveHeight(12), marginLeft: 10, justifyContent: 'center', alignItems: 'center', }}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets/AllSearch_Icon_And_Fonts/Update/FH_tv_drama.png")} style={{ width: responsiveHeight(8.5), height: responsiveHeight(10), right: -28, top: 4 }} />
              </ImageBackground>
            </View>
          </View>
        )}

        {expanded && (

          <View style={style.bio_content}>
            {/* ///////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")}
                  style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />

                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3.7),
                  left: responsiveWidth(12)
                }}>
                  Actor
                </Text>
              </ImageBackground>
            </View>
            <View style={style.bio_content_section_Hero}>
              {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/drama_icon.png")} 
               style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
              <ImageBackground style={{ width: "90%", height: "88%", top: 1, right: -5 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(0.7),
                  left: responsiveWidth(3),

                  //  width:responsiveWidth(15)
                }}>
                  Music

                </Text>
              </ImageBackground>

              <Text style={{
                fontSize: responsiveFontSize(1.55),
                color: '#000000',
                fontWeight: '500',
                fontFamily: "Times New Roman",
                top: responsiveHeight(1.5),
                left: responsiveWidth(4),

              }}>
                1998 - present
              </Text>
            </View>

            {/* ///////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>
              <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Image source={require("../../../Assets/Userprofile_And_Fonts/producer_icon.png")}
                  style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1) }} />
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(-3),
                  left: responsiveWidth(12),

                }}>
                  Producer
                </Text>
              </ImageBackground>
              <Text style={{
                fontSize: responsiveFontSize(1.55),
                color: '#000000',
                fontWeight: '500',
                fontFamily: "Times New Roman",
                top: responsiveHeight(8),
                left: responsiveWidth(-25),
              }}>
                2013 - 2023
              </Text>
            </View>
            <View style={style.bio_content_section_Producer}>
              {/* <Image source={require("../../../Assets/  Userprofile_And_Fonts/producer_icon.png")} 
               style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5),left:responsiveWidth(1)}}/> */}
              <ImageBackground style={{ width: "93%", height: "88%", top: 1, right: -5 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(0.6),
                  left: responsiveWidth(3),
                  // borderWidth:1
                }}>
                  Producer
                </Text>
              </ImageBackground>
            </View>
            {/* ////////////////////////////////////////////*/}
            <View style={style.bio_content_section}>

              <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5), left: responsiveWidth(1), }}>
                <Image source={require("../../../Assets//AllSearch_Icon_And_Fonts/Update/FH_Movies.png")}
                  style={{ width: responsiveWidth(6.5), height: responsiveHeight(4), }} />
              </View>
              <ImageBackground style={{ width: "100%", height: "100%", right: 34 }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: "Times New Roman",
                  top: responsiveHeight(0.7),
                  left: responsiveWidth(12)
                }}>
                  105 Films
                </Text>
              </ImageBackground>
            </View>

            {/* ///////////////////////////////////////////////*/}

            {/* ///////////////////////////////////////////////*/}
          </View>
        )}
      </View>
      {expanded && (
        <Profession_project />
      )}
      {/* <View style={style.hr_tag} /> */}

      {/* <Profession_tv_drama_project /> */}

    </>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
   // borderWidth:1
    // marginTop:20,
  },
  bio_title: {
    flex: responsiveWidth(0.2),
    width: '100%',
    flexDirection: 'row',
    columnGap: responsiveWidth(20),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2)

  },

  downArrow: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(2),
    // Add styles for your down arrow icon
  },
  bio_title_text: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.2),
    color: "black",
    marginLeft: responsiveWidth(2),
    fontFamily: 'Cochin',
    // textDecorationLine: "underline",
    //  borderWidth:1,
    width: responsiveWidth(70)

  },
  bio_content: {
    flex: 1,
  },
  inputContainer: {


    width: '101%',
    height: '100%',
  },

  bio_content_section: {
    flexDirection: "row",
    width: responsiveWidth(52),
    height: responsiveHeight(5.5),
    // borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
  },
  hr_tag: {
    borderBottomWidth: 1,
    borderBottomColor: '#D7D7D7',
    marginVertical: 5,
  },
  bio_content_section_Hero: {
    flexDirection: "row",
    width: responsiveWidth(25),
    height: responsiveHeight(5.5),
    // borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1.5),
  },
  bio_content_section_Producer: {
    flexDirection: "row",
    width: responsiveWidth(25),
    height: responsiveHeight(5.5),
    // borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1.5),
  },
})