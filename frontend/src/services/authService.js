import api from './api';

// Strapi Authentication Service
export const authService = {
  // Login with email and password (Strapi local strategy)
  login: async (email, password) => {
    const response = await api.post('/auth/local', {
      identifier: email,
      password,
    });
    
    // Store JWT token
    if (response.data.jwt) {
      localStorage.setItem('authToken', response.data.jwt);
    }
    
    return response.data;
  },

  // Register new user
  register: async (name, email, password) => {
    const response = await api.post('/auth/local/register', {
      username: name,
      email,
      password,
    });
    
    // Store JWT token
    if (response.data.jwt) {
      localStorage.setItem('authToken', response.data.jwt);
    }
    
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  },

  // Get current user info
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },

  // Check authentication status
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get stored JWT token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Send password reset email
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password with token
  resetPassword: async (code, password, passwordConfirmation) => {
    const response = await api.post('/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
    });
    return response.data;
  },
};
