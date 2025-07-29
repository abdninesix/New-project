import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // optional, if using cookies
  // headers: {
  //   'Content-Type': 'multipart/form-data', // you can override this per request if needed
  // },
});

export default API;
