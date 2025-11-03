import { useAuth } from './useAuth';

// Custom hook for permission checking
export const usePermissions = () => {
  const { user, isAdmin } = useAuth();

  const canManageBooks = () => isAdmin;
  const canManageUsers = () => isAdmin;
  const canManageOrders = () => isAdmin;
  const canWriteReview = () => !!user;
  const canViewOrders = () => !!user;

  return {
    canManageBooks,
    canManageUsers,
    canManageOrders,
    canWriteReview,
    canViewOrders,
  };
};
