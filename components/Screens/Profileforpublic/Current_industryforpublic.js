import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
export default function Current_industryforpublic() {
 
    return (
        <> 
       
         <View style={style.container}>  
         
            <View style={style.bio_title}> 
                <Text style={style.bio_title_text}>Currently working
                </Text>
                <Text style={style.bio_title_text}>
                Industry</Text>
            </View>
       {/* ///////////////////////////////////////////////*/}      
            <View style={style.bio_content}> 
                <View style={style.bio_content_section}> 
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        bottom:-5,
                        right:-34
                    }}> Cinema Of India</Text>
                    </ImageBackground>
                </View> 
               
          {/* ///////////////////////////////////////////////*/}
                  <View style={style.bio_content_section}> 
                  <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        bottom:-6,
                        right:-38
                    }}>
                   BOLLYWOOD
                    </Text>
                    </ImageBackground>
                </View> 
    
                <View style={style.bio_content_section}>
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch"> 
                    <Text style={{
                        fontSize:responsiveFontSize(2),
                        color:'#000000',
                        fontWeight:'500',
                        fontFamily:"Times New Roman",
                        bottom:-6,
                        right:-38
                    }}>
                   KOLLYWOOD
                    </Text>
                    </ImageBackground>
                </View> 
             </View> 
         {/* ////////////////////////////////////////////*/}  
                {/* <View style={style.bio_content_section}> 
                    <Text style={{
                        fontSize:18,
                        color:'#323232',
                        fontWeight:'bold',
                        marginLeft:90,
                        marginTop:6,
                        fontFamily:"Times New Roman",
                    }}>
                    NA
                    </Text>
                </View>  */}
            </View>
         <View  style={style.hr_tag}/>
        </>
      )
    }
    
    const style = StyleSheet.create({
        container:{
            flexDirection:"row",
            //marginTop:20
        },
        bio_title:{
            flex:0.8,
        },
        bio_title_text:{
            fontWeight:"bold",
            fontSize:responsiveFontSize(2.8),
            color:"#323232",
            marginLeft:responsiveWidth(2),
            fontFamily:"Times New Roman",
            textDecorationLine:"underline",
        },
        inputContainer: {
           
          
            width: '100.1%',
            height: '100%',
         },
        bio_content:{
            flex:1,
        },
        bio_content_section:{
           // flexDirection:"row",
            width:responsiveWidth(52.5),
            height:responsiveHeight(5.5),
            // borderWidth:responsiveWidth(0.3),
            borderRadius:responsiveWidth(2),
            marginBottom:15,
            justifyContent:'center',
            alignItems:'center'
        },
        hr_tag:{
            borderBottomWidth: 4,
            borderBottomColor: '#D7D7D7',
            marginVertical: 5,
          }
    })