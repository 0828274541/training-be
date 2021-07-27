import apiHandler from './apiHandler';

export const categoriesApi = {
  getCategory: () => apiHandler.get('/apis/categories'),
  addCategory: (payload) => apiHandler.post('/apis/categories', { payload }),
  updateCategory: (payload) => apiHandler.put('/apis/categories', { payload }),
  deleteCategory: (payload) => apiHandler.post('/apis/categories/delete', payload),
  getCategoryById: (payload) => apiHandler.get(`/apis/categories/${payload.id}`)
};
