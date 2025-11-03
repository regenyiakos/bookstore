import apiClient from './client';

// Order API calls
export const ordersAPI = {
  // Get user's orders
  getOrders: async params => {
    return apiClient.get('/orders', { params });
  },

  // Get single order by ID
  getOrderById: async id => {
    return apiClient.get(`/orders/${id}`);
  },

  // Create new order
  createOrder: async orderData => {
    return apiClient.post('/orders', orderData);
  },

  // Update order status (Admin only)
  updateOrderStatus: async (id, status) => {
    return apiClient.patch(`/orders/${id}/status`, { status });
  },
};
