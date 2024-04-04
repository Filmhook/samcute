import { View, Text ,StyleSheet,Image, ImageBackground} from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'


export default function BodyMeasurementforpublic() {
    return (
        <> 
         <View style={style.container}>  
            <View style={style.bio_title}> 
                <Text style={style.bio_title_text}>
                    Body{"\n"}Measurement
                </Text>
            </View>
       {/* ///////////////////////////////////////////////*/}      
            <View style={style.bio_content}>
            <ImageBackground style={{ width: '98%',  height: '34%',}} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch"> 
                <View style={style.bio_content_section}> 
                <Image source={require("../../../../components/Assets/Userprofile_And_Fonts/update/Height_icon.png")} 
                   style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}/>
                    <Text style={style.text}>Height </Text>
                 
                </View> 
                <ImageBackground style={{ width: '98.7%',  height: '58%',}} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
          {/* ///////////////////////////////////////////////*/}
                <View style={style.bio_content_section}> 
                <View  style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}>
                <Image source={require("../../../../components/Assets/Userprofile_And_Fonts/update/Weight_icon.png")} 
                   style={{width:'100%',height:'100%'}}/>
                   </View>
                    <Text style={style.text}>
                    weight
                    </Text>
                </View> 
                <ImageBackground style={{ width: '99%',  height: '75%',}} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
         {/* ////////////////////////////////////////////*/}  
                <View style={style.bio_content_section}> 
                <Image source={require("../../../../components/Assets/Userprofile_And_Fonts/update/skin_tone_icon.png")} 
                   style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}/>
                    <Text style={style.text}>
                    Skin Tone
                    </Text>
                </View> 
                <ImageBackground style={{ width: '99.5%',  height: '88.5%',}}  source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
         {/* ///////////////////////////////////////////////*/}
                <View style={style.bio_content_section}> 
                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Hair_Colour.png")} 
                   style={{width:responsiveWidth(7.2),height:responsiveHeight(4),marginLeft:responsiveWidth(1),marginTop:responsiveHeight(0.5)}}/>
                    <Text style={{
                         fontSize:responsiveFontSize(2),
                         color:'#000000',
                         fontWeight:'500',
                         fontFamily:"Times New Roman",
                         top:responsiveHeight(1),
                         left:responsiveWidth(4)
                    }}>
                    Hair Color
                    </Text>
                </View>
        {/* ///////////////////////////////////////////////*/}
                 <View style={{flexDirection:"column",flex:1,}}> 
    
                 <View style={{width:responsiveWidth(19),height:responsiveHeight(6),borderRadius:responsiveWidth(2.5)}}> 
                 <ImageBackground style={{ width: '99.5%',  height: '98.7%',}}  source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                 <Image source={require("../../../../components/Assets/Userprofile_And_Fonts/update/BMI_Icon.png")} 
                 style={{width:responsiveWidth(10),height:responsiveHeight(5),marginLeft:responsiveWidth(3)}} />
                 </ImageBackground>
                    
                 </View>
                 
    
                <View style={{width:responsiveWidth(31.8),height:responsiveHeight(5.5),borderRadius:responsiveWidth(2),left:responsiveWidth(20.8),top:responsiveHeight(-6)}}> 
                <ImageBackground style={{ width: '100%',  height: '100%',}}  source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={{fontWeight:"500",fontSize:responsiveFontSize(1.8), color:"#323232",textAlign:"center",fontFamily:"Times New Roman",letterSpacing:1}}> 
                        Chest{"\n"}40in
                    </Text>
                    </ImageBackground>
                </View>
    
                <View style={{width:responsiveWidth(31.8),height:responsiveHeight(5.5),borderRadius:responsiveWidth(2),left:responsiveWidth(20.8),top:responsiveHeight(-5)}}> 
                <ImageBackground style={{ width: '100%',  height: '100%',}}  source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={{fontWeight:"500",fontSize:responsiveFontSize(1.8), color:"#323232",textAlign:"center",fontFamily:"Times New Roman",letterSpacing:1}}>
                       Waist{"\n"}40in
                    </Text>
                    </ImageBackground>
                </View>
    
                <View style={{width:responsiveWidth(31.8),height:responsiveHeight(5.5),borderRadius:responsiveWidth(2),left:responsiveWidth(20.8),top:responsiveHeight(-4)}}> 
                <ImageBackground style={{ width: '100%',  height: '100%',}}  source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={{fontWeight:"500",fontSize:responsiveFontSize(1.8), color:"#323232",textAlign:"center",fontFamily:"Times New Roman",letterSpacing:1}}>
                       Biceps{"\n"}40in
                    </Text>
                    </ImageBackground>
                </View>
    
                 </View>  
                 </ImageBackground>
                 </ImageBackground>
                 </ImageBackground>
                 </ImageBackground>
            </View>
         </View>
         
         <View  style={style.hr_tag}/>
        </>
      )
    }
    
    const style = StyleSheet.create({
        container:{
            flexDirection:"row",
            marginTop:responsiveHeight(0.2),
        
            height:responsiveHeight(48)
        },
        bio_title:{
            flex:responsiveWidth(0.2),
            width:responsiveWidth(40),
           // borderWidth:1
        },
        inputContainer: {
           
            
             
            
           },
           inputContainer1: {
           
            
            width: '99%',
            height: '58%',
         },
         inputContainer2: {
           
            
            width: '99%',
            height: '58%',
         },
        bio_title_text:{
            fontWeight:"bold",
            fontSize:responsiveFontSize(3),
            color:"#323232",
            marginLeft:responsiveWidth(2),
           fontFamily:'Cochin',
            textDecorationLine:"underline",
            
        },
        bio_content:{
            flex:1,
        },
        bio_content_section:{
            flexDirection:"row",
            height:responsiveHeight(5.5),
            width:responsiveWidth(53),
            // borderWidth:responsiveWidth(0.3),
            borderColor:"black",
            borderRadius:responsiveWidth(2),
            marginBottom:responsiveHeight(1.5),
            
        },
        text:{
            fontSize:responsiveFontSize(2),
           color:'#000000',
            fontWeight:'500',
            fontFamily:"Times New Roman",
            top:responsiveHeight(1),
            left:responsiveWidth(4)
        },
        hr_tag:{
            borderBottomWidth: 4,
            borderBottomColor: '#D7D7D7',
          }
    })