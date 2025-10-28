import api from '../config/api.js';

export const donorApi = {
  // GET /api/donor/profile
  getProfile: async () => {
    const response = await api.get('/api/donor/profile');
    return response.data;
  },

  // PUT /api/donor/profile
  updateProfile: async (profileData) => {
    const response = await api.put('/api/donor/profile', profileData);
    return response.data;
  },

  // GET /api/donor/donations
  getDonations: async () => {
    const response = await api.get('/api/donor/donations');
    return response.data;
  },

  // GET /api/donor/dashboard
  getDashboard: async () => {
    const response = await api.get('/api/donor/dashboard');
    return response.data;
  }
};