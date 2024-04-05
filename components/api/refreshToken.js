import privateAPI from './privateAPI';

const refreshToken = async () => {
  const user_id = null;
  try {
    const resp = await privateAPI.get(`/refresh-token/user/${user_id}`);
    return resp?.data;
  } catch (e) {
    console.log('Error');
  }
};

export default refreshToken;
