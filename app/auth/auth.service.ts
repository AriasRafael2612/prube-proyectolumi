import axios from 'axios';
import { StorageService } from '../../services/storage.service';

const API_URL = 'http://192.168.0.10:3000/user';

export const AuthService = {
  async login(identifier: string, password: string, isEmail: boolean) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      [isEmail ? 'email' : 'nickName']: identifier,
      password
    });

    await StorageService.setItem('userToken', response.data.token);
    await StorageService.setItem('userData', JSON.stringify(response.data.user));
    
    return response.data;
  },

  async getCurrentUser() {
    const userData = await StorageService.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

 

  // auth.service.ts
async getUserProfile() {
  const token = await StorageService.getItem('userToken');
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.user; // ← asegúrate que tu backend responde así
},

async logout() {
  await StorageService.clearAuthData();
},




};