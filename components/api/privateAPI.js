import axios from 'axios';

const privateAPI = axios.create({
  baseURL: 'https://filmhook.annularprojects.com/filmhook-0.0.1',
});

//privateAPI.interceptors.request.use(async (config) => {
//  const appToken = await AsyncStr.getItem("access_token");
//  if (appToken) {
//    config.headers.Authorization = `Bearer ${appToken}`;
//  }
//  return config;
//});

export default privateAPI;
