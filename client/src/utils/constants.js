// Application constants

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const BOOK_CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Biography',
  'History',
  'Science',
  'Programming',
  'Business',
  'Self-Help',
  'Children',
  'Young Adult',
];

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const RATING_STARS = [1, 2, 3, 4, 5];

export const SORT_OPTIONS = {
  NEWEST: 'created_at',
  PRICE_LOW_HIGH: 'price',
  PRICE_HIGH_LOW: 'price_desc',
  TITLE: 'title',
};
