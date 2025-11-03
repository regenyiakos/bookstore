// Validation utility functions

export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = password => {
  // At least 8 characters
  return password && password.length >= 8;
};

export const isValidPrice = price => {
  return typeof price === 'number' && price >= 0;
};

export const isValidRating = rating => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};

export const isValidQuantity = quantity => {
  return Number.isInteger(quantity) && quantity > 0;
};

export const isValidURL = url => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
