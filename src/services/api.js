// src/services/api.js
import axios from 'axios';

// API Base URL Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://college-backend-51y3.onrender.com/api';

console.log('API Base URL:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for slow server responses
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get JWT token from localStorage (set after Firebase authentication)
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request for debugging
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data
    });

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method
    });

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    // Return formatted error
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
  }
);

// API service methods
const apiService = {
  // Auth endpoints
  auth: {
    firebaseLogin: (data) => api.post('/auth/firebase-login', data),
    register: (data) => api.post('/auth/register', data),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data) => api.put('/auth/profile', data),
    verifyToken: (token) => api.post('/auth/verify-token', { token }),
    logout: () => api.post('/auth/logout')
  },

  // Product endpoints
  products: {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    search: (params) => api.get('/products/search', { params }),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    addReview: (id, data) => api.post(`/products/${id}/review`, data)
  },

  // Cart endpoints
  cart: {
    get: () => api.get('/cart'),
    add: (productId, quantity) => api.post('/cart', { productId, quantity }),
    update: (productId, quantity) => api.put('/cart', { productId, quantity }),
    remove: (productId) => api.delete(`/cart/${productId}`),
    clear: () => api.delete('/cart')
  },

  // Order endpoints
  orders: {
    getUserOrders: () => api.get('/orders'),
    getById: (id) => api.get(`/orders/${id}`),
    create: (data) => api.post('/orders', data),
    // Admin endpoints
    getAllOrders: (params) => api.get('/orders/admin/all', { params }),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
  },

  // Payment endpoints
  payment: {
    createIntent: (data) => api.post('/payment/create-intent', data),
    confirmPayment: (data) => api.post('/payment/confirm', data)
  },

  // User endpoints
  users: {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    getOrderHistory: () => api.get('/users/orders')
  }
};

// Export both the axios instance and the service methods
export default api;
export { apiService };