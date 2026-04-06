import api from './api';

export const analyticsService = {
  getEngagement: () => api.get('/analytics/engagement'),
  getRevenue: () => api.get('/analytics/revenue'),
  getDashboardStats: () => api.get('/analytics/stats'),
};
