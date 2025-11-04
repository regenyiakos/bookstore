import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/Home';
import BooksPage from '@pages/Books';
import BookDetailsPage from '@pages/BookDetails';
import LoginPage from '@pages/Login';
import RegisterPage from '@pages/Register';
import CartPage from '@pages/Cart';
import ProfilePage from '@pages/Profile';
import AdminPage from '@pages/Admin';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Main application routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />

      {/* 404 Not Found */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-gray-600">Page not found</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
