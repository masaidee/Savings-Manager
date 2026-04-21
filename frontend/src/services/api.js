import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Children API
export const childrenAPI = {
  getAll: () => api.get('/children'),
  getById: (id) => api.get(`/children/${id}`),
  create: (data) => api.post('/children', data),
  update: (id, data) => api.put(`/children/${id}`, data),
  delete: (id) => api.delete(`/children/${id}`),
};

// Transactions API
export const transactionsAPI = {
  getAll: (childId) =>
    api.get('/transactions', { params: childId ? { childId } : {} }),
  getByChild: (childId) => api.get(`/transactions/child/${childId}`),
  create: (data) => api.post('/transactions', data),
  delete: (id) => api.delete(`/transactions/${id}`),
};

// Statistics API
export const statisticsAPI = {
  getAll: () => api.get('/statistics'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
