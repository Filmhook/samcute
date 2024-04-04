import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Professionalinfo() {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [childrenNames, setChildrenNames] = useState([]);
  const [editChildrenNames, setEditChildrenNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(); // Call the function to fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve JWT token
      const jwt =
        'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6ImpvaG5zLmRvZUBvZXhvYW1wbGUuY29tIiwidXNlclR5cGUiOiJjb21tb25Vc2VyIiwiaWF0IjoxNzExMzcyOTAzLCJleHAiOjE3MTEzNzQxMDN9.F5tWmh1XKBX0kejfT4Dg0IfgANNWMKo-EulAp9f7EkA7U4f_RFxpkfCBBbzdj4-iPRI9AIHSDrhJX8jA74RcdQ';
      if (jwt) {
        // Make API call to fetch user data
        const response = await axios.get(
          `https://filmhook.annularprojects.com/filmhook-0.0.1/user/getUserByUserId?userId=1`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        const userData = response.data.data.childrenNames;
        setChildrenNames(userData);
      } else {
        console.log('JWT token not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    setEditChildrenNames([...childrenNames]); // Set editChildrenNames to current childrenNames
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Update children names in the database
    try {
      // Make API call to update user data
      const jwt = 'your_jwt_token_here';
      if (jwt) {
        const response = await axios.post(
          `https://filmhook.annularprojects.com/filmhook-0.0.1/user/updateChildrenNames`,
          {childrenNames: editChildrenNames},
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        console.log('Data updated:', response.data);
        setChildrenNames([...editChildrenNames]); // Update childrenNames with edited data
        setIsEditing(false);
      } else {
        console.log('JWT token not found');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
    setIsLoading(false);
  };

  const handleChange = (index, value) => {
    const updatedChildrenNames = [...editChildrenNames];
    updatedChildrenNames[index] = value;
    setEditChildrenNames(updatedChildrenNames);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpanded} style={styles.titleContainer}>
        <Text style={styles.titleText}>PERSONAL INFORMATION</Text>
        <Image
          source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
          style={styles.arrowImage}
        />
      </TouchableOpacity>

      {expanded && (
        <View>
          {isEditing ? (
            <>
              {editChildrenNames.map((childName, index) => (
                <TextInput
                  key={index}
                  value={childName}
                  onChangeText={text => handleChange(index, text)}
                  placeholder="Enter Child's Name"
                  style={styles.input}
                />
              ))}
              <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {childrenNames.map((childName, index) => (
                <Text key={index} style={styles.childName}>
                  {childName}
                </Text>
              ))}
              <TouchableOpacity onPress={handleEdit} style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  childName: {
    marginBottom: 10,
  },
});
