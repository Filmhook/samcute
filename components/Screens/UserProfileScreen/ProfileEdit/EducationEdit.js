import { View, Text ,TouchableOpacity,TextInput,StyleSheet} from 'react-native'
import React,{useState} from 'react'

export default function Education_edit_page() {

    const [educationvisible,setEducationvisible] = useState(false)

    const EducationInfo_dropdown=()=>{
        setEducationvisible(!educationvisible)
    }

    const [school, setSchool] = useState("");
    const [college, setCollege] = useState("");
    const [qualification, setQualification] = useState("");

  return (
    <> 
    <View> 
          <TouchableOpacity  onPress={EducationInfo_dropdown}>
                       <Text style={{fontSize:22,fontWeight:"bold",fontWeight:"bold",color:"#323232",marginLeft:25}} 
                       >Education Information</Text>
            </TouchableOpacity>
            {educationvisible && (
                              <View style={{marginTop:10}}>
                                  {/* School Editor */} 
                               <TextInput 
                                style={{borderWidth:1,borderRadius:10,marginBottom:20,width:300,marginLeft:40}}
                                placeholder='School'
                                value={school}
                                onChangeText={setSchool}
                                />
                                {/* Weight Editor */} 
                               <TextInput 
                                style={{borderWidth:1,borderRadius:10,marginBottom:20,width:300,marginLeft:40}}
                                placeholder=' College '
                                value={college}
                                onChangeText={setCollege}
                                />
                                {/* SkinTone Editor */} 
                               <TextInput 
                                style={{borderWidth:1,borderRadius:10,marginBottom:20,width:300,marginLeft:40}}
                                placeholder='Qualification'
                                value={qualification}
                                onChangeText={setQualification}
                                />
                              </View>
                            )}
                             <View style={style.hr_tag}/>
        </View>
    </>
  )
}

const style = StyleSheet.create({
    profile:{
        width:350,
        height:2000,
        marginTop:20,
        marginLeft:25,
        borderRadius: 10,
        marginBottom:50,
        borderWidth:1,
      },
      hr_tag:{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 15,
        marginLeft:10,
        marginRight:10
      }
})