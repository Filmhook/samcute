import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, TextInput, ScrollView, Button } from 'react-native';
import { getFirestore, collection, query, getDocs, doc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { Share } from 'react-native';
import app from '../../../FirebaseConfig';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firestore = getFirestore(app);
        const collectionName = 'Homepage-post';
        const postQuery = query(collection(firestore, collectionName));
        const querySnapshot = await getDocs(postQuery);
        const data = querySnapshot.docs.map((doc) => {
          const formattedTimestamp = doc.data().timestamp?.toDate();
          return {
            id: doc.id,
            ...doc.data(),
            timestamp: formattedTimestamp,
          };
        });
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
   
  const openCommentModal = () => {
    setCommentVisible(true);
  };

  const closeCommentModal = () => {
    setCommentVisible(false);
  };

  const submitComment = () => {
    if (commentText.trim() !== '') {
      handleCommentSubmit(post.id, commentText); // Pass postId here
      setCommentText('');
      closeCommentModal();
    }
  };
  
  

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <RenderPost
            post={item}
            handleLikeDislike={handleLikeDislike}
            handleShare={handleShare}
            handleCommentSubmit={handleCommentSubmit}
            handleCommentDelete={handleCommentDelete}
            openCommentModal={openCommentModal}
            closeCommentModal={closeCommentModal}
            isCommentVisible={isCommentVisible}
            commentText={commentText}
            setCommentText={setCommentText}
            submitComment={submitComment}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Comment Modal */}
      <Modal visible={isCommentVisible}>
        <View>
          <TextInput
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
          <Button title="Submit" onPress={submitComment} />
          <Button title="Close" onPress={closeCommentModal} />
        </View>
      </Modal>
      {/* Comment Modal */}
    </>
  );
}

const RenderPost = () => {
    const imageData = {
        "cropRect": {"height": 1280, "width": 960, "x": 0, "y": 0},
        "height": 1280,
        "mime": "image/jpeg",
        "modificationDate": "1703595306000",
        "path": "file:///data/user/0/com.projectfh/cache/react-native-image-crop-picker/b76e7975-c6c0-44df-a3c6-e43f9855e737.jpg",
        "size": 95570,
        "width": 960
      };
      
      const imagePath = imageData.path;
      console.log(imagePath);
      const [like , setLike]=useState(0)
    const { caption, view_type, image, timestamp } = post;
    const [visible,setVisible]=useState(false)
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isCommentVisible, setCommentVisible] = useState(false);
    const [hitlike,setHitlike] = useState(false)
    const options = {
        notation : 'compact',
        compactDisplay:'short'
      } 
      
      function formatCmpctNumber(number) {
        const usformatter = Intl.NumberFormat('en-US',options);
        return usformatter.format(number)
      }

  
    const openCommentModal = () => {
      setCommentVisible(true);
    };
  
    const closeCommentModal = () => {
      setCommentVisible(false);
    };
  
    const submitComment = () => {
      if (commentText.trim() !== '') {
        handleCommentSubmit(post.id, commentText);
        setCommentText('');
        closeCommentModal();
      }
    };
    const handle_seemoreicon = ()=>{
        setVisible(!visible)
}

const handleLikeDislike = async (postId, userId, isLiked) => {
  try {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, isLiked: !isLiked }; // Toggle like status locally
      }
      return post;
    });
    setPosts(updatedPosts);

    const firestore = getFirestore(app);
    const postRef = doc(firestore, 'Homepage-post', postId);
    const likesRef = collection(postRef, 'likes');

    if (isLiked) {
      await deleteDoc(doc(likesRef, userId));
    } else {
      await addDoc(likesRef, {
        userId: userId,
        timestamp: new Date(),
      });
    }
  } catch (error) {
    console.error('Error handling like/dislike:', error);
  }
};

const handleCommentSubmit = async (postId, commentText) => {
  try {
    if (commentText.trim() !== '') {
      const firestore = getFirestore(app);
      const postRef = doc(firestore, 'Homepage-post', postId);
      const commentsRef = collection(postRef, 'comments');

      await addDoc(commentsRef, {
        text: commentText,
        userId: 'Uid', 
        timestamp: new Date(),
      });
      // Fetch updated comments and update state/UI accordingly
      // You can fetch comments here and update the UI with the updated comments list
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

const handleShare = async (post) => {
  const options = {
    message: `${post.caption}`, // Your default message
  };
  try {
    const result = await Share.share(options);
    if (result.action === Share.sharedAction) {
      console.log('Post shared successfully');
      // Perform any necessary actions after successful share
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
      // Handle share dismissed action
    }
  } catch (error) {
    console.error('Error sharing post:', error.message);
  }
};

  
      // Format the timestamp before displaying
      const formattedTimestamp = timestamp ? new Date(timestamp).toLocaleString() : '';
  
    return (
      <View>
            <View style={{padding: 10 }}> 
  <View style={{ flexDirection:"row" }}>
  <View>  
              <TouchableOpacity 
              style={{
                  width:50,
                  height:50,
                  borderWidth:1,
                  borderRadius:50, 
                  backgroundColor:"grey"
                  }}>
                    </TouchableOpacity>
                    <View style={{width:30,height:15,borderRadius:10,borderWidth:1,top:-10,left:10,backgroundColor:"#000000"}}> 
             <Text 
             style={{color:"#ffffff",fontSize:9,left:2}}>9.4</Text>
             <View 
             style={{width:12,height:12,left:16,top:-12}}> 
             <Image source={require('../../Assets/Userprofile_And_Fonts/star.png')}
              style={{width:"100%",height:"100%"}}/>
             </View>
             </View>
        </View>

        <View 
      style={{width:160,marginLeft:10,}}
      >
            <Text 
            style={{fontSize:15,fontWeight:"900",color:"#000000",top:3,letterSpacing:0.5}}>
              Hariharan
              </Text>
            <Text 
            style={{fontWeight:"500",color:"#000000",fontSize:10,top:2,left:4}}> 
                Actor
              </Text>
            <View 
            style={{width:15,height:15,top:3,left:-1}}> 
            <Image source={require('../../Assets/Home_Icon_And_Fonts/postfeed_loc.png')} 
            style={{width:'100%',height:'100%'}}/>
            </View>
            <Text 
            style={{fontSize:7,top:-11,left:14,width:130,color:"grey",fontWeight:'500'}}>
              chennai,tamilnadu
            </Text>
        
      </View>    
        <View 
      style={{flexDirection:"row" , width:150,justifyContent:"space-evenly",alignItems:"center",left:15,}}>
        {
          timestamp ?  
          // <Text>{getTimeAgoString(timestamp)}</Text>
          <Text>{formattedTimestamp}</Text>
           :
          null 
        }
            <View 
             style={{width:20,height:20,borderRadius:10}}> 
                  {/* we need to toogle with firebase value */}
                  {
                    view_type === 'public' ? 
                    <Image source={require('../../Assets/Home_Icon_And_Fonts/noun-earth-880637.png')} style={{width:"90%",height:'90%'}}/>
                    :
                    <Image source={require('../../Assets/Home_Icon_And_Fonts/lock_icon.png')} style={{width:"90%",height:'90%'}}/>
                  }
                    
            </View>
            <Text
             style={{fontWeight:"bold",color:"#000000"}}>
              5.2K</Text>
              <View style={{
               width:25,height:27,borderRadius:15,alignItems:'center'
              }} > 
            <TouchableOpacity 
              onPress={handle_seemoreicon}
              style={{width:20,height:25,justifyContent:"center",top:1}}>
              {visible ? (
                <Image source={require('../../Assets/Home_Icon_And_Fonts/more_opt.png')} 
                style={{width:'100%' , height:'90%',borderRadius:15,backgroundColor:'#d3d3d3'}} />
               ) : <Image source={require('../../Assets/Home_Icon_And_Fonts/more_opt.png')} 
               style={{width:'100%' , height:'80%'}} />}
            </TouchableOpacity>
            <View> 
              {visible ? (
                <View 
                style={{width:160,height:70,position:'absolute',left:-150,top:10,backgroundColor:"#666666",borderRadius:20,zIndex:1}}>
                  <TouchableOpacity 
                  style={{width:150,height:25,backgroundColor:"#000000",marginTop:6,marginLeft:5,borderRadius:10}}>
                     <Text
                      style={{color:'#ffffff',left:10}}>Pin Post</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={{width:150,height:25,backgroundColor:"#000000",marginTop:6,marginLeft:5,borderRadius:10}}
                  >
                     <Text 
                     style={{color:'#ffffff',left:10}}
                     >Report Post</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              </View>
            
          </View>
      </View>
 
  </View>


        {/* posted image or video  \/\/\/\/\/\/\/\/\/\/  */}

    <View>
        <View 
        style={{
          marginTop:10,width:370,left:10,
        }}>
          <Text 
          style={{
            fontSize:12,fontWeight:"400",lineHeight:13,color:"#000000",
          }}>
              {caption}
           </Text>
        </View>

        <Text>{view_type}</Text>
          {/* post image containor \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ */}
          <View>
           {
            image ? <View
            style={{ borderWidth:1 , borderColor:"grey" ,  width:390, height:400 , marginTop:10}}> 
              <Image
            source={{ uri: imagePath }}  // Provide the actual image URI 
            style={{ width: '100%', height: '100%', }}
      />
           </View> : null
           }
        </View>
   
         {/* post image containor \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ */}
         <View>
           {
            image ? <View
            style={{ borderWidth:1 , borderColor:"grey" ,  width:390, height:400 , marginTop:10}}> 
              <Image
            source={{ uri: imagePath }}  // Provide the actual image URI 
            style={{ width: '100%', height: '100%', }}
      />
           </View> : null
           }
        </View>
      
  {/* post image containor \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ */}  
       <View 
       style={{ height:50,width:380,marginTop:5,flexDirection:"row",justifyContent:"space-between"}}>
           <View>

            {/* like button */}
             <Text 
             style={{textAlign:"center",fontWeight:"500",fontSize:12,fontWeight:"500",color:"#000000"}}>{`${formatCmpctNumber(like)} Likes`}</Text>
             <TouchableOpacity
                onPress={handleLikeDislike(post.id, userId, post.isLiked)}
              style={{width:70,height:30,borderWidth:1,borderRadius:5,flexDirection:"row"}}>
                 <View 
                 style={{width:22,height:20,}}> 

                 {  hitlike ? <Image source={require('../../Assets/Home_Icon_And_Fonts/Like_icon.png')}
               style={{width:"100%" , height:"100%" , left:3,top:2}} 
               />  : <Image source={require('../../Assets/Home_Icon_And_Fonts/Like_icon.png')}
               style={{width:"100%" , height:"95%" , left:3,top:3}}
             /> }
                 </View>
                 <Text 
                 style={{alignSelf:"center",left:7,fontWeight:"500",color:"#000000"}}>Like</Text>
             </TouchableOpacity>
           </View>

           {/* comments button */}
           <View >
             <Text 
              style={{textAlign:"center",fontSize:12,fontWeight:"500",color:"#000000"}}>
               {`${formatCmpctNumber(comments.length)} comments`}</Text>
             <TouchableOpacity
              onPress={openCommentModal}
              style={{width:105,height:30,borderWidth:1,borderRadius:5,flexDirection:"row"}}>
                 <View 
                 style={{width:20,height:20,}}> 
                <Image source={require('../../Assets/Home_Icon_And_Fonts/comment.png')}
                 style={{width:"100%" , height:"100%" , left:2,top:5}}
               /> 
                 </View>
                 <Text 
                style={{alignSelf:"center",left:7,fontWeight:"500",color:"#000000"}}>Comments</Text>
             </TouchableOpacity>
           </View>

         {/* shares button */}
           <View>
             <Text  style={{textAlign:"center",color:"#000000",fontSize:12,fontWeight:"500"}}>0 Share</Text>
             <TouchableOpacity
              onPress={(item)=>handleshare(item)}
              style={{width:80,height:30,borderWidth:1,borderRadius:5,flexDirection:"row"}}>
                 <View 
                 style={{width:20,height:20,}}> 
                <Image source={require('../../Assets/Home_Icon_And_Fonts/share_icon.png')}
                 style={{width:"100%" , height:"95%" , left:5,top:5}}
               /> 
                 </View>
                 <Text 
                  style={{alignSelf:"center",left:10,fontWeight:"500",color:"#000000"}}>Share</Text>
             </TouchableOpacity>
           </View>
       </View>

    </View>
   
  </View>
  <View style={{borderBottomWidth: 10,
            borderBottomColor: '#D7D7D7',
            marginVertical: 5}}/>
  </View>

  
    //     {/* Buttons for actions */}
    //     <TouchableOpacity onPress={() => handleLikeDislike(post.id, 'userId', post.isLiked)}>
    //       {/* Like button */}
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => handleShare(post)}>
    //       {/* Share button */}
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={openCommentModal}>
    //       {/* Comment button */}
    //     </TouchableOpacity>
  
    //     {/* Comment Modal */}
    //     <Modal isVisible={isCommentVisible}>
    //       <View>
    //         <TextInput
    //           placeholder="Add a comment..."
    //           value={commentText}
    //           onChangeText={(text) => setCommentText(text)}
    //         />
    //         <Button title="Submit" onPress={submitComment} />
    //         <Button title="Close" onPress={closeCommentModal} />
    //       </View>
    //     </Modal>
    //     {/* End Comment Modal */}
    //     </View>
    //     </View>
    //   </View>
    );
  };
  