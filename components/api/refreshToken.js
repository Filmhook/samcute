import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from './privateAPI'; // Assuming privateAPI is properly configured

const refreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log("Stored token:", token);
    const userId = await AsyncStorage.getItem('userId')
    console.log("stored useriD", userId)// Log the stored token for debugging

    const response = await privateAPI.post('user/refreshToken', {
      token: token
    });

    console.log("Refresh token response:", response.data); // Log the response for debugging

    const newToken = response.data.jwt; // Extract the token from the response
    // await AsyncStorage.setItem('jwt', newToken); // Store the new token in AsyncStorage
    // console.log("Token refreshed successfully");
    console.log("New token:", newToken);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error.message); // Log the specific error message
    return null;
  }
};

export default refreshToken;