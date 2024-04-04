import { View, Text ,StyleSheet ,Image} from 'react-native'
import React from 'react'
import Profession_tv_drama_project from './profession_tv_drama_project'

export default function TvDramaforpublic() {
    return (
        <> 
           <View style={style.container}>  
          <View style={{ flex:0.8}}>
            <View style={{width:150,height:100,marginLeft:10,borderRadius:10}}> 
                <Image source={require("../../../../components/Assets/UserProfile_Icons_Fonts/drama_icon.png")} style={{width:"70%",height:"85%",marginTop:5,marginLeft:30}}  />
            </View>
          </View>
    {/* /////////////////////////////////////////////// */}      
         <View style={style.bio_content}> 
         <View style={style.bio_content_section}> 
       <Image source={require("../../../../components/Assets/UserProfile_Icons_Fonts/tv_serial_icon.png")} 
                   style={{width:30,height:30,marginLeft:10,marginTop:2}}/>
                    <Text style={{
                        fontSize:18,
                        color:'#323232',
                        fontWeight:'bold',
                        marginLeft:48,
                        marginTop:6,
                        fontFamily:"Times New Roman",
                    }}>
                    NA
                    </Text>
             </View> 
       {/* ///////////////////////////////////////////////*/}
       <View style={style.bio_content_section}> 
       <Image source={require("../../../../components/Assets/UserProfile_Icons_Fonts/Net_worth_icon.png")} 
                   style={{width:30,height:30,marginLeft:10,marginTop:2}}/>
                    <Text style={{
                        fontSize:18,
                        color:'#323232',
                        fontWeight:'bold',
                        marginLeft:48,
                        marginTop:6,
                        fontFamily:"Times New Roman",
                    }}>
                    NA
                    </Text>
             </View> 
      {/* ////////////////////////////////////////////*/}  
      
    {/* ////////////////////////////////////////////////// */}
         </View>
      </View>
              <Profession_tv_drama_project />
      <View  style={style.hr_tag}/>
        </>
      )
    }
    const style = StyleSheet.create({
        container:{
            flexDirection:"row",
            marginTop:20,
        },
        bio_title:{
            flex:0.8,
        },
        bio_title_text:{
            fontWeight:"bold",
            fontSize:23,
            color:"#323232",
            marginLeft:10,
            fontFamily:"Times New Roman",
            textDecorationLine:"underline",
        },
        bio_content:{
            flex:1,
        },
        bio_content_section:{
            flexDirection:"row",
            width:220,
            height:45,
            borderWidth:3,
            borderRadius:10,
            marginBottom:15,
        },
        hr_tag:{
            borderBottomWidth: 4,
            borderBottomColor: '#D7D7D7',
            marginVertical: 5,
          }
      })