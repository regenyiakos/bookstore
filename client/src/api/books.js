import apiClient from './client';

// Book API calls
export const booksAPI = {
  // Get all books with filtering and pagination
  getBooks: async params => {
    return apiClient.get('/books', { params });
  },

  // Get single book by ID with review statistics
  getBookById: async id => {
    return apiClient.get(`/books/${id}`);
  },

  // Get related books (same category)
  getRelatedBooks: async (id, limit = 6) => {
    return apiClient.get(`/books/${id}/related`, { params: { limit } });
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
