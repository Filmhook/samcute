import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from './refreshToken';

// Create private API instance with base URL
const privateAPI = axios.create({
  baseURL: 'https://filmhook.annularprojects.com/filmhook-0.1',
});

// Add request interceptor to attach JWT token to request headers
privateAPI.interceptors.request.use(async (config) => {
  try {
    // Get JWT token from AsyncStorage
    const jwt = await AsyncStorage.getItem('jwt');

    // Check if JWT token exists
    if (!jwt) {
      throw new Error('JWT token not found');
    }

    // Attach JWT token to request headers
    config.headers.Authorization = `Bearer ${jwt}`;
    return config;
  } catch (error) {
    console.error('Error attaching JWT token to request:', error.message);
    throw error;
  }
});

// Add response interceptor to handle request errors
privateAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshedToken = await refreshToken();
        // Update AsyncStorage with the new token
        await AsyncStorage.setItem('jwt', refreshedToken);
        // Attach the new token to the request headers
        originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
        // Retry the original request
        return privateAPI(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error
        console.error('Error refreshing token:', refreshError.message);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default privateAPI;
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const privateAPI = axios.create({
//   baseURL: 'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT',
// });

// privateAPI.interceptors.request.use(async (config) => {

//   const jwt = await AsyncStorage.getItem("jwt");
//   if (jwt) {
//     config.headers.Authorization = `Bearer ${jwt}`;
//   }
//   return config;
// });

// export default privateAPI;