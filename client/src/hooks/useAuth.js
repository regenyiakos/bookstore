import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated, selectIsAdmin } from '@store/slices/authSlice';

// Custom hook for authentication
export const useAuth = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  return {
    user,
    isAuthenticated,
    isAdmin,
  };
};
