// import { View, Text ,TouchableOpacity, Image ,FlatList} from 'react-native'
// import React, { useState } from 'react'


// export default function Postfeedcontainor() {
//      const datas = [
//       {
//         id:1,
//         name:"ValleryMaravi",
//         profession:'actress',
//         place:'New York , United States',
//         time:'10h',
//         views:'5.2k',
//         caption:'It is a long established fact that a reader will be distracted by the the the  readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//       },
//       {
//         id:2,
//         name:"ValleryMaravi",
//         profession:'actress',
//         place:'New York , United States',
//         time:'10h',
//         views:'5.2k',
//         caption:'It is a long established fact that a reader will be distracted by the the the  readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//       },
//       {
//         id:3,
//         name:"ValleryMaravi",
//         profession:'actress',
//         place:'New York , United States',
//         time:'10h',
//         views:'5.2k',
//         caption:'It is a long established fact that a reader will be distracted by the the the  readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//       },
//       {
//         id:4,
//         name:"ValleryMaravi",
//         profession:'actress',
//         place:'New York , United States',
//         time:'10h',
//         views:'5.2k',
//         caption:'It is a long established fact that a reader will be distracted by the the the  readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//       }
//      ]
   
//      const [like , setLike]=useState(999)
//      const [hitlike,setHitlike] = useState(false)

//      const handle_like_dislike = () =>{
//           setHitlike(!hitlike)
//           setLike(hitlike ? like-1 : like + 1)
//      }

//   // for number format functions 

//         const options = {
//           notation : 'compact',
//           compactDisplay:'short'
//         } 
        
//         function formatCmpctNumber(number) {
//           const usformatter = Intl.NumberFormat('en-US',options);
//           return usformatter.format(number)
//         }

//   // for number format functions 


//   // for see more modal 

//      const [visible,setVisible]=useState(false)

//      const handle_seemoreicon = ()=>{
//              setVisible(!visible)
//      }
//   // for see more modal
    
//   return (
//     <> 
//     <FlatList 
//      data={datas}
//      style={{padding:0,margin:0}}
//      renderItem={ ({item})=>(
//       <View>
//       <View style={{padding: 10 }}> 
//     <View style={{ flexDirection:"row" }}>

//        <View>  
//                 <TouchableOpacity 
//                 style={{
//                     width:50,
//                     height:50,
//                     borderWidth:1,
//                     borderRadius:50, 
//                     backgroundColor:"grey"
//                     }}>
//                       </TouchableOpacity>
//                       <View style={{width:30,height:15,borderRadius:10,borderWidth:1,top:-10,left:10,backgroundColor:"#000000"}}> 
//                <Text 
//                style={{color:"#ffffff",fontSize:9,left:2}}>9.4</Text>
//                <View 
//                style={{width:12,height:12,left:16,top:-12}}> 
//                <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_Star.png')}
//                 style={{width:"100%",height:"100%"}}/>
//                </View>
//           </View>
                
//         </View>

//         <View 
//         style={{width:160,marginLeft:10,}}
//         >
//               <Text 
//               style={{fontSize:15,fontWeight:"900",color:"#000000",top:3,letterSpacing:0.5}}>
//                 {item.name}
//                 </Text>
//               <Text 
//               style={{fontWeight:"500",color:"#000000",fontSize:10,top:2,left:4}}> 
//                   {item.profession}
//                 </Text>
//               <View 
//               style={{width:15,height:15,top:3,left:-1}}> 
//               <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_Location.png')} 
//               style={{width:'100%',height:'100%'}}/>
//               </View>
//               <Text 
//               style={{fontSize:7,top:-11,left:14,width:130,color:"grey",fontWeight:'500'}}>
//                 {item.place}
//               </Text>
          
//         </View>

//         <View 
//         style={{flexDirection:"row" , width:150,justifyContent:"space-evenly",alignItems:"center",left:20,}}>
//              <Text  style={{fontWeight:"bold",color:"#000000"}} >10h</Text>
//               <View 
//               style={{width:20,height:20,borderRadius:10}}> 
//                       <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_Lock.png')} style={{width:"90%",height:'90%'}}/>
//               </View>
//               <Text
//                style={{fontWeight:"bold",color:"#000000"}}>
//                 5.2K</Text>
//                 <View> 
//               <TouchableOpacity 
//                 onPress={handle_seemoreicon}
//               style={{width:15,height:30,justifyContent:"center"}}>
//                  <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_SeeMore.png')} 
//                  style={{width:'100%' , height:'70%'}} />
//               </TouchableOpacity>
//                 {visible ? (
//                   <View 
//                   style={{ position:"absolute",marginTop:40,marginLeft:-140,width:160,height:70,backgroundColor:"#666666",borderRadius:20}}>
//                     <TouchableOpacity 
//                     style={{width:150,height:25,backgroundColor:"#000000",marginTop:6,marginLeft:5,borderRadius:10}}>
//                        <Text
//                         style={{color:'#ffffff',left:10}}>Pin Post</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                     style={{width:150,height:25,backgroundColor:"#000000",marginTop:6,marginLeft:5,borderRadius:10}}
//                     >
//                        <Text 
//                        style={{color:'#ffffff',left:10}}
//                        >Repost Post</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : null}
              
//             </View>
//         </View>
   
//     </View>

//     {/* posted image or video  \/\/\/\/\/\/\/\/\/\/  */}

//       <View>
//           <View 
//           style={{
//             marginTop:10,width:370,left:10,
//           }}>
//             <Text 
//             style={{
//               fontSize:12,fontWeight:"400",lineHeight:13,color:"#000000",
//             }}>
//               {item.caption}
//              </Text>
//           </View>

//     {/* post image containor \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ */}
//           <View
//            style={{ borderWidth:1 , borderColor:"grey" ,  width:390, height:400 , marginTop:10}}> 
//               {/* <Image /> */}
//           </View>

//     {/* post image containor \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ */}  
//          <View 
//          style={{ height:50,width:380,marginTop:5,flexDirection:"row",justifyContent:"space-between"}}>
//              <View>

//               {/* like button */}
//                <Text 
//                style={{textAlign:"center",fontWeight:"500",fontSize:12,fontWeight:"500",color:"#000000"}}>{`${formatCmpctNumber(like)} Likes`}</Text>
//                <TouchableOpacity
//                   onPress={handle_like_dislike}
//                 style={{width:70,height:30,borderWidth:1,borderRadius:5,flexDirection:"row"}}>
//                    <View 
//                    style={{width:20,height:20,}}> 

//                    { hitlike &&  hitlike?  <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_Like.png')}
//                    style={{width:"100%" , height:"95%" , left:2,top:2}}
//                  />  : <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_Like.png')}
//                  style={{width:"100%" , height:"95%" , left:2,top:2}}
//                /> }
//                    </View> 
//                    <Text 
//                    style={{alignSelf:"center",left:7,fontWeight:"500",color:"#000000"}}>Like</Text>
//                </TouchableOpacity>
//              </View>

//              {/* comments button */}
//              <View >
//                <Text 
//                 style={{textAlign:"center",fontSize:12,fontWeight:"500",color:"#000000"}}>0 Comments</Text>
//                <TouchableOpacity
//                 style={{width:105,height:30,borderWidth:1,borderRadius:5,flexDirection:"row"}}>
//                    <View 
//                    style={{width:20,height:20,}}> 
//                   <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_comment.png')}
//                    style={{width:"100%" , height:"100%" , left:2,top:5}}
//                  /> 
//                    </View>
//                    <Text 
//                   style={{alignSelf:"center",left:7,fontWeight:"500",color:"#000000"}}>Comments</Text>
//                </TouchableOpacity>
//              </View>

//            {/* shares button */}
//              <View>
//                <Text  style={{textAlign:"center",color:"#000000",fontSize:12,fontWeight:"500"}}>0 Share</Text>
//                <TouchableOpacity
//                 style={{width:80,height:30,borderWidth:1,borderRadius:5,flexDirection:"row"}}>
//                    <View 
//                    style={{width:20,height:20,}}> 
//                   <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_Share.png')}
//                    style={{width:"100%" , height:"95%" , left:5,top:5}}
//                  /> 
//                    </View>
//                    <Text 
//                     style={{alignSelf:"center",left:10,fontWeight:"500",color:"#000000"}}>Share</Text>
//                </TouchableOpacity>
//              </View>
//          </View>

//       </View>
      
//     </View>
//     <View style={{borderBottomWidth: 10,
//               borderBottomColor: '#D7D7D7',
//               marginVertical: 5}}/>
//     </View>
//      )}
//      keyExtractor={(item)=> item.id}
//  />
//     </>
//   )
// }