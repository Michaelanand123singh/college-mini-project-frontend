import api from './api';

export const paymentService = {
  createIntent: (amount) => api.post('/payment/create-intent', { amount }),
  confirmPayment: (paymentIntentId) => api.post('/payment/confirm', { paymentIntentId })
};