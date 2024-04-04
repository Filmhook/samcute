
// import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
// import React, { useState } from 'react';
// import { SelectList } from 'react-native-dropdown-select-list';
// import DateTimePicker from '@react-native-community/datetimepicker';


// export default function ScreenOne({ navigation }) {

//   const [TitleText, setTitleText] = useState('');
//   const [selected, setSelected] = useState('');
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState();
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState();
//   // const navigation = useNavigation();

//   const About = () => {
//     if (selected.trim() === '' || TitleText.trim() === '') {
//       alert('Title, Description, and Expire Date cannot be empty.');
//       return;
//     }

//     // // Reset the state
//     setTitleText('');
//     setSelected('');

//     // Navigate to ScreenTwo
//     // navigation.navigate('ScreenTwo');
//   };

//   const onStartDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || startDate;
//     setShowStartDatePicker(false);
//     setStartDate(currentDate);
//   };

//   const onEndDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || endDate;
//     setShowEndDatePicker(false);
//     setEndDate(currentDate);
//   };

//   const data = [
//     { key: '1', value: 'Freasher' },
//     { key: '2', value: 'Experienced' },
//     { key: '3', value: 'Freasher/Experienced' },
//   ];
//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("ScreenTwo")}
//         style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 100, alignSelf: 'center', top:50, left:140 }}
//       >
//         <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
//           Next
//         </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//         onPress={() => navigation.navigate("SearchBars")}
//         style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 100, alignSelf: 'center', top:5, right:130}}
//       >
//         <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>Back</Text>
//         </TouchableOpacity>
//        <View style={{ borderWidth: 3, borderRadius: 10, margin: 5, borderColor: 'blue', backgroundColor: 'white', top: 80, overflow: 'scroll', paddingBottom: 50, shadowColor: '#080504', shadowOffset: { width: -2, height: 40 }, shadowOpacity: 0.2, shadowRadius: 50, elevation: 20 }}>
//         <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Create a Job Post</Text>
//         <View style={{ margin: 5, top: 20 }}>
//           <TextInput
//             placeholder="Write Your Job Title Here..!!"
//             multiline
//             value={TitleText}
//             onChangeText={setTitleText}
//             style={{
//               borderWidth: 1,
//               borderColor: 'gray',
//               borderRadius: 10,
//               padding: 8,
//               overflow: 'scroll'
//             }}
//           />
//         </View>
//         <View style={{ top: 20 }}>
//           <SelectList
//             onSelect={() => alert(` Your Candidates Experience will be ${selected}`)}

//             setSelected={(val) => setSelected(val)}
//             data={data}
//             save="value"
//             fontFamily='lato'
//             placeholder='Select Your Candidates Experience...'
//             search={false}
//             boxStyles={{ borderRadius: 10, margin: 5 }} // override default styles
//             dropdownStyles={{ margin: 5, borderRadius: 10, height: 150 }}
//           />
//         </View>
//         <View style={style.Date}>
//           <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 320 }}>
//             <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
//               Select Start Date
//             </Text>
//           </TouchableOpacity>

//           {showStartDatePicker && (
//             <DateTimePicker
//               value={startDate}
//               mode="date"
//               display="spinner"
//               onChange={onStartDateChange}
//             />
//           )}

//           <TouchableOpacity onPress={() => {
//             setEndDate(endDate || new Date());
//             setShowEndDatePicker(true);
//           }} style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 320 }}>
//             <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
//               Select End Date
//             </Text>
//           </TouchableOpacity>

//           {showEndDatePicker && (
//             <DateTimePicker
//               value={endDate || new Date()}
//               mode="date"
//               display="spinner"
//               onChange={onEndDateChange}
//             />
//           )}
//           <View style={style.Text}>
//             <View style={style.TextStart}>
//               <Text>{`Start Date : ${startDate.toDateString()}`}</Text>
//             </View>
//             <View style={style.TextEnd}>
//               <Text>{`End Date : ${endDate ? endDate.toDateString() : ''}`}</Text>
//             </View>
//           </View>
//         </View>
//     </View>
//     </View>
//   );
// }
// const style = StyleSheet.create({
//   Date: {
//     margin: 5,
//     top: 12
//   },
//   Text: {
//     margin: 0,
//     width: 320,
//     top: 10
//   },
//   TextStart: {
//     margin: 5
//   },
//   TextEnd: {
//     margin: 5
//   }
// });
// =================================================================




// import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
// import React, { useState } from 'react';
// import { SelectList } from 'react-native-dropdown-select-list';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


// export default function ScreenOne({ navigation }) {

//   const [TitleText, setTitleText] = useState('');
//   const [selected, setSelected] = useState('');
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState();
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState();
//   // const navigation = useNavigation();

//   const isValid = () => {
//     return TitleText.trim() !== '' && selected.trim() !== '' && startDate && endDate;
//   };

//   const handleNext = () => {
//     if (isValid()) {
//       if (endDate && startDate) {
//         if (endDate >= startDate || endDate.toDateString() === startDate.toDateString()) {
//           navigation.navigate("ScreenTwo", { TitleText, selected, startDate, endDate });
//         } else {
//           alert('End date must be greater than or equal to the start date.');
//         }
//       } else {
//         alert('Please select both start and end dates.');
//       }
//     } else {
//       alert('Please fill in all fields before proceeding.');
//     }
//   };



//   const onStartDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || startDate;
//     console.log(selectedDate)
//     setShowStartDatePicker(false);
//     setStartDate(currentDate);
//   };

//   const onEndDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || endDate;
//     setShowEndDatePicker(false);
//     setEndDate(currentDate);
//   };

//   const data = [
//     { key: '1', value: 'Freasher' },
//     { key: '2', value: 'Experienced' },
//     { key: '3', value: 'Freasher/Experienced' },
//   ];
//   console.log(TitleText, selected, startDate, endDate)


//   return (
//     <View style={{ height: '100%' ,alignItems:'center',justifyContent:'center'}}>




//         <View style={{ borderRadius: responsiveWidth(4), backgroundColor: '#e0e3e6', overflow: 'scroll', width: responsiveWidth(94),paddingVertical:responsiveHeight(2) }}>
//         <View style={style.headerContainer}>
//           <Image style={{
//             height: responsiveHeight(12),
//             width: responsiveWidth(25), alignSelf: 'center'
//           }} source={require("../../Assets/Login_page/FH_logos.png")} />
//           {/* <Text style={styles.header}>Login</Text> */}
//         </View>

//           <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', color: 'black' }}>Create a Job Post</Text>

//           <View style={{ margin: responsiveWidth(2) }}>
//             <TextInput
//               placeholder="Looking for a ?"
//               multiline
//               value={TitleText}
//               placeholderTextColor="black"
//               onChangeText={setTitleText}
//               style={{
//                 borderWidth: 1,
//                 borderColor: '#004242',
//                 borderRadius: responsiveWidth(2),
//                 padding: responsiveHeight(1),
//                 overflow: 'scroll',
//                 color: 'black',

//                 paddingHorizontal:responsiveWidth(5),
//                 width: responsiveWidth(82), alignSelf: 'center'
//               }}
//             />
//           </View>
//           <View style={{ margin: responsiveWidth(2) }}>
//             <SelectList
//               onSelect={() => alert(` Your Candidates Experience will be ${selected}`)}
//               setSelected={(val) => setSelected(val)}
//               data={data}
//               save="value"
//               inputStyles={{color:'black'}}
//               //fontFamily='lato'
//               placeholder='Select Your Candidates Experience...'
//               search={false}
//               boxStyles={{ borderRadius: responsiveWidth(2), borderColor: '#004242', width: responsiveWidth(82), alignSelf: 'center', }} // override default styles
//               dropdownStyles={{ margin: '1%', borderRadius: responsiveWidth(2), height: responsiveHeight(13), width: responsiveWidth(82), left: responsiveWidth(3),backgroundColor: '#616161' }}
//             />
//           </View>
//           <View style={style.Date}>
//             <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={{ backgroundColor: 'black', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(0), width: responsiveWidth(80), alignSelf: 'center' }}>
//               <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: responsiveWidth(3) }}>
//                 Select Start Date
//               </Text>
//             </TouchableOpacity>

//             {showStartDatePicker && (
//               <DateTimePicker
//                 value={startDate}
//                 mode="date"
//                 display="spinner"
//                 minimumDate={new Date()} // Set minimum date as today's date
//                 onChange={onStartDateChange}
//               />
//             )}

//             <TouchableOpacity onPress={() => {
//               setEndDate(endDate || new Date());
//               setShowEndDatePicker(true);
//             }} style={{ backgroundColor: 'black', borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), width: responsiveWidth(80), alignSelf: 'center' }}>
//               <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: responsiveWidth(3) }}>
//                 Select End Date
//               </Text>
//             </TouchableOpacity>
//             {showEndDatePicker && (
//               <DateTimePicker
//                 value={endDate || startDate} // Set initial value to start date if no end date selected
//                 mode="date"
//                 display="spinner"
//                 minimumDate={ new Date()}
//                 onChange={onEndDateChange}
//               />
//             )}
//             <View style={style.Text}>
//               <View style={style.TextStart}>
//                 <Text style={{color:'black'}}>{`Start Date : ${startDate.toDateString().split('T')[0]}`}</Text>
//               </View>
//               <View style={style.TextEnd}>
//                 <Text  style={{color:'black'}}>{`End Date : ${endDate ? endDate.toDateString().split('T')[0] : ''}`}</Text>
//               </View>
//             </View>
//           </View>
//           <View style={{ flexDirection: 'row', columnGap: responsiveWidth(20), marginTop:responsiveHeight(5) ,marginLeft:responsiveWidth(8)}}>
//         <TouchableOpacity
//             onPress={() => navigation.navigate("SearchBars")}

//             style={{ borderRadius: responsiveWidth(2),
//               justifyContent: 'center',

//               alignItems: 'center',

//               borderWidth: responsiveWidth(0.4),
//               backgroundColor: 'black',
//               height: responsiveHeight(6),
//               width: responsiveWidth(30), }}
//           >
//             {/* <Image
//               source={require('../../Assets/Audition_Icons_Fonts/back.png')}
//               style={{ width: responsiveWidth(10), height: responsiveHeight(5) }}
//             /> */}
//             <Text style={{ color: 'white',
//                 fontWeight: 'bold',
//                 textAlign: 'center', fontSize: responsiveFontSize(2), height: responsiveHeight(3)}}>Back</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => handleNext({ TitleText, selected, startDate, endDate })}

//             style={{  backgroundColor: '#616161',
//             // padding: responsiveWidth(2.5),
//             borderRadius: responsiveWidth(2),
//             justifyContent: 'center',
//             alignItems: 'center',
//             // alignSelf: 'center',
//             height: responsiveHeight(6),
//             width: responsiveWidth(30),
//            // bottom: responsiveHeight(1.5)
//            }}
//           >
//              <Text style={{ color: 'white',
//                 fontWeight: 'bold',
//                 textAlign: 'center', fontSize: responsiveFontSize(2), height: responsiveHeight(3)}}>Next</Text>

//           </TouchableOpacity>
//         </View>
//         </View>



//     </View>
//   );
// }
// const style = StyleSheet.create({
//   Date: {
//     margin: '2%',
//     top: '5%',
//     //  borderWidth:1
//   },
//   headerContainer: {
//     // flexDirection: 'row',
//     // alignSelf: 'center',
//     marginTop:responsiveHeight(1),
//     //bottom:responsiveHeight(5),
//    // top:responsiveHeight(5),
//     height: responsiveHeight(15),
//     width: responsiveWidth(30),
//     left:responsiveWidth(30)
//     //bottom: responsiveHeight(1)


//   },
//   Text: {
//     margin: 0,
//     width: '89%',
//     top: '3%',

//   },
//   TextStart: {
//     margin: '2%',
//     marginLeft: '6.5%',

//   },
//   TextEnd: {
//     margin: '2%',
//     marginLeft: '6.5%',

//   }
// });
//----------------------------------------------------------------//
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, FlatList, TextInput, Image, } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-crop-picker';

import RazorpayCheckout from 'react-native-razorpay';
import { SelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';

export default function SOne() {



  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  const [inputText, setInputText] = useState('');
  const [profilepic, setProfilepic] = useState(null);
  const [title, settitle] = useState('');
  const [fresher, setfresher] = useState('');
  const [startDates, setStartDate] = useState(null);

  const edit_profile_pic = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });
      if (image) {
        console.log(image.path);
        setProfilepic(image.path);
      }
    } catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    }
  };
  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      profilepic !== null && // Check if company logo is selected
      fresher.trim() !== '' &&
      inputText.trim() !== '' &&
      startDates !== null  // Check if start date is selected

    );
  };

  const postContent = async () => {
    if (!isFormValid()) {
      alert('Please fill in all the required fields.');
      return;
    }

  }



  const addItem = () => {
    if (inputText.trim() !== '') {
      setItems((prevItems) => [
        ...prevItems,
        { id: prevItems.length + 1, text: inputText.trim() }, // Trim the input text
      ]);
      setInputText(''); // Clear inputText after adding an item
    }
  };

  const handleItemPress = (itemId) => {
    setEditingItemId(itemId);
    setInputText(items.find((item) => item.id === itemId)?.text || '');
  };

  const handleEditItem = () => {
    const newItems = items.map((item) => {
      if (item.id === editingItemId) {
        return { ...item, text: inputText.trim() };
      }
      return item;
    }).filter((item) => item.text.trim() !== ''); // Filter out items with empty text
    setItems(newItems.map((item, index) => ({ ...item, id: index + 1 }))); // Update IDs
    setEditingItemId(null);
    setInputText('');
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item.id)}
        style={{ padding: 8, backgroundColor: editingItemId === item.id ? 'lightgrey' : 'transparent' }}
      >
        <Text>{`${item.id}: ${item.text}`}</Text>
      </TouchableOpacity>
    );
  };

  const data = [
    { key: '1', value: 'Fresher' },
    { key: '2', value: 'Experienced' },
  ];

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [endDates, setEndDate] = useState();
  // const [finalendDates, finalsetEndDate] = useState();




  const showStartDatePickers = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickers = () => {
    setShowEndDatePicker(true);
  };

  const hideStartDatePicker = () => {
    setShowStartDatePicker(false);
  };

  const hideEndDatePicker = () => {
    setShowEndDatePicker(false);
  };

  const handleStartDateSelect = (date) => {
    setStartDate(date.dateString);
    hideStartDatePicker();
  };

  const handleEndDateSelect = (date) => {
    setEndDate(date.dateString);

    hideEndDatePicker();
  };



  const makePayment = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_DN4L6WbNtUJb5f',
      amount: '100',
      method: {
        netbanking: true,
        card: true,
        upi: true
      },
      name: 'Filmhookapps',
      // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: { color: 'blue' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      console.log(error)
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.heading}>Create Ad</Text>

      <View style={styles.formContainer}>
        <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/new.png')} style={{
          width: '112.6%',

          overflow: 'hidden',
          // backgroundColor: "lightblue",
          // borderRadius: responsiveWidth(2),
          padding: responsiveWidth(5),
          alignItems: 'center',
        }} resizeMode="stretch">
          <TextInput style={styles.input} placeholder="Write the title for your project?" value={title} onChangeText={settitle} />
          {/* <TouchableOpacity onPress={handleImageOption} style={styles.imagePickerButton}>
          <Text style={styles.buttonText}>Upload Logo</Text>
        </TouchableOpacity> */}
          <View style={{ width: responsiveWidth(50), height: responsiveHeight(15), right: responsiveWidth(14.5), justifyContent: 'center', alignItems: 'center', borderWidth: 1, margin: responsiveHeight(1), top: responsiveHeight(-1), left: responsiveWidth(0.5) }}>
            <View style={{ width: responsiveWidth(10), height: responsiveHeight(5), }}>
              <TouchableOpacity onPress={edit_profile_pic} style={{ width: '500%', height: '300%', borderRadius: 5, right: responsiveWidth(20), top: responsiveHeight(-5) }}>
                {profilepic ? (
                  <Image source={{ uri: profilepic }} style={{ width: '100%', height: '100%', }} resizeMode='stretch' />
                ) : (
                  <View style={{ alignItems: 'center', top: responsiveHeight(4.5) }}>
                    <Image
                      source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-cameraicon.png')}
                      style={{ width: '20%', height: '50%', top: responsiveHeight(5.4), left: responsiveWidth(20) }}
                      resizeMode='stretch'
                    />
                    <Text style={{ top: responsiveHeight(-3), fontSize: 18 }}>Upload Logo</Text>
                  </View>

                )}

              </TouchableOpacity>
            </View>
          </View>
          <View>
            <SelectList
              onSelect={() => alert(`Your candidate will be ${selected}`)}
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              inputStyles={{ color: 'black', }}
              placeholder='Fresher/Experienced'
              value={fresher}
              onChangeText={setfresher}
              search={false}
              boxStyles={{ borderRadius: responsiveWidth(2), borderColor: '#004242', width: responsiveWidth(82), alignSelf: 'center', margin: 3 }}
              dropdownStyles={{ borderRadius: responsiveWidth(2), height: responsiveHeight(10), width: responsiveWidth(81.5), backgroundColor: 'white', top: responsiveHeight(-1), alignSelf: 'center', }}
            />
          </View>
          <View style={{}}>
            <Text style={styles.subHeading}>Roles:</Text>
          </View>
          <TextInput
            multiline
            maxLength={200}
            placeholder=" Roles & responsibilties"
            placeholderTextColor={'black'}
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            style={styles.listInput}
          />
          <TouchableOpacity onPress={addItem} style={styles.addButton}>
            <Text style={styles.buttonText}>Add </Text>
          </TouchableOpacity>
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsHeading}>Your List of Requirements</Text>
            <FlatList
              data={items}

              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
            {editingItemId && (
              <TouchableOpacity onPress={handleEditItem} style={{ padding: 8, backgroundColor: 'lightblue', marginTop: 10, borderRadius: responsiveWidth(2) }}>
                <Text>Save</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.buttonText1}> Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode='date'
            display='default'
            // maximumDate={new Date()}
            onChange={onDateChange}
          />
        )}
        
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>{dob.toDateString()}</Text>
        </View> */}
          <View>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: responsiveWidth(4), right: responsiveWidth(19), top: responsiveHeight(-4) }}>Audition ends on</Text>
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: responsiveWidth(4), columnGap: responsiveWidth(10), top: responsiveHeight(-8) }}>
            <TouchableOpacity onPress={showStartDatePickers} style={{ width: responsiveWidth(30), height: responsiveHeight(5), borderWidth: responsiveWidth(0.3), borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', columnGap: responsiveWidth(3), left: responsiveWidth(22), }} >
              <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/Booking.png')} style={{ width: responsiveWidth(6), height: responsiveHeight(3) }} />
              <Text style={{ color: 'black', fontWeight: 'bold' }}>{startDates ? startDates : ''} </Text></TouchableOpacity>

          </View>
          {showStartDatePicker && (
            <Calendar
              style={styles.calendar}
              onDayPress={handleStartDateSelect}
              markedDates={{ [startDates]: { selected: true } }}
            />
          )}

          {showEndDatePicker && (
            <Calendar
              style={styles.calendar}
              onDayPress={handleEndDateSelect}
              markedDates={{ [endDates]: { selected: true } }}
            />
          )}
          <View style={{ right: 105, }}>
            <Text style={{ fontSize: responsiveFontSize(1.5), color: 'black', fontWeight: 'bold', right: responsiveWidth(8), top: responsiveHeight(-5) }}>Posted by:</Text>
          </View>
        </ImageBackground>
      </View>

      <TouchableOpacity style={{ backgroundColor: 'black', width: responsiveWidth(20), height: responsiveHeight(3.5), margin: 4, borderRadius: responsiveWidth(2), left: responsiveWidth(30) }} >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveHeight(2), left: responsiveWidth(2.5), top: responsiveHeight(0.5) }} onPress={makePayment}>Post Ad</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    color: 'black'
  },
  formContainer: {
    width: '90%',
    flex: 1,
    // backgroundColor: "lightblue",
    // borderRadius: responsiveWidth(5),
    padding: responsiveWidth(5),

    alignItems: 'center',
    // borderWidth:responsiveWidth(0.5)
  },
  input: {
    width: '100%',
    height: responsiveHeight(5),
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    color: 'black',
    fontWeight: 'bold'
  },
  imagePickerButton: {
    //backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '34%',
    height: responsiveHeight(4.8),
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: responsiveHeight(2),
    left: responsiveWidth(29),
    top: 70
  },
  datePickerButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: responsiveHeight(5.3),
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: responsiveHeight(2),
    left: -90
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  selectedDateContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    left: 50,
    top: -60
  },
  selectedDateText: {
    fontSize: responsiveFontSize(2),
  },
  subHeading: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
    right: responsiveWidth(37),
    color: 'black'
  },
  listInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    width: '80%',
    right: responsiveWidth(10),
    color: 'black',
    // fontWeight:'bold'
  },
  addButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: responsiveHeight(4),
    marginBottom: responsiveHeight(2),
    left: 135,
    top: responsiveHeight(-7)
  },
  requirementsContainer: {
    borderWidth: 1,
    borderColor: '#004242',
    borderRadius: responsiveWidth(2),
    width: '102%',
    marginBottom: responsiveHeight(2),
    top: responsiveHeight(-7)
  },
  requirementsHeading: {
    fontSize: responsiveFontSize(1.8),
    // fontWeight: 'bold',
    textAlign: 'center',
    padding: responsiveWidth(3),
    color: 'black',
    // fontWeight:'bold',
  },
  requirementItem: {
    padding: responsiveWidth(2),
    // borderBottomWidth: 1,
    borderBottomColor: '#004242',

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  backButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: responsiveHeight(6),
    marginRight: responsiveWidth(5),
  },
  nextButton: {
    backgroundColor: '#616161',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: responsiveHeight(6),
  },
  calendar: {
    borderWidth: 2,
    bottom: responsiveHeight(40),
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

// //---------------------------------------------------------------//




