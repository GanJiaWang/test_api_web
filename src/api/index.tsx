import axios from 'axios';

export const { REACT_APP_API_URL } = process.env;
export const apiCaller = axios.create({
  baseURL: REACT_APP_API_URL || 'http://localhost:5050/api/',
  timeout: 20000,
  withCredentials: true
});
