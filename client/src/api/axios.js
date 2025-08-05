// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://ecommerce-eight-xi-10.vercel.app/api',
  withCredentials: true, // optional, if using cookies
});

// Add interceptor to attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
