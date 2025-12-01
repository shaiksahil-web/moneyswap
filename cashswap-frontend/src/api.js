import axios from 'axios';

// Only use environment variable — no fallback
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // must come from .env
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

export default api;
