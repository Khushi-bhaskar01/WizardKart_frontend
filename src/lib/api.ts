// src/lib/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const loginUser = (data: { email: string; password: string }) =>
  API.post('/auth/login', data);

export const registerUser = (data: { name: string; email: string; password: string }) =>
  API.post('/auth/register', data);

export default API;
