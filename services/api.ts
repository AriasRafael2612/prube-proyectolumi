import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'http://192.168.0.10:3000';  

export const registerUser = (data: {
  userName: string;
  userLastName: string;
  userNickName: string;
  userEmail: string;
  userPassword: string;
}) => {
  return axios.post(`${API_URL}/user/register`, data);
};
