import apiHandler from './apiHandler';

export const booksApi = {
  paging: (payload) => apiHandler.post('/apis/books/paging', payload),
  getBook: (payload) => apiHandler.post('/apis/books/search', { payload }),
  addBook: (payload) => apiHandler.post('/apis/books/', payload),
  updateBook: (id, payload) => apiHandler.put(`/apis/books/${id}`, payload),
  deleteBook: (payload) => apiHandler.post('/apis/books/delete', payload),
  findByBookId: (payload) => apiHandler.post('/apis/books/findById', payload)
};
