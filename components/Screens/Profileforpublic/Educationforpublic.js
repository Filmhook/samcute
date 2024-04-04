import { View, Text , StyleSheet, ImageBackground} from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function Educationforpublic() {
    return (
        <> 
         <View style={style.container}> 
    
    <View style={style.headder}> 
    
       <Text style={style.headder_text}> Education </Text>
    
    </View>
    
    <View style={{flexDirection:"row",marginTop:15}}> 
    
       <View style={style.Lhs}> 
    
           <Text style={style.Lhs_text}> School </Text>
    
       </View>
    
       <View style={style.Rhs}> 
       <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
           <Text style={style.Rhs_text}>St.Columbia's School</Text>
           </ImageBackground>
       </View>
    
    </View>
    
    {/* -------------------------------------------------- */}
    
    <View style={{flexDirection:"row",marginTop:15}}> 
    
           <View style={style.Lhs}> 
    
               <Text style={style.Lhs_text}> Collage </Text>
    
           </View>
    
           <View style={style.Rhs}> 
           <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
               <Text style={style.Rhs_text}>NA</Text>
               </ImageBackground>
           </View>
    
    </View>
    
    {/* -------------------------------------------------- */}
    
    <View style={{flexDirection:"row",marginTop:15}}> 
    
    <View style={style.Lhs}> 
    
    <Text style={style.Lhs_text}> Qualification </Text>
    
    </View>
    
    <View style={style.Rhs}> 
    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
    <Text style={style.Rhs_text}>MA, BA</Text>
    </ImageBackground>
    </View>
    
    </View>
    </View>
    
    <View  style={style.hr_tag}/>
        </>
      )
    }
    
    const style = StyleSheet.create({
        container:{
          //  borderWidth:2,
           height:responsiveHeight(28)
    
        },
        headder_text:{
            fontWeight:"bold",
            fontSize:responsiveFontSize(2.8),
            color:"#323232",
            marginLeft:responsiveWidth(2),
            fontFamily:"Times New Roman",
            textDecorationLine:"underline",
        },
        Lhs:{
            height: responsiveHeight(5),
            width: responsiveWidth(38),
            justifyContent: "center",
            alignItems: "center",
        },
        Lhs_text:{
            fontWeight: "bold",
            fontSize: responsiveFontSize(2.1),
            color: "#323232",
            marginLeft: responsiveWidth(1.5),
            fontFamily: "Times New Roman",
        },
       Rhs:{
        height: responsiveHeight(5.5),
        width: responsiveWidth(53),
        // borderWidth: responsiveWidth(0.3),
        borderColor: "black",
        borderRadius:responsiveWidth(2),
        marginLeft: responsiveWidth(5.5),
        justifyContent: "center",
        alignItems: "center"
       },
       inputContainer: {
           
          
        width: '101%',
        height: '100%',
     },
       Rhs_text:{
        fontSize:responsiveFontSize(2),
        color:'#000000',
        fontWeight:'500',
        fontFamily:"Times New Roman",
        right:responsiveWidth(-5),
        bottom:-6
       },
       hr_tag:{
         borderBottomWidth: 4,
         borderBottomColor: '#D7D7D7',
         marginVertical:  responsiveHeight(1),
       }
    })