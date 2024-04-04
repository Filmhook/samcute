import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function Biographyforpublic() {
    return (
        <> 
       
         <View style={style.container}>  
         
            <View style={style.bio_title}> 
                <Text style={style.bio_title_text}>Biography</Text>
            </View>
       {/* ///////////////////////////////////////////////*/}      
            <View style={style.bio_content}> 
            <View style={style.bio_content_section}>
            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
            <View style={{marginLeft: responsiveWidth(0.2), marginTop: responsiveHeight(0.5),width:responsiveWidth(7.2),height:responsiveHeight(4), }}>
                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png")} style={{ width: '100%', height: '100%' }} />
                
                </View>
                <View style={style.bioTextContainer}> 
                <Text style={{
                     fontSize:responsiveFontSize(2),
                     color:'#000000',
                     fontWeight:'500',
                     fontFamily:"Times New Roman",
                     top:responsiveHeight(-3.5),
                     // top:responsiveHeight(1)
                }}>
                    Date of Birth</Text>
                    </View>
                    </ImageBackground> 
    </View>
          {/* ///////////////////////////////////////////////*/}
                <View style={style.bio_content_section}> 
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <View  style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}>
                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Gender_Icon.png")} 
                   style={{width:'100%',height:'100%'}}/>
                      </View>  
                <View style={style.bioTextContainer}>  
                    <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        top:responsiveHeight(-3.5),
                        // top:responsiveHeight(1)
                     
                    }}>
                   Gender
                    </Text> 
                </View>
                </ImageBackground> 
                </View> 
         {/* ////////////////////////////////////////////*/}  
                <View style={style.bio_content_section}>
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">     
                <View  style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}>
                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Birthplace_icon.png")} 
                  style={{width:'70%',height:'100%',}}/>
                    </View>  
                <View style={style.bioTextContainer}>  
                    <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        top:responsiveHeight(-3.5)
                    }}>
                 Birth Place
                    </Text> 
                    </View> 
                    </ImageBackground> 
                    </View> 
                
         {/* ///////////////////////////////////////////////*/}
                <View style={style.bio_content_section}> 
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">  
                <View  style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}>
                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Leaving_Place_icon.png")} 
                    style={{width:'70%',height:'100%',}}/>
                     </View>  
                <View>
                   </View>  
                   <View style={style.bioTextContainer}>
                    <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        top:responsiveHeight(-3.5)
                    }}>
                  Current Location
                    </Text>
                    </View> 
                    </ImageBackground>
                </View>
        {/* ///////////////////////////////////////////////*/}
                <View style={style.bio_content_section}> 
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">  
                <View  style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}>
                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/hometown_icon.png")} 
                    style={{width:'100%',height:'100%'}}/>
                     </View>  
                <View style={style.bioTextContainer}>
                            <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        top:responsiveHeight(-3)
                    }}>
                          Nationality
                            </Text>
                          
                    </View>    
                    </ImageBackground>    
                </View>  
        {/* ///////////////////////////////////////////////*/}
        <View style={style.bio_content_section}> 
        <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
        <View  style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}>
        <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Work_Exp.png")} 
                    style={{width:'100%',height:'100%'}}/>
                     </View>  
                <View style={style.bioTextContainer}>
                            <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        top:responsiveHeight(-3.5)
                    }}>
                         Work Experience
                            </Text>
                    </View>
                    </ImageBackground>
                </View>
        {/* ///////////////////////////////////////////////*/}       
                <View style={style.bio_content_section}> 
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                <View  style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}>
                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Booking.png")} 
                    style={{width:'100%',height:'100%'}}/>
                     </View>  
                <View style={style.bioTextContainer}>
                            <Text  style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        top:responsiveHeight(-3.5)
                        }}>
                            Work Shedule
                       </Text>
                </View>
                </ImageBackground>
                </View>
         {/* ///////////////////////////////////////////////*/}        
            </View>
         </View>
         <View  style={style.hr_tag}/>
        </>
      )
    }
    
    const style = StyleSheet.create({
        container:{
            flexDirection:"row",
            marginTop:responsiveHeight(5),
            height:responsiveHeight(49)
        },
        inputContainer: {
            //     flexDirection: 'row',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     height: responsiveHeight(8.4),
            //     width: responsiveWidth(88),
            //  //   bottom:responsiveHeight(1),
            //     margin:responsiveHeight(1),
            //  //   margin: responsiveWidth(1),
            //     color: 'black',
            //     resizeMode: 'cover',
            flex: 1,
              width: '101%',
              height: '100%',
           },
        bio_title:{
            flex:responsiveWidth(0.2),
        },
        bio_title_text:{
            fontWeight:"bold",
            fontSize:responsiveFontSize(3),
            color:"#323232",
            marginLeft:responsiveWidth(2),
            fontFamily:"Times New Roman",
            textDecorationLine:"underline",
        },
        bio_content:{
            flex:1,
        },
        bio_content_section:{
            flexDirection:"row",
            width:responsiveWidth(53),
            height:responsiveHeight(5.5),
            // borderWidth:responsiveWidth(0.3),
            borderRadius:responsiveWidth(2),
            marginBottom:responsiveHeight(1.5),
        },
        // text:{
        //     fontSize:18,
        //     color:'#323232',
        //     fontWeight:'bold',
        //     marginLeft:20,
        //     marginTop:6,
        //     fontFamily:"Times New Roman",
        // },
        hr_tag:{
            borderBottomWidth: responsiveWidth(1.5),
            borderBottomColor: '#D7D7D7',
            marginVertical: responsiveHeight(0.5),
          },
          bioTextContainer:{
           
            // left:responsiveWidth(4),
            left:"22%"
            
          }
    })