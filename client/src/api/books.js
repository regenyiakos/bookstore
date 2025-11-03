import apiClient from './client';

// Book API calls
export const booksAPI = {
  // Get all books with filtering and pagination
  getBooks: async params => {
    return apiClient.get('/books', { params });
  },

  // Get single book by ID
  getBookById: async id => {
    return apiClient.get(`/books/${id}`);
  },

  // Create new book (Admin only)
  createBook: async bookData => {
    return apiClient.post('/books', bookData);
  },

  // Update book (Admin only)
  updateBook: async (id, bookData) => {
    return apiClient.put(`/books/${id}`, bookData);
  },

  // Delete book (Admin only)
  deleteBook: async id => {
    return apiClient.delete(`/books/${id}`);
  },
};
