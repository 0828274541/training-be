import apiHandler from './apiHandler';

export const authApi = {
  register: (payload) => apiHandler.post('/apis/auth/register', payload),
  login: (payload) => apiHandler.post('/apis/auth/login', payload),
  logout: () => apiHandler.post('/apis/auth/logout')
};
