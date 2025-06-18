import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include Firebase ID token
api.interceptors.request.use(async (config) => {
  // Get Firebase ID token from local storage or context
  const idToken = localStorage.getItem('firebaseIdToken');
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('firebaseIdToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Register user with backend after Firebase authentication
  registerUser: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login verification with backend
  loginUser: async (idToken) => {
    try {
      const response = await api.post('/auth/verify-token', { idToken });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user profile from backend
  getUserProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile in backend
  updateUserProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Set Firebase ID token in storage and axios headers
  setIdToken: (token) => {
    localStorage.setItem('firebaseIdToken', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  },

  // Remove Firebase ID token
  removeIdToken: () => {
    localStorage.removeItem('firebaseIdToken');
    delete api.defaults.headers.Authorization;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('firebaseIdToken');
  }
};

export default authService;