import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectIsAuthenticated, selectIsAdmin, clearUser } from '@store/slices/authSlice';
import authAPI from '@api/auth';

// Custom hook for authentication
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  const logout = async () => {
    try {
      await authAPI.logout();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      // Even if the API call fails, clear local auth state
      dispatch(clearUser());
      navigate('/login');
    }
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    logout,
  };
};
