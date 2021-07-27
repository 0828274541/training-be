import apiHandler from './apiHandler';

export const usersApi = {
  paging: (payload) => apiHandler.post('/apis/users/paging', payload),
  addUser: (payload) => apiHandler.post('/apis/users', payload),
  updateUser: (payload) => apiHandler.put(`/apis/users/${payload.id}`, payload),
  deleteUser: (payload) => apiHandler.post('/apis/users/delete', payload),
  getUserById: (payload) => apiHandler.get(`/apis/users/${payload.id}`)
};
