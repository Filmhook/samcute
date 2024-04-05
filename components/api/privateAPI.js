import axios from 'axios';
// import refreshToken from "./refreshToken";

const privateAPI = axios.create({
  baseURL: '',
});

export default privateAPI;

// privateAPI.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 400 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const resp = await refreshToken();

//       const access_token = resp?.appData?.refresh_token;
//       localStorage.setItem('access_token', access_token);
//       privateAPI.defaults.headers.common[
//         'Authorization'
//       ] = `Bearer ${access_token}`;
//       return privateAPI(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );
