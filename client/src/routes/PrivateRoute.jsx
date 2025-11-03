import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

// Protected route component for authenticated users
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
