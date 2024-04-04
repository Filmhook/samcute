import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

export default function Professionalinfo() {
  return (
    <>  
      <View style={style.container}> 

         <View style={style.headder}> 

            <Text style={style.headder_text}>Personal Information</Text>

         </View>
         
         <View style={{flexDirection:"row",marginTop:15}}> 

            <View style={style.Lhs}> 

                <Text style={style.Lhs_text}> Religion </Text>

            </View>

            <View style={style.Rhs}> 

                <Text style={style.Rhs_text}>NA</Text>

            </View>

         </View>

    {/* -------------------------------------------------- */}

        <View style={{flexDirection:"row",marginTop:15}}> 

                <View style={style.Lhs}> 

                    <Text style={style.Lhs_text}> Caste </Text>

                </View>

                <View style={style.Rhs}> 

                    <Text style={style.Rhs_text}>NA</Text>

                </View>

        </View>

      {/* -------------------------------------------------- */}

      <View style={{flexDirection:"row",marginTop:15}}> 

<View style={style.Lhs}> 

    <Text style={style.Lhs_text}> Marital Status </Text>

</View>

<View style={style.Rhs}> 

    <Text style={style.Rhs_text}>NA</Text>

</View>

</View>

{/* -------------------------------------------------- */}

<View style={{flexDirection:"row",marginTop:15}}> 

<View style={style.Lhs}> 

    <Text style={style.Lhs_text}> Spouse </Text>

</View>

<View style={style.Rhs}> 

    <Text style={style.Rhs_text}>NA</Text>

</View>

</View>
{/* -------------------------------------------------- */}

<View style={{flexDirection:"row",marginTop:15}}> 

<View style={style.Lhs}> 

    <Text style={style.Lhs_text}> Children </Text>

</View>

<View style={style.Rhs}> 

    <Text style={style.Rhs_text}>NA</Text>

</View>

</View>

{/* -------------------------------------------------- */}

<View style={{flexDirection:"row",marginTop:15}}> 

<View style={style.Lhs}> 

    <Text style={style.Lhs_text}> Mother </Text>

</View>

<View style={style.Rhs}> 

    <Text style={style.Rhs_text}>NA</Text>

</View>

</View>

{/* -------------------------------------------------- */}

<View style={{flexDirection:"row",marginTop:15}}> 

<View style={style.Lhs}> 

    <Text style={style.Lhs_text}> Father </Text>

</View>

<View style={style.Rhs}> 

    <Text style={style.Rhs_text}>NA</Text>

</View>

</View>

{/* -------------------------------------------------- */}

<View style={{flexDirection:"row",marginTop:15}}> 

<View style={style.Lhs}> 

    <Text style={style.Lhs_text}> Brother </Text>

</View>

<View style={style.Rhs}> 

    <Text style={style.Rhs_text}>NA</Text>

</View>

</View>
{/* -------------------------------------------------- */}

<View style={{flexDirection:"row",marginTop:15}}> 

<View style={style.Lhs}> 

    <Text style={style.Lhs_text}> Sister </Text>

</View>

<View style={style.Rhs}> 

    <Text style={style.Rhs_text}>NA</Text>

</View>

</View>
         </View>

         <View  style={style.hr_tag}/>
    </>
  )
}


const style = StyleSheet.create({
    headder:{
       marginTop:20,
    },
    headder_text:{
        fontWeight:"bold",
        fontSize:23,
        color:"#323232",
        marginLeft:10,
        fontFamily:"Times New Roman",
        textDecorationLine:"underline",
    },
    Lhs:{
        height:45,
        width:160,
        justifyContent:"center",
        alignItems:"center"
    },
    Lhs_text:{
        fontWeight:"bold",
        fontSize:19,
        color:"#323232",
        marginLeft:10,
        fontFamily:"Times New Roman"
    },
   Rhs:{
        height:45,
        width:220,
        borderWidth:3,
        borderColor:"black",
        borderRadius:10,
        marginLeft:20,
        justifyContent:"center",
        alignItems:"center"
   },
   Rhs_text:{
        fontWeight:"bold",
        fontSize:18,
        color:"#323232",
        marginLeft:10,
        fontFamily:"Times New Roman",
   },
   hr_tag:{
     borderBottomWidth: 4,
     borderBottomColor: '#D7D7D7',
     marginVertical: 25,
   }
})